<template>
    <div class="container">
        <div class="box" @click="select">
            <el-avatar class="avatar" :size="128" :src="avatarUrl"></el-avatar>
            <ElIcon class="camera" :size="60">
                <Camera />
            </ElIcon>
        </div>
        <Text size="14px" color="var(--text-prompt-color)">
            注册于： {{ userStore.registerTime }}
        </Text>
        <ElInput placeholder="请输入用户名~">
            <template #prepend>用户名</template>
        </ElInput>
        <div class="bio">
            <Text :size="12" :bottom="10" color="var(--text-prompt-color)"
                >个性签名</Text
            >
            <ElInput
                type="textarea"
                :rows="4"
                placeholder="请输入个性签名~"
            ></ElInput>
        </div>
        <el-button type="primary" @click="updateInfo">更新信息</el-button>
        <div><ElButton>修改密码</ElButton></div>
    </div>
</template>
<script setup lang="ts">
import { updateSelfInfo } from "@/api/user";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
const userStore = useUserStore();
const avatarUrl = ref(userStore.avatarUrl);
const bio = ref(userStore.bio);
let avatar: File;
async function select() {
    const [handle] = await showOpenFilePicker();
    avatar = await handle.getFile();
    avatarUrl.value = URL.createObjectURL(avatar);
}
async function updateInfo() {
    const data: ParamUpdateSelfInfo = {};
    if (bio.value !== userStore.bio) {
        data.bio = bio.value;
    }
    if (avatar) {
        data.avatar = avatar;
    }

    await updateSelfInfo(data);
    ElMessage({
        message: "信息更新成功",
        type: "success",
    });
    //更新userStore里的信息
    userStore.updateSelfInfo();
}
</script>
<style scoped>
.container {
    max-width: 400px;
    padding: 40px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
.box {
    position: relative;
    cursor: pointer;
    border-radius: 50%;
}
.avatar {
    transition: filter 0.5s;
}
.box:hover .avatar {
    filter: brightness(0.5);
}
.box:hover .camera {
    opacity: 1;
}
.camera {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    opacity: 0;
    transition: opacity 0.5s;
    color: white;
}
.bio {
    width: 100%;
}
</style>
