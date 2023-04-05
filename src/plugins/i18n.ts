import { createI18n } from "vue-i18n";
const messages = {
    en: {
        hello: "hello world",
    },
    zh: {
        hello: "年后世界",
    },
};
const i18n = createI18n({
    // something vue-i18n options here ...
    locale: "zh", // set locale
    fallbackLocale: "en", // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
});
export default i18n;
