import { defineStore } from 'pinia';
import { computed } from 'vue';
export const languageStore = defineStore({
    id: 'Language',
    state: () => ({
        language: 'en',
        languageList: [
            {
                key: 'th',
                label: 'ภาษาไทย'
            },
            {
                key: 'zh',
                label: '简体中文'
            },
            {
                key: 'zhtw',
                label: '繁體中文'
            },
            {
                key: 'en',
                label: 'English'
            },
            {
                key: 'ja',
                label: '日本語'
            },
        ],
        languageData:{
            th: "",
            zh: "",
            zhtw: "",
            en: "",
            ja: "",
        },
    }),
    getters: {

    },
    actions: {
        setLanguage(lang) {
            this.language = lang;
        },
        getLanguage() {
            return {
                language: computed(()=>{
                    let result = 'English'
                    this.languageList.map((item=>{
                        if(item.key == this.language ){
                            result = item.label
                        } 
                    }));
                    return result
                })
            }
        },
        getLanguageList() {
            return this.languageList
        },
    },
    persist: {
        key: 'Language',
        storage: localStorage,
    },
});
