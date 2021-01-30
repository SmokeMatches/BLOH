<template>
  <div class="comment">
    <el-card v-if="admin === 0 || admin === 1">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/comment">评论管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="table">
        <el-table :data="TableForm.renderD" style="width: 100%">
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="comment.length" label="总评论数">
          </el-table-column>
          <el-table-column prop="fanscomment.length" label="粉丝评论数">
          </el-table-column>
          <el-table-column prop="IsCom" label="状态">
            <template slot-scope="scope">{{
              scope.row.IsCom ? "正常" : "关闭"
            }}</template>
          </el-table-column>
          <el-table-column prop="IsCom" label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.IsCom"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="Isdis"
                @change="updateCom(scope.row.articleId, scope.row.IsCom)"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="TableForm.total"
          :current-page.sync="currenPage"
          @current-change="getArt"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-card class="box-card" v-else>
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
import { getComment, UpPersimision } from "api/article";
export default {
  name: "Comment",
  data() {
    return {
      admin: null,
      TableForm: [],
      currenPage: 1,
      Isdis: false,
    };
  },
  created() {
    this.getAdmin();
  },
  mounted() {
    this.getArt();
  },
  methods: {
    getAdmin() {
      const admin = window.sessionStorage.getItem("admin");
      this.admin = parseInt(admin);
    },
    getArt(e) {
      getComment(e)
        .then((res) => {
          this.Isdis = false;
          this.TableForm = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCom(id, e) {
      this.Isdis = true;
      UpPersimision({
        quan: e,
        id,
      }).then((res) => {
        this.$message({
          message: res.data.message,
          type: res.data.code ? "success" : "error",
        });
        setTimeout(() => {
          this.getArt(this.currenPage);
        }, 1000);
      });
    },
  },
};
</script>

<style  scoped  lang='less'>
.table {
  margin-bottom: 0.4rem;
}
.el-pagination {
  text-align: center;
  margin-right: 0.5rem;
}
</style>