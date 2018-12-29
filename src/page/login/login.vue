<template>
  <div class="login">
    <login-header :type="headerMsg"></login-header>
    <div class="login_wrap">
        <ul class="login_option">
          <li @click="loginWay = 0" :class="{'actived':loginWay === 0 }">账号密码登录</li>
          <li @click="loginWay = 1" :class="{'actived':loginWay === 1 }">动态短信登录</li>
        </ul>
        <div class="login_input">
          <ul class="account" v-show="loginWay === 0">
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouji"></use>
              </svg>
              <input type="text" id="account_number" v-model="accountNumber" maxlength="11" value="" placeholder="请输入您的手机号"   autocomplete="off" />
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima"></use>
              </svg>
              <input type="password" id="password" maxlength="20" v-model="passWord" placeholder="请输入密码" autocomplete="off"/>
            </li>
          </ul>
          <ul class="message" v-show="loginWay === 1" >
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouji"></use>
              </svg>
              <input type="text" id="message_number" v-model="messageNumber" maxlength="11" value="" placeholder="请输入您的手机号码" autocomplete="off" />
            </li>
						<li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma"></use>
              </svg>
							<input type="text" id="img_code" v-model="imgCode" maxlength="4"  placeholder="请输入图片验证码" value="">
							<span class="imgCode_box" @click="getPictures"><img class="img_code"></span>
						</li>
						<li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma"></use>
              </svg>
							<input type="text"  id="message_code" v-model="messageCode" name=""  maxlength="6" placeholder="请输入收到的验证码" autocomplete="off" />
							<button class="get_code"  @click="getCode"  v-text="timeContent"></button>

						</li>
          </ul>
        </div>
    </div>
    <div class="regsiter">
      没有账号,先 <span @click="toRegsiter">注册</span>
    </div>
    <button class="login_on" :class="{'login_actived': isFillIn}">登录</button>
  </div>
</template>

<script>
  import loginHeader from "../../components/header.vue" ;
  export default {
    name:'login',
    components:{
      loginHeader
    },
    data() {
      return {
        headerMsg:{
          type:'1',
          title:'登录',
        },
        loginWay:0,
        accountNumber:"", //手机号码  账号密码方式
        passWord:"",      //密码
        messageNumber:"", //手机号码  短信验证方式
        imgCode:"",       //图片验证
        messageCode:"",   //短信验证
        phoneNumberReg:/^1(3|4|5|7|8)\d{9}$/, //判断手机号的正则表达式
        isFillIn:false,   //登录按钮高亮显示
        timeContent:'获取验证码',
        count:60,
        isCanClick:true,


      }
    },
    watch:{
      loginWay(val){
        if(val == 0){
          this.acccountJudge(this.accountNumber,this.passWord)
        }else{
          this.messageJudge(this.messageNumber,this.imgCode,this.messageCode)
        }
      },
      accountNumber(val){
        this.accountNumber = val.replace(/^0|\D/g,"")
        if(this.accountNumber.length == 11){
          if(!this.phoneNumberReg.test(this.accountNumber)){
            this.$toast({
              message : '请输入正确的账号!!!',
              position: "center",
              duration: 2000,
            })
          }
        }
        this.acccountJudge(this.accountNumber,this.passWord)
      },
      passWord(val){
        if(this.accountNumber.length != 11){
          this.passWord = val.replace(/[\d\D\w\W]/,"")
          this.$toast({
            message : '请先输入账号!!!',
            position: "center",
            duration: 2000,
          })
        }else{
          this.passWord = val
        }
        this.acccountJudge(this.accountNumber,this.passWord)
      },
      messageNumber(val){
        this.messageNumber = val.replace(/^0|\D/g,"")
        if(this.messageNumber.length == 11){
          if(!this.phoneNumberReg.test(this.messageNumber)){
              this.$toast({
                message : '请输入正确的账号!!!',
                position: "center",
                duration: 2000,
              })
            }
        }
        this.messageJudge(this.messageNumber,this.imgCode,this.messageCode)

      },
      imgCode(val){
        this.imgCode = val.replace(/^0|\D/g,"")
        this.messageJudge(this.messageNumber,this.imgCode,this.messageCode)
      },
      messageCode(val){
        this.messageCode = val.replace(/\D/g,"")
        this.messageJudge(this.messageNumber,this.imgCode,this.messageCode)
      }
    },
    methods:{
      acccountJudge(account,passWord){
        if(account != "" ||  passWord !=""){
          if(account.length == 11 && passWord.length >= 6){
            this.isFillIn = true
          }else{
            this.isFillIn = false
          }
        }else{
          this.isFillIn = false
        }
      },
      messageJudge(account,imgCode,code){
          if(account != "" || imgCode != "" || code != ""){
            if(account.length == 11 && imgCode.length == 4 && code.length == 6 ){
              this.isFillIn = true
            }else{
              this.isFillIn = false
            }
          }else{
            this.isFillIn = false
          }
      },
      verification(){
        let params = {
          method: 'verification',
        }
        this.$ajax.get(this.HOST, {
          params: params
        }).then(resp => {
            if(resp.statusCode == "100000"){
              console.log(1)
            }
        })
      },
      getPictures(){
        this.verification()
      },
      toRegsiter(){
        this.$router.push({path:'regsiter'})
      },
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
  .login_wrap{
    padding-top:110px;
    .login_option{
      @include fj;
      text-align: center;
      height: 86px;
      line-height:86px;
      li{
        @include sizeColor(30px,#b2b2b2);
        flex-grow:1;
        background-color: #e7e7e7;
      }
      .actived{
        background-color: #fff;
        color: #333;
      }
    }
    .login_input{
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
  }
  .regsiter{
    @include widthHeight(100%,120px);
    @include sizeColor(26px,#b2b2b2);
    line-height: 120px;
    text-align: center;
    span{
      color: #0398ff;
    }
  }
  .login_on{
    display: block;
    @include widthHeight(88%,80px);
    @include sizeColor(26px,#fff);
    margin: 0 auto;
    background-color: #666;
    text-align: center;
    line-height: 80px;
    border-radius: 10px;
  }
  .login_actived{
    background-color:#35af64;
  }
</style>
