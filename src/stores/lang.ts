import i18n from "@/plugins/i18n";
import type { Ref } from "vue";
export const useLangStore = defineStore(
    "lang",
    () => {
        const locale: Ref<locales> = ref("zh");
        watch(locale, (value) => {
            i18n.global.locale = value;
        });
        return {
            locale,
        };
    },
    { persist: true }
);
