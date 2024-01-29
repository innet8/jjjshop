import { createI18n } from "vue-i18n"
import auto_zh from "./auto/zh.json"
import auto_en from "./auto/en.json"
import auto_zhtw from "./auto/zh-tw.json"
import auto_th from "./auto/th.json"

let lang = 'en'
if(JSON.parse(localStorage.getItem("Language"))){
    lang = JSON.parse(localStorage.getItem("Language")).language 
}
const i18n = createI18n({
    legacy: false,
    locale: lang || "en",
    fallbackLocale: "en",
    globalInjection: true,
    messages: {
        zh: { ...auto_zh },
        en: { ...auto_en },
        zhtw: { ...auto_zhtw },
        th: { ...auto_th },
    },
    warnHtmlMessage: false,
})

export default i18n

export const I18nGlobal = i18n.global
