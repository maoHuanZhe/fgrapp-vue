<template>
  <div id="container">
    <h1>随机推荐</h1>
    <div id="tasks">
      <ul id="tasksList">
        <li v-for="item in list" :key="item.id" @click="toDetail(item.id)">
          <p>{{ item.problem }}</p>
          <span class="delete">more</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { randomList } from '@/api/topic'
export default {
  name: 'Index',
  data() {
    return {
      list: []
    }
  },
  created() {
    randomList({}).then(({ data }) => {
      this.list = data
    })
  },
  methods: {
    toDetail(id) {
      this.$router.push('/page/detail/' + id).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
//Color Varibles
$accent-color: #3b44fb;
$body-bg: #f0f0ff;
$container-bg: rgba(250 250 250 / 50%);
$task-bg: #fff;

//Basic Varibles
$font-family: 'Poppins', sans-serif;
$font-color: #0d0d0d;
$border-radius: .75rem;
$button-size: 3rem;
$transition: all 0.30s ease-in-out;;

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: $body-bg;
  font-family: $font-family;
}

#container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: $container-bg;
  padding: 0;
  box-shadow: 0 20px 30px 0 rgba(1, 1, 1, 0.07);
  margin: 1rem 0;
  border-radius: $border-radius;

  & h1 {
    padding: 0;
    margin: 0;
    text-align: center;
  }
}
// Tasks List Style
#tasks {
  padding: 0 1.5rem 1rem;

  & #tasksList {
    list-style-type: none;
    padding-left: 0;

    & li {
      transition: $transition;
      box-shadow: 0 20px 30px 0 rgba(1, 1, 1, 0.07);
      border-radius: $border-radius;
      color: $font-color;
      padding: 0.75rem;
      font-size: 1rem;
      font-weight: 600;
      animation:fadeIn .5s linear;
      background-color: $task-bg;
      margin-bottom: 5px;
      position: relative;
      border-right: 0px solid lightgray;
      letter-spacing: -.015rem;
      will-change: transform;

      &:hover {
        border-right: 55px solid black;
        transition: $transition;
        transform: scale(1.05);
        z-index: 20;
        box-shadow: 0 20px 30px 0 rgba(1, 1, 1, 0.2);

        & .delete {
          top: 40%;
          right: -45px;
          color: white;
        }
      }

      & .delete {
        transition: all 0.30s ease-in-out;
        position: absolute;
        color: transparent;
        background: none;
        border: none;
        outline: 0;
        line-height: .85rem;
        font-size: 1rem;

        &:hover {
          opacity: .75;
        }
      }
      & p {
        padding: 0;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  & #notification {
    padding-top: 1rem;
    text-align: center;
    color: gray;
    font-weight: 500;
    font-size: 1.25rem;
  }
}

// Animations
@keyframes fadeIn{
  0% {
    opacity:0;
    margin-top: -50px;
  }
  50% {
    opacity:0;
  }
  100% {
    opacity:1;
    margin-top: 0px;
  }
}

@keyframes fadeOut{
  0% {
    opacity:1;
    margin-top: 0px;
  }
  50% {
    opacity:0;
  }
  100% {
    opacity:0;
    margin-top: -50px;
  }
}
</style>
