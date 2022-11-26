<template>
  <div class="container">
    <div class="title-container">
      <h1 class="title code">猜你喜欢</h1>
    </div>
    <div class="card-list">
      <div v-for="item in list" :key="item.id" class="card" @click="toDetail(item.id)">
        <h3 class="card-title code code-details">{{ item.problem }}</h3>
        <p class="card-description">{{ item.summary }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { randomList } from '@/api/topic'
export default {
  name: 'Index',
  props: {
    id: {
      type: String,
      require: true,
      default: ''
    },
    type: {
      type: Number,
      require: true,
      default: 0
    },
    classId: {
      type: Number,
      require: true,
      default: 1
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    randomList({ id: this.id, type: this.type, classId: this.classId }).then(({ data }) => {
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

<style scoped lang="scss">
.container {
  padding: 0;
  margin: 0 auto;
  background: rgba(250 250 250 / 50%);
  border-radius: 0.75rem;
}

.title {
  padding: 0;
  margin: 10px;
}

.card {
  border-radius: 10px;
  background: #FFF;
  padding: 20px;
  margin: 10px;
  box-shadow: 4px 4px 12px 1px rgba(0, 0, 0, 0.2);
  line-height: 1.5;
}
.card:hover {
   transition: all 0.30s ease-in-out;
   transform: scale(1.01);
   z-index: 20;
   box-shadow: 0 20px 30px 0 rgba(1, 1, 1, 0.2);
}
.card-title {
  margin: 0 0 20px 0;
  letter-spacing: 1px;
}
.card-description {
  margin: 0;
}
.card-details .card-title {
  color: #783F8E;
}
.card-summary .card-title {
  color: #E36588;
}
@media (max-width: 500px) {
.card {
  flex: 1;
}
}

.sample {
  margin-top: 40px;
  border-radius: 10px;
  overflow: hidden;
}
.sample-title {
  line-height: 2;
  font-size: 0.75rem;
  background: #738290;
  color: #FFF;
  padding: 0 20px;
  letter-spacing: 1px;
}
.sample-code {
  border-left: 2px dashed #E4F0D0;
  border-right: 2px dashed #E4F0D0;
  padding: 20px;
  line-height: 1.5;
}
.sample-html {
  padding: 20px;
  background: #E4F0D0;
}
.sample-html-details[open] .sample-html-summary:before {
  content: "🙀";
  -webkit-animation: cat 0.2s cubic-bezier(0.01, 0.29, 0.38, 2.37);
    animation: cat 0.2s cubic-bezier(0.01, 0.29, 0.38, 2.37);
}
.sample-html-summary {
  list-style-image: none;
  cursor: pointer;
  padding-left: 60px;
  position: relative;
}
.sample-html-summary:before {
  content: "😼";
  position: absolute;
  top: calc(50% - 18px);
  left: 0;
  font-size: 2rem;
}
.sample-html-summary:focus {
  outline: none;
}
.sample-html-summary::-webkit-details-marker {
  display: none;
}

.code, .sample-title {
  font-family: "Fira Mono", monospace;
}
.code-details {
  color: #783F8E;
}
.code-summary {
  color: #E36588;
}

.speech {
  display: inline-block;
  margin: 20px 0 0 7px;
  padding: 20px;
  background: #FFF;
  border-radius: 0 10px 10px 10px;
  position: relative;
  -webkit-animation: speech 0.3s cubic-bezier(0.01, 0.29, 0.38, 2.37);
    animation: speech 0.3s cubic-bezier(0.01, 0.29, 0.38, 2.37);
  transform-origin: top left;
}
.speech:before {
  content: "";
  position: absolute;
  border: 8px solid transparent;
  top: -16px;
  left: 0;
  border-bottom-color: #FFF;
}

  :root {
    font-size: 16px;
}

html, body {
  width: 100%;
  height: 100%;
  display: flex;
  background: #FFFCF7;
  color: #738290;
  font-family: "Roboto", sans-serif;
}

* {
  box-sizing: border-box;
}
*:before, *:after {
  box-sizing: inherit;
}

@-webkit-keyframes speech {
from {
opacity: 0;
transform: scale(0.98);
}
to {
opacity: 1;
transform: none;
}
}

@keyframes speech {
from {
opacity: 0;
transform: scale(0.98);
}
to {
opacity: 1;
transform: none;
}
}
@-webkit-keyframes cat {
50% {
transform: scale(1.1);
}
}
@keyframes cat {
50% {
transform: scale(1.1);
}
}
</style>
