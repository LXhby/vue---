<template>
    <div>
      <nav-bar title="图文列表"></nav-bar>
      <div class="photo-header">
        <ul class="clearfix">
          <li v-for="(item) in categorys" :key="item.id">
            <a href="javascript:;" @click="loadRouter(item.id)">{{item.title}}</a>
          </li>
        </ul>
      </div>
      <div class="photo-list">
        <ul>
          <li v-for="img in imgs" :key="img.id">
            <router-link :to="{name:'photo.detail',query:{id:img.id,title:img.tip}}" >
              <img :src="img.picUrl" alt="">
              <p>
                <span>{{img.title}}</span>
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data (){
    return {
      imgs:[],
      categorys:[],
      name:''
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 路由复用，但是参数改变触发
    let categoryId = to.params.categoryId*1;
    this.loadById(categoryId)
    next()
  },
  created () {
    let categoryId = this.$route.params.categoryId*1;
    this.loadById(categoryId);
    this.$ajax.get(this.dataURL('vue.php','shareNav'))
      .then((res)=>{
        this.categorys = res.data;
        // this.categorys.unshift({
        //   id:0,title:'全部'
        // })
      })
      .catch(err=>{
        console.log("失败")
      })
  },
  methods: {
    loadRouter (categoryId) {
      this.$router.push({
        name: 'photo.list',
        params: {
          categoryId
        }
      })
    },
    loadById (categoryId) {
      switch (categoryId) {
        case 1:
          this.name = 'womanStar';
          break;
        case 2:
          this.name = 'manStar';
          break;
        case 3:
          this.name = 'fullView';
          break;
      }
      this.$ajax.get(this.dataURL('vue.php', this.name))
        .then((res) => {
          this.imgs = res.data;
          for (var i=0;i<this.imgs.length;i++){
            this.imgs[i].id = i+1;
          };
          if (this.imgs.length ==0){
            this.$toast({
              message:"没有图片",
              iconClass:'iconfont icon-meiyoudingdan-01'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
  .photo-header li{
    float: left;
    padding: 0 10px;
    color: red;
  }
  .photo-list li{
    padding: 10px;
    overflow: hidden;
  }
.photo-list li img{
  float: left;
  width:25%;
  vertical-align: middle;
}
  .photo-list li p{
    float: right;
    width: 70%;
    vertical-align: middle;
  }
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
</style>
