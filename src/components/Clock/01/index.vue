<template>
  <div class="container">
    <h1 id="headline">网站已经发布了</h1>
    <div id="countdown">
      <ul>
        <li><span id="days">{{ days }}</span>days</li>
        <li><span id="hours">{{ hours }}</span>Hours</li>
        <li><span id="minutes">{{ minutes }}</span>Minutes</li>
        <li><span id="seconds">{{ seconds }}</span>Seconds</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
      start : this.dayjs('2022-11-13 14:21:00')
    }
  },
  mounted() {
    setInterval(() => {
      const date1 = this.dayjs()
      this.seconds = date1.diff(this.start,'second') % 60;
      this.minutes = date1.diff(this.start,'minute') % 60;
      this.hours = date1.diff(this.start,'hour') % 24;
      this.days = date1.diff(this.start,'day');
    }, 1000)
  }
}
</script>

<style scoped>
/* general styling */
:root {
  --smaller: .75;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  align-items: center;
  background-color: #ffd54f;
  display: flex;

}

.container {
  color: #333;
  margin: 0 auto;
  text-align: center;
  font-family: -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  Oxygen-Sans,
  Ubuntu,
  Cantarell,
  "Helvetica Neue",
  sans-serif;
}

h1 {
  font-weight: normal;
  letter-spacing: .125rem;
  text-transform: uppercase;
}

li {
  display: inline-block;
  font-size: 1em;
  list-style-type: none;
  padding: 1em;
  text-transform: uppercase;
}

li span {
  display: block;
  font-size: 2rem;
}

.emoji {
  display: none;
  padding: 1rem;
}

.emoji span {
  font-size: 4rem;
  padding: 0 .5rem;
}

@media all and (max-width: 768px) {
  h1 {
    font-size: calc(1.5rem * var(--smaller));
  }

  li {
    font-size: calc(1.125rem * var(--smaller));
  }

  li span {
    font-size: calc(3.375rem * var(--smaller));
  }
}
</style>
