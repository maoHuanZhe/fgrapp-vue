<template>
  <div class="mavonEditor">
    <div>
      <h1 class="title">{{ form.problem }}</h1>
      <div
        style="background: #f8f8f8;border-radius: 10px;padding: 5px 20px;
  margin-top: 10px;"
      >
        <div style="color: #999aaa;">
          <!--   创作时间   -->
          <el-link type="info" :underline="false" style="margin-right: 10px;">
            最后修改于 {{ dayjs(form.lastUpdateTime).fromNow() }}</el-link>
          <!--   uv   -->
          <el-link type="info" :underline="false" style="margin-right: 10px;">
            <i class="el-icon-user-solid" /> {{ operateNum.uv }}
          </el-link>
          <!--   pv   -->
          <el-link type="info" :underline="false" style="margin-right: 10px;">
            <i class="el-icon-view" /> {{ operateNum.pv }}
          </el-link>
        </div>
        <div style="color: #999aaa;padding-top: 5px;">
          <!--   分类专栏   -->
          <span style="margin-right: 5px;">分类:</span>
          <el-tag size="mini" style="margin-right: 10px;">{{ form.classId | className }}</el-tag>
        </div>
      </div>
      <mavon-editor
        v-model="form.answer"
        style="margin: 10px 0;"
        default-open="preview"
        :toolbars-flag="false"
        :subfield="false"
      />
    </div>
    <div class="operatorTab">
      <Like :liked="!operateNum.canLike" :num="operateNum.likeNum" @likeClick="likeClick" />
      <div>
        <el-avatar v-for="user in operateNum.likedUsers" :key="user.id" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <!--   编辑   -->
      <el-link v-if="isAdmin" type="primary" :underline="false" style="margin-right: 10px;" @click="toEdit">
        编辑</el-link>
    </div>
    <Comment :id="topicId" :list="operateNum.comments" />
    <may-like :id="topicId" :type="form.type" :class-id="form.classId" />
  </div>
</template>

<script>
import { getDetailInfo, updateLickNum } from '@/api/topic'
import { mapGetters } from 'vuex'
import store from '@/store'
import Like from '@/components/Button/Liked/02/index'
import Comment from '@/views/topic/comment/index'
import MayLike from '@/components/MayLike'

export default {
  components: {
    Like,
    Comment,
    MayLike
  },
  data() {
    return {
      operateNum: {
        pv: 0,
        uv: 0,
        likeNum: 0,
        canLike: true,
        likedUsers: [],
        comments: []
      },
      topicId: undefined,
      form: {}
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'isAdmin'
    ])
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.topicId = val.params.topicId
        this.getInfo()
      }
    }
  },
  created() {
    this.topicId = this.$route.params && this.$route.params.topicId
    this.getInfo()
  },
  methods: {
    getInfo() {
      getDetailInfo(this.topicId).then(({ data }) => {
        this.form = data.topic
        this.operateNum.pv = data.pv
        this.operateNum.uv = data.uv
        this.operateNum.likeNum = data.likeNum
        this.operateNum.canLike = data.canLike
        this.operateNum.likedUsers = data.likedUsers
        this.operateNum.comments = data.comments
      })
    },
    toEdit() {
      this.$router.push('/page/edit/' + this.topicId)
    },
    likeClick() {
      // 判断用户是否登陆 登陆后才能参与点赞评论
      if (this.token) {
        updateLickNum(this.topicId).then(() => {
          // 点赞数改变
          this.operateNum.likeNum += this.operateNum.canLike ? 1 : -1
          // 是否点赞状态改变
          this.operateNum.canLike = !this.operateNum.canLike
        })
      } else {
        store.commit('SET_SHOWREGISTER', true)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .operatorTab {
    margin-bottom: 10px;
    padding: 1rem;
    display: flex;
    background-color: rgba(250 250 250 / 50%);
    border-radius: 0.75rem;
  }
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
