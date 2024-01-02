<template>
    <div class="common-header">
        <div class="breadcrumb">
            <div class="baseInfo-left-base">
                <span class="name">{{ menu_title }}</span>
            </div>
            <div class="header-navbar">
                <div class="header-lang">
                    <el-dropdown trigger="click"  @command="setLanguage">
                        <span class="el-dropdown-link">
                            {{languageNow}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in languageList" :command="item.key">{{ item.label }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                </div>
                <div class="header-navbar-icon">
                    <span class="ml4 icon iconfont icon-geren9"></span>
                    <span class="text ml4">{{ userInfo && userInfo.userName }}，{{ $t('欢迎您！') }}</span>
                </div>
                <div class="header-navbar-icon" @click.stop="exit">
                    <span class="icon iconfont icon-tuichu"></span>
                    <span class="text ml4">退出</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    reactive,
    toRefs,
    defineComponent
} from 'vue';
import { languageStore } from '@/store/model/language.js';
import {
    useUserStore
} from '@/store';
const { userInfo, bus_on, afterLogout } = useUserStore();
export default defineComponent({
    setup() {
        const state = reactive({
            menu_title: '首页',
            userInfo,
        });
        const language = languageStore()
        const languageNow = language.getLanguage().language
        const languageList = language.getLanguageList()
        bus_on("MenuName", (res) => {
            state.menu_title = res;
        });
        return {
            ...toRefs(state),
            userInfo,
            afterLogout,
            languageList,
            languageNow,
            language,
        };
    },
    methods: {
        exit() {
            ElMessageBox.confirm(
                '此操作将退出登录, 是否继续?',
                '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
            )
                .then(() => {
                    this.logout();
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '已取消退出',
                    });
                });
        },
        setLanguage(e) {
            ElMessageBox.confirm(
                '切换语言需要刷新后生效，是否确定刷新?',
                '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
            )
                .then(() => {
                    this.language.setLanguage(e)
                    location.reload();
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '已取消',
                    });
                });
        
        },
        async logout() {
            await this.afterLogout();
            this.$router.push('/login');
        },
    }
});
</script>
<style lang="scss">
.login-out .icon-tuichu {
    color: red;
}

.header-navbar-icon .icon-geren9 {
    font-size: 20px;
}
</style>