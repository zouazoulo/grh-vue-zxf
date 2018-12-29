<template>
  <div>
    <userHeader :type="headerMsg"></userHeader>
    <ul class="change_content">
      <li>当前手机号：18315318515</li>
      <li><input type="text" class="get_code" maxlength="6" placeholder="请输入手机验证码" disabled="disabled" autocomplete="off"><button  @click="getCode"  v-text="timeContent"></button></li>
      <li><input type="text" maxlength="11" v-model="phoneNumber" placeholder="请输入您的手机号码"  autocomplete="off"></li>
    </ul>
    <button class="get_message">提交</button>
  </div>
</template>

<script>
import userHeader from "../../../components/header.vue" ;
  export default {
    name:"messageChange",
    components:{
      userHeader
    },
    data() {
      return {
        headerMsg:{
          type:'1',
          title:'更换手机号码',
        },
        phoneNumber:'',
        phoneNumberReg:/^1(3|4|5|7|8)\d{9}$/, //判断手机号的正则表达式
        timeContent:'获取手机验证码',
        count:60,
        isCanClick:true,
      }
    },
    watch:{
      phoneNumber(val){
        this.phoneNumber = val.replace(/^0|\D/g,"");
        if(this.phoneNumber.length == 11){
          if(!this.phoneNumberReg.test(this.phoneNumber)){
            this.$toast({
              message : '请输入正确的账号!!!',
              position: "center",
              duration: 2000,
            })
          }
        }
      }
    },
    methods:{
      getCode(){
        if(!this.isCanClick) return ;
        this.isCanClick = false
        this.timeContent = this.count + 's后重新发送';
        let timer = setInterval(() => {
          this.count--
          this.timeContent = this.count + 's后重新发送'
          if(this.count < 0){
            clearInterval(timer);
            this.timeContent = '重新获取验证码';
            this.count = 60;
            this.isCanClick = true;
          }
        },1000)
      }
    }
  }
</script>

<style lang="scss">
  @import 'src/style/mixin';
  .change_content{
    padding-top:98px;
    background-color: #fff;
    li{
      position: relative;
      @include widthHeight(100%,100px);
      line-height:60px;
      padding:20px;
      font-size:30px;
      input{
        @include widthHeight(100%,60px);
        line-height: 60px;
        font-size: 28px;
        text-indent: 10px;
        background-color: #f0f0f0;
        border: 1px solid #b7b7b7;
      }
      button{
        @include center;
        @include widthHeight(200px,60px);
        @include sizeColor(24px,#fff);
        left:80%;
        background-color: #35af64;
        border-radius: 10px;
      }
      .get_code{
        width:450px;
      }
    }
    li:nth-child(1){
      text-indent: 30px;
    }
  }
  .get_message{
    display: block;
    @include widthHeight(88%,80px);
    @include sizeColor(26px,#fff);
    margin: 200px auto;
    background-color:#35af64;
    text-align: center;
    line-height: 80px;
    border-radius: 10px;
  }
</style>
