<template>
  <div class="card">
    <el-tag
      v-for="item in list"
      :key="item.id"
      @click="clickHandle(item.id)"
      size="mini" style="margin-right: 10px;">{{ item.name }}</el-tag>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    list: {
      type: Array,
      require: true
    }
  },
  methods: {
    clickHandle(id) {
      if (this.$route.params.classId !== id){
        this.$router.push({
          path: "/page/class/" + id
        }).catch(err => err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .card {
   width: 315px;
   height: 450px;
   margin: 10px auto;
   -webkit-box-shadow: 0 0 100px rgb(0 0 0 / 30%);
   box-shadow: 0 0 100px rgb(0 0 0 / 30%);
 }
</style>
