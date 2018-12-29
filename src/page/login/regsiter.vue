<template>
  <div>
    <regsiterHeader :type="headerMsg"></regsiterHeader>
    <div class="regsiter_wrap">
      <ul class="regsiter_input">
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouji"></use>
          </svg>
          <input type="text" id="account_number" v-model="accountNumber" maxlength="11" value="" placeholder="请输入您的手机号"   autocomplete="off" />
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yanzhengma"></use>
          </svg>
          <input type="text" id="img_code" v-model="imgCode" maxlength="4"  placeholder="请输入图片验证码" value="">
          <span class="imgCode_box"><img class="img_code"></span>
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yanzhengma"></use>
          </svg>
          <input type="text"  id="message_code" v-model="messageCode" name=""  maxlength="6" placeholder="请输入收到的验证码" autocomplete="off" />
          <button class="get_code"  @click="getCode"  v-text="timeContent"></button>
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mima"></use>
          </svg>
          <input type="password" id="password" maxlength="20" v-model="passWord" placeholder="请输入密码(密码长度6-20位，不含空格)" autocomplete="off"/>
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mima"></use>
          </svg>
          <input type="password" id="passwordAgain" maxlength="20" v-model="passwordAgain" placeholder="请再次输入密码" autocomplete="off"/>
        </li>
      </ul>
      <button class="regsiter_btn" :class="{'login_actived': isFillIn}" >注册</button>
    </div>
  </div>
</template>

<script>
  import regsiterHeader from "../../components/header.vue" ;
  export default {
    name:'regsiter',
    components:{
      regsiterHeader
    },
    data() {
      return {
        headerMsg:{
          type:'1',
          title:'注册',
        },
        accountNumber:"", //手机号码  账号密码方式
        passWord:"",      //密码
        passwordAgain:"", //确认密码
        messageNumber:"", //手机号码  短信验证方式
        imgCode:"",       //图片验证
        messageCode:"",   //短信验证
        phoneNumberReg:/^1(3|4|5|7|8)\d{9}$/, //判断手机号的正则表达式,
        isFillIn:false,
        isNumberTrue:false,
        timeContent:'获取验证码',
        count:60,
        isCanClick:true,
      }
    },
    watch:{
      accountNumber(val){
        this.accountNumber = val.replace(/^0|\D/g,"")
        if(this.accountNumber.length == 11){
          if(!this.phoneNumberReg.test(this.accountNumber)){
            this.isNumberTrue = false;
            this.$toast({
              message : '请输入正确的账号!!!',
              position: "center",
              duration: 2000,
            })
          }else{
            this.isNumberTrue = true;
          }
        }
        this.regsiterJudge(this.accountNumber,this.imgCode,this.messageCode,this.passWord,this.passwordAgain)
      },
      imgCode(val){
        this.imgCode = val.replace(/^0|\D/g,"")
        this.regsiterJudge(this.accountNumber,this.imgCode,this.messageCode,this.passWord,this.passwordAgain)
      },
      messageCode(val){
        this.messageCode = val.replace(/^0|\D/g,"")
        this.regsiterJudge(this.accountNumber,this.imgCode,this.messageCode,this.passWord,this.passwordAgain)
      },
      passWord(val){
        this.regsiterJudge(this.accountNumber,this.imgCode,this.messageCode,this.passWord,this.passwordAgain)
      },
      passwordAgain(val){
        this.regsiterJudge(this.accountNumber,this.imgCode,this.messageCode,this.passWord,this.passwordAgain)
      }
    },
    methods:{
      regsiterJudge(account,imgCode,code,passWord,passwordAgain){
        if(account != "" || imgCode != "" || code != "" || passWord != "" || passwordAgain != ""){
          if(account.length == 11 && imgCode.length == 4 && code.length == 6 && passWord.length >= 6 && passwordAgain.length >= 6){
            this.isFillIn = true
          }else{
            this.isFillIn = false
          }
        }else{
          this.isFillIn = false
        }
      },
      getCode(){
        if(!this.isCanClick) return ;
        if(this.isNumberTrue){
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
        }else{
          this.$toast({
            message : '请输入正确的手机号码!!!',
            position: "center",
            duration: 2000,
          })
        }
      }
    }
   }
</script>

<style lang="scss">
  @import 'src/style/mixin';
  .regsiter_wrap{
    padding-top:96px;
    .regsiter_input{
      li{
        position: relative;
        .icon{
          @include center;
          @include widthHeight(40px,40px);
          left:5%;
        }
        input{
          @include widthHeight(100%,86px);
          font-size: 30px;
          text-indent: 60px;
          padding-left: 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        .imgCode_box{
          @include center;
          @include widthHeight(210px,60px);
          left:82%;
          background-color: #000;
        }
        button{
          @include center;
          @include widthHeight(205px,60px);
          @include sizeColor(26px,#fff);
          left:82%;
          border-radius: 10px;
          text-align: center;
          line-height: 60px;
          background-color:#35af64;
        }
      }
    }
    .regsiter_btn{
      display: block;
      @include widthHeight(88%,80px);
      @include sizeColor(26px,#fff);
      margin: 120px auto;
      background-color: #666;
      text-align: center;
      line-height: 80px;
      border-radius: 10px;
    }
    .login_actived{
      background-color:#35af64;
    }
  }
</style>
