<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#002033"
    text-color="#fff"
    default-active="1"
    router
    :collapse="isCollapse"
    active-text-color="#ffd04b"
  >
    <div :class="isCollapse ? 'image1' : 'imgHezi'">
      <img src="~assets/img/tree.png" class="image" alt="" />
    </div>
    <el-menu-item index="/home/content">
      <i class="el-icon-document"></i>
      <span title="title">首页</span>
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
      <span title="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/home/fans">
      <i class="el-icon-trophy-1"></i>
      <span title="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/home/profile">
      <i class="el-icon-user"></i>
      <span title="title">个人设置</span>
    </el-menu-item>
    <el-menu-item index="/home/user">
      <i class="el-icon-postcard"></i>
      <span title="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/home/articleguanli">
      <i class="el-icon-postcard"></i>
      <span title="title">文章状态</span>
    </el-menu-item>
    <el-menu-item index="/home/myarticle">
      <i class="el-icon-thumb"></i>
      <span title="title">我发布的</span>
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
  mounted() {},
};
</script>

<style  scoped  lang='less'>
.el-menu {
  height: 100%;
}
.el-menu-item {
  font-size: 0.18rem;
}
.imgHezi {
  display: flex;
  justify-content: center;
}
.image {
  width: 100px;
  height: 100px;
  text-align: center;
}
.image1 {
  display: none;
}
</style>
