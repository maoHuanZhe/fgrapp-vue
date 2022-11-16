<template>
  <div class="mavonEditor">
    <div>
      <h1 class="title">{{form.problem}}</h1>
      <div style="background: #f8f8f8;border-radius: 10px;padding: 5px 20px;
  margin-top: 10px;">
        <div style="color: #999aaa;">
          <!--   创作时间   -->
          <el-link type="info" :underline="false" style="margin-right: 10px;">
            最后修改于 {{ dayjs(form.lastUpdateTime).fromNow() }}</el-link>
          <!--   阅读数   -->
          <el-link type="info" :underline="false" style="margin-right: 10px;">
            <i class="el-icon-view"></i>
            {{operateNum.uv}}</el-link>
        </div>
        <div style="color: #999aaa;padding-top: 5px;">
          <!--   分类专栏   -->
          <span style="margin-right: 5px;">分类专栏:</span>
          <el-tag size="mini" style="margin-right: 10px;">{{ form.classId | className }}</el-tag>
        </div>
      </div>
      <mavon-editor  style="margin: 10px 0;"
                     v-model="form.answer"
                     defaultOpen = "preview"
                     :toolbarsFlag = "false"
                     :subfield = "false"
      />
    </div>
    <div style="height: 100px;padding-top: inherit;display: flex;">
      <Like :liked="!operateNum.canLike" :num="operateNum.likeNum" @likeClick="likeClick"></Like>
      <div>
        <el-avatar v-for="user in operateNum.likedUsers" :key="user.id" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <!--   编辑   -->
      <el-link v-if="isAdmin" @click="toEdit" type="primary" :underline="false" style="margin-right: 10px;">
        编辑</el-link>
    </div>
    <Comment :id="topicId" :list="operateNum.comments"></Comment>
  </div>
</template>

<script>
  import { updateLickNum,getDetailInfo } from "@/api/topic";
  import {mapGetters} from "vuex";
  import store from "@/store";
  import Like from "@/components/Button/Liked/02/index"
  import Comment from "@/views/topic/comment/index"
  export default {
    components:{
      Like,
      Comment
    },
    computed: {
      ...mapGetters([
        'token',
        'isAdmin'
      ])
    },
    data() {
      return {
        operateNum: {
          pv:0,
          uv:0,
          likeNum:0,
          canLike:true,
          likedUsers: [],
          comments: [],
        },
        topicId:undefined,
        form:{}
      };
    },
    created(){
      const id = this.$route.params && this.$route.params.topicId;
      this.topicId = id;
      getDetailInfo(id).then(({data}) => {
        this.form = data.topic;
        this.operateNum.pv = data.pv;
        this.operateNum.uv = data.uv;
        this.operateNum.likeNum = data.likeNum;
        this.operateNum.canLike = data.canLike;
        this.operateNum.likedUsers = data.likedUsers;
        this.operateNum.comments = data.comments;
      })
    },
    methods:{
      toEdit(){
        this.$router.push("/page/edit/" + this.topicId);
      },
      likeClick(){
        //判断用户是否登陆 登陆后才能参与点赞评论
        if (this.token){
          updateLickNum(this.topicId).then(()=>{
            //点赞数改变
            this.operateNum.likeNum += this.operateNum.canLike ? 1: -1;
            //是否点赞状态改变
            this.operateNum.canLike = !this.operateNum.canLike;
          })
        } else {
          store.commit('SET_SHOWREGISTER', true)
        }
      }
    }
  };
</script>

<style scoped>
  .title {
    font-size: 28px;
    word-wrap: break-word;
    color: #222226;
    font-weight: 600;
    margin: 0;
    word-break: break-all;
    text-align: left;
  }
  .mavonEditor {
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 16px;
  }
  ::-moz-selection {
    background: #26a69a;
    color: #ffffff;
  }
  ::selection {
    background: #26a69a;
    color: #ffffff;
  }
  .markdown-body ::-moz-selection {
    background: #26a69a;
    color: #ffffff;
  }
  .markdown-body ::selection {
    background: #26a69a;
    color: #ffffff;
  }
</style>
