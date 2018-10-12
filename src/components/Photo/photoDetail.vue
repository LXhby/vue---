<template>
    <div>
      <nav-bar title="图片详情"></nav-bar>
      <ul class="clearfix">
        <vue-preview :slides="imgs"></vue-preview>
        <!--<li v-for="(img,index) in imgs" :key="index">-->
          <!--<img :src="img.src" alt="">-->
        <!--</li>-->
      </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      imgs: []
    }
  },
  created () {
    let id = this.$route.query.id;
    let title = this.$route.query.title
    this.$ajax.get(this.dataURL('vue.php',title,id))
      .then(res=>{
        this.imgs = res.data;
        this.imgs.forEach(img=>{
          img.msrc = img.picUrl;
          img.src = img.picUrl;
          img.w = 600;
          img.h = 400;
        })
      })
      .catch(err=>console.log("失败"))
  }
}
</script>

<style scoped>
.photo-title p{
  font-size: 24px;
  font-weight: bold;
  color: #00aaff;
}
  .photo-title span{
    margin: 0 5px;
  }
  ul{
    padding: 10px;
  }
>>> ul figure{
  display: inline-block;
  margin: 10px 5px;
}
  >>> ul img{
    width: 100%;
  }
</style>
