<template>
    <div>
        <div class="common-form">{{ $t('服务器存储空间') }}</div>
        <div class="memory-main">
            <p>总大小：<span>40.0GB</span></p>
            <p>可用大小：<span>20.0GB</span></p>
            <p>已用大小：<span>20.0GB</span></p>
            <p>已用百分比：<span>50%</span> </p>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.memory-main {
    display: flex;  
    gap:16px;
    p{
        font-size:14px;
        span{
            color:#FFBE00;
        }
    }
}
</style>