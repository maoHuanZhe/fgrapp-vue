<template>
  <div class="body">
    <button class="button" ref="Ref_btn" @click="btnClick">
      <div class="inner">
        <div class="icon">
          <div class="person">
            <div class="arm"></div>
            <div class="arm right"></div>
            <div class="leg"></div>
            <div class="leg right"></div>
          </div>
          <div class="weight"></div>
        </div>
        <div class="text">
          <span>一键三连</span>
          <span>Yaay! Submitted.</span>
        </div>
      </div>
    </button>

    <!-- dribbble - twitter -->
    <a class="dribbble" href="https://dribbble.com/ai" target="_blank"><img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt=""></a>
    <a class="twitter" target="_top" href="https://twitter.com/aaroniker_me"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><path d="M67.812 16.141a26.246 26.246 0 0 1-7.519 2.06 13.134 13.134 0 0 0 5.756-7.244 26.127 26.127 0 0 1-8.313 3.176A13.075 13.075 0 0 0 48.182 10c-7.229 0-13.092 5.861-13.092 13.093 0 1.026.118 2.021.338 2.981-10.885-.548-20.528-5.757-26.987-13.679a13.048 13.048 0 0 0-1.771 6.581c0 4.542 2.312 8.551 5.824 10.898a13.048 13.048 0 0 1-5.93-1.638c-.002.055-.002.11-.002.162 0 6.345 4.513 11.638 10.504 12.84a13.177 13.177 0 0 1-3.449.457c-.846 0-1.667-.078-2.465-.231 1.667 5.2 6.499 8.986 12.23 9.09a26.276 26.276 0 0 1-16.26 5.606A26.21 26.21 0 0 1 4 55.976a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.251-19.949 37.251-37.249 0-.566-.014-1.134-.039-1.694a26.597 26.597 0 0 0 6.533-6.774z"></path></svg></a>
  </div>
</template>

