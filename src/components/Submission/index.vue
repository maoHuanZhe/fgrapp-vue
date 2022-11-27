<template>
  <div class="submission-chart">
    <div class="calendar">
      <div class="weeks">
        <div class="week">周二</div>
        <div class="week">周四</div>
        <div class="week">周六</div>
      </div>
      <div v-for="(columnData, columnIndex) in dateData" :key="columnIndex" class="column">
        <div class="title">{{ columnData.ifSwitchMonth ? '' : columnData.title }}</div>
        <div
          v-for="(dateData, dateIndex) in columnData.data"
          :key="dateIndex"
          class="date-wrapper"
          :style="`background:${getColor(dateData.number)};`"
        >
          <el-tooltip effect="dark" :open-delay="300" :content="`${dateData.date}：${dateData.number}次` + content" placement="top">
            <div class="date" />
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="slider">
        <div class="slider-desc">0</div>
        <div style="width:120px;">
          <el-slider v-model="sliderValue" range :max="12" :format-tooltip="sliderFormat" @change="sliderChange" />
        </div>
        <div class="slider-desc">12+</div>
      </div>
      <div class="legend">
        <div class="level-desc">少</div>
        <div class="level level-1" />
        <div class="level level-2" />
        <div class="level level-3" />
        <div class="level level-4" />
        <div class="level level-5" />
        <div class="level-desc">多</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SubmissionChart',
  props: {
    profile: {
      default() {
        return {
          '2022-11-26': 1
        }
      },
      type: Object
    },
    content: {
      type: String,
      default: '提交'
    }
  },
  data() {
    return {
      dateData: [],
      sliderValue: [0, 12]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 上一年信息
      const prevYear = moment().format('YYYY') - 1
      const prevTodayFormatStr = prevYear + '-' + moment().format('MM-DD')
      const prevToday = moment(prevTodayFormatStr).format('YYYY-MM-DD')
      // 上年今日的是星期几
      const prevTodayWeekNum = moment(prevToday).weekday() || 7
      // 初始日期（上年临近的星期一）
      const firstMondayDate = prevTodayWeekNum > 1 ? moment(prevToday).add(8 - prevTodayWeekNum, 'days').format('YYYY-MM-DD') : prevToday
      // 初始日期至今日的天数，包括今日
      const days = moment().diff(moment(firstMondayDate), 'days') + 1
      // 每周天数
      const columns = 7
      // 最大列数（周数）
      const lineNums = Math.ceil(days / columns)
      // 绘制图表的源数据
      const dateData = []
      const monthCN = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      const startSliderNum = this.sliderValue[0]
      const endSliderNum = this.sliderValue[1]
      for (let i = 0; i < lineNums; i++) {
        // 最近一星期不一定满的
        const weekColumn = (i === lineNums - 1 ? days % columns ? days % columns : columns : columns)
        // 开始计算title（月份的图例）
        // 思路：第一列直接根据第一天的月份
        //      之后的嘛列数根据上一周的最后一天减去第一天的月份，如果大于1代表月份发生了改变，下一列的title显示最新的月份
        const theWeekStartMonth = moment(firstMondayDate).add(i * 7, 'days').format('M')
        const theWeekEndMonth = moment(firstMondayDate).add(i * 7 + weekColumn, 'days').format('M')
        let title = (i === 0) ? monthCN[theWeekStartMonth - 1] : ''
        let ifSwitchMonth = false
        if (theWeekEndMonth - theWeekStartMonth) {
          ifSwitchMonth = true
        }
        if (i && dateData[i - 1].ifSwitchMonth) {
          title = monthCN[theWeekEndMonth - 1]
        }
        // 图表源数据格式：columns：列数，title：列标题，ifSwitchMonth：月份是否发生改变，data：每格数据
        dateData.push({
          columns: weekColumn,
          title: title,
          ifSwitchMonth: ifSwitchMonth,
          data: []
        })
        for (let j = 0; j < dateData[i].columns; j++) {
          const date = moment(firstMondayDate).add(i * 7 + j, 'days').format('YYYY-MM-DD')
          let number = 0
          // 提交次数在slider范围内再进行次数赋值
          if ((this.profile[date] >= startSliderNum && this.profile[date] < endSliderNum) ||
            (this.profile[date] > 12 && endSliderNum === 12)) {
            number = this.profile[date]
          }
          // number：提交次数，date：提交日期
          dateData[i].data.push({
            number: number,
            date: date
          })
        }
      }
      this.dateData = dateData
    },
    getColor(number) {
      // level color
      // 左闭右开
      let color = '#EBEDF0'
      if (number >= 12) {
        color = '#196127'
      } else if (number >= 8) {
        color = '#239A3B'
      } else if (number >= 4) {
        color = '#7BC96F'
      } else if (number >= 1) {
        color = '#C6E48B'
      } else {
        color = '#EBEDF0'
      }
      return color
    },
    sliderFormat(val) {
      return this.content + '次数: ' + val
    },
    sliderChange(val) {
      console.log(val)
      // 没有使用v-model绑定sliderValue而是采用回调的原因
      // 1.拖拽1px sliderValue都会引起组件重绘，此组件计算嵌套了2个for循环，导致页面出现卡顿slider不流畅的情况
      this.sliderValue = val
      this.init()
    }
  }
}
</script>
<style scoped>
.submission-chart {
  width: 820px;
  height: 180px;
  background-color: #fff;
  margin: auto;
  margin-top: 20px;
  padding: 0px 0;
  font-size: 12px;
}
.submission-chart .calendar {
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
}
.submission-chart .calendar .weeks {
  width: 30px;
  margin-right: 3px;
  margin-top: 22px;
}
.submission-chart .calendar .weeks .week {
  margin-top: 13px;
  width: 30px;
  height: 14px;
}
.submission-chart .calendar .column {
  width: 11px;
  margin-right: 3px;
}
.submission-chart .calendar .column .title {
  width: 14px;
  height: 14px;
  margin-bottom: 8px;
  text-align: left;
  overflow: visible;
  white-space: nowrap;
}
.submission-chart .calendar .column .date-wrapper {
  width: 11px;
  height: 11px;
  background: #EBEDF0;
  margin-bottom: 3px;
}
.submission-chart .calendar .column .date-wrapper .date {
  width: 11px;
  height: 11px;
}
.submission-chart .calendar .column .date-wrapper .date :hover {
  width: 13px;
  height: 13px;
}
.submission-chart .operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.submission-chart .operation .slider {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
}
.submission-chart .operation .slider .slider-desc {
  width: 11px;
  margin: 0 8px;
}
.submission-chart .operation .legend {
  display: flex;
  justify-content: center;
  align-items: center;
}
.submission-chart .operation .legend .level-desc {
  margin-right: 6px;
  margin-left: 3px;
}
.submission-chart .operation .legend .level {
  margin-right: 3px;
  width: 11px;
  height: 11px;
}
.submission-chart .operation .legend .level-1 {
  background: #EBEDF0;
}
.submission-chart .operation .legend .level-2 {
  background: #C6E48B;
}
.submission-chart .operation .legend .level-3 {
  background: #7BC96F;
}
.submission-chart .operation .legend .level-4 {
  background: #239A3B;
}
.submission-chart .operation .legend .level-5 {
  background: #196127;
}

</style>
