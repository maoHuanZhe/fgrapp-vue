<template>
  <div style="position: absolute;bottom: 0;width: 100%;">
    <!--Waves Container-->
    <div>
      <svg class="waves"
           viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
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
        <div style="width: 100%;padding-left: 60px;">
          <Time></Time>
        </div>
        <Clock></Clock>
        <p class="copyright-text">
          <a href="http://beian.miit.gov.cn/" target="_blank">皖ICP备2020015593号</a>.
        </p>
        <p class="copyright-text">
          Copyright &copy; 2022 All Rights Reserved by
          <a href="#">FGRAPP</a>.
        </p>
      </div>
    </div>
    <!--Content ends-->
  </div>
</template>

<script>
import Clock from "@/components/Clock/01"
import Time from "@/components/Clock/02"
export default {
  name: "index",
  components: {
    Clock,
    Time
  }
}
</script>

<style scoped>
.site-footer a
{
  color:#737373;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}


.waves {
  position:relative;
  width: 100%;
  height:2vh;
  margin-bottom:-7px; /*Fix for safari gap*/
}

.content {
  position:relative;
  height:295px;
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
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}
</style>
