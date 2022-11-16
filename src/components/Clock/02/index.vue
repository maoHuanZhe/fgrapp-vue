<template>
  <div class="clock body light-theme">
    <div class="block" data-num="0"></div>
    <div class="block" data-num="1"></div>
    <div class="block" data-num="2"></div>
    <div class="block" data-num="3"></div>
    <div class="block" data-num="4"></div>
    <div class="block" data-num="5"></div>
    <div class="block" data-num="6"></div>
    <div class="block" data-num="7"></div>
    <div class="block" data-num="8"></div>
    <div class="block" data-num="9"></div>
    <div class="block" data-num="10"></div>
    <div class="block" data-num="11"></div>
    <div class="block" data-num="12"></div>
    <div class="block" data-num="13"></div>
    <div class="block" data-num="14"></div>
    <div class="block" data-num="15"></div>
    <div class="block" data-num="16"></div>
    <div class="block" data-num="17"></div>
    <div class="block" data-num="18"></div>
    <div class="block" data-num="19"></div>
    <div class="block" data-num="20"></div>
    <div class="block" data-num="21"></div>
    <div class="block" data-num="22"></div>
    <div class="block" data-num="23"></div>
    <div class="block" data-num="24"></div>
    <div class="block" data-num="25"></div>
    <div class="block" data-num="26"></div>
    <div class="block" data-num="27"></div>
    <div class="block" data-num="28"></div>
    <div class="block" data-num="29"></div>
    <div class="block" data-num="30"></div>
    <div class="block" data-num="31"></div>
    <div class="block" data-num="32"></div>
    <div class="block" data-num="33"></div>
    <div class="block" data-num="34"></div>
    <div class="block" data-num="35"></div>
    <div class="block" data-num="36"></div>
    <div class="block" data-num="37"></div>
    <div class="block" data-num="38"></div>
    <div class="block" data-num="39"></div>
    <div class="block" data-num="40"></div>
    <div class="block" data-num="41"></div>
    <div class="block" data-num="42"></div>
    <div class="block" data-num="43"></div>
    <div class="block" data-num="44"></div>
    <div class="block" data-num="45"></div>
    <div class="block" data-num="46"></div>
    <div class="block" data-num="47"></div>
    <div class="block" data-num="48"></div>
    <div class="block" data-num="49"></div>
    <div class="block" data-num="50"></div>
    <div class="block" data-num="51"></div>
    <div class="block" data-num="52"></div>
    <div class="block" data-num="53"></div>
    <div class="block" data-num="54"></div>
    <div class="block" data-num="55"></div>
    <div class="block" data-num="56"></div>
    <div class="block" data-num="57"></div>
    <div class="block" data-num="58"></div>
    <div class="block" data-num="59"></div>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: "index",
  mounted() {
    const numbers = [
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], // 0
      [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], // 1
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1], // 2
      [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 3
      [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1], // 4
      [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 5
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 6
      [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0], // 7
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 8
      [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1]  // 9
    ];

    const blocks = [];
    const digits = Array.from(document.querySelectorAll('.block'));

    for (let i = 0; i < 4; i++) {
      blocks.push(digits.slice( i * 15, i * 15 + 15 ));
    }

    const setNum = (block, num) => {
      let n = numbers[num];
      for (let i = 0; i < block.length; i++) {
        block[i].classList[ n[i] === 1 ?  'add' : 'remove']('active');
      }
    };

    const time = {
      s: '',
      m: '',
      h: '',
      p: null
    };

// time loop
    const animator = () => {
      let d = new Date(),
        h = d.getHours().toString(),
        m = d.getMinutes().toString(),
        s = d.getSeconds().toString();

      s = s.length === 1 ? '0' + s : s;
      m = m.length === 1 ? '0' + m : m;
      h = h.length === 1 ? '0' + h : h;

      if (s !== time.s) {
        for (let i = 0; i < digits.length; i++) {
          let d = digits[i];
          if (i === +s) {
            d.classList.add('second');
            if (time.p !== null)
              digits[time.p].classList.remove('second');
            time.p = i;
            time.s = s;
          }
        }
      }

      if (m !== time.m) {
        setNum(blocks[2], m[0]);
        setNum(blocks[3], m[1]);
        time.m = m;
      }

      if (h !== time.h) {
        setNum(blocks[0], h[0]);
        setNum(blocks[1], h[1]);
        time.h = h;
      }
      window.requestAnimationFrame(animator)
    }

// init
    window.requestAnimationFrame(animator)
  }
}
</script>

<style scoped lang="sass">
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:300,500")
.body
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  background: linear-gradient(to bottom right, #0f0f0f, #1a1a1a)
  transition: all .4s
  font-family: 'Roboto Mono', monospace
  font-weight: 300

// clock styles
// ------------------

.clock
  position: relative
  display: flex
  flex-flow: column wrap
  width: 280px
  height: 100px

.block
  //width: calc(100% / 12)
  height: 20%
  color: lighten(#333, 8%)
  transition: .4s
  &:not(:nth-child(n + 16)):nth-child(n + 11),
  &:not(:nth-child(n + 46)):nth-child(n + 41)
    margin-right: 10px
  &:not(:nth-child(n + 31)):nth-child(n + 26)
    margin-right: 20px
  &:before
    content: attr(data-num)
    position: relative
    display: block
    font-size: 16px
    width: 100%
    height: 100%
    line-height: 20px
    text-align: center
  &:nth-child(-n + 10):before
    content: '0' attr(data-num)
  &.active:before
    color: whitesmoke
    font-weight: 500
  &.second:before
    color: #FF8300

.divider
  position: absolute
  width: 2px
  background-color: whitesmoke
  height: 60%
  top: 20%
  left: calc(50%)

// light theme
// ------------------------

.body.light-theme
  background: #fff
  .block
    //outline: 1px solid lighten(silver, 12%)
    color: darken(silver, 8%)
    &.active:before
      color: #333
    &.second
      background: lighten(silver, 8%)
      &:before
        color: #333
  .divider
    background: #333

// toggle button - taken straight from W3C
// ------------------------

.switch-theme
  position: absolute
  bottom: 40px
  right: 40px
  color: grey

.switch
  position: relative
  display: inline-block
  width: 60px
  height: 34px
  margin-left: 30px
  input
    display: none

.slider
  position: absolute
  cursor: pointer
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #ccc
  transition: all .4s
  border-radius: 34px

  &:before
    position: absolute
    content: ''
    height: 26px
    width: 26px
    left: 4px
    bottom: 4px
    background-color: white
    transition: .4s
    border-radius: 50%

input:checked + .slider
  background-color: #333

input:focus + .slider
  box-shadow: 0 0 1px #2196F3

input:checked + .slider:before
  transform: translateX(26px)
</style>
