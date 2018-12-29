<template>
   <div class="home">
      <h1>主页</h1>
      <home-footer></home-footer>
   </div>
</template>

<script>
  import homeFooter from "../../components/footer.vue" ;
  export default {
    name:'home',
    data() {
      return {

      }
    },
    components:{
      homeFooter,
    },
    methods:{

    },
  }
</script>

<style scoped>
</style>
