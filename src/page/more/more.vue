<template>
  <div class="more">
   <home-header :type='headerMsg'></home-header>
   <h1>更多商品</h1>
    <home-footer></home-footer>
  </div>
</template>

<script>
  import homeFooter from "../../components/footer.vue" ;
  import homeHeader from "../../components/header.vue" ;
  export default {
    name:'more',
    components:{
      homeFooter,
      homeHeader
    },
    data() {
      return {
          headerMsg:{
            type:'0',
            title:'更多商品'
          }
       }
    },

  }
</script>

<style scoped>
</style>
