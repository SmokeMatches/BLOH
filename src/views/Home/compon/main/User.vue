<template>
  <div class="user">
    <el-card class="box-card" v-if="admin === 0 || admin === 1">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/user">用户管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="tableContent">
        <el-radio-group
          v-model="radio"
          class="radio"
          @change="getUser"
          size="mini"
        >
          <el-radio-button v-show="admin === 0" :label="null"
            >全部</el-radio-button
          >
          <el-radio-button v-show="admin === 0" :label="0"
            >超级管理员</el-radio-button
          >
          <el-radio-button v-show="admin === 0" :label="1"
            >普通管理员</el-radio-button
          >
          <el-radio-button :label="2">普通用户</el-radio-button>
        </el-radio-group>
        <el-table
          :data="uList.user"
          style="width: 80%; border: solid 1px #f2f6fc"
        >
          <el-table-column prop="userName" label="用户名"> </el-table-column>
          <el-table-column prop="Isadministrator" label="级别">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.Isadministrator == 0">超级管理员</el-tag>
              <el-tag v-else-if="scope.row.Isadministrator == 1"
                >普通管理员</el-tag
              >
              <el-tag v-else>普通用户</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="" label="修改权限">
            <template slot-scope="scope">
              <el-button v-if="scope.row.Isadministrator == 0" size="small"
                >暂无权限修改</el-button
              >
              <el-button
                v-else-if="scope.row.Isadministrator == 1"
                size="small"
                :loading="loading"
                type="primary"
                @click="changeAdmin(scope.row.Isadministrator, scope.row.id)"
                >设为普通用户</el-button
              >
              <el-button
                v-else
                size="small"
                :loading="loading"
                type="primary"
                :current-page.sync="page"
                @click="changeAdmin(scope.row.Isadministrator, scope.row.id)"
                >设为普通管理员</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="pagination"
          layout="prev, pager, next"
          :total="uList.total"
          @current-change="getUser"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-card class="box-card" v-else-if="admin === 2">
      <div slot="header">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              ><a href="/home/user">用户管理</a></el-breadcrumb-item
            >
          </el-breadcrumb>
          <div class="NoAdmin">
            <h1>暂无权限浏览</h1>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { GetUs, changeAdm } from "api/index";
export default {
  name: "User",
  data() {
    return {
      admin: null,
      radio: null,
      page: 1,
      loading: false,

      uList: {},
    };
  },
  created() {
    this.getAdmin();
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getAdmin() {
      const admin = window.sessionStorage.getItem("admin");
      this.admin = parseInt(admin);
      if (admin == 1) {
        this.radio = 2;
      }
    },
    getUser() {
      GetUs({ page: this.page, Isadministrator: this.radio })
        .then((res) => {
          this.loading = false;
          this.uList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeAdmin(Isadmin, identify) {
      this.loading = true;
      changeAdm({ Isadmin, identify })
        .then((res) => {
          this.$message({
            type: res.data.code ? "success" : "error",
            message: res.data.message,
          });
          setTimeout(() => {
            this.getUser(this.radio);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style  scoped  lang='less'>
.radio {
  margin-bottom: 0.2rem;
}
.pagination {
  margin-top: 0.2rem;
}
.NoAdmin {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
}
</style>
