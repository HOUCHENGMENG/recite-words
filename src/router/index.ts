import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import { useTokenStore } from "@/stores/token";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
            meta: {
                title: "首页",
            },
        },
        {
            path: "/words",
            name: "Words",
            // route level code-splitting
            // this generates a separate chunk (Words.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../pages/Words.vue"),
            meta: {
                title: "词表",
            },
        },
        {
            path: "/words/:id",
            name: "WordDetails",
            // route level code-splitting
            // this generates a separate chunk (Words.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../pages/WordDetails.vue"),
            meta: {
                title: "单词详情页",
            },
        },
        {
            path: "/statistics",
            name: "Statistics",
            // route level code-splitting
            // this generates a separate chunk (Words.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../pages/Statistics.vue"),
            meta: {
                title: "数据统计",
            },
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../pages/Login.vue"),
            meta: {
                requiresNoAuth: true,
                title: "登录",
            },
        },
        {
            path: "/signup",
            name: "SignUp",
            component: () => import("../pages/SignUp.vue"),
            meta: {
                requiresNoAuth: true,
                title: "注册",
            },
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("../pages/NotFound.vue"),
        },
        {
            path: "/setting/Info",
            name: "SettingInfo",
            component: () => import("../pages/setting/Info.vue"),
            meta: {
                requiresAuth: true,
                title: "个人设置",
            },
        },
        {
            path: "/setting/Learn",
            name: "SettingLearn",
            component: () => import("../pages/setting/Learn.vue"),
            meta: {
                title: "学习设置",
            },
        },
        {
            path: "/task",
            name: "Task",
            component: () => import("../pages/Task.vue"),
            meta: {
                requiresAuth: true,
            },
        },
    ],
});
router.beforeEach((to, from) => {
    const tokenStore = useTokenStore();
    if (tokenStore.isLogined) {
        if (to.meta.requiresNoAuth) {
            //这个页面登录后就不允许访问
            router.push({
                name: "Home",
            });
        }
    } else {
        //如果没有登录
        if (to.meta.requiresAuth) {
            router.push({
                name: "Login",
                //保存我们所在的位置，以便以后再来
                query: { redirect: to.fullPath },
            });
        }
    }
    if (to.meta.title) {
        document.title = `${to.meta.title}-背单词`;
    }
});
export default router;
