<template>
    <div>
      <nav-bar title="新闻详情"></nav-bar>
      <div class="news-title">
        <p>{{newsDetail.title}}</p>
        <div class="newstop">
          <span>来源：{{newsDetail.source}}</span>
          <span>记者：{{newsDetail.reporter}}</span>
          <span>添加时间：{{newsDetail.titme | convertTime('YYYY年MM月DD日')}}</span>
          <div class="img">
            <img :src="newsDetail.picUrl" alt="">
          </div>
        </div>
        <div class="news-content" v-html="newsDetail.content">新闻明细</div>
      </div>
    </div>
</template>

<script>
export default {
  name: "newsDetail",
  data () {
    return {
      newsDetail:[]
    }
  },
  created(){
    let id = this.$route.query.id;
    this.$ajax.get(this.dataURL('vue.php','newsList',id))
      .then((res)=>{
        this.newsDetail = res.data
      })
  }
}
</script>

<style scoped>
  .news-title{
    margin-bottom: 70px;
  }
  .newstop{
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .news-title p{
    font-size: 16px;
    font-weight: bold;
    color: #00aaff;
    text-align: center;
  }
.news-title span{
  margin: 0 5px;
}
  >>> .news-content img{
    width: 100%;
  }
</style>
