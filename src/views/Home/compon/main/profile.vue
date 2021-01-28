<template>
  <div class="profile">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/profile">个人设置</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="Info">
        <el-card class="box-card">
          <div class="patchPwd">
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
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="DeepInfo">
            <div class="patchPwd">
              <el-form
                :model="PwdForm"
                status-icon
                :rules="pwdRules"
                ref="PwdForm"
                label-width="80px"
                class="demo-ruleForm"
                label-position="left"
              >
                <el-form-item label="原密码" prop="initalPwd">
                  <el-input
                    type="password"
                    v-model="PwdForm.initalPwd"
                  ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                  <el-input type="password" v-model="PwdForm.newPwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPwd">
                  <el-input
                    v-model="PwdForm.confirmPwd"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="UpdatePassword('PwdForm')"
                    >修改密码</el-button
                  >
                  <el-button @click="resetPwd('PwdForm')">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-image :src="ruleForm.touxiang" fit="fit"></el-image>
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:4000/uploadAvator"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="{ identify }"
              >
                <el-button type="primary">更换头像</el-button>
              </el-upload>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { geCurrentUser, UpUserINfo, UpdatePwd } from "api/index";
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
      identify: "",
      imageUrl: "",
      PwdForm: {
        initalPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      pwdRules: {
        initalPwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "bulr" }],
        confirmPwd: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur",
          },
        ],
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetPwd(PwdForm) {
      this.$refs[PwdForm].resetFields();
    },
    getUser() {
      const user = window.sessionStorage.getItem("identify");
      this.identify = user;
      geCurrentUser({
        id: user,
      }).then((res) => {
        this.ruleForm = res.data;
      });
    },
    handleClose(tag) {
      this.ruleForm.interest.splice(this.ruleForm.interest.indexOf(tag), 1);
    },
    handleAvatarSuccess(res, file) {
      setTimeout(() => {
        this.$router.go(0);
      }, 1000);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // const isPNg = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    UpdatePassword(PwdForm) {
      this.$refs[PwdForm].validate((value) => {
        if (value) {
          if (this.PwdForm.newPwd == this.PwdForm.confirmPwd) {
            const identify = window.sessionStorage.getItem("identify");
            this.PwdForm.identify = identify;
            UpdatePwd(this.PwdForm)
              .then((res) => {
                this.$message({
                  type: res.data.code ? "success" : "error",
                  message: res.data.message,
                });
                this.resetPwd("PwdForm");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.$message({
              type: "error",
              message: "两次密码不一样",
            });
          }
        } else {
          console.log("验证不通过");
          return false;
        }
      });
    },
  },
};
</script>

<style  scoped  lang='less'>
.profile {
  width: 100%;
  .Info {
    display: flex;
    width: 100%;
    .box-card {
      flex: 1;
    }
  }
}
.DeepInfo {
  display: flex;
  justify-content: space-around;
}
.el-input {
  width: 3.98rem;
}
.el-image {
  width: 1.5rem;
  height: 1.5rem;
}
.el-button {
  width: 1.5rem;
}
.demo-ruleForm {
  .el-input {
    width: 3rem;
  }
}
.box-card {
  min-width: 4rem;
}
.patchPwd {
  min-width: 4rem;
}
</style>