<script>
import gsap from '@/lib/js/gsap.min'
export default {
  name: "index",
  data() {
    return {
      up : 0,
      confettiAmount : 100,
      confettiColors : [
        '#7d32f5',
        '#f6e434',
        '#63fdf1',
        '#e672da',
        '#295dfe',
        '#6e57ff'
      ],
      complete : false,
      timeline : ''
    }
  },
  methods: {
    btnClick(e) {
      this.up = 1;
      const rippleDiv = document.createElement('div');
      rippleDiv.className = 'ripple';
      const boundingClientRect = this.$refs.Ref_btn.getBoundingClientRect();
      this.$refs.Ref_btn.style.setProperty('--ripple-x', e.clientX - boundingClientRect.left);
      this.$refs.Ref_btn.style.setProperty('--ripple-y', e.clientY - boundingClientRect.top);
      this.$refs.Ref_btn.querySelector('.inner').appendChild(rippleDiv);
      setTimeout(() => rippleDiv.remove(), 500);
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    createConfetti(to) {
      let elem = document.createElement('i'),
        set = Math.random() < 0.5 ? -1 : 1;
      elem.style.setProperty('--x', this.random(-360, 360) + 'px');
      elem.style.setProperty('--y', this.random(-200, 200) + 'px');
      elem.style.setProperty('--r', this.random(0, 360) + 'deg');
      elem.style.setProperty('--s', this.random(.6, 1));
      elem.style.setProperty('--b', this.confettiColors[this.random(0, 5)]);
      to.appendChild(elem);
    }
  },
  mounted() {
    setInterval(() => {
      this.up = this.up > 0 ? this.up - .1 : 0;
      let progress = this.timeline.progress(),
        direction = this.up > 0 ? 1 : -1.5;
      if(!this.complete) {
        this.timeline.progress(progress + .01 * direction);
      }

    }, 1000 / 60);
    this.timeline = gsap.timeline({
      paused: true,
      ease: 'none',
      onComplete() {
        console.log("三连成功")
        this.complete = true;
        this.$refs.Ref_btn.classList.add('complete');
        for(let i = 0; i < this.confettiAmount; i++) {
          this.createConfetti(this.$refs.Ref_btn);
        }
        setTimeout(() => {
          this.$refs.Ref_btn.classList.add('confetti');
          setTimeout(() => this.$refs.Ref_btn.querySelectorAll('i').forEach(i => i.remove()), 600);
        }, 300);
        // Reset
        setTimeout(() => {
          this.$refs.Ref_btn.classList.remove('complete', 'confetti');
          this.complete = false;
        }, 2000);
      }
    })
    this.timeline.to(this.$refs.Ref_btn, {
      keyframes: [{
        '--weight-y': -6,
        '--arm-rotate-s-x': 90,
        duration: .3
      }, {
        '--weight-y': -10,
        '--arm-rotate-s-x': 45,
        '--arm-rotate-s': 130,
        duration: .2
      }, {
        '--weight-y': -12,
        '--arm-rotate-s': 130,
        '--arm-rotate-s-x': 0,
        duration: .1
      }, {
        '--weight-y': -20,
        '--person-y': -4,
        '--arm-rotate': 100,
        '--arm-rotate-s': 90,
        '--leg-y': 0,
        '--leg-rotate': 20,
        '--leg-rotate-s': -20,
        duration: .2
      }, {
        '--weight-y': -25,
        '--arm-rotate': 150,
        '--arm-rotate-s': 30,
        duration: .2
      }]
    });
  }
}
</script>

<style lang="scss" scoped>
.button {
  --color: #F6F8FF;
  --background: #171827;
  --background-hover: #0D0F18;
  --shadow: rgba(0, 9, 61, 0.12);
  --person: #F6F8FF;
  --person-arm: var(--person);
  --person-leg: #D1D6EE;
  --weight: #275EFE;
  --weight-disk: #5C86FF;
  --person-y: 0;
  --weight-y: 0;
  --arm-rotate: 40;
  --arm-rotate-s: -40;
  --arm-rotate-s-x: 0;
  --leg-y: -2;
  --leg-rotate: 45;
  --leg-rotate-s: -70;
  display: table;
  outline: none;
  border: none;
  background: none;
  padding: 0;
  position: relative;
  cursor: pointer;
  line-height: 24px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}
.button .inner {
  padding: 14px 20px;
  transition: transform 0.2s, background 0.4s;
  color: var(--color);
  position: relative;
  display: flex;
  z-index: 1;
  //min-width: 190px;
  border-radius: 13px;
  background: var(--b, var(--background));
  box-shadow: 0 1px 3px var(--shadow), 0 3px 7px var(--shadow);
  transform: scale(var(--scale, 1)) translateZ(0);
}
.button .inner:active {
  --scale: .95;
}
.button .inner:hover {
  --b: var(--background-hover);
}
.button .icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  display: block;
  position: relative;
}
.button .icon .person,
.button .icon .weight {
  position: absolute;
}
.button .icon .person {
  top: 7px;
  left: 9px;
  width: 6px;
  height: 10px;
  transform: translateY(calc(var(--person-y) * 1px));
}
.button .icon .person:before, .button .icon .person:after {
  content: "";
  position: absolute;
  left: 0;
}
.button .icon .person:before {
  top: -5px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--person);
  transform: scale(0.7);
  transform-origin: 50% 25%;
}
.button .icon .person:after {
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 2px 2px 3px 3px;
  background: var(--person);
}
.button .icon .person .arm,
.button .icon .person .leg {
  position: absolute;
  left: var(--left, 0);
  top: var(--top, 0);
  width: 2px;
  height: 7px;
  border-radius: 1px;
  transform-origin: 1px 1px;
  background: var(--background);
  transform: translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px)) rotateZ(calc(var(--rotate, 0) * 1deg));
}
.button .icon .person .arm:before,
.button .icon .person .leg:before {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 2px;
  height: 7px;
  border-radius: 1px;
  transform-origin: 1px 1px;
  background: inherit;
  transform: rotateZ(calc(var(--rotate-s, 0) * 1deg)) rotateX(calc(var(--rotate-s-x, 0) * 1deg));
}
.button .icon .person .arm.right,
.button .icon .person .leg.right {
  --left: 4px;
  transform: translate(calc(var(--x, 0) * -1px), calc(var(--y, 0) * 1px)) rotateZ(calc(var(--rotate, 0) * -1deg));
}
.button .icon .person .arm.right:before,
.button .icon .person .leg.right:before {
  transform: rotateZ(calc(var(--rotate-s, 0) * -1deg)) rotateX(calc(var(--rotate-s-x, 0) * 1deg));
}
.button .icon .person .arm {
  --background: var(--person-arm);
  --rotate: var(--arm-rotate);
  --rotate-s: var(--arm-rotate-s);
  --rotate-s-x: var(--arm-rotate-s-x);
  z-index: 1;
}
.button .icon .person .leg {
  --top: 8px;
  --background: var(--person-leg);
  --y: var(--leg-y);
  --rotate: var(--leg-rotate);
  --rotate-s: var(--leg-rotate-s);
}
.button .icon .weight {
  top: 17px;
  left: 0;
  width: 24px;
  height: 2px;
  border-radius: 1px;
  background: var(--weight);
  transform: translateY(calc(var(--weight-y, 0) * 1px));
}
.button .icon .weight:before, .button .icon .weight:after {
  content: "";
  position: absolute;
  border-radius: 1px;
  left: var(--l, 1px);
  top: var(--t, -2px);
  width: var(--w, 2px);
  height: var(--h, 6px);
  background: var(--weight-disk);
  box-shadow: var(--bx, 20px) 0 0 var(--weight-disk);
}
.button .icon .weight:after {
  --l: 3px;
  --t: -3px;
  --h: 8px;
  --bx: 16px;
}
.button .text {
  position: relative;
}
.button .text span {
  display: block;
  white-space: nowrap;
  opacity: var(--o, 1);
  transform: translateX(var(--x, 0));
  transition: transform 0.3s, opacity 0.2s;
}
.button .text span:last-child {
  --o: 0;
  --x: 8px;
  position: absolute;
  left: 0;
  top: 0;
}
.button .ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}
.button .ripple:before {
  content: "";
  position: absolute;
  top: calc(var(--ripple-y, 0) * 1px);
  left: calc(var(--ripple-x, 0) * 1px);
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  width: 200%;
  padding-bottom: 200%;
  border-radius: 50%;
  background: currentColor;
  -webkit-animation: ripple 0.5s ease-in;
  animation: ripple 0.5s ease-in;
}
.button i {
  position: absolute;
  display: block;
  width: 4px;
  height: 4px;
  top: 50%;
  left: 50%;
  margin: -2px 0 0 -2px;
  opacity: var(--o, 0);
  background: var(--b);
  transform: translate(var(--x), var(--y)) scale(var(--s, 1));
}
.button.complete .text span:first-child {
  --o: 0;
  --x: -8px;
}
.button.complete .text span:last-child {
  --o: 1;
  --x: 0;
}
.button.complete.confetti i {
  -webkit-animation: confetti 0.6s ease-out forwards;
  animation: confetti 0.6s ease-out forwards;
}

@-webkit-keyframes confetti {
  from {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes confetti {
  from {
    transform: translate(0, 0);
    opacity: 1;
  }
}
@-webkit-keyframes ripple {
  25% {
    opacity: 0.07;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes ripple {
  25% {
    opacity: 0.07;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

* {
  box-sizing: inherit;
}
*:before, *:after {
  box-sizing: inherit;
}

.body {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  //min-height: 100vh;
  display: flex;
  /*font-family: "Inter", Arial;*/
  justify-content: center;
  align-items: center;
  background: #E4ECFA;
}
.body .dribbble {
  position: fixed;
  display: block;
  right: 20px;
  bottom: 20px;
}
.body .dribbble img {
  display: block;
  height: 28px;
}
.body .twitter {
  position: fixed;
  display: block;
  right: 64px;
  bottom: 14px;
}
.body .twitter svg {
  width: 32px;
  height: 32px;
  fill: #1da1f2;
}
</style>
