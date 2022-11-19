<template>
  <div>
    <div style="display: flex;flex-wrap: wrap;justify-content: center;">
      <el-empty v-if="list.length === 0" :image-size="200" />
      <Item
        v-for="item in list"
        v-else
        :key="item.id"
        :info="item"
      />
    </div>
    <div style="text-align: center;">
      <el-pagination
        :hide-on-single-page="true"
        :current-page="current"
        :page-sizes="[1,12, 30, 100, 500]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { page } from '@/api/topic'
import Item from '@/views/topic/Item'
import eventBus from '@/utils/eventBus'

export default {
  name: 'List',
  components: {
    Item
  },
  data() {
    return {
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 12,
        problem: undefined,
        classId: undefined
      },
      list: [],
      total: 0,
      current: 1
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.queryParams.classId = val.params.classId
        this.queryParams.problem = val.params.problem
        this.queryParams.pageNum = 1
        this.list = []
        this.getList()
      }
    }
  },
  created() {
    // 获取分类编号
    const classId = this.$route.params && this.$route.params.classId
    if (classId) {
      this.queryParams.classId = classId
    }
    this.getList()
  },
  beforeDestroy() {
    eventBus.$off('search')
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getList()
    },
    getList() {
      // 获取博客列表
      page(this.queryParams).then(({ data }) => {
        data.records.forEach(item => {
          if (item.classNames) {
            item.classNames = item.classNames.split(',')
          }
        })
        this.list = data.records
        this.total = data.total
      })
    }
  }
}
</script>

<style scoped>

</style>
