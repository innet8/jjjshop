import { createI18n } from "vue-i18n"
import auto_zh from "./auto/zh.json"
import auto_en from "./auto/en.json"
import auto_tc from "./auto/tc.json"

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("lang") || "zh",
    fallbackLocale: "zh",
    globalInjection: true,
    messages: {
        zh: { ...auto_zh },
        en: { ...auto_en },
        tc: { ...auto_tc },
    },
    warnHtmlMessage: false,
})

export default i18n

export const I18nGlobal = i18n.global
