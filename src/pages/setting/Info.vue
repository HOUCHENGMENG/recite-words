<template>
    <div class="container">
        <div class="box">
            <el-avatar class="avatar" :size="128" :src="avatarUrl"></el-avatar>
            <ElIcon class="camera" :size="60">
                <Camera />
            </ElIcon>
        </div>
        <Text size="14px" color="var(--text-prompt-color)">
            注册于： 时间戳
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
        <el-button type="primary">更新信息</el-button>
        <div><ElButton>修改密码</ElButton></div>
    </div>
</template>
<script>
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
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
