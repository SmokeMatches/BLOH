<template>
  <div class="main">
    <el-button type="primary" @click="touser">登录</el-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Main",
  data() {
    return {
      token: "",
    };
  },
  mounted() {
    this.tologin();
  },
  methods: {
    tologin() {
      axios
        .post("http://wangblog.wang/login", {
          username: "admin",
          password: "admin123",
        })
        .then((res) => {
          this.token = res.data.token;
          console.log(res.data.token);
        });
    },
    touser() {
      // axios.defaults.headers.Authorization = this.token;
      const token = this.token;
      axios.interceptors.request.use(function (config) {
        config.headers.common["Authorization"] = token;
        console.log(config);
        return config;
      });
      axios.get("http://wangblog.wang/api").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style  scoped  lang='less'>
</style>
