<template>
    <el-container class="home">
        <el-aside width="200px">
          <!-- <el-button type="primary" @click="sendYzm">发送</el-button> -->
          <Asside/>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
import { req1_1} from 'api/index.js'
import Asside from '@/views/Home/compon/Asside'
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  mounted(){
    
  },
  components:{Asside},
  methods:{
    sendYzm(){
      const appcode = 'a92a395de02045bcbc67fbf388281ff6'
      axios({
        method:"POST",
          url:'http://aliapi.market.alicloudapi.com/smsApi/verifyCode/send',
          headers: { 'Authorization': 'APPCODE ' + appcode},
          query:{
            phone:'17720596583',
            templateId:'540',
            variables:'1234'
      }
    }).then(res=>{
      console.log(res);
    })
    }
  }
}
</script>

<style  scoped  lang='less'>
  .home{
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  }
</style>
