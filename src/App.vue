<template>
  <div id="app">
    <mt-header title="项目实战"></mt-header>
    <router-view class="tmpl"/>
    <mt-tabbar v-model="selected" class="tabbar">
      <mt-tab-item id="home" >
        <img slot="icon" src="./assets/img/首页.png" @click="changehash">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="./assets/img/会员.png" @click="changehash">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="./assets/img/购物车空.png" @click="changehash">
        购物车<mt-badge type="error" size="small">{{num}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="./assets/img/查找.png" @click="changehash">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import GoodsTools from './GoodsTools'
  import Connect from '@/components/connect'
export default {
  name: 'App',
  data () {
    return {
      selected: '',
      num:0
    }
  },
  created(){
    this.num = GoodsTools.getTotalCount();
    Connect.$on("shownum",(msg) => {
      this.num += msg
    })
  },
  methods: {
    changehash(){
      this.$nextTick(function () {
        this.$router.push({
          name: this.selected
        })
      })
    }
  },
  watch: {
    // selected (newV, oleV) {
    //   this.$router.push({
    //     name: newV
    //   })
    // }
  }
}
</script>

<style scoped>
  .tabbar{
    position: fixed;
  }
</style>
