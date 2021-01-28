<template>
  <el-container class="home">
    <el-aside width="auto">
      <Asside :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <div class="header_left">
          <i
            :class="{
              'el-icon-s-unfold': isCollapse,
              'el-icon-s-fold': !isCollapse,
            }"
            style="margin-right: 0.05rem"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>石门农村信用社</span>
        </div>
        <div class="right_tou">
          <img :src="avator" alt="头像" class="avator" />
          <!-- <img src="../../assets/img/touxiang1.png" alt="头像"> -->
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userToken }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toSetting"
                >设置</el-dropdown-item
              >
              <el-dropdown-item @click.native="clearSession"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { req1_all, req1_avator } from "api/index.js";
import Asside from "@/views/Home/compon/Asside";
import axios from "axios";
export default {
  data() {
    return {
      userToken: "",
      avator: "",
      imageUrl: "",
      isCollapse: false,
    };
  },
  components: { Asside },
  methods: {
    clearSession() {
      this.$confirm("您确定退出当前账号?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/login");
          if (window.sessionStorage.getItem("user")) {
            window.sessionStorage.removeItem("identify");
            window.sessionStorage.removeItem("user");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "成功退出",
          });
        });
    },
    toSetting() {
      this.$router.push("/home/profile");
    },
  },
  created() {
    req1_avator({
      userName: window.sessionStorage.getItem("user"),
    }).then((res) => {
      this.avator = res.data;
    });
    this.userToken = window.sessionStorage.getItem("user");
  },
  mounted() {},
};
</script>

<style  scoped  lang='less'>
.home {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: #b3c0d1;
    color: #333;
    align-items: center;
    .right_tou {
      display: flex;
      height: 100%;
      align-items: center;
      .avator {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.1rem;
      }
    }
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
  }
}
</style>