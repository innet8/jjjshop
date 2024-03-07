<template>
    <el-tooltip
        :content="tipText"
        :placement="placement"
        :effect="tooltipTheme"
        :delay="delay"
        :disabled="!showTooltip || showTooltips"
        :max-width="tooltipMaxWidth"
        transfer>
        <span >
            <span ref="content" @mouseenter="handleTooltipIn" class="common-auto-tip" @click="onClick">
                <template v-if="existSlot && getTexts(1)">
                    <div style="visibility: hidden;position: absolute;"><slot/></div>
                    <div class="omitText" >
                        <span class="text-front">{{getTexts(2)}}</span>
                        <span class="text-after">{{getTexts(3)}}</span>
                    </div>
                </template>
                <template v-else-if="existSlot"><slot/></template>
                <template v-else>{{content}}</template>
            </span>
        </span>
    </el-tooltip>
</template>

<script>
    export default {
        name: 'AutoTip',
        props: {
            content: {
                type: [String, Number],
                default: ''
            },
            placement: {
                default: 'top'
            },
            tooltipTheme: {
                default: 'dark'
            },
            tooltipMaxWidth: {
                type: [String, Number],
                default: 350
            },
            delay: {
                type: Number,
                default: 100
            },
            showTooltips:false,
            forcedShow:true,
        },

        data() {
            return {
                showTooltip: false,  // 鼠标滑过overflow文本时，再检查是否需要显示
                tooltipContent: '',
            }
        },

        computed: {
            tipText() {
                const {content, tooltipContent} = this;
                return content || tooltipContent || "";
            },
            existSlot() {
                return !(typeof this.$slots.default === 'undefined' || this.$slots.default.length < 1);
            },
        },

        methods: {
            getTexts(type=1) {
                let text = this.$slots.default[0].text;
                let finallyText = '';
                let texts = '';
                if(text){
                    let finallyNum = 3;
                    if(text.length < 6){
                        finallyNum = 2;
                    }
                    if(text.length > 12){
                        finallyNum = 6;
                    }
                    texts = text.substring(0,text.length - finallyNum);
                    finallyText = text.substring( text.length - finallyNum);
                }
                if(type == 1){
                    return text;
                }
                if(type == 2){
                    return texts;
                }
                if(type == 3){
                    return finallyText;
                }
            },
            handleTooltipIn () {
                const $content = this.$refs.content;
                let range = document.createRange();
                range.setStart($content, 0);
                range.setEnd($content, $content.childNodes.length);
                const rangeWidth = range.getBoundingClientRect().width;
                this.showTooltip = this.forcedShow || Math.floor(rangeWidth) > Math.floor($content.offsetWidth);
                if (this.showTooltip && this.existSlot) {
                    const tmpArray = this.$slots.default.map((e) => {
                        if (e.text) return e.text
                        if (e.elm.innerText) return e.elm.innerText
                        return ""
                    })
                    this.tooltipContent = tmpArray.join("");
                }
                range = null;
            },
            onClick(e) {
                this.$emit("on-click", e)
            }
        }
    }
</script>

<style lang="scss" scoped>

.el-tooltip__trigger{
    display: block;
}
.common-auto-tip{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
.omitText{
    width: 100%;display: flex;
  line-height: 1.5;
    .text-front{
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    }
    .text-after{
        white-space: nowrap;text-overflow: initial;
        // direction: rtl;

    }
}
</style>
<style>
.el-tooltip__popper.is-dark{
    max-width: 450px;
}
</style>
