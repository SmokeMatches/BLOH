<template>
  <div class="material">
    <el-card class="box-card">
      <!-- <img src="/img/loginLogo.png" /> -->
      <div slot="header">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/materical">素材管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div>
        <el-radio-group
          v-model="radio"
          size="small"
          @change="getimg(radio)"
          class="sucai"
        >
          <div>
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">收藏</el-radio-button>
          </div>
          <el-button type="success" size="small" @click="publishImg"
            >发布素材</el-button
          >
        </el-radio-group>
        <div>
          <el-row :gutter="20">
            <el-col
              :xs="12"
              :sm="8"
              :md="6"
              :lg="4"
              :xl="4"
              v-for="(item, index) in imageList"
              :key="index"
              ><el-image
                style="height: 100px"
                :src="item.src"
                fit="fit"
              ></el-image>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="发布素材"
      :visible.sync="PublishVisible"
      width="30%"
      :append-to-body="true"
      center
    >
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:4000/uploadImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="PublishVisible = false">取 消</el-button>
        <el-button type="primary" @click="PublishVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getimage } from "api/image";
export default {
  name: "Material",
  data() {
    return {
      radio: 0,
      PublishVisible: false,
      imageList: [],
      imageUrl: "",
      fileData: {
        fileId: "",
        fileType: "",
        fileDesc: "",
        filePath: "",
      },
    };
  },
  mounted() {
    this.getimg();
  },
  methods: {
    getimg(id) {
      if (id == 1) {
        getimage({ collect: id }).then((res) => {
          this.imageList = res.data.images;
        });
      } else {
        getimage().then((res) => {
          this.imageList = res.data.images;
        });
      }
    },
    publishImg() {
      this.PublishVisible = true;
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 0) {
        this.$message({
          message: res.message,
        });
      } else {
        this.$message({
          message: res.message,
        });
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      const format = [isJPG || isPNG];
      if (!format) {
        this.$message.error("上传头像图片只能是 JPG/PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M && format;
    },
  },
};
</script>

<style  lang='less'>
.el-radio-group {
  margin-bottom: 0.2rem;
}
.el-upload {
  width: 100%;
}
.sucai {
  display: flex;
  justify-content: space-between;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>