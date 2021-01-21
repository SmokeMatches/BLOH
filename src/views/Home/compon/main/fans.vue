<template>
  <div class="fans">
    <el-tiptap
      lang="zh"
      v-model="content"
      :extensions="extensions"
      height="350"
      placeholder="请输入文章内容"
    ></el-tiptap>
  </div>
</template>

<script>
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
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor,
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from "element-tiptap";
import "element-tiptap/lib/index.css";
export default {
  name: "Fans",
  components: {
    "el-tiptap": ElementTiptap,
  },
  data() {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }),
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest(file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData();
            fd.append("image", file);
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then((res) => {
              // 这个 return 是返回最后的结果
              return res.data.data.url;
            });
          }, // 图片的上传方法，返回一个 Promise<url>
        }),
        new Underline({ bubble: true, menubar: true }), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 分割线
        new Fullscreen(), // 全屏
        new Preview(), // 预览
        new CodeBlock(), // 代码块
        new TextColor(), // 文本颜色
        new ListItem(),
        new BulletList(), // 无序列表  (必须与 ListItem 一起使用)
        new OrderedList(), // 有序列表  (必须与 ListItem 一起使用)
        new TodoItem(),
        new TodoList(), // 任务列表 (必须与 ListItem 一起使用)
        new Table(), // (与 TableHeader, TableCell, TableRow 一起使用)
        new TableHeader(),
        new TableCell(),
        new TableRow(),
      ],
      content: `
        <h1>Heading</h1>
        <p>This Editor is awesome!</p>
      `,
    };
  },
};
</script>

<style  scoped  lang='less'>
</style>