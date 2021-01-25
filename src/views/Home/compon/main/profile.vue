<template>
  <div class="profile">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/profile">个人设置</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <!-- <el-input v-model="ruleForm.age"></el-input> -->
            <el-input
              type="number"
              v-model.number="ruleForm.age"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model.trim="ruleForm.gender">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="兴趣爱好">
            <el-tag
              :closable="true"
              @close="handleClose(item)"
              v-for="(item, index) in ruleForm.interest"
              :key="index"
              >{{ item }}</el-tag
            >
          </el-form-item>
          <el-form-item label="添加爱好">
            <el-checkbox-group v-model="interest">
              <el-checkbox label="打篮球"></el-checkbox>
              <el-checkbox label="编程"></el-checkbox>
              <el-checkbox label="打游戏"></el-checkbox>
              <el-checkbox label="旅游"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { geCurrentUser, UpUserINfo } from "api/index";
export default {
  name: "Profile",
  data() {
    return {
      ruleForm: {},
      interest: [],
      rules: {
        userName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        age: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
              } else {
                if (value < 0 || value > 100) {
                  callback(new Error("请输入有效年龄"));
                } else {
                  callback();
                }
              }
            },
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.interest = Array.from(
            new Set(this.ruleForm.interest.concat(this.interest))
          );
          UpUserINfo(this.ruleForm)
            .then((res) => {
              this.$message({
                type: res.data.code ? "success" : "danger",
                message: res.data.message,
              });
              this.$router.go(0);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$router.go(0);
    },
    getUser() {
      const user = window.sessionStorage.getItem("identify");
      geCurrentUser({
        id: user,
      }).then((res) => {
        this.ruleForm = res.data;
      });
    },
    handleClose(tag) {
      this.ruleForm.interest.splice(this.ruleForm.interest.indexOf(tag), 1);
    },
  },
};
</script>

<style  scoped  lang='less'>
.el-input {
  width: 3.98rem;
}
</style>