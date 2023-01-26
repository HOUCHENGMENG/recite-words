import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

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
        },
        {
            path: "/signup",
            name: "SignUp",
            component: () => import("../pages/SignUp.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("../pages/NotFound.vue"),
        },
    ],
});

export default router;
