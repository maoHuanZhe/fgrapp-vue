<template>
  <div class="search-container">
    <input id="search-box" type="text" class="search-box" v-model="title" @keyup.enter.prevent="submit" />
    <label for="search-box">
      <svg-icon class="search-icon" icon-class="search" @click="submit"></svg-icon>
    </label>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  name: "index",
  data() {
    return {
      title: ''
    }
  },
  methods: {
    submit(){
      eventBus.$emit('search', this.title)
      this.title = ""
    }
  }
}
</script>

<style lang="scss" scoped>
$tl: 0.6s; // transition length


body {
  margin: 5%;
}

.search-box {
  & + label .search-icon {    color: black    }
  //&:hover {
    & + label .search-icon {    color: white    }
  //}
  //&:focus {
    transition: width $tl cubic-bezier(0,1.22,.66,1.39), border-radius $tl, background $tl;
    border: none;outline: none;
    box-shadow: none;
    padding-left: 15px;
    cursor: text;
    width: 300px;
    height: 35px;
    border-radius: 20px;
    background: rgb(235, 235, 235);
    color: black;
    & + label .search-icon {    color: black;    }
  //}
  //&:not(:focus) {    text-indent:-5000px;    } // for more-graceful falling back (:not browsers likely support indent)
}

#search-submit {
  position: relative;left: -5000px;
}

.search-icon {
  position: relative;
  left: -27px;
  color: white;
  cursor: pointer;
}
</style>
