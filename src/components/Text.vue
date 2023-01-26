<template>
    <span v-if="inline" class="text"><slot></slot></span>
    <div v-else class="text"><slot></slot></div>
</template>
<script setup lang="ts">
import { defineProps, computed } from "vue";
const props = defineProps({
    inline: {
        type: Boolean,
        default: false,
    },
    size: [Number, String],
    bold: {
        type: Boolean,
        default: false,
    },
    light: {
        type: Boolean,
        default: false,
    },
    // weight: [Number, String],
    color: String,
});
const size = computed(() => {
    return typeof props.size === "string" ? props.size : `${props.size}px`;
});
const weight = computed(() => {
    console.assert(!(props.bold && props.light), "不能同时设置bold和light");
    if (props.bold) {
        return 700;
    }
    if (props.light) {
        return 100;
    }
    return "unset";
});
</script>
<style scoped>
.text {
    color: v-bind("props.color");
    font-size: v-bind("props.size");
    font-weight: v-bind("weight");
}
</style>
