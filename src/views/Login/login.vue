<template>
  <div class="login">
  <el-form ref="login-form" :model="form" :rules="rule" label-width="80px">
    <div class="logo"></div>
    <el-form-item label="用戶名:" prop='userName'>
      <el-input v-model="form.userName" autocomplete="on" name="user"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="pwd">
      <el-input v-model="form.pwd" :show-password='true' name="pwd"></el-input>
    </el-form-item>
    <el-form-item label="验证码:" prop="yzm">
      <el-input class="YZMInput" v-model="form.yzm"></el-input>
      <!-- <img :src="form.CheckImg" @click="changeImg" /> -->
      <div class="imgdiv" @click="changeImg()">
        <span v-for="(value,item) in form.checkYZM" :key="item">{{value}}</span>
        </div>
    </el-form-item>
    <el-form-item prop="agree">
      <el-checkbox v-model="form.agree">我已阅读并同意协议及条款</el-checkbox>
      <p class="reg">没有账号?<el-link type="info" :underline="false" @click="toregister">立即注册</el-link></p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="CheckLogin" :loading="LoginLoading">
        登录
      </el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {req1_yzm,req1_log} from 'api/index.js'
import {regLog} from 'assets/js/index.js'
export default {
  data () {
    return {
      form:{
        userName:'',
        pwd:'',
        yzm:'',
        CheckImg:'',
        checkYZM:{},
        agree:false
      },
      LoginLoading:false,
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
          ],
          agree:[
            {//validator自定义表单验证
              validator:(rule,value,callback)=>{
                if(value){
                  callback()
                }else{
                  callback(new Error('请同意用户协议'))
                }
              },
              trigger:'change'
            }
          ]
      }
    }
  },
  mounted(){
    req1_yzm().then(res=>{
      this.form.checkYZM = res.data
    })
    // regLog(this.form.userName,this.form.pwd,this.$route.params)
  },
  methods:{
    changeImg(){
    //   request({
    //   url:'/api/captcha',
    //   responseType: 'arraybuffer'
    // }).then((res)=>{
    //   this.form.CheckImg =  res
    // })
        req1_yzm().then(res=>{
          this.form.checkYZM = res.data
        })
    },
    CheckLogin(){
      this.$refs['login-form'].validate((valid) => {//手动触发表单验证
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login(){
      this.LoginLoading=true
      req1_log({//发送验证登录请求
        admin:this.form.userName,
        mima:this.form.pwd,
        yzm:this.form.yzm
      }).then((res)=>{ 
        this.LoginLoading =false
        if(res.data.logCode){
          this.$store.commit('setuserToken',this.form.userName)
          this.$router.push({
            name:'home',
            query:{
              userName:this.form.userName
            }
          })
        }else{
          alert(res.data.message)
        }
        
      }).catch(err=>{
        console.log(err);
        this.LoginLoading = false
      })
    },
    toregister(){
      this.$router.push('/register')
    }
  }
}
</script>

<style lang='less'>
    .login{
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
          .reg{
            text-align: right;
          }
        }
        .logo{
          width: 100%;
          height: .5rem;
          background: url('~assets/img/loginLogo.png') no-repeat;
          background-size: cover;
          margin-bottom: .1rem;
        }
      }
    }
</style>
