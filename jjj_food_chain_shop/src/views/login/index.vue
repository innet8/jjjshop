<template>
    <div class="login-bg" :style="'background-image:url(' + bgimg_url + ');'">
        <div class="login-main">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
                class="demo-ruleForm login-container d-b-c">
                <div class="flex-1 login-box">
                    <h3 class="title" style="margin-bottom: 40px;"><img src="/src/assets/logo.svg" />{{ $t('点餐管理系统') }}</h3>
                    <!--用户名-->
                    <el-form-item prop="account">
                        <div class="left-img-input"><img class="l-img" src="/src/assets/img/user.png">
                            <el-input class="l-input" type="text" v-model="ruleForm.account" auto-complete="off"
                                :placeholder="$t('请输入用户名')">
                            </el-input>
                        </div>
                        <!-- <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input> -->
                    </el-form-item>
                    <!--密码-->
                    <el-form-item prop="checkPass">
                        <div class="left-img-input"><img class="l-img" src="/src/assets/img/password.png">
                            <el-input type="password" class="l-input" v-model="ruleForm.checkPass" auto-complete="off"
                                :placeholder="$t('请输入登录密码')">
                            </el-input>
                        </div>
                        <!-- <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input> -->
                    </el-form-item>
                    <!-- <el-form-item prop="verifycode" style="line-height:0px;">
            <div class="d-b-c">
              <div class="left-img-input" style="width: auto;">
                <el-input v-model="ruleForm.verifycode" ref="verifycode" placeholder="验证码" class="l-input"
                  style="width:230px;"></el-input>
              </div>
              <div class="identifybox" style="height: 41px; flex-shrink: 0;" @click="refreshCode">
                <sidentify :identifyCode="identifyCode"></sidentify>
              </div>
            </div>
          </el-form-item> -->
                    <!--登录-->
                    <el-button type="primary" :disabled="disabledC"
                        style="width:100%;height: 48px;font-size: 18px;margin-top: 6px;" @click.native.prevent="SubmitFunc"
                        :loading="logining">{{ $t('登录') }}
                    </el-button>
                </div>

            </el-form>
        </div>
        <div class="language-box">
            <el-dropdown trigger="click" @command="setLanguage">
                <span class="el-dropdown-link">
                    <SvgIcon class="data-box-icon" name="language"></SvgIcon>{{ languageNow }}<el-icon
                        class="el-icon--right"><arrow-down /></el-icon>
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
    </div>
</template>

