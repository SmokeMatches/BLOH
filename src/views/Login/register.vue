<template>
  <div class='register'>
    <el-form ref="reg-form" :model="form" :rules="rule" label-width="80px">
    <div class="reg"></div>
    <el-form-item label="用戶名:" prop='userName'>
      <el-input v-model="form.userName" autocomplete="on" name="user"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="pwd">
      <el-input v-model="form.pwd" :show-password='true' name="pwd"></el-input>
    </el-form-item>
    <el-form-item label="验证码:" prop="yzm">
      <el-input class="YZMInput" v-model="form.yzm"></el-input>
      <div class="imgdiv" @click="changeImg()">
        <span v-for="(value,item) in form.checkYZM" :key="item">{{value}}</span>
        </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="CheckReg" :loading="form.LoginLoading">
        注册
      </el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {req1_reg,req1_yzm} from 'api/index.js'

export default {
  data () {
    return {
        form:{
            userName:'',
            pwd:'',
            yzm:'',
            checkYZM:{},
            LoginLoading:false,
        },
        rule:{
         userName: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          yzm:[
            {required:true,message:'请输入验证码',trigger:'blur'}
          ]
      }
    }
  },
  mounted(){
      req1_yzm().then(res=>{
          this.form.checkYZM = res.data
        })
  },
  methods:{
      changeImg(){
          req1_yzm().then(res=>{
          this.form.checkYZM = res.data
        })
      },
      CheckReg(){
      this.$refs['reg-form'].validate((valid) => {//手动触发表单验证
        if (!valid) {
          return
        }
        this.register()
      })
    },
      register(){
          req1_reg({
              userName:this.form.userName,
              passWord:this.form.pwd,
              yzm:this.form.yzm
          }).then(res=>{
              if(res.data.IsCode){
                this.$router.push({
                  name:'home',
                  query:{
                    userName:this.form.userName,
                    passWord:this.form.pwd
                  }
                })
              }else{
                alert(res.data.message)
              }
          })
      }
  }
}
</script>

<style  scoped  lang='less'>
    .register{
      display: flex;
      height: 100vh;
      justify-content: center;
      align-items: center;
      background: url('~assets/img/bg@2x.png') no-repeat;
      background-size: cover;
      .el-form{
        margin-top: .3rem;
        background-color: #fff;
        width: 4.8rem;
        padding: .2rem;
        .el-form-item{
          .el-form-item__label{
           text-align: left;
          }
          .el-button--primary{
            width: 100%;
          }
          img{
            height: .4rem;
            vertical-align: middle;
            margin-left: .2rem;
          }
          .imgdiv{
            float: right;
            margin-right: .2rem;
            display: flex;
            justify-content: space-around;
            vertical-align: middle;
            width: 1rem;
            height: .4rem;
            background: url('~assets/img/yzm.png') no-repeat;
          }
          .YZMInput{
              width: 2.5rem;
          }
        }
      .reg{
            width: 100%;
            height: .5rem;
            background: url('~assets/img/loginLogo.png') no-repeat;
            background-size: cover;
            margin-bottom: .1rem;
          }
      }
    }
</style>
