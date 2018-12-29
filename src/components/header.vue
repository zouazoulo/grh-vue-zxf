<template>
  <div class="header_wrap">
    <div class="header_left" v-show="type.type == 1"  @click="goBack">
      <div class="header_back">
      </div>
    </div>
    <div class="header_middle">
      <h1 class="header_title" v-text="type.title"></h1>
    </div>
    <div class="header_right">

    </div>
  </div>
</template>

<script>
  export default {
    name:'comHeader',
    props:['type'],
    data() {
       return {

       }
    },
    methods:{
      goBack:function(){
          this.$router.go(-1)
          console.log(0)
      },
    }
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';
  .header_wrap{
    @include fixedTop;
    @include widthHeight(100%,96px);
    border-bottom: 1px solid #d8d8d8;
    z-index: 3;
    .header_left{
      @include absCover;
      @include widthHeight(150px,96px);
      z-index: 5;
      .header_back{
        display: inline-block;
        @include widthHeight(30px,30px);
        margin-left: 20px;
        transform-origin: 100%;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        border-top: 6px solid #333;
        border-left: 6px solid #333;
      }
    }
    .header_middle{
      @include absCover;
      @include widthHeight(100%,96px);
      color:#333;
      margin: 0 auto;
      text-align: center;
       z-index: 4;
      h1{
        font-size: 32px;
      }
    }
  }
</style>
