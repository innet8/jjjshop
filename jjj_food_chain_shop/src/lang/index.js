import { createI18n } from "vue-i18n"
import auto_zh from "./auto/zh.json"
import auto_en from "./auto/en.json"
import auto_zhtw from "./auto/zh-tw.json"
import auto_th from "./auto/th.json"
import auto_ja from "./auto/ja.json"
import auto_ko from "./auto/ko.json"

let lang = '';
let defaultLang = ''
if(JSON.parse(localStorage.getItem("Language"))){
    lang = JSON.parse(localStorage.getItem("Language")).language;
    defaultLang = JSON.parse(localStorage.getItem("Language")).languageList[0].name;
}

const i18n = createI18n({
    legacy: false,
    locale: lang || defaultLang,
    fallbackLocale: defaultLang,
    globalInjection: true,
    messages: {
        zh: { ...auto_zh },
        en: { ...auto_en },
        zhtw: { ...auto_zhtw },
        th: { ...auto_th },
        ja: { ...auto_ja },
        ko: { ...auto_ko },
    },
    warnHtmlMessage: false,
})

export default i18n

export const I18nGlobal = i18n.global
