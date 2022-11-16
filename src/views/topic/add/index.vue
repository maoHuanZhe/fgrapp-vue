<template>
  <div class="mavonEditor">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="问题" prop="problem">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10}"
          placeholder="请输入问题"
          maxlength="1024"
          show-word-limit
          v-model="form.problem">
        </el-input>
      </el-form-item>
      <el-form-item label="答案" prop="answer">
        <mavon-editor ref="md" style="max-height: 500px"
                      :toolbars="markdownOption"
                      v-model="form.answer"
                      @save="submit"
                      :ishljs = "true"
        />
      </el-form-item>
      <el-form-item label="分类专栏" prop="classId">
        <el-select
          v-model="form.classId"
          filterable
          default-first-option
          placeholder="请选择文章分类">
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button
          type="primary"
          @click="addClass"
        >新增分类</el-button>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="submit">发布内容</el-button>
    </el-row>
  </div>
</template>
<script>
  import { add, update } from "@/api/func/topic";
  import { list, add as addClass } from "@/api/func/class";
  import { getInfo } from "@/api/topic";
  export default {
    data() {
      return {
        classList: [],
        form:{
          answer:"",
          problem:"",
          classId:''
        },
        rules: {
          problem: [
            { required: true, message: '请输入问题内容', trigger: 'change' }
          ],
          classId: [
            { required: true, message: '请选择文章分类', trigger: 'submit' }
          ]
        },
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      };
    },
    created(){
      list().then(({data})=>{
        this.classList = data;
        this.$nextTick(()=>{
          const id = this.$route.params && this.$route.params.topicId;
          if (id) {
            getInfo(id).then(({data}) => {
              this.form = data;
            })
          }
        })
      })
    },
    methods:{
      addClass(){
        this.$prompt('请输入分类名称', '添加分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '名称不能为空'
        }).then(({ value }) => {
          addClass({ name: value.trim() }).then(() => {
            list().then(({data})=> {
              this.classList = data;
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消添加'
          });
        });
      },
      submit(){
        this.$refs.form.validate(valid => {
          if (valid) {
            let result;
            if (this.form.id){
              result = update(this.form)
            } else {
              result = add(this.form)
            }
            result.then(() => {
              this.msgSuccess("保存成功");
              if (this.form.id){
                //关闭当前页面
                this.$store.dispatch("tagsView/delView", this.$route);
                this.$router.push({ path: "/func/topic/list" });
              }
              this.form.answer = ""
              this.form.problem = ""
            }).catch(()=>{
            });
          }
        });
      },
    }
  };
</script>

<style scoped>
  .mavonEditor {
    width: 100%;
    height: 100%;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
