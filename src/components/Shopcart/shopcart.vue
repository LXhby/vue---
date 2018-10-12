<template>
    <div>
      <ul class="cartlist">
        <li v-for="(item,index) in msg" :key="item.id">
          <div class="detail-top">
            <img :src="item.imgUrl" alt="" >
            <p>{{item.des}}</p>
          </div>
          <div class="perform clearfix">
            <p class="sell-price fl">￥{{item.price}}</p>
            <div class="click-box fl">
              <p class="mimus" @click="mimus(index)">-</p>
              <p class="num">{{item.num}}</p>
              <p class="add" @click="add(index)">+</p>
            </div>
            <p class="remove fr" @click="del(index)">删除</p>
          </div>
        </li>
      </ul>
      <div class="show-price clearfix">
        <div class="show-1 fl">
          <p>总计</p>
          <span>已选择商品{{totalPrice.num}}件，总价{{totalPrice.sum}}</span>
        </div>
        <div class="show-2 fr">
          <mt-button type='danger' size='large'>去结算</mt-button>
        </div>
      </div>
    </div>
</template>

<script>
  import GoodsTool from "../../GoodsTools"
  import Connect from '@/components/connect'
export default {
  name: 'shopcart',
  data(){
    return{
      msg:[]
    }
  },
  created(){
    let shop = GoodsTool.getItem()
    let idArr = Object.keys(shop)
    idArr.forEach((item,index)=>{
      this.$ajax.get(this.dataURL('vue.php','likeYou',item))
        .then((res)=>{
          console.log(res.data)
          this.msg.push(res.data);
          this.msg.forEach((item,index)=>{
            if (shop[item.id]){
              this.$set(item,'num',shop[item.id])
            }
          })
        })
    })
  },
  computed:{
    totalPrice(){
      let sum =0;
      let num =0;
      this.msg.forEach((item)=>{
        sum += item.price*item.num;
        num += item.num
      })
      return{
        sum:sum,
        num:num
      }
    }
  },
  methods:{
    add(i){
      this.msg[i].num++;
      Connect.$emit("shownum",1)
      GoodsTool.addItem({
        id:this.msg[i].id,
        num:1
      })
    },
    mimus(i){
      this.msg[i].num--;
      if (this.msg[i].num<=0){
        this.msg[i].num=0;
      }
      Connect.$emit("shownum",-1)
      GoodsTool.addItem({
        id:this.msg[i].id,
        num:-1
      })
    },
    del(i){
      let shop = this.msg[i];
      GoodsTool.delete(shop.id)
      Connect.$emit('shownum',-shop.num)
      this.msg.splice(i,1)
    }
  }
}
</script>

<style scoped>
  .cartlist{
    padding: 10px;
    border-bottom: 2px solid #ccc;
  }
.cartlist img{
  display: inline-block;
  width: 90px;
  height: 90px;
  vertical-align: middle;
}
  .cartlist .detail-top{
    height: 90px;
    margin-bottom: 10px;
  }
  .cartlist .detail-top p{
    overflow: hidden;
    display: inline-block;
    width: 60%;
    height: 90px;
    font-size: 18px;
    vertical-align: middle;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .perform{
    position: relative;
    padding: 10px 0;
    border-top: 1px solid #ccc;
    font-size: 18px;
  }
  .click-box{
    position: absolute;
    width: 106px;
    top: 10px;
    left: 0;
    right: 0;
    margin:0 auto;
  }
  .click-box p{
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #ccc;
  }
  .show-price{
    padding: 10px 0;
  }
  .show-1{
    width: 170px;
  }
  .show-1 p{
    font-size: 18px;
    font-weight: bold;
  }
  .show-1 span{
    color: red;
  }
  .show-2{
    width: 110px;
    color: #fff;
  }
</style>
