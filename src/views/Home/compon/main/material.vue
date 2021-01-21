<template>
  <div class="material">
    <el-card class="box-card">
      <div slot="header">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/home/materical">素材管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div>
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
        <div>
          <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4"
              ><el-image
                style="height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fit"
              ></el-image>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4"
              ><el-image
                style="height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fit"
              ></el-image>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4"
              ><el-image
                style="height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fit"
              ></el-image>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4"
              ><el-image
                style="height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fit"
              ></el-image>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4"
              ><el-image
                style="height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fit"
              ></el-image>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4"
              ><el-image
                style="height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fit"
              ></el-image>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Material",
  data() {
    return {
      radio: "全部",
    };
  },
};
</script>

<style  scoped  lang='less'>
.el-radio-group {
  margin-bottom: 0.2rem;
}
</style>