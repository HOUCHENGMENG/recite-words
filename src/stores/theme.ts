export enum Theme {
    light,
    dark,
}
export const useThemeStore = defineStore(
    "theme",
    () => {
        const theme = ref(Theme.dark);
        watch(theme, (newTheme) => {
            if (newTheme === Theme.light) {
                document.documentElement.classList.remove("dark");
            } else {
                document.documentElement.classList.add("dark");
            }
        });
        return {
            theme,
        };
    },
    { persist: true }
);
