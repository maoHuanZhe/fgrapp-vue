<template>
  <div class="blog_post">
    <div class="container_copy">
      <span class="span_primary">{{ info.type | typeName }} - {{ info.classId | className }}</span>
      <h1>{{ info.problem }}</h1>
      <p>{{ info.summary }}</p>
      <h3>
        {{ '最后修改于 ' + dayjs(info.lastUpdateTime).fromNow() }}
        {{ info.uv ? info.uv + ' 次阅读' : '' }}
        {{ info.likeNum ? info.likeNum + ' 个点赞' : '' }}
      </h3>
      <button class="learn-more" @click.prevent="toDetail">
        <span class="circle" aria-hidden="true">
          <span class="icon arrow" />
        </span>
        <span class="button-text">Learn More</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    info: {
      type: Object,
      require: true
    }
  },
  methods: {
    toDetail() {
      this.$router.push('/page/detail/' + this.info.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap");
$bg: #f3f8fa;
$white: #fff;
$black: #282936;
@mixin transition($property: all, $duration: 0.45s, $ease: cubic-bezier(0.65,0,.076,1)) {
  transition: $property $duration $ease;
}
button {
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
&.learn-more {
   width: 12rem;
   height: auto;
.circle {
  @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
  position: relative;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background: $black;
  border-radius: 1.625rem;
.icon {
  @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: $white;
&.arrow {
   @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
   left: 0.625rem;
   width: 1.125rem;
   height: 0.125rem;
   background: none;
&::before {
   position: absolute;
   content: '';
   top: -0.25rem;
   right: 0.0625rem;
   width: 0.625rem;
   height: 0.625rem;
   border-top: 0.125rem solid #fff;
   border-right: 0.125rem solid #fff;
   transform: rotate(45deg);
 }
}
}
}
.button-text {
  @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0;
  margin: 0 0 0 1.85rem;
  color: $black;
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
}
}
&:hover {
.circle {
  width: 100%;
.icon {
&.arrow {
   background: $white;
   transform: translate(1rem, 0);
 }
}
}
.button-text {
  color: $white;
}
}
}

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }

  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }
}

.blog_post {
  font-family: "Roboto", sans-serif !important;
  font-size: 12px;
  background: #fff;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
  margin: 1rem;
  flex: 1;
}

.container_copy {
  padding: 6rem 4rem 5rem 4rem;
  width: 500px;
}

img {
  height: 8.3rem;
  width: 8.3rem;
  position: relative;
  border-radius: 100%;
  box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
  z-index: 1;
}

h3 {
  margin: 0 0 1.5rem 0;
  color: #999;
  font-size: 0.7rem;
}

h1 {
  margin: 1rem 0;
  font-size: 1.8rem;
  letter-spacing: 0.5px;
  color: #333;
}

p {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  line-height: 1.45;
  color: #333;
}

.span_primary {
  border: none;
  outline: none;
  background: linear-gradient(90deg, #ff9966, #ff5e62);
  padding: 0.1rem 0.5rem;;
  border-radius: 50px;
  color: white;
  font-size: 1.2rem;
  box-shadow: 1px 10px 2rem rgba(255, 94, 98, 0.5);
  transition: all 0.2s ease-in;
  text-decoration: none;
}
.btn_primary {
  border: none;
  outline: none;
  background: linear-gradient(90deg, #ff9966, #ff5e62);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: white;
  font-size: 1.2rem;
  box-shadow: 1px 10px 2rem rgba(255, 94, 98, 0.5);
  transition: all 0.2s ease-in;
  text-decoration: none;
}

.btn_primary:hover {
  box-shadow: 0px 5px 1rem rgba(255, 94, 98, 0.5);
}

@media only screen and (max-width: 650px) {
  body {
    background-color: black;
  }
}
</style>
