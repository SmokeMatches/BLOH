<template>
  <div class="articleGuanli">
    <el-card class="box-card" v-if="admin === 0 || admin === 1">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/articleguanli">文章状态管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
        <div>
          <el-radio-group
            v-model="radio"
            @change="getArticle"
            class="radio"
            size="mini"
          >
            <el-radio-button :label="null">全部</el-radio-button>
            <el-radio-button :label="0">草稿</el-radio-button>
            <el-radio-button :label="1">待审核</el-radio-button>
            <el-radio-button :label="2">审核失败</el-radio-button>
            <el-radio-button :label="3">审核通过</el-radio-button>
          </el-radio-group>
          <el-table
            :data="tableData.article"
            @row-click="toComment"
            style="width: 100%"
          >
            <el-table-column prop="cover" label="封面">
              <template slot-scope="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.cover[0]"
                  fit="fit"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column prop="date" label="时间"> </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-tag type="warning" v-if="scope.row.status === 0"
                  >草稿</el-tag
                >
                <el-tag type="primary" v-if="scope.row.status === 1"
                  >待审核</el-tag
                >
                <el-tag type="danger" v-if="scope.row.status === 2"
                  >审核失败</el-tag
                >
                <el-tag type="success" v-if="scope.row.status === 3"
                  >审核通过</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  :loading="loading"
                  @click="ChangeStatus(scope.row.status, scope.row.articleId)"
                  v-if="scope.row.status === 1"
                  >审核通过</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  :loading="loading"
                  @click="ChangeStatus0(scope.row.status, scope.row.articleId)"
                  v-if="scope.row.status === 1"
                  >审核驳回</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  :loading="loading"
                  @click="ChangeStatus(scope.row.status, scope.row.articleId)"
                  v-else-if="scope.row.status === 2"
                  >驳回草稿</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  v-else-if="scope.row.status === 3"
                  :disabled="true"
                  >已发布</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            class="pagination"
            layout="prev, pager, next"
            :total="tableData.total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" v-else-if="admin === 2">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/articleguanli">文章状态管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
        <div class="NoAdmin">
          <h1>暂无权限浏览</h1>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { GEtArtStatus, ChangeSF, RejectCaogao } from "api/article.js";
export default {
  name: "articleGuanli",
  data() {
    return {
      admin: null,
      loading: false,
      radio: null,
      activities: [
        {
          content: "草稿",
        },
        {
          content: "待审核",
        },
        {
          content: "审核失败",
        },
        {
          content: "通过审核",
        },
      ],
      page: 1,
      tableData: {},
    };
  },
  created() {
    this.getAdmin();
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getAdmin() {
      const admin = window.sessionStorage.getItem("admin");
      this.admin = parseInt(admin);
    },
    getArticle(status) {
      GEtArtStatus({ status, page: this.page })
        .then((res) => {
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    ChangeStatus(status, articleId) {
      this.loading = true;
      ChangeSF({ status, articleId }).then((res) => {
        this.$message({
          type: res.data.code ? "success" : "error",
          message: res.data.message,
        });
        setTimeout(() => {
          this.getArticle();
        }, 1000);
      });
    },
    ChangeStatus0(status, articleId) {
      this.loading = true;
      RejectCaogao({ status, articleId }).then((res) => {
        this.$message({
          type: res.data.code ? "success" : "error",
          message: res.data.message,
        });
        setTimeout(() => {
          this.getArticle();
        }, 1000);
      });
    },
    toComment(q) {
      if (q.status != 4) {
        this.$router.push({
          path: "/home/articledetail",
          query: q,
        });
      }
    },
  },
};
</script>

<style  scoped  lang='less'>
.row {
  display: inline-block;
}
.pagination {
  margin-top: 0.2rem;
}
.radio {
  margin: 0.2rem 0;
}
</style>
