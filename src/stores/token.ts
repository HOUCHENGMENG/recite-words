import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";

export const useTokenStore = defineStore(
    "token",
    () => {
        const token = ref("");
        const userStore = useUserStore();
        const isLogined = computed(() => {
            return token.value !== "";
        });
        function logout() {
            token.value = "";
        }
        watch(token, () => {
            userStore.updateSelfInfo();
        });
        return {
            token,
            isLogined,
            logout,
        };
    },
    {
        persist: true,
    }
);
