<template>
  <div>
    <!--Waves Container-->
    <div>
      <svg
        class="waves"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <!--Waves end-->
    <!--Content starts-->
    <div class="content flex">
      <div class="site-footer">
        <div style="width: 100%;padding-left: 40px;">
          <Time />
        </div>
        <Clock />
        <a href="http://beian.miit.gov.cn/" target="_blank" title="本站已在公安联网备案，备案号皖ICP备 2020015593号">
          <svg-icon icon-class="beian" style="width: 142px;height: 20px;" />
        </a>
        <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" title="本站采用知识共享署名-非商业性使用-相同方式共享4.0国际许可协议进行许可">
          <svg-icon icon-class="cc" style="width: 167px;height: 20px;" />
        </a>
      </div>
    <!--Content ends-->
    </div>
  </div></template>

<script>
import Clock from '@/components/Clock/01'
import Time from '@/components/Clock/02'
export default {
  name: 'Index',
  components: {
    Clock,
    Time
  }
}
</script>

<style scoped>
.site-footer {
  background-color: #ffffff;
  padding: 0 1rem 1rem;
  border-radius: 0.75rem;
}
.site-footer a
{
  margin-right: 10px;
}

.waves {
  position:relative;
  width: 100%;
  height:2vh;
  margin-bottom:-7px; /*Fix for safari gap*/
}

.content {
  position:relative;
  height:260px;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}
</style>
