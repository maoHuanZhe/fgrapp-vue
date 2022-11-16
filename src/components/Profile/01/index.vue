<template>
  <div class="card">
    <div class="card-header">
    </div>

    <div class="card-body">
      <h2 class="name">樊光瑞</h2>
      <h4 class="job-title">Java 工程师</h4>
      <div class="bio">一个平平无奇的Java开发工程师</div>
    </div>

    <div class="card-footer">
      <div class="stats">
        <div class="stat">
          <span class="label">文章</span>
          <span class="value">56K</span>
        </div>
        <div class="stat">
          <span class="label">浏览</span>
          <span class="value">940</span>
        </div>
        <div class="stat">
          <span class="label">点赞</span>
          <span class="value">320</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
}
</script>

<style lang="scss" scoped>
/* cyrillic-ext */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 300;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYlK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 300;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYsK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 300;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYnK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 300;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYmK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 300;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYoK-4W4nIp.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYlK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYsK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYnK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYmK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYoK-4W4nIp.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYlK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYsK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYnK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYmK-4W4nIppT4.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/exo2/v20/7cHmv4okm5zmbtYoK-4W4nIp.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
body{
  padding:0;
  margin:0;
  font-size:14px;
  font-family: "Exo 2", sans-serif;
  color: #333;
}

.card{
  position: relative;
  width: 315px; /* Remove for full width */
  height: 450px; /* Remove for full width */
  margin: 0 auto;
  box-shadow: 0 0 100px rgba(0,0,0, .3);
}
.card-header{
  position: relative;
  height: 220px;
  background-size: cover;
  background-position: top;
  //background-image: ;
}
.card-header:after{
  content:'';
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgb(5,85,134), rgba(181,181,181, 0.1));
}

.card-header-bar{
  position: absolute;
  top:0;
  width: 100%;
  z-index: 1;
  width: 100%;
}

.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0,0,0,0);
  border: none;
  overflow: hidden;
}
.btn-message{
  display: inline-block;
  background: url(https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077483/profile-card/images/message.svg) no-repeat;
  width: 19.37px;
  height: 16.99px;
  margin-right:10px;
  margin-top:10px;
  float: right;
}
.btn-menu{
  display: inline-block;
  background: url(https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077483/profile-card/images/menu.svg) no-repeat;
  width: 19px;
  height: 12.16px;
  margin-left:10px;
  margin-top:10px;
  float: left;
}

svg .polygon{
  fill: #fff;
}
.card-header-slanted-edge{
  position: absolute;
  bottom: -3px;
  z-index: 1;
  width: 100%;
  right:0;
  left:0;
}

.btn-follow{
  position: absolute;
  top: -15px;
  right: 25px;
  width: 45px;
  height: 45px;
  background: linear-gradient(to left, #2D77C1, #68FAC2);
  border-radius:100%;
  box-shadow: 0 10px 15px rgba(110,221,235, .53);
}

.btn-follow:after{
  content: '';
  position:absolute;
  background: url(https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077480/profile-card/images/add.svg) no-repeat;
  width:17px;
  height: 17px;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
}

.card-body{
  text-align:center;
  padding-left: 10px;
}

.name{
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 auto;
}

.job-title{
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
  color: #919191;
}

.bio{
  font-size: 14px;
  color: #7B7B7B;
  font-weight: 300;
  margin: 10px auto;
  line-height: 20px;
}

.social-accounts img{
  width: 15px;
}

.social-accounts a{
  margin-left: 10px;
}
.social-accounts a:first-child{
  margin-left: 0;
}

.card-footer{
  /*position:fixed; /* Full card width/height */
  position: absolute; /* Fixed card width/height */

  left: 0;
  width: 100%;
  bottom: 20px;
}
.stat{
  box-sizing: border-box;
  width: calc(100% / 3);
  float: left;
  text-align: center;
  border-left: 1px solid #EBEBEB;
}
.stat .label{
  display: block;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 1px;
  color: #95989A;
}

.stat .value{
  display: block;
  font-weight: 700;
  font-size:20px;
  margin-top: 5px;
}
</style>
