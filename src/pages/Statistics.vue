<template>
    <container>
        <div id="main" ref="todayElement"></div>
    </container>
</template>
<script setup lang="ts">
// import * as echarts from "echarts";
import type { Ref } from "vue";
import * as echarts from "echarts/core";
import { getStatisticsToday } from "@/api/statistics";
import { useThemeStore, Theme } from "@/stores/theme";
import type { EChartsType } from "echarts/core";
import darkTheme from "@/themes/echarts/darkTheme";
import initTodayEchart from "@/echarts/today";
const todayElement: Ref<HTMLElement | null> = ref(null);
const todayData = await getStatisticsToday();

let todayEChart: EChartsType;
const themeStore = useThemeStore();
watch(
    () => themeStore.theme,
    (value) => {
        todayEChart.dispose();
        initEcharts();
    }
);
onMounted(() => {
    echarts.registerTheme("dark", darkTheme);
    initEcharts();
});
function initEcharts() {
    todayEChart = initTodayEchart(
        todayElement.value,
        themeStore.theme === Theme.light ? "light" : "dark",
        todayData
    );
}
</script>
<style scoped>
#main {
    width: 100%;
    aspect-ratio: 16/9;
}
</style>
