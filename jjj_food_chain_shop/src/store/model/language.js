import { defineStore } from 'pinia';
import { computed } from 'vue';
export const languageStore = defineStore({
    id: 'Language',
    state: () => ({
        language: '',
        languageList: [
            {
                "key": 1,
                "name": "en",
                "value": "English"
            },
            {
                "key": 2,
                "name": "th",
                "value": "ภาษาไทย"
            },
            {
                "key": 3,
                "name": "zh-tw",
                "value": "繁體中文"
            },
            {
                "key": 4,
                "name": "ja",
                "value": "日本語です"
            }
        ]
        ,
        languageData: {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
        },
    }),
    getters: {

    },
    actions: {
        setLanguage(lang) {
            this.language = lang;
        },
        setLanguageList(data) {
            this.languageList = data;
        },
        setLanguageData(data) {
            this.languageData = data;
        },
        getLanguage() {
            return {
                language: computed(() => {
                    let result = 'English'
                    this.languageList.map((item => {
                        if (item.name == this.language) {
                            result = item.value
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
