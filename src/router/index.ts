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
        },
        {
            path: "/words",
            name: "Words",
            // route level code-splitting
            // this generates a separate chunk (Words.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../pages/Words.vue"),
        },
        {
            path: "/words/:id",
            name: "WordDetails",
            // route level code-splitting
            // this generates a separate chunk (Words.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../pages/WordDetails.vue"),
        },
        {
            path: "/statistics",
            name: "Statistics",
            // route level code-splitting
            // this generates a separate chunk (Words.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../pages/Statistics.vue"),
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../pages/Login.vue"),
            meta: {
                requiresNoAuth: true,
            },
        },
        {
            path: "/signup",
            name: "SignUp",
            component: () => import("../pages/SignUp.vue"),
            meta: {
                requiresNoAuth: true,
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
            },
        },
        {
            path: "/setting/Learn",
            name: "SettingLearn",
            component: () => import("../pages/setting/Learn.vue"),
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
});
export default router;
