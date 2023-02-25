<template>
    <div class="container">
        <div>
            <Text :inline="true" size="60px" bold class="right-10">0</Text
            ><span>DAYS</span>
        </div>
        <div class="book">
            <div class="row-between">
                <Text bold size="20px">四级词汇</Text>
                <RouterLink :to="{ name: 'Words' }">查看词表</RouterLink>
            </div>
            <Text class="setting" color="#989898">
                <el-icon><Notebook /></el-icon>学习设置<el-icon
                    ><ArrowRightBold
                /></el-icon>
            </Text>
            <Text class="row-between" size="14px" bold color="#989898">
                <span>已完成3.59%</span><span>185 / 5152词</span>
            </Text>
            <div><el-progress :percentage="10" :show-text="false" /></div>
            <div class="row-around text-center">
                <div>
                    <Text size="12px">应学</Text>
                    <Text size="14px" bold>40</Text>
                </div>
                <div>
                    <Text size="12px">已学</Text>
                    <Text size="14px" bold>0</Text>
                </div>
                <div>
                    <Text size="12px">时长</Text>
                    <Text size="14px" bold>0min</Text>
                </div>
            </div>
        </div>
        <el-button
            @click="router.push({ name: 'Task' })"
            type="primary"
            size="large"
            round
            >开始学习</el-button
        >
    </div>
</template>
<script setup lang="ts">
import axios from "axios";
// import { useRouter, useRoute } from "vue-router";
// import { getWords } from "@/api/word";
// onMounted(async function () {
//     const words = await getWords();
//     console.log(words);
// });
// const router = useRouter();
// function goAbout() {
//     router.push({
//         name: "about",
//     });
// }
const router = useRouter();
</script>
<style scoped>
.container {
    max-width: 570px;
    height: 100vh;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.book {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: var(--background-second-color);
    padding: 20px;
    border-radius: 15px;
}
.setting {
    display: flex;
    align-items: center;
    gap: 5px;
}
a {
    color: #4c9b81;
    text-decoration: none;
    font-weight: 700;
}
</style>
