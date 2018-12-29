<template>
  <div class="my">
    <div class="login_warp">
      <div class="my_login_on" v-if="login">
        <header class='clear'>
            <svg class="icon fr" aria-hidden="true" @click="toUserInfo">
              <use xlink:href="#icon-bianji"></use>
            </svg>
        </header>
          <dl class="userInfo clear">
            <dt class="user_img fl" >
              <img src="../../images/game_icon.png" alt="">
              <!-- <img  class="user_faceImg" :src=" userInfo.faceImgUrl ? 'http://'+userInfo.faceImgUrl :'' " /> -->
              <!-- <input class="login_type1 " type="file" accept="image/*" name="" id="file" value=""  @change="uploadImg"/> -->
            </dt>
            <dd class="user_introduce fl">
                <div class="userInfo_top clear">
                  <p class="user_id fl">我哭了,你呢</p>
                  <span class="user_level fl"></span>
                </div>
                <div class="userInfo_bottom clear">
                  <dl class="fl">
                    <dt>账户余额</dt>
                    <dd>￥240.35</dd>
                  </dl>
                  <dl class="fl">
                    <dt>果币</dt>
                    <dd>92233枚</dd>
                  </dl>
                </div>
            </dd>
          </dl>
      </div>
      <div class="not_my_login_on" v-else>
          <dl >
            <dt></dt>
            <dd>
              <button @click="loginOn">登录</button>
            </dd>
          </dl>
      </div>
    </div>
    <div class="my_middle_function">
      <dl>
        <dd v-for="(item,index) in middleFunction" :key="index" class="clear">
          <svg class="icon fl" aria-hidden="true">
            <use :xlink:href="item.iconName"></use>
          </svg>
          <p v-if="index == 2" class="fl">优惠券(<span class="coupon_color">50</span>)</p>
          <p v-else class="fl" v-text="item.name" ></p>
        </dd>
      </dl>
    </div>
    <div class="my_more_function">
      <dl v-for="(item,index) in moreFunction" :key="index" >
        <dt>
          <svg class="icon fl" aria-hidden="true">
            <use :xlink:href="item.iconName"></use>
          </svg>
        </dt>
        <dd>
          <p v-text="item.name"></p>
          <svg class="fl icon_jump" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
        </dd>
      </dl>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
  import homeFooter from "../../components/footer.vue" ;
  export default {
    name:'my',
    data() {
      return {
        login:true,
        moreFunction:[],
        middleFunction:[]
      }
    },
    components:{
      homeFooter,
    },
    mounted(){
      this.moreFunction = moreFunction;
      this.middleFunction = middleFunction;
    },
    methods:{
      loginOn(){
        this.$router.push({path:'/login'})
      },
      toUserInfo(){
        this.$router.push({path:'/my/userInfo'})
      }
    }
  }
  let moreFunction = [
    {
      name:'收货地址',
      iconName:'#icon-shouhuodizhi'
    },
    {
      name:'果币商城',
      iconName:'#icon-mall-active'
    },
    {
      name:'在线充值',
      iconName:'#icon-zaixianchongzhi'
    },
    {
      name:'绑定原有账号',
      iconName:'#icon-twotone-alarm-px'
    },
    {
      name:'修改密码',
      iconName:'#icon-buchongiconsvg06'
    },
    {
      name:'帮助中心',
      iconName:'#icon-bangzhu'
    },
     {
      name:'设置',
      iconName:'#icon-shezhi'
    },
  ]
  let middleFunction =[
    {
      iconName:"#icon-dingdanguanli",
      name:'订单管理'
    },
    {
      iconName:"#icon-yugoushangpin",
      name:'我的预购'
    },
    {
      iconName:"#icon-youhuiquan",
      name:''
    }
  ]
</script>

<style lang="scss">
  @import 'src/style/mixin';
  .login_warp{
    // @include widthHeight(100%,320px);
    background:url(../../images/1.jpg) no-repeat top left 100%/100%;
  }
  .my_login_on{
    position: relative;
    @include widthHeight(100%,320px);
    header{
      @include center;
      @include widthHeight(100%,90px);
      top:14%;
      padding:20px;
      .icon{
        @include widthHeight(50px,40px);
        color:#fff;
      }
    }
    .userInfo{
      @include widthHeight(100%,260px);
      @include sizeColor(30px,#fff);
      padding:110px 20px 0;
      .user_img{
        padding:0 30px;
        img{
          @include widthHeight(153px,153px);
          border-radius: 50%;
        }
      }
      .user_introduce{
        .userInfo_bottom{
          padding-top:20px;
          dl:nth-child(2){
            padding-left: 100px;
          }
        }
      }
    }
  }
  .not_my_login_on{
    position: relative;
    @include widthHeight(100%,320px);
    dt{
      @include center;
      @include widthHeight(153px,153px);
      border-radius: 50%;
      top:40%;
      background:url("../../images/icon_touxiang.png") no-repeat 100%/100% ;
    }
    dd{
      @include center;
      top:80%;
      button{
        display: block;
        @include widthHeight(140px,50px);
        @include sizeColor(28px,#fff);
        background-color: #35af64;
      }
    }
  }
  .my_middle_function{
    dl{
      @include fj;
      text-align: center;
      background-color: #fff;
      .icon{
        position: relative;
        @include widthHeight(60px,60px);
        top:50%;
        left:14%;
        transform: translateY(-50%);
      }
      dd {
        height: 120px;
        line-height: 120px;
        flex-grow: 1;

        p{
          padding-left:50px;
        }
      }
      .coupon_color{
        color: #fa6b7d;
      }
    }
  }
  .my_more_function{
    width: 100%;
    padding: 0 20px;
    margin-top: 20px;
    background-color: #fff;
    dl{
      @include widthHeight(100%,87px);
      position: relative;
      line-height: 87px;
      font-size: 26px;
      // background-color: #fff;
      .icon{
        @include widthHeight(60px,60px);
      }
      .icon_jump{
        @include upDown;
        @include widthHeight(40px,40px);
        right: 0%;
      }
      dt{
        @include upDown;
        @include widthHeight(60px,60px);
      }
      dd{
        @include widthHeight(92%,87px);
        border-bottom:1px solid #f0f0f0;
        margin-left:60px;
        text-indent: 15px;
      }
    }

  }
</style>
