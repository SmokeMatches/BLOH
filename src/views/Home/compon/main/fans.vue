<template>
  <div class="fans">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/fans">粉丝管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div>
        <div class="Index">
          <el-radio-group v-model="Fans" @change="getUser">
            <el-radio-button :label="0" size="mini">用户广场</el-radio-button>
            <el-radio-button :label="1" size="mini">我的关注</el-radio-button>
            <el-radio-button :label="2" size="mini">我的拉黑</el-radio-button>
            <el-radio-button :label="3" size="mini">关注我的</el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <el-table :data="UserList.user" style="width: 100%" :border="true">
            <el-table-column prop="userName" label="用户名" align="center">
            </el-table-column>
            <el-table-column prop="touxiang" label="头像" align="center">
              <template slot-scope="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.touxiang"
                  fit="fit"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.gender ? "男" : "女" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" prop="id">
              <template slot-scope="scope">
                <el-button
                  v-if="Fans === 0 || Fans === 3"
                  :type="scope.row.isFocus ? 'info' : 'primary'"
                  size="small"
                  :loading="loading"
                  @click="addFoc(scope.row.id)"
                  >{{ scope.row.isFocus ? "已关注" : "关注" }}</el-button
                >
                <el-button
                  :type="scope.row.isIgnore ? 'info' : 'primary'"
                  size="small"
                  :loading="loading"
                  v-if="Fans === 0 || Fans === 3"
                  @click="LaH(scope.row.id)"
                  >{{ scope.row.isIgnore ? "已拉黑" : "拉黑" }}</el-button
                >
                <el-button
                  v-if="Fans == 1"
                  type="info"
                  size="small"
                  :loading="loading"
                  @click="OnlyBlur(scope.row.id)"
                  >取消关注</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  :loading="loading"
                  v-if="Fans === 1"
                  @click="OnlyIG(scope.row.id)"
                  >拉黑</el-button
                >
                <el-button
                  v-if="Fans == 2"
                  type="primary"
                  size="small"
                  :loading="loading"
                  @click="OnlyBlur(scope.row.id)"
                  >关注</el-button
                >

                <el-button
                  type="info"
                  size="small"
                  :loading="loading"
                  v-if="Fans === 2"
                  @click="OnlyIG(scope.row.id)"
                  >取消拉黑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            :total="UserList.total"
            :current-page.sync="page"
            @current-change="getUser"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { GEtUsr, laHei, addFocus, addBlur, OnlyIngnore } from "api/index";
export default {
  name: "Fans",
  components: {},
  data() {
    return {
      Fans: 0,
      loading: false,
      UserList: [],
      page: 1,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      const identify = window.sessionStorage.getItem("identify");
      GEtUsr({ identify, page: this.page, Fans: this.Fans }).then((res) => {
        this.UserList = res.data;
      });
    },
    addFoc(identify1) {
      this.loading = true;
      const identify = window.sessionStorage.getItem("identify");
      addFocus({ identify1, identify }).then((res) => {
        this.$message({
          message: res.data.message,
          type: res.data.code ? "success" : "error",
        });
        this.loading = false;
        setTimeout(() => {
          this.getUser();
        }, 1000);
      });
    },
    LaH(identify1) {
      this.loading = true;
      const identify = window.sessionStorage.getItem("identify");
      laHei({ identify1, identify }).then((res) => {
        this.$message({
          message: res.data.message,
          type: res.data.code ? "success" : "error",
        });
        this.loading = false;
        setTimeout(() => {
          this.getUser();
        }, 1000);
      });
    },
    OnlyBlur(identify1) {
      this.loading = true;
      const identify = window.sessionStorage.getItem("identify");
      addBlur({ identify1, identify }).then((res) => {
        this.$message({
          message: res.data.message,
          type: res.data.code ? "success" : "error",
        });
        this.loading = false;
        setTimeout(() => {
          this.getUser();
        }, 1000);
      });
    },
    OnlyIG(identify1) {
      this.loading = true;
      const identify = window.sessionStorage.getItem("identify");
      OnlyIngnore({ identify1, identify }).then((res) => {
        this.$message({
          message: res.data.message,
          type: res.data.code ? "success" : "error",
        });
        this.loading = false;
        setTimeout(() => {
          this.getUser();
        }, 1000);
      });
    },
  },
};
</script>

<style  scoped  lang='less'>
.Index {
  margin-bottom: 0.2rem;
}
.pagination {
  margin-top: 0.2rem;
}
</style>