<template>
  <div class="material">
    <el-card class="box-card">
      <!-- <img src="/img/loginLogo.png" /> -->
      <div slot="header">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/materical">素材管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="listImg">
        <el-radio-group
          v-model="radio"
          size="small"
          @change="gitAC()"
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
              v-for="(item, index) in imageList.images"
              :key="index"
              class="itemImg"
              ><el-image style="height: 100px" :src="item.src" fit="fit">
              </el-image>
              <div class="action">
                <el-button
                  type="warning"
                  :icon="
                    item.IsCollect ? 'el-icon-star-on' : 'el-icon-star-off'
                  "
                  circle
                  size="mini"
                  @click="IsCollect(item.IsCollect, item.id)"
                  :loading="loading"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="mini"
                  :loading="loading"
                  @click="delImage(item.id)"
                ></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-pagination
        background
        :page-size="12"
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="imageList.total"
        @click.native="getimg"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="发布素材"
      :visible.sync="PublishVisible"
      width="30%"
      :append-to-body="true"
      center
      :show-close="false"
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
        <!-- <el-button @click="PublishVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="closeDig">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getimage, AddcollectImg, DelImg } from "api/image";
import axios from "axios";
export default {
  name: "Material",
  data() {
    return {
      radio: 0,
      aaa: true,
      PublishVisible: false,
      imageList: [],
      loading: false,
      imageUrl: "",
      currentPage: 1,
    };
  },
  mounted() {
    this.getimg();
  },
  methods: {
    getimg() {
      if (this.radio == 1) {
        const uuu = window.sessionStorage.getItem("identify");
        getimage({ collect: uuu, page: this.currentPage }).then((res) => {
          const IsTest = window.sessionStorage.getItem("identify"); //获取当前用户身份
          // 查询当前素材是否是收藏的素材
          for (let i = 0; i < res.data.images.length; i++) {
            const IsColl = res.data.images[i].collect.find((item) => {
              return IsTest == item;
            });
            if (IsColl) {
              res.data.images[i].IsCollect = true;
            } else {
              res.data.images[i].IsCollect = false;
            }
          }
          this.imageList = res.data;
        });
      } else {
        getimage({ page: this.currentPage }).then((res) => {
          const IsTest = window.sessionStorage.getItem("identify"); //获取当前用户身份
          // 查询当前素材是否是收藏的素材
          for (let i = 0; i < res.data.images.length; i++) {
            const IsColl = res.data.images[i].collect.find((item) => {
              return IsTest == item;
            });
            if (IsColl) {
              res.data.images[i].IsCollect = true;
            } else {
              res.data.images[i].IsCollect = false;
            }
          }
          this.imageList = res.data;
        });
      }
    },
    gitAC(id) {
      this.currentPage = 1;
      this.getimg(id);
    },
    closeDig() {
      this.PublishVisible = false;
      this.getimg();
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
    IsCollect(isCollect, id) {
      // 获取当前用户身份信息
      this.loading = true;
      const identify = window.sessionStorage.getItem("identify");
      AddcollectImg({ isCollect, identify, ImgId: id }).then((res) => {
        alert(res.data.message);
        this.loading = false;
        this.getimg();
      });
    },
    delImage(q1) {
      // 获取当前用户身份信息
      this.loading = true;
      const identify = window.sessionStorage.getItem("identify");
      DelImg({
        Sel: this.radio,
        identify,
        id: q1,
      }).then((res) => {
        this.$alert(res.data.message, "友情提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              action: `action:${action}`,
            });
          },
        });
        this.loading = false;
        this.getimg();
      });
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
.listImg {
  margin-bottom: 0.2rem;
}
.avatar {
  width: 178px;
  height: 178px;
  text-align: center;
}
.itemImg {
  position: relative;
  .action {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    background: #ccc;
    opacity: 0.8;
    width: 178px;
  }
}
</style>