<script>
import sidentify from '@/components/sidentify.vue';
import IndexApi from '@/api/index.js';
import bgimg from '@/assets/img/login_bg.png';
import logimg from '@/assets/img/login_logo.png';
import UserApi from '@/api/user.js';
import { useUserStore } from '@/store';
// import { useLockscreenStore } from "@/store/model/lockscreen.js"
import { languageStore } from '@/store/model/language.js';
import SvgIcon from "@/components/svg-icon/SvgIcon.vue";
// const useLockscreen = useLockscreenStore();
const { afterLogin } = useUserStore();
const language = languageStore()
const languageNow = language.getLanguage().language
const languageTag = languageStore().language
const languageList = language.getLanguageList()
export default {

    components: {
        sidentify,
        SvgIcon
    },

    computed: {
        disabledC() {
            return this.ruleForm.account == '' && this.ruleForm.checkPass == ''
        }
    },
    data() {
        // 验证码自定义验证规则
        const validateVerifycode = (rule, value, callback) => {
            if (value === "") {
                this.refreshCode();
                callback(new Error($t('请输入验证码')))
            } else if (value !== this.identifyCode) {
                this.refreshCode();
                callback(new Error($t('验证码不正确!')))
            } else {
                callback()
            }
        }
        return {
            loginForm: {

            },
            identifyCodes: "1234567890", //验证码的数字库
            identifyCode: "", // 验证码组件传值
            /*是否正在加载*/
            loading: true,
            /*商城名称*/
            shop_name: '',
            /*背景图片*/
            bgimg_url: '',
            log_url: '',
            /*是否正在提交*/
            logining: false,
            /*表单对象*/
            ruleForm: {
                /*用户名*/
                account: '',
                /*密码*/
                checkPass: '',
                verifycode: ''
            },
            /*验证规则*/
            rules: {
                /*用户名*/
                account: [{
                    required: true,
                    message: $t('请输入用户名'),
                    trigger: 'blur'
                }],
                /*密码*/
                checkPass: [{
                    required: true,
                    message: $t('请输入登录密码'),
                    trigger: 'blur'
                }],
                verifycode: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateVerifycode
                }]
            },
            /*基础配置*/
            baseData: {},
            language: language,
            languageNow: languageNow,
            languageList: languageList,
            languageTag: languageTag,
        };
    },
    created() {
        this.refreshCode();
        this.getData();
    },
    mounted() {
        this.identifyCode = '';
        this.makeCode(this.identifyCodes, 4);
        document.addEventListener('keyup', this.onEnter);
    },

    destroyed() {
        document.removeEventListener('keyup', this.onEnter);
    },
    methods: {
        //验证码----start
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }

        },
        /*获取基础配置*/
        getData() {
            let self = this;
            IndexApi.base(true)
                .then(res => {
                    self.loading = false;
                    // self.shop_name = res.data.settings.shop_name;
                    const { data: { settings: { shop_bg_img, shop_name, shop_logo_img } } } = res;
                    self.shop_name = shop_name;
                    if (shop_bg_img) {
                        self.bgimg_url = shop_bg_img;
                    } else {
                        self.bgimg_url = bgimg;
                    }
                    if (shop_logo_img) {
                        self.log_url = shop_logo_img;
                    } else {
                        self.log_url = logimg;
                    }
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        onEnter(event) {
            if (event.key === 'Enter') {
                // 处理回车事件的逻辑
                this.SubmitFunc();
            }
        },
        /*登录方法*/
        SubmitFunc(ev) {
            var _this = this;
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.logining = true;
                    var Params = {
                        username: this.ruleForm.account,
                        password: this.ruleForm.checkPass
                    };
                    /*调用登录接口*/
                    UserApi.login(Params, true)
                        .then(async (data) => {
                            await afterLogin(data);
                            _this.logining = false;
                            _this.$router.push({
                                path: '/home'
                            })
                            // useLockscreen.setLock(false);
                        })
                        .catch(error => {
                            //接口调用方法统一处理
                            _this.logining = false;
                        });
                }
            });
        },
        setLanguage(e) {
            if (e == this.languageTag) return;
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
                    ElMessage({
                        type: 'info',
                        message: $t('已取消'),
                    });
                });

        },
    }
};
</script>

<style lang="scss" scoped>
.login-bg {
    width: 100%;
    min-height: 100%;
    background: no-repeat;
    background-color: #FFF6DE;
    background-position: right bottom;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
}

.login-main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    -webkit-border-radius: 16px;
    border-radius: 16px;
    -moz-border-radius: 16px;
    background-clip: padding-box;
    width: 480px;
    margin: auto;
    background-color: #FFFFFF;

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }

    .remember {
        margin: 0px 0px 35px 0px;
    }
}

.log_img {
    img {
        width: 514px;
        height: 408px;
    }
}

.login-box {
    padding: 56px 40px;
    box-sizing: border-box;
    border-radius: 16px;
}

.left-img-input {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 14px;

    .l-img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        flex-shrink: 0;
    }

    .l-input {
        flex: 1;
        border: none;
        background: none;
        font-size: 14px;
        color: #666666;

        .el-input__wrapper {
            box-shadow: none;
        }
    }

    .el-input__inner {
        border: none;
        padding: 0;
    }
}

.language-box {
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-dropdown-link {
        color: var(--el-color-black);
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }

    .data-box-icon {
        width: 16px;
        height: 16px;
        color: var(--el-color-black);
    }
}
:deep(.language-div){
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
        width: 18px;
    }
}
</style>
