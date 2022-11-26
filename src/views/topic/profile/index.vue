<template>
  <div class="header__wrapper">
    <header />
    <div class="cols__container">
      <div class="left__col">
        <div class="img__container">
          <img src="https://avatars.githubusercontent.com/u/33337057?v=4&auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Alexandra Smith">
          <span />
        </div>
        <h2>樊光瑞</h2>
        <p>Java 开发工程师</p>
        <p>898365387@qq.com</p>

        <ul class="about">
          <li><span>{{ data.pv }}</span>PV</li>
          <li><span>{{ data.uv }}</span>UV</li>
          <li><span>{{ data.liked }}</span>点赞</li>
          <li><span>{{ data.comments }}</span>评论</li>
        </ul>

        <div class="content">
          <p>
            一个平平无奇的小天才
          </p>
          <Icon />
        </div>
      </div>
      <div class="right__col">
        <el-tabs type="border-card">
          <el-tab-pane label="提交统计">
            <Submission v-if="data.commit" :profile="data.commit" />
          </el-tab-pane>
          <el-tab-pane label="访问统计">
            <Submission v-if="data.active" :content="'访问'" :profile="data.active" />
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>

  </div>
</template>

<script>
import Icon from '@/views/topic/profile/icon/index'
import Submission from '@/components/Submission'
import { getNum } from '@/api/topic'
export default {
  name: 'Index',
  components: {
    Icon,
    Submission
  },
  data() {
    return {
      data: {}
    }
  },
  created() {
    getNum().then(({ data }) => {
      this.data = data
    })
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body{
  width:100%;
  margin:0;
  padding:0;
  box-sizing:border-box;
  min-height:100vh;
  font-family: 'Poppins', sans-serif;
}

ul{
  list-style-type:none;
  margin:0;
  padding:0;
  display:flex;
  align-items:center;
}

a{
  text-decoration:none;
}

.header__wrapper{
  header{
    width:100%;
    background:url("https://cdn.staticaly.com/gh/maoHuanZhe/image@main/profile-background.5srd3yl9big.webp?auto=compress&cs=tinysrgb&dpr=2&h=600&w=940") no-repeat 50% 20%/cover;
    min-height:calc(100px + 15vw);

  }
  .cols__container{
    @media (min-width:868px){
      max-width: 1200px;
      margin: 0 auto;
      width: 90%;
      justify-content:space-between;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap:50px;
    }
    .left__col{
      padding:25px 20px;
      text-align:center;
      max-width:350px;
      position:relative;
      margin:0 auto;

      @media (min-width:868px){
        padding:25px 0px;
      }
      @media (min-width:1017px){
        margin:0;
        margin-right:auto;
      }

      .img__container{
        position:absolute;
        top:-60px;
        left:50%;
        transform:translatex(-50%);

        img{
          width:120px;
          height:120px;
          object-fit:cover;
          border-radius:50%;
          display:block;
          box-shadow:1px 3px 12px rgb(0 0 0 / 18%);
        }

        span{
          position:absolute;
          background: #2afa6a;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          bottom: 3px;
          right: 11px;
          border: 2px solid #fff;
        }
      }

      h2{
        margin-top:60px;
        font-weight:600;
        font-size:22px;
        margin-bottom:5px;
      }

      p{
        font-size:0.9rem;
        color:#818181;
        margin:0;
      }

      .about{
        justify-content:space-between;
        position:relative;
        margin:35px 0;

        li{
          display:flex;
          flex-direction:column;
          color:#818181;
          font-size:0.9rem;

          span{
            color:#1d1d1d;
            font-weight:600;
          }
        }

        &:after{
          position:absolute;
          content:"";
          bottom:-16px;
          display:block;
          background:#cccccc;
          height:1px;
          width:100%;
        }
      }
    }
    .content{
      p{
        font-size:1rem;
        color:#1d1d1d;
        line-height:1.8em;
      }
      ul{
        gap:30px;
        justify-content:center;
        align-items:center;
        margin-top:25px;

        li{
          display:flex;
        }

        i{
          font-size:1.3rem;
        }
      }
    }

    .right__col{
      nav{
        display:flex;
        align-items:center;
        padding:30px 0;
        justify-content:space-between;
        flex-direction:column;

        @media (min-width:1016px){
          flex-direction:row;
        }
        ul{
          display:flex;
          gap:20px;
          flex-direction:column;

          @media (min-width:868px){
            flex-direction:row;
            gap:30px;
          }

          li{
            a{
              text-transform:uppercase;
              color:#818181;

            }
            &:nth-child(1) a{
              color:#1d1d1d;
              font-weight:600;
            }

          }

        }
        button{
          background: #0091ff;
          color: #fff;
          border: none;
          padding: 10px 25px;
          border-radius: 4px;
          cursor: pointer;
          margin-top:20px;

          &:hover{
            opacity:.8;
          }

          @media (min-width:1016px){
            margin-top:0;
          }
        }
      }
      .photos{
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(190px,1fr));
        gap: 20px;

        img{
          max-width:100%;
          display:block;
          height:100%;
          object-fit:cover;
        }

        @media (min-width:868px){
          height: 365px;
          overflow: auto;
          padding: 0 0 30px;
        }
      }
    }
  }
}
</style>
