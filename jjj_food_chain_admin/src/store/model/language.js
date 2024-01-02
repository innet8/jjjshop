import { defineStore } from 'pinia';
import { computed } from 'vue';
export const languageStore = defineStore({
    id: 'Language',
    state: () => ({
        language: 'zh',
        languageList: [
            {
                key: 'zh',
                label: '简体'
            },
            {
                key: 'tc',
                label: '繁体'
            },
            {
                key: 'en',
                label: 'English'
            },
        ]
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
                    let result = '简体'
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
