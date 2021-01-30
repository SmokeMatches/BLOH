<template>
  <div class="articleDetail">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/" class="header">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-link @click="goback" class="back">返回</el-link>
      </div>
      <div class="text item">
        <el-form label-width="80px" :model="ArticleInfo">
          <el-form-item label="封面">
            <el-image
              v-for="(item, index) in ArticleInfo.cover"
              :key="index"
              style="width: 100px; height: 100px; margin: 0.05rem"
              :src="item"
              fit="fit"
            >
            </el-image>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="ArticleInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="频道">
            <el-input v-model="ArticleInfo.Channel"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-tiptap
              v-model="ArticleInfo.content"
              lang="zh"
              :extensions="extensions"
            ></el-tiptap>
          </el-form-item>
        </el-form>
      </div>
      <el-divider content-position="left"></el-divider>
      <div class="com">
        <el-badge :value="commentList.total" class="ppping">
          <el-button size="small">评论</el-button>
        </el-badge>
        <el-button
          type="primary"
          @click="beforeAddComment"
          icon="el-icon-chat-dot-round"
          size="mini"
          :disabled="!this.IsCom"
          >发表评论</el-button
        >
      </div>
      <el-dialog
        title="评论"
        :visible.sync="dialogVisible"
        width="30%"
        :append-to-body="true"
        :before-close="handleClose"
      >
        <el-input
          v-model.trim="comment"
          type="textarea"
          autosize
          placeholder="输入评论"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDig">取 消</el-button>
          <el-button type="primary" @click="addComment">确 定</el-button>
        </span>
      </el-dialog>
      <div
        class="comList"
        v-for="(item, index) in commentList.comment"
        :key="index"
      >
        <el-row :gutter="20">
          <el-col :span="4">
            <el-avatar :src="item.touxiang" class="avatar"></el-avatar>
            <el-tag type="success">{{ item.name }}</el-tag>
          </el-col>
          <el-col :span="4">{{ item.time }}</el-col>
          <el-col :span="16">{{ item.content }}</el-col>
        </el-row>
      </div>
      <div>
        <el-pagination
          small
          layout="prev, pager, next"
          @current-change="getCom"
          :total="commentList.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getComm, PublishComm } from "api/article";
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
  name: "ArticleDetail",
  data() {
    return {
      ArticleInfo: {},
      comment: "",
      IsCom: true,
      dialogVisible: false,
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
      commentList: [],
    };
  },
  components: {
    "el-tiptap": ElementTiptap,
  },
  mounted() {
    this.getQuery();
    this.getCom();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getQuery() {
      const query = this.$route.query;
      if (query) {
        this.ArticleInfo = query;
        this.IsCom = JSON.parse(this.ArticleInfo.IsCom);
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    closeDig() {
      this.dialogVisible = false;
      this.comment = "";
    },
    getCom(page) {
      if (page) {
        getComm({ articleId: this.ArticleInfo.articleId }).then((res) => {
          console.log(res.data);
          this.commentList = res.data;
        });
      } else {
        getComm({ articleId: this.ArticleInfo.articleId, page: 1 }).then(
          (res) => {
            this.commentList = res.data;
          }
        );
      }
    },
    beforeAddComment() {
      this.dialogVisible = true;
    },
    addComment() {
      const identify = window.sessionStorage.getItem("identify");
      PublishComm({
        identify,
        content: this.comment,
        articleId: this.ArticleInfo.articleId,
      }).then((res) => {
        this.$message({
          type: res.data.code ? "success" : "error",
          message: res.data.message,
        });
        this.comment = "";
        this.dialogVisible = false;
        setTimeout(() => {
          this.getCom();
        }, 1000);
      });
    },
  },
};
</script>

<style scoped lang='less'>
.com {
  margin-bottom: 0.2rem;
}
.comList {
  border: solid #ccc 1px;
  margin-bottom: 0.2rem;
}
.ppping {
  margin-right: 0.1rem;
}
.avatar {
  vertical-align: middle;
}
.el-row {
  height: 0.4rem;
}
.el-col {
  height: 100%;
  display: flex;
  align-items: center;
}
.back {
  float: right;
}
</style>
