import { defineStore } from "pinia";
export const useTokenStore = defineStore(
    "token",
    () => {
        const token = ref("");
        const isLogined = computed(() => {
            return token.value !== "";
        });
        function logout() {
            token.value = "";
        }
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
