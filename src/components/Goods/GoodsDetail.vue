<template>
  <div>
    <nav-bar title="商品详情"></nav-bar>
    <div class="detaillist">
      <img :src="msg.imgUrl" alt="">
      <p class="peo">{{msg.des}}</p>
      <div class="postage clearfix">
        <span class="fl">快递包邮</span>
        <span class="fr">{{msg.alreadyPaid}}</span>
      </div>
      <div class="buy-num clearfix">
        <h3 class="fl">购买数量</h3>
        <div class="addbox fr">
          <p class="minus" @click="mimus()">-</p>
          <p class="num">{{num}}</p>
          <p class="add" @click="add()">+</p>
        </div>
      </div>
      <div class="buy">
          <button class="addcart" @click="showball">加入购物车</button>
          <button class="buynow">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Connect from '@/components/connect'
  import GoodsTool from '../../GoodsTools'
export default {
  name: "GoodsDetail",
  data () {
    return {
      msg: [],
      num:1
    }
  },
  created () {
    let title = this.$route.query.title;
    let id = this.$route.query.id;
    this.$ajax.get(this.dataURL('vue.php',title,id))
      .then((res)=>{
        this.msg = res.data;
      })
  },
  methods: {
    add () {
      this.num++;
    },
    mimus () {
      this.num--;
      if (this.num<=1){
        this.num=1;
      }
    },
    showball(){
      Connect.$emit("shownum",this.num)
      GoodsTool.addItem({
        id:this.msg.id,
        num:this.num
      })
    }
  }
}
</script>

<style scoped>
.detaillist{
  padding: 10px;
}
.detaillist img{
  width: 80%;
  margin-left: 10%;
}
.detaillist p.peo{
  margin: 10px 0;
  font-size: 18px;
}
  .postage{
    border-bottom: 1px solid #ccc;
  }
  .buy-num{
    margin: 10px 0;
  }
  .buy-num h3{
    font-size: 22px;
  }
  .addbox p{
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #ccc;
    font-size: 16px;
  }
  .buy{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 55px;
    height: 48px;
    font-size: 0;
  }
  .buy button{
    width: 50%;
    height:  48px;
    border: 0;
    padding: 0;
    color: #fff;
    font-size: 18px;
  }
  .buy .addcart{
    background-color: #ff9402;
  }
  .buy .buynow{
    background-color: #ff5000;
  }
</style>
