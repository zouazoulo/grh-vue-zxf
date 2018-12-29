<template>
  <div>
    <user-header :type="headerMsg"></user-header>
    <div class="userInformation">
      <dl class="clear">
        <dd>
          <p class="fl">昵称</p>
          <input type="text" autocomplete="off" class="fl" value="我来了">
        </dd>
      </dl>
      <dl class="clear">
        <dd>
          <p class="fl">真实姓名</p>
          <input type="text" autocomplete="off" class="fl">
        </dd>
      </dl>
      <dl class="clear">
        <dd>
          <p class="fl">身份证号</p>
          <input type="text" autocomplete="off" class="fl" placeholder="第一次填写后不可修改" readonly="readonly">
        </dd>
      </dl>
      <dl  @click="btn">
        <dd class="clear ">
          <p class="fl">性别</p>
          <span class="fl" v-text="sex" ></span>
          <svg class=" icon_jump" aria-hidden="true">
              <use xlink:href="#icon-fanhui"></use>
          </svg>
        </dd>
        <transition name="fade"
        enter-active-class="animated slideOutDown"
        leave-active-class="animated slideOutUp"
        :duration="100">
            <ul class="sex" v-show="flag" >
              <li>男</li>
              <li>女</li>
            </ul>
        </transition>
      </dl>
      <dl class="clear" @click="changePhone">
        <dd class="clear">
          <p class="fl">手机号</p>
          <span class="fl">18315318515</span>
          <svg class="fl icon_jump" aria-hidden="true">
              <use xlink:href="#icon-fanhui"></use>
          </svg>
        </dd>
      </dl>
    </div>
    <button class="save_btn">保存</button>
  </div>
</template>

<script>
import userHeader from "../../../components/header.vue" ;
  export default {
    name:'userInfo',
    components:{
      userHeader
    },
    data() {
      return {
        headerMsg:{
          type:'1',
          title:'修改信息',
        },
        flag:false,
        num:'0',
        sex:'男'
      }
    },
    methods:{
      btn(){
        this.flag = !this.flag;
        let target = event.target;
        if(target.nodeName.toLowerCase() == 'li'){
          this.sex = target.innerHTML
        }
      },
      changePhone(){
        this.$router.push({path:'userInfo/messageChange'})
      }
    }
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';
  .userInformation{
    width: 100%;
    padding:96px 20px 0;
    background-color: #fff;
    dl{
      width:100%;
      background-color: #fff;
      font-size:30px;
      dd{
        position: relative;
        height: 87px;
        border-bottom:1px solid #f0f0f0;
        background-color: #fff;
      }
      p{
        @include widthHeight(50%,87px);
        line-height: 87px;
        text-indent: 20px;
      }
      input{
        @include widthHeight(50%,84px);
        text-align: right;
      }
      span{
        display: inline;
        @include widthHeight(50%,84px);
        padding-right:40px;
        text-align: right;
        line-height: 84px;
      }
      .icon_jump{
        @include upDown;
        @include widthHeight(40px,40px);
        right: 0%;
      }
      .sex{
        overflow: hidden;
        li{
          @include widthHeight(100%,87px);
          line-height: 87px;
          border-bottom:1px solid #f0f0f0;
        }
      }
    }
  }
  .save_btn{
    display: block;
    @include widthHeight(88%,80px);
    @include sizeColor(26px,#fff);
    margin: 100px auto;
    background-color:#35af64;
    text-align: center;
    line-height: 80px;
    border-radius: 10px;
  }
</style>
