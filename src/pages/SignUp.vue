<template>
    <div class="container">
        <h1>用户注册</h1>
        <div class="signUp">
            <el-input
                placeholder="请输入用户名"
                v-model="userName"
                size="large"
            >
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
            <el-input
                placeholder="请重复输入密码"
                v-model="passwordAgain"
                show-password
                size="large"
            >
                <template #prepend>重&emsp;复</template>
            </el-input>
            <el-alert
                v-show="warningMsg"
                :title="warningMsg"
                type="warning"
                :closable="false"
            />
            <el-button :disabled="disabled" type="primary" @click="onsignup"
                >注册</el-button
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import type { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import { signUp } from "../api/user";
import { handleApiError } from "../api/http";
import { useTokenStore } from "@/stores/token";
const router = useRouter();
const route = useRoute();
const userName = ref("");
const password = ref("");
const passwordAgain = ref("");
const tokenStore = useTokenStore();
const warningMsg = computed(() => {
    if (
        (userName.value.length < 3 && userName.value.length > 0) ||
        userName.value.length > 12
    ) {
        return "用户名必须是3至12位";
    }
    if (
        (password.value.length < 6 && password.value.length > 0) ||
        password.value.length > 12
    ) {
        return "密码必须是6至12位";
    }
    if (
        passwordAgain.value.length > 0 &&
        passwordAgain.value !== password.value
    ) {
        return "前后密码不匹配";
    }
});
const disabled = computed(() => {
    if (password.value.length < 6 || password.value.length > 12) {
        return true;
    }
    if (userName.value.length < 3 || userName.value.length > 12) {
        return true;
    }
    if (password.value !== passwordAgain.value) {
        return true;
    }
    return false;
});
async function onsignup() {
    try {
        const data = await signUp(userName.value, password.value);
        tokenStore.token = data.token;
    } catch (error: AxiosError | any) {
        handleApiError(error, (response) => {
            //根据错误码进行对应处理
            // if (error.response.data.code === 2002) {
            //     ElMessage({
            //         message: "用户名长度必须是3至12位",
            //         type: "error",
            //     });
            //     // ElMessage.error("Oops, this is a error message.");
            // }
            if (error.response.data.code === 2001) {
                ElMessage({
                    message: "用户名已存在",
                    type: "error",
                });
            }
            // if (error.response.data.code === 2003) {
            //     ElMessage({
            //         message: "密码为必须 6 至 12 位。",
            //         type: "error",
            //     });
            // }
        });
    }
    router.push({
        path: (route.query.redirect as string) || "/",
    });
}
</script>
<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
}
.signUp {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
}
</style>
