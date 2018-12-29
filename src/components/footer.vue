<template>
   <div class="footer-wrap clear">
      <router-link :to="'home'" tag='div' class="fItem fl">首页
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuye"></use>
        </svg>
      </router-link>
      <router-link :to="'more'" tag='div' class="fItem fl">更多商品
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </router-link>
      <router-link :to="'shopCart'" tag='div' class="fItem fl">购物车
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-daohanggouwuche"></use>
        </svg>
      </router-link>
      <router-link :to="'my'" tag='div' class="fItem fl">我
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wo"></use>
        </svg>
      </router-link>
   </div>
</template>

<script>
  export default {
    name:'comFooter',
    data() {
          return {

          }
    },
  }
</script>
<style lang="scss">
  @import 'src/style/mixin';
  .footer-wrap{
    @include widthHeight(100%,110px);
    @include fixedBottom ;
    @include sizeColor(24px,#888);
    z-index: 999;
    border-top: 1px solid #bababa;
    .fItem{
      position: relative;
      width: 180px;
      text-align: center;
      padding-top: 66px;
    }
    .icon {
      @include center;
      @include widthHeight(60px,60px);
      top:38%;
      fill: currentColor;
      overflow: hidden;
    }
    .fItem:nth-child(3){
      position: relative;
      &:after{
        position: absolute;
        // content: attr(data-content);
        content: '1';
        min-width: 20px;
        min-height: 20px;
        border-radius: 10px;
        top: 4px;
        left: 56px;
        @include sizeColor(18px,#fff);
        padding: 5px;
        line-height: 20px;
        background-color: #EB4040;
      }
    }
  }
  .home{
    .fItem:nth-child(1){
      color:$green;
    }
  }
  .more{
    .fItem:nth-child(2){
      color:$green;
    }
  }
  .shopCart{
    .fItem:nth-child(3){
      color:$green;
    }
  }
  .my{
    .fItem:nth-child(4){
      color:$green;
    }
  }
</style>

