<template>
  <div class="checkbox-group">
    <h1>分类</h1>
    <div class="main">
      <div
        v-for="item in list"
        :key="item.id"
        class="checkbox"
        @click="clickHandle(item.id)"
      >
        <label class="checkbox-wrapper">
          <input type="radio" class="checkbox-input" name="type" :checked="item.id == id">
          <span class="checkbox-tile">
            <span class="checkbox-icon">
              <svg-icon :icon-class="item.name.toLowerCase()" />
            </span>
            <span class="checkbox-label">{{ item.name }}</span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    list: {
      type: Array,
      require: true
    },
    classId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: ''
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.id = val.params.classId
      }
    }
  },
  created() {
    this.id = this.classId
  },
  methods: {
    clickHandle(id) {
      if (this.$route.params.classId !== id) {
        this.$router.push({
          path: '/page/class/' + id
        }).catch(err => err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
//Color Varibles
$accent-color: #3b44fb;
$body-bg: #f0f0ff;
$container-bg: rgba(250 250 250 / 50%);
$task-bg: #fff;

//Basic Varibles
$font-family: 'Poppins', sans-serif;
$font-color: #0d0d0d;
$border-radius: .75rem;
$button-size: 3rem;
$transition: all 0.30s ease-in-out;;

*,
*:after,
*:before {
  box-sizing: border-box;
}

.checkbox-group {
  flex-direction: column;
  align-items: stretch;
  background-color: $container-bg;
  padding: 0;
  box-shadow: 0 20px 30px 0 rgba(1, 1, 1, 0.07);
  margin: 1rem 0;
  border-radius: $border-radius;
  & h1 {
    padding: 0;
    margin: 0;
    text-align: center;
  }
}
.main {
  padding: 0 0.5rem 1rem;
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: .5rem 0.5rem;
  }
}
.checkbox-input {
// Code to hide the input
clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;

&:checked + .checkbox-tile {
   border-color: #2260ff;
   box-shadow: 0 5px 10px rgba(#000, 0.1);
   color: #2260ff;
&:before {
   transform: scale(1);
   opacity: 1;
   background-color: #2260ff;
   border-color: #2260ff;
 }

.checkbox-icon, .checkbox-label {
  color: #2260ff;
}
}

&:focus + .checkbox-tile {
   border-color: #2260ff;
   box-shadow: 0 5px 10px rgba(#000, 0.1), 0 0 0 4px #b5c9fc;
&:before {
   transform: scale(1);
   opacity: 1;
 }
}
}

.checkbox-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 7rem;
  min-height: 7rem;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(#000, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;

&:before {
   content: "";
   position: absolute;
   display: block;
   width: 1.25rem;
   height: 1.25rem;
   border: 2px solid #b5bfd9;
   background-color: #fff;
   border-radius: 50%;
   top: 0.25rem;
   left: 0.25rem;
   opacity: 0;
   transform: scale(0);
   transition: 0.25s ease;
   background-size: 12px;
   background-repeat: no-repeat;
   background-position: 50% 50%;
 }

&:hover {
   border-color: #2260ff;
&:before {
   transform: scale(1);
   opacity: 1;
 }
}
}

.checkbox-icon {
  transition: .375s ease;
  color: #494949;
svg {
  width: 3rem;
  height: 3rem;
}
}

.checkbox-label {
  color: #707070;
  transition: .375s ease;
  text-align: center;
}
</style>
