<template>
  <div class="shopCart">
   <h1>购物车</h1>
    <home-footer></home-footer>
  </div>
</template>

<script>
  import homeFooter from "../../components/footer.vue" ;
  export default {
    name:'shopCart',
    data() {
      return {

       }
    },
    components:{
      homeFooter,
    },
  }
</script>

<style scoped>
</style>
