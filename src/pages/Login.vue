<template>
    <div class="container">
        <h1>用户登录</h1>
        <div class="login">
            <el-input placeholder="请输入内容" v-model="username" size="large">
                <template #prepend>用户名</template>
            </el-input>
            <el-input
                placeholder="请输入密码"
                v-model="password"
                show-password
                size="large"
            >
                <template #prepend>密&emsp;码</template>
            </el-input>
            <el-button type="primary" @click="onlogin">登录</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { login } from "@/api/user";
// import type { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import { handleApiError } from "../api/http";
import { useTokenStore } from "@/stores/token";
const router = useRouter();
const route = useRoute();
const username = ref("");
const password = ref("");
const tokenStore = useTokenStore();
const isCheckFail = computed(() => {
    return username.value.length === 0 || password.value.length === 0;
});
async function onlogin() {
    // console.log("登录");
    if (isCheckFail.value) {
        ElMessage({
            message: "请填写用户名和密码",
            type: "warning",
            center: true,
        });
        return;
    }
    try {
        const data = await login(username.value, password.value);
        tokenStore.token = data.token;
        ElMessage({
            message: "登录成功",
            type: "success",
        });
        //登录成功跳转回先前的页面
        router.push({
            path: (route.query.redirect as string) || "/",
        });
    } catch (error: any) {
        handleApiError(error, (response) => {
            if (response.data.code === 2000) {
                ElMessage({
                    message: "用户名或密码错误",
                    type: "error",
                });
            }
        });
    }
}
</script>
<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
}
.login {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
}
</style>
