<template>
    <div class="container">
        <div class="row-between">
            <Text inline bold size="36px" class="margin-10">{{
                word?.word
            }}</Text>
            <el-icon @click="playWordAudio(word?.us_phonetic_audio)"
                ><video-play></video-play
            ></el-icon>
        </div>
        <Text color="#999" class="margin-10">/{{ word?.us_phonetic }}/</Text>
        <div v-for="explain of word.explains" class="margin-20">
            <Text class="right-10 margin-20" color="#999" inline>{{
                explain.pos
            }}</Text>
            <span>{{ explain.trans }}</span>
        </div>
        <div class="row-between">
            <span class="margin-20">例句</span>
            <el-icon @click="playExampleAudio(word?.example_audio)"
                ><video-play
            /></el-icon>
        </div>
        <div>
            <Text class="margin-10">{{ word?.example_en }}</Text
            ><Text class="margin-10">{{ word?.example_zh }}</Text
            ><Text class="margin-10">{{ word?.example_dict }}</Text>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { getWords } from "@/api/word";
const route = useRoute();
const id = route.params.id;
const words = await getWords();
const word = words.results.find(function (word) {
    if (word.id == id) {
        return true;
    }
    return false;
});
function playWordAudio(audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.play();
}
function playExampleAudio(audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.play();
}
// console.log(word);
</script>
<style scoped>
.container {
    max-width: 565px;
    margin: 0 auto;
}
i {
    color: var(--theme-color);
}
</style>
