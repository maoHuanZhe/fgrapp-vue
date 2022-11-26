<template>
  <div id="body" style="background-color: #f8f8f8;">
    <div style="background: white;margin: 10px;border-radius: 5px;">
      <div style="width: 100%;">
        <el-input
          ref="inputRef"
          v-model="addForm.content"
          style="padding:10px;"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8}"
          resize="none"
          placeholder="说点什么"
        />
        <p
          style="float:left;margin-left: 10px;margin-bottom: 10px;    font-size: 1rem;
    font-weight: 600;
    text-transform: inherit;
    line-height: 1.5;
    letter-spacing: 0.0178571em;
    margin-right: 1rem;"
        >
          共 {{ list.length }} 条评论
        </p>
        <el-button
          style="float: right;margin-right: 10px;margin-bottom: 10px;background-color: black;    font-size: 14px;
    font-weight: 600;
    line-height: 20px;"
          type="info"
          @click="handClick"
        >评论</el-button>
      </div>
    </div>
    <!-- Wrapper-->
    <div class="comment-wrapper">
      <!---->
      <div class="container">
        <div class="center-block">
          <div v-for="comment in list" :key="comment.id" class="media-comment">
            <a class="avatar-content" href="#">
              <img class="avatar" :src="comment.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" width="70" height="70">
            </a>
            <div class="media-content">
              <div class="media-comment-body">
                <div class="media-option">
                  <a class="ripple-grow" href="#">
                    <svg-icon icon-class="reply" @click="reply(comment.userId,comment.userName)" />
                  </a>
                </div>
                <div class="media-comment-data-person">
                  <a class="media-comment-name" href="#">{{ comment.userName }}</a>
                  <span class="text-muted">{{ dayjs(comment.lastUpdateTime).fromNow() }}</span></div>
                <div class="media-comment-text">
                  <el-link v-if="comment.upUserId" type="primary" :underline="false">@{{ comment.upUserName }}</el-link>
                  {{ comment.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { add } from '@/api/comment'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'Index',
  props: {
    id: {
      type: String
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      addForm: {
        contextId: '',
        upUserId: undefined,
        content: ''
      }
    }
  },
  created() {
    this.addForm.contextId = this.id
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    handClick() {
      if (!this.token) {
        store.commit('SET_SHOWREGISTER', true)
        return
      }
      const content = this.addForm.content
      if (content) {
        if (content.startsWith('@')) {
          this.addForm.content = content.substring(content.indexOf(' '), content.length)
        }
        add(this.addForm).then(() => {
          this.msgSuccess('评论成功')
          this.addForm.upUserId = undefined
          this.addForm.content = ''
        })
      } else {
        return this.$message({
          message: '请输入评论内容',
          type: 'warning'
        })
      }
    },
    reply(userId, userName) {
      this.addForm.upUserId = userId
      this.addForm.content = '@' + userName + ' '
      this.$refs.inputRef.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
.comment-wrapper {
  padding-bottom: 10px;
}
::v-deep .el-textarea__inner {
  background: 0 0;
  border: none;
  color: #3C3C3C;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
}
// ===========================
// Theme
// ===========================

:root{
  --body-bg:                      rgba(250 250 250 / 50%);
  --body-color:                   hsl(210, 11%, 15%);
  --body-color-hover:             hsl(0, 0%, 0%);
  --footer-social-link-hover-bg:  hsl(0, 0%, 93%);
  --media-comment-body-color:     hsl(210, 11%, 15%);
  --media-comment-name-color:     var(--body-color);
  --muted-color:                  hsla(210, 20%, 2%, 0.51);

  // Theme colors
  --theme-color-blue:     hsl(208, 100%, 92%);
  --theme-color-red:      hsl(0, 85%, 95%);
  --theme-color-green:    hsl(127, 62%, 90%);
  --theme-color-yellow:   hsl(55, 100%, 91%);
  --theme-color-pink:     hsl(309, 100%, 92%);
  --theme-color-cyan:     hsl(180, 83%, 91%);
  --theme-color-violet:   hsl(259, 81%, 94%);
}

// Grid breakpoints

$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

// Rebot

*,
*::before,
*::after {
  box-sizing: border-box;
}

$enable-body-flex: true;

#body{

  @if( $enable-body-flex ){
    display: flex;
    flex-direction: column;
  }

  margin: 0;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
  color: var(--body-color);
  background-color: rgba(250 250 250 / 50%);
  -webkit-text-size-adjust: 100%;
  border-radius: 0.75rem;
}

a {
  &, &:link {
    color: var(--body-color);
    text-decoration: none;
    transition: .3s linear;
  }
  &:hover { color: var(--body-color-hover) }
  &:focus { outline: none }
}

// heading

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: 500;
  line-height: 1.2;
}
h3{
  font-size: 1.7rem;
  margin-bottom: .5rem;
}
h5 {
  font-size: 1.1rem;
}

// Container

.container{
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.center-block{
  margin: 0 auto;
}

// =============================
// Swith toggle theme
// =============================

// General variables

$addonz-checkbox-radio-switch-bg: #151a20;
$addonz-checkbox-radio-switch-transition: opacity 0.3s, transform 0.2s;

$addonz-switch-inner-before-bg:rgb(173, 181, 189);
$addonz-switch-inner-after-bg: white;
$addonz-switch-inner-after-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
$addonz-switch-inner-after-transition: background-color 0.2s, transform 0.2s;
$addonz-switch-input-checked-bg :hsl(184, 70%, 36%);
$addonz-switch-input-checked-more-addonz-switch-inner-after-bg: hsl(184, 64%, 46%);
$addonz-switch-input-checked-active-more-addonz-switch-inner-before-bg: rgb(173, 181, 189);

$addonz-switch-input-active-transition: transform 0s, opacity 0s;

// disabled
$addonz-switch-input-disabled-more-addonz-switch-inner: $addonz-switch-input-checked-more-addonz-switch-inner-after-bg;
$addonz-switch-input-disabled-more-addonz-switch-inner-before-bg:  fade-out(#343a40, 0.60%) !important;

.addonz-switch {
  z-index: 0;
  position: relative;
  display: inline-block;
}

// Input

.addonz-switch > .addonz-switch-input {
  appearance: none;
  z-index: -1;
  position: absolute;
  right: 4px;
  top: -10px;
  display: block;
  margin: 0;
  background-color: $addonz-checkbox-radio-switch-bg;
  outline: none;
  transform: scale(1);
  pointer-events: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  opacity: 0;
  transition: $addonz-checkbox-radio-switch-transition;
}

// Inner

.addonz-switch{
  > .addonz-switch-inner {
    display: inline-block;
    width: 100%;
    font-weight: 500;
    cursor: pointer;

    // track

    &::before {
      content: "";
      float: right;
      display: inline-block;
      margin: 5px 0 5px 15px;
      border-radius: 7px;
      width: 36px;
      height: 14px;
      background-color: $addonz-switch-inner-before-bg;
      vertical-align: top;
      transition: background-color 0.2s, opacity 0.2s;
    }

    // Thumb

    &::after {
      content: "";
      position: absolute;
      top: 2px;
      right: 1rem;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      background-color: $addonz-switch-inner-after-bg;
      box-shadow: $addonz-switch-inner-after-shadow;
      transition: $addonz-switch-inner-after-transition;
    }
  }
}

// Checked

.addonz-switch > .addonz-switch-input:checked {
  right: -14px;
  background-color: $addonz-switch-input-checked-bg;
}
.addonz-switch > .addonz-switch-input:checked + .addonz-switch-inner::before {
  background-color: $addonz-switch-input-checked-bg;
}
.addonz-switch > .addonz-switch-input:checked + .addonz-switch-inner::after {
  background-color: $addonz-switch-input-checked-more-addonz-switch-inner-after-bg;
  transform: translateX(16px);
}

// Hover and focus

.addonz-switch{
  &:hover{
    > .addonz-switch-input {
      opacity: .08;
    }
    > .addonz-switch-input:focus {
      opacity: .18;
    }
  }
  > .addonz-switch-input:focus,
  > .addonz-switch-input.focus {
    opacity: .2;
  }
}

// Active

.addonz-switch > .addonz-switch-input:active {
  opacity:1;
  transform: scale(0);
  transition:$addonz-switch-input-active-transition;
}
.addonz-switch > .addonz-switch-input:active + .addonz-switch-inner::before {
  background-color: $addonz-switch-input-checked-bg;
}
.addonz-switch > .addonz-switch-input:checked:active + .addonz-switch-inner::before {
  background-color: $addonz-switch-input-checked-active-more-addonz-switch-inner-before-bg;
}

// Disabled

.addonz-switch > .addonz-switch-input:disabled {
  opacity: 0;
}
.addonz-switch > .addonz-switch-input:disabled + .addonz-switch-inner {
  color: $addonz-switch-input-disabled-more-addonz-switch-inner;
  opacity: .70;
  cursor: default;
}
.addonz-switch > .addonz-switch-input:disabled + .addonz-switch-inner::before {
  background-color: $addonz-switch-input-disabled-more-addonz-switch-inner-before-bg;
}
.addonz-switch > .addonz-switch-input:checked:disabled + .addonz-switch-inner::before {
  background-color: $addonz-switch-input-disabled-more-addonz-switch-inner-before-bg;
}

// =============================
// Box theme options
// =============================

.box-theme-option{
  padding: 1.5rem;
  background-color: hsla(0, 0%, 100%, 0.039);
  border-radius: .8rem;
  margin-bottom: 4rem;
  .box-theme-option-inner{
    display: flex;
    flex-direction: column;
    @media(min-width: map-get($breakpoints, md)) {
      justify-content: start;
      align-items: center;
      flex-direction: row;
      .addonz-form-inline{
        margin-bottom: 0;
        margin-right: 4rem;
      }
    }

  }

  .addonz-form-inline{
    margin-top: -5px;
    margin-bottom: 2rem;
  }
}

.badge-color{
  text-decoration: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background-color: #f8f9fa;
  margin-bottom: .8rem;
  .badge-color-icon{
    visibility: hidden;
  }
  &.blue    { background-color: var(--theme-color-blue)   }
  &.red     { background-color: var(--theme-color-red)    }
  &.green   { background-color: var(--theme-color-green)  }
  &.yellow  { background-color: var(--theme-color-yellow) }
  &.pink    { background-color: var(--theme-color-pink)   }
  &.cyan    { background-color: var(--theme-color-cyan)   }
  &.violet  { background-color: var(--theme-color-violet) }

  // Active badge ( icon selected )

  &.active{
    .badge-color-icon{
      visibility: visible;
    }
  }
}

// Emoji preview

.twtr-emoji {
  position: relative;
  vertical-align: middle;
  top: -.1rem;
}

// =============================
// Comment content ( components )
// =============================

%align-element-center{
  display: flex;
  align-items: center;
}
.text-muted{
  color: var(--muted-color);
}

// Comments

.media-comment{
  display: flex;
  align-items: flex-start;
  padding-top: 10px;
}

// Avatar

.media-comment{
  .avatar-content{
    margin-right: 1rem;
    .avatar{
      border-radius: 50%;
    }
  }
}

// Media bubble content

.media-comment-body{
  position: relative;
  display: inline-block;
  padding: 1.2rem;
  background-color: hsl(0, 85%, 95%);
  border-radius: 0.8rem;
  padding-right: 3rem;

  // Option
  .media-option{
    position: absolute;
    right: .7rem;
    top: 1rem;
  }
  &:hover{
    .media-option{
      visibility: visible;
    }
  }

  // Name
  .media-comment-data-person{
    margin-bottom: .3rem;
    @extend %align-element-center;
  }
  // text
  .media-comment-text{
    color: var(--media-comment-body-color);
  }
  .media-comment-name{
    color: var(--media-comment-name-color );
    font-size: 1rem;
    font-weight: 600;
    text-transform: inherit;
    line-height: 1.5;
    letter-spacing: 0.0178571em;
    margin-right: 1rem;
  }
}

.ripple-grow{
  width: 2.5rem;
  height: 2.5rem;
  @extend %align-element-center;
  justify-content: center;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.658) !important;
  &:hover{
    background-color: hsla(0, 0%, 0%, 0.122);
    color: #000;
  }
}

// Media comment footer

.media-comment-footer{
  @extend %align-element-center;
  margin-top: .6rem;
  margin-bottom: 1.2rem;
}

// Media footer option

.media-footer-option{
  padding: 0 1rem 0 0;
  text-decoration: none;
  transition: all .3s;
  color: var(--body-color);
  @extend %align-element-center;
  .icon-bubble-content{
    transition: all .3s;
    @extend %align-element-center;
    justify-content: center;
    margin-right: .4rem;
    border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
  }
  &.repply:hover{
    color: hsl(189, 97%, 45%);
    .icon-bubble-content{
      background-color: hsla(189, 100%, 36%, 0.233);
    }
  }
  &.like:hover{
    color: hsl(311, 91%, 42%);
    .icon-bubble-content{
      background-color: hsla(311, 92%, 44%, 0.169);
    }
  }
  &.share:hover{
    color: hsl(121, 100%, 29%);
    .icon-bubble-content{
      background-color: hsla(121, 100%, 35%, 0.164);
    }
  }
}

// Repply

.collapse-repply{
  margin-bottom: 1.5rem;
  @extend %align-element-center;
  svg{
    transition: all .3s;
    transform: rotate(-180deg);
  }

  &.active{
    svg{
      transform: rotate(0deg);
    }
  }
}

// Show more content

.loading-content{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  margin-bottom: 5rem;
  path{
    fill: var(--body-color);
  }
}
</style>
