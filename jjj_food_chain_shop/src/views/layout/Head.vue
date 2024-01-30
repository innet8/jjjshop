<template>
    <div class="common-header">
        <div class="breadcrumb">
            <!--一般的标题显示-->
            <div class="baseInfo-left-base d-s-c">
                <span class="name"><img src="/src/assets/logo.png" /></span>

            </div>

            <div class="header-navbar">
                <div class="header-lang">
                    <el-dropdown trigger="click" @command="setLanguage">
                        <span class="el-dropdown-link">
                            <SvgIcon class="language-icon" name="language"></SvgIcon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in languageList" :disabled="item.key == languageTag" :command="item.key">
                                <div class="language-div">{{ item.label}}<img v-if="item.key == languageTag" src="../../assets/img/Check.svg"/></div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                </div>
                <!-- <div class="header-navbar-icon">
                    <span class="gray">当前版本：{{ userInfo.version }}</span>
                </div> -->
                <div class="header-navbar-icon">
                    <span class="ml4 icon iconfont icon-geren9"></span>
                    <span class="text ml4 blue">{{ userInfo.userName }}，{{ $t('欢迎您！') }}</span>
                </div>
                <div class="header-navbar-icon"><span class="gray">|</span></div>
               <div class="header-navbar-icon" @click="passwordFunc()">
                    <span class="text">{{ $t('修改密码') }}</span>
                </div> 
                <div class="header-navbar-icon login-out" @click="exit()">
                    <span class="icon iconfont icon-tuichu"></span>
                    <span class="text ml4">{{ $t('退出') }}</span>
                </div>
            </div>
        </div>

        <!--修改密码-->
        <UpdatePassword v-if="is_password" @close="closeFunc"></UpdatePassword>
    </div>
</template>

<script>
import { reactive, toRefs, defineComponent, onBeforeUnmount } from "vue";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import UpdatePassword from "./part/UpdatePassword.vue";
import { languageStore } from '@/store/model/language.js';
import SvgIcon from "@/components/svg-icon/SvgIcon.vue";
export default defineComponent({
    components: {
        UpdatePassword,
    },
    setup() {
        const router = useRouter();
        const { userInfo, bus_on, bus_emit, bus_off, afterLogout } = useUserStore();
        const language = languageStore()
        const languageTag = languageStore().language
        const languageNow = language.getLanguage().language
        const languageList = language.getLanguageList()
        const state = reactive({
            /*菜单名称*/
            menu_title: $t("菜单"),
            /*切换菜单*/
            tabList: [],
            /*切换选中*/
            activeValue: 0,
            /*是否修改密码*/
            is_password: false,
            /*tab切换类别*/

        });
        bus_on("MenuName", (res) => {
            state.menu_title = res;
        });
        bus_on("tabData", (res) => {
            state.tabList = res.list;
            state.activeValue = res.active;
            state.tab_type = res.tab_type;
        });
        bus_on('activeValue', (res) => {
            if (res && res.params) {
                state.activeValue = res.params;
            } else {
                state.activeValue = res;
            }
        })
        bus_on('noTarget', (res) => {
            state.activeValue = res;
        })
        //发送给其它组件头部加载完成
        bus_emit("headLoad", true);
        onBeforeUnmount(() => {
            bus_off("menuName");
            bus_off("tabData");
        });
        return {
            ...toRefs(state),
            userInfo,
            afterLogout,
            router,
            bus_emit,
            languageList,
            languageNow,
            language,
            languageTag,
        };
    },
    methods: {
        exit() {
            ElMessageBox.confirm($t("此操作将退出登录, 是否继续?"), $t("提示"), {
                confirmButtonText: $t("确定"),
                cancelButtonText: $t("取消"),
                type: "warning",
            })
                .then(() => {
                    this.logout();
                })
                .catch(() => {
                    this.$ElMessage({
                        type: "info",
                        message: $t("已取消退出"),
                    });
                });
        },
        async logout() {
            await this.afterLogout();
            this.$router.push("/login");
        },

        setLanguage(e) {
            if(e==this.languageTag)return;
            ElMessageBox.confirm(
                $t('切换语言需要刷新后生效，是否确定刷新?'),
                $t('提示'), {
                confirmButtonText: $t('确定'),
                cancelButtonText: $t('取消'),
                type: 'warning',
            }
            )
                .then(() => {
                    this.language.setLanguage(e)
                    location.reload();
                })
                .catch(() => {
                    this.$ElMessage({
                        type: 'info',
                        message: $t('已取消'),
                    });
                });

        },

        /*点击跳转*/

        /*修改密码*/
        passwordFunc() {
            this.is_password = true;
        },

        /*关闭修改密码*/
        closeFunc() {
            this.is_password = false;
        },
    },
});
</script>

<style lang="scss" >
.common-header .el-tabs__nav-wrap::after {
    display: none;
}

.login-out .icon-tuichu {
    color: red;
}

.header-navbar-icon .icon-geren9 {
    font-size: 20px;
}
.language-icon{
    color: #fff;
    width: 16px;
    height: 16px;
}
.language-div{
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
        width: 18px;
    }
}
</style>
