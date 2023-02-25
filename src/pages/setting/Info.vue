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
        <ElInput placeholder="请输入用户名~" v-model="username">
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
                v-model="bio"
            ></ElInput>
        </div>
        <el-button type="primary" @click="updateInfo">更新信息</el-button>
        <div>
            <ElButton @click="updatePasswordVisible = true">修改密码</ElButton>
        </div>
        <el-dialog
            v-model="confirmPasswordVisible"
            title="修改用户名需要确认密码"
            width="380"
            center
            ><el-input v-model="password" placeholder="请确认密码~">
                <template #prepend>确认密码</template>
            </el-input>
            <template #footer>
                <el-button type="primary" @click="updateInfo">
                    确认密码
                </el-button>
            </template>
        </el-dialog>
        <el-dialog
            v-model="updatePasswordVisible"
            title="修改密码"
            width="380"
            center
            ><el-input
                v-model="password"
                placeholder="请输入旧密码~"
                class="bottom-20"
                size="large"
            >
                <template #prepend>旧密码</template>
            </el-input>
            <el-input
                v-model="newpassword"
                placeholder="请输入新密码~"
                size="large"
            >
                <template #prepend>新密码</template>
            </el-input>
            <template #footer>
                <el-button type="primary" @click="updatePassword">
                    更新密码
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { updateSelfInfo } from "@/api/user";
import { useTokenStore } from "@/stores/token";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const tokenStore = useTokenStore();
const avatarUrl = ref(userStore.avatarUrl);
const bio = ref(userStore.bio);
const username = ref(userStore.username);
let confirmPasswordVisible = ref(false);
let updatePasswordVisible = ref(false);
let newpassword = ref("");
let password = ref("");
let avatar: File;
async function select() {
    const [handle] = await showOpenFilePicker();
    avatar = await handle.getFile();
    avatarUrl.value = URL.createObjectURL(avatar);
}
async function updateInfo() {
    const data: ParamUpdateSelfInfo = {};
    if (username.value !== userStore.username) {
        if (password.value === "") {
            confirmPasswordVisible.value = true;
            return;
        } else {
            data.username = username.value;
            data.password = password.value;
        }
    }
    if (bio.value !== userStore.bio) {
        data.bio = bio.value;
    }
    if (avatar) {
        data.avatar = avatar;
    }

    const responseData = await updateSelfInfo(data);
    if (data.username) {
        // 更新了用户名需要更新 token
        ({ token: tokenStore.token } = responseData as ApiUpdateSelfInfo);
    }
    ElMessage({
        message: "信息更新成功",
        type: "success",
    });
    //更新userStore里的信息
    userStore.updateSelfInfo();
    //确认密码清空
    password.value = "";
    //隐藏密码确认框
    confirmPasswordVisible.value = false;
}
async function updatePassword() {
    const data = {
        password: password.value,
        newpassword: newpassword.value,
    };
    //更新了密码需要更新token
    ({ token: tokenStore.token } = (await updateSelfInfo(
        data
    )) as ApiUpdateSelfInfo);
    ElMessage({
        message: "密码更新成功",
        type: "success",
    });
    password.value = "";
    newpassword.value = "";
    updatePasswordVisible.value = false;
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
