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
      <div>哈哈哈哈</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Fans",
  components: {},
  data() {
    return {};
  },
};
</script>

<style  scoped  lang='less'>
</style>