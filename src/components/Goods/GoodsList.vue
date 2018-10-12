<template>
    <div>
      <nav-bar title="商品展示"></nav-bar>
      <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" ref="loadMore">
        <ul class="goodlist clearfix">
          <li v-for="(item,index) in goodList" :key="item.id">
            <router-link :to="{name:'goods.detail',query:{id:index+1,title:'likeYou'}}" >
              <img :src="item.imgUrl" alt="">
              <div class="title" v-text="item.des"></div>
              <div class="desc">
                <div class="sell clearfix">
                  <span class="fl">￥{{item.price}}</span>
                  <span class="fr">{{item.alreadyPaid}}</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
    </div>
</template>

<script>
export default {
  name: "GoodsList",
  data () {
    return {
      goodList:[]
    }
  },
  created () {
    this.loadByPage()
  },
  methods: {
    loadByPage () {
      this.$ajax.get(this.dataURL('vue.php','likeYou'))
        .then(res=>{
          this.goodList = res.data;
        })
    },
    loadBottom () {
      this.loadByPage(this.page)
      this.$refs.loadMore.onBottomLoaded()
    }
  }
}
</script>

<style scoped>
.goodlist li{
  display: flex;
  box-sizing: border-box;
  float: left;
  width: 50%;
  height: 240px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
}
.goodlist li img{
  width: 80%;
  margin-left: 10%;
}
.goodlist li .title{
  display: -webkit-box !important;
  width: 100%;
  height: 44px;
  margin: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2
}
</style>
