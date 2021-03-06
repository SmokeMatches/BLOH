<template lang="zh">
<div class="article">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/home/article">发布文章</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-form :label-position="labelPosition" label-width="60px" :model="article" :rules="rules" ref="articleForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-tiptap lang="zh" v-model="article.content" :extensions="extensions" />
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="num">
                        <el-radio :label="1" name="type">单图</el-radio>
                        <el-radio :label="3" name="type">三图</el-radio>
                        <el-radio :label="0" name="type">无图</el-radio>
                    </el-radio-group>
                    <el-upload action="http://127.0.0.1:4000/uploadcover" 
                    :on-success="handleAvatarSuccess"                     
                    v-if='num!=0'
                    list-type="picture-card" 
                    :on-preview="handlePictureCardPreview" 
                    :on-remove="handleRemove" :limit="this.num"  :on-exceed="handleLimit" >
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                </el-form-item>
                <el-form-item label="频道" prop="channel">
                    <el-select v-model="article.channel" placeholder="请选择频道">
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
                    <el-button type="primary" @click="onPublish(false)">发表</el-button>
                    <el-button @click="onPublish(true)">存为草稿</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</div>
</template>

<script>
import { addArticle } from "api/article";
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Image,
  ListItem,
  BulletList,
  OrderedList,
} from "element-tiptap";
import "element-tiptap/lib/index.css";
export default {
  name: "Article",
  components: {
    "el-tiptap": ElementTiptap,
  },
  data() {
    return {
      num: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      labelPosition: "right",
      article: {
        title: "",
        cover: [],
        content: "",
        channel: "",
        radio: 0,
        userName: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入文章内容",
            trigger: "blur",
          },
        ],
        channel: [
          {
            required: true,
            message: "请选择频道",
            trigger: "blur",
          },
        ],
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({
          level: 5,
        }),
        new Bold({
          bubble: true,
        }), // render command-button in bubble menu.
        new Underline({
          bubble: true,
          menubar: false,
        }), // render command-button in bubble menu but not in menubar.
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
      imgList: [],
    };
  },
  // mounted() {},
  methods: {
    onPublish(draft) {
      this.$refs["articleForm"].validate((valid) => {
        if (valid) {
          this.article.userName = window.sessionStorage.getItem("user");
          addArticle(this.article, draft).then((res) => {
            if (res.data.code) {
              this.$message({
                message: "文章发布成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "文章发布失败",
                type: "error",
              });
            }
            setTimeout(() => {
              this.$router.push("/home/content");
            }, 1000);
          });
        } else {
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleLimit() {
      this.$message({
        type: "error",
        message: `最多上传${this.num}张图片`,
      });
    },
    handleAvatarSuccess(res, file) {
      const src = `/cover/${file.raw.name}`;
      this.article.cover.push(src);
    },
  },
};
</script>

<style  scoped  lang='less'>
</style>
