<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#002033"
      text-color="#fff"
      router
      :collapse="isCollapse"
      active-text-color="#ffd04b">
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span title="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/home/content">
            <i class="el-icon-document"></i>
            <span title="title">内容</span>
          </el-menu-item>
          <el-menu-item index="/home/materical">
            <i class="el-icon-picture-outline"></i>
            <span title="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/home/article">
            <i class="el-icon-s-promotion"></i>
            <span title="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/home/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span title="title">评论</span>
          </el-menu-item>
          <el-menu-item index="/home/fans">
            <i class="el-icon-trophy-1"></i>
            <span title="title">粉丝</span>
          </el-menu-item>
          <el-menu-item index="/home/profile">
            <i class="el-icon-user"></i>
            <span title="title">个人中心</span></span></span>
          </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: "Asside",
  data() {
    return {};
  },
  props: ["is-collapse"],
};
</script>

<style  scoped  lang='less'>
.el-menu {
  height: 100%;
}
.el-menu-item {
  font-size: 0.18rem;
}
</style>
