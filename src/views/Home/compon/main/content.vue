<template>
  <div class="content">
    <el-card>
      <div slot="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <!-- 表单 -->
        <el-form ref="form" :model="form">
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
              <el-radio label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="channel" placeholder="请选择频道">
              <el-option label="全部" value=""></el-option>
              <el-option label="c++" value="c++"></el-option>
              <el-option label="java" value="java"></el-option>
              <el-option label="javaScript" value="javaScript"></el-option>
              <el-option label="html" value="html"></el-option>
              <el-option label="sqlServer" value="sqlServer"></el-option>
              <el-option label="MySql" value="MySql"></el-option>
              <el-option label="android" value="android"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getatricle(1)"
              :disabled="loading"
              size="small"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <div slot="header">
        总共查询到<b>{{ totalPage }}</b
        >条数据
      </div>
      <div>
        <!-- 数据表格 -->
        <el-table :data="articleList" style="width: 100%" v-loading="loading">
          <!-- prop渲染数据项 -->
          <el-table-column prop="cover" label="封面">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover[0]"
                fit="fit"
                lazy
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="date" label="发布日期"> </el-table-column>
          <el-table-column prop="user" label="用户"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">{{
                articleStatus[scope.row.status].text
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 绑定为了获取删除和修改所需id -->
              <el-button
                size="mini"
                icon="el-icon-edit"
                type="primary"
                circle
                @click="editArticle(scope.row.articleId)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteArticle(scope.row.articleId)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPage"
          class="page"
          :disabled="loading"
          :current-page.sync="CurrentPage"
          @current-change="getatricle"
        >
        </el-pagination>
      </div>
    </el-card>

    <el-dialog
      title="编辑文章"
      :visible.sync="centerDialogVisible"
      width="40%"
      center
      :modal-append-to-body="false"
    >
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="封面">
          <el-upload
            action="http://127.0.0.1:4000/uploadcover"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-image
              v-for="(item, index) in formLabelAlign.cover"
              :key="index"
              style="width: 100px; height: 100px; margin: 0.05rem"
              :src="item"
              @click="upCover(index)"
              fit="fit"
            >
            </el-image>
            <i
              class="el-icon-plus"
              v-if="
                formLabelAlign.cover !== undefined &&
                formLabelAlign.cover.length < 3
              "
            ></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="频道">
          <el-input v-model="formLabelAlign.Channel"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input v-model="formLabelAlign.content"></el-input> -->
          <el-tiptap
            v-model="formLabelAlign.content"
            lang="zh"
            :extensions="extensions"
          ></el-tiptap>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorA(formLabelAlign.articleId)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArticle,
  delArticle,
  getArticleId,
  updateArticle,
} from "api/article";
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
} from "element-tiptap";
import "element-tiptap/lib/index.css";
export default {
  name: "Content",
  components: {
    "el-tiptap": ElementTiptap,
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        type: [],
        resource: "",
      },
      status: "",
      channel: "",
      totalPage: 0,
      CurrentPage: 1,
      centerDialogVisible: false,
      articleList: [],
      loading: false,
      formLabelAlign: {},
      articleStatus: [
        { text: "草稿", type: "warning" },
        { text: "待审核", type: "" },
        { text: "审核通过", type: "success" },
        { text: "审核失败", type: "danger" },
        { text: "已删除", type: "info" },
      ],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Image({
          uploadRequest(file) {
            return "https://ftp.bmp.ovh/imgs/2021/01/27d67c126ef012e6.jpg";
          },
        }),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ],
    };
  },
  created() {
    this.getatricle();
  },
  mounted() {},
  methods: {
    getatricle(page) {
      this.loading = true;
      getArticle({
        page,
        status: this.status,
        channel: this.channel,
      }).then((res) => {
        this.loading = false;
        this.articleList = res.data.page ? res.data.page : null; //如果没有数据就置空
        this.totalPage = res.data.len;
      });
    },
    editArticle(id) {
      this.centerDialogVisible = true;
      getArticleId(id).then((res) => {
        this.formLabelAlign = res.data;
      });
    },
    deleteArticle(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delArticle(id).then((res) => {
            alert(res.data.message);
            this.getatricle(this.CurrentPage);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editorA(Id) {
      this.centerDialogVisible = false;
      updateArticle(Id, this.formLabelAlign).then((res) => {
        alert(res.data.message);
        this.getatricle(this.CurrentPage);
      });
    },
    upCover(id) {
      this.formLabelAlign.cover.splice(id, 1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      const src = `/cover/${file.raw.name}`;
      console.log(src);
      this.formLabelAlign.cover.push(src);
    },
  },
};
</script>

<style  scoped  lang='less'>
.page {
  margin-top: 0.1rem;
}
.coverIMG {
  width: 0.8rem;
  background-size: cover;
}
</style>