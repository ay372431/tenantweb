<!--
 * @Description: 个人中心主入口
 * @Author: gao shuai
 * @Date: 2020-06-13 11:32:01
 * @LastEditTime: 2020-08-19 14:49:10
 * @LastEditors: gao shuai
-->
<template>
  <div class="main">
    <div class="header"  :style="headerStyle">
      <div class="headbox clearfix" :style="headerStyle"  style="display: flex;">
        <div class="logo"><img src="http://www.10pay.com/themes/ucenter/default/images/uc.png" alt="" /></div>
        <ul class="navbox clearfix" style="width: 75%;">
          <li :class="{ active: activeNav === '/main/home' }" 
          :style="activeNav === '/main/home' ? activeNavStyle : (hoverNav === '/main/home' ? hoverNavStyle : null)"
          
          @click="refresh('/main/home')">
            <span class="icon1" @click="refresh('/main/home')">首页</span>
          </li>
          <li :class="{ active: activeNav === '/main/Ordermanagement' }" 
          :style="activeNav === '/main/Ordermanagement' ? activeNavStyle : (hoverNav === '/main/Ordermanagement' ? hoverNavStyle : null)"
          
          @click="refresh('/main/Ordermanagement')">
            <span class="icon1" @click="refresh('/main/Ordermanagement')"
              >订单管理</span
            >
          </li>
          <li :class="{ active: activeNav === '/main/Zoningmanagement' }" 
          :style="activeNav === '/main/Zoningmanagement' ? activeNavStyle : (hoverNav === '/main/Zoningmanagement' ? hoverNavStyle : null)"
          
          @click="refresh('/main/Zoningmanagement')">
            <span class="icon1" @click="refresh('/main/Zoningmanagement')"
              >分区管理</span
            >
          </li>
          <li :class="{ active: activeNav === '/main/DA' }" 
          :style="activeNav === '/main/DA' ? activeNavStyle : (hoverNav === '/main/DA' ? hoverNavStyle : null)"
          
          @click="refresh('/main/DA')">
            <span class="icon1" @click="refresh('/main/DA')">数据分析</span>
          </li>
          <li :class="{ active: activeNav === '/personal' }" 
          :style="activeNav === '/personal' ? activeNavStyle : (hoverNav === '/personal' ? hoverNavStyle : null)"
          
          @click="refresh('/personal')">
            <span class="icon1" @click="refresh('/personal')">账户管理</span>
          </li>
           <li v-if="$store.state.isEnabledPaid" :class="{ active: activeNav === '/behalf' }" 
          :style="activeNav === '/behalf' ? activeNavStyle : (hoverNav === '/behalf' ? hoverNavStyle : null)"
          
          @click="refresh('/behalf')">
            <span class="icon1" @click="refresh('/behalf')">代付管理</span>
          </li>
          <li v-if="userType" :class="{ active: activeNav === '/agentsystem' }" 
          :style="activeNav === '/agentsystem' ? activeNavStyle : (hoverNav === '/agentsystem' ? hoverNavStyle : null)"
          
          @click="refresh('/agentsystem')">
            <span class="icon1" @click="refresh('/agentsystem')">代理系统</span>
          </li>
        </ul>
        <div class="count" style="width: 6%;">{{ nickName }}</div>
      </div>
    </div>
    <div class="container">
      <div class="midleContaner" style="background: #f2f2f2;width: 1280px;">
        <div class="slider"  :style="sliderStyle">
          <div class="top_tit" :style="headerStyle">个人中心</div>
          <ul>
            <li  :style="sliderStyle">
              <span class="icon1" style="" @click="refresh('/personal/baseInfo')"
                >用户信息</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon2" style="" @click="refresh('/personal/sharedetails')"
                >三方开户</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon3" style="" @click="refresh('/personal/rateList')"
                >结算比例</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon4" style="" @click="refresh('/personal/password')"
                >二级密码</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon5" style="" @click="refresh('/personal/fenyong')"
                >推广分佣</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon6" style="" @click="refresh('/personal/weixin')"
                >微信绑定</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon7" style="" @click="refresh('/personal/recoder')"
                >结算记录</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon8" style="" @click="refresh('/personal/acountsafe')"
                >账号安全</span
              >
            </li>
            <!-- <li style="color: black;">
              <span class="icon5" style="" @click="refresh('/personal/conectKey')"
                >通讯密钥</span
              >
            </li> -->
            <li  :style="sliderStyle">
              <span class="icon9" style="" @click="refresh('/personal/Withdrawalrecords')"
                >提现记录</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon10" style="" @click="refresh('/personal/orderInterval')"
                >定时任务</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon11" style="" @click="refresh('/personal/Userlogs')"
                >用户日志</span
              >
            </li>
            <li  :style="sliderStyle">
              <span class="icon12" style="" @click="refresh('/personal/wechat')"
                >微信动态密保</span
              >
            </li>
          </ul>
        </div>
        <div class="contentbox">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'personal',
  inject: ['reload'],
  data() {
    return {
      activeNav: '/personal', // 默认选中首页
      skinNum: Number(localStorage.getItem('skinNum')) || 0,
      hoverNav: '', // 当前 hover 的菜单 path
    };
  },
  computed: {
    ...mapState(['userType', 'nickName']),
    headerStyle() {
      // 根据皮肤号返回不同背景色
      switch (this.skinNum) {
        case 1: return { background: '#88434f',color: 'white'};
        case 2: return { background: '#0398d6',color: 'white' };
        case 3: return { background: '#3370ff',color: 'white'};
        case 4: return { background: '#d75f28',color: 'white' };
        case 5: return { background: '#88434f',color: 'white'};
        case 6: return { background: '#5d4aee',color: 'white' };
        default: return { background: '#2d3338',color: 'white' };
      }
    },
    sliderStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#eee2e4', color: 'grey' };
        case 2: return { background: '#e0eaf2', color: 'grey' };
        case 3: return { background: '#e5e6f6', color: 'grey' };
        case 4: return { background: '#f6e5e0', color: 'grey' };
        case 5: return { background: '#e9e3f4', color: 'grey' };
        case 6: return { background: '#e5e0e2', color: 'grey' };
        default: return { background: 'var(--312143a6)', color: 'grey' };
      }
    },
    activeNavStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪绿
        case 2: return { background: '#a7c7e7', color: '#fff' }; // 莫兰迪蓝
        case 3: return { background: '#b7afc6', color: '#fff' }; // 莫兰迪紫
        case 4: return { background: '#e6c1c5', color: '#fff' }; // 莫兰迪粉
        case 5: return { background: '#e9d7a5', color: '#fff' }; // 莫兰迪黄
        case 6: return { background: '#b4b8ab', color: '#fff' }; // 莫兰迪灰
        default: return { background: '#b5c9b8', color: '#fff' };
      }
    },
    hoverNavStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪绿加深
        case 2: return { background: '#a7c7e7', color: '#fff' }; // 莫兰迪蓝加深
        case 3: return { background: '#b7afc6', color: '#fff' }; // 莫兰迪紫加深
        case 4: return { background: '#e6c1c5', color: '#fff' }; // 莫兰迪粉加深
        case 5: return { background: '#e9d7a5', color: '#fff' }; // 莫兰迪黄加深
        case 6: return { background: '#b4b8ab', color: '#fff' }; // 莫兰迪灰加深
        default: return { background: '#b5c9b8', color: '#fff' };
      }
    },
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then(data => {
          this.$store.commit('saveuuid', data.data.uuid);
          this.$store.commit('saveType', data.data.type);
          this.$store.commit('changeNickName', data.data.userName);
          this.$store.commit('changeId', data.data.id);
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 跳转路由刷新
    refresh(path) {
      if (this.$route.path.indexOf(path) > -1) {
        this.reload();
      } else {
        this.$router.push({
          path: path
        });
      }
    }
  },
  created() {
    this.getUser();
    // 监听皮肤切换事件
    this.$root.$on('skin-change', num => {
      this.skinNum = num;
    });
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  padding-top: 60px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #e6edf5;

  .header {
    position: absolute;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
    background: #63dcfa;

    .headbox {
      width: 80vw;
      margin: 0 auto;
      height: 60px;

      .logo {
        margin-top: 13px;
        float: left;
        width: 20%;
        text-align: right;
      }

      .navbox {
        float: left;
        // margin-top: 15px;
        margin-left: 50px;

        li {
          float: left;
          padding: 0 35px;
          height: 60px;
          line-height: 60px;
          // border-right: 1px solid #fff;
          color: #fff;
          font-size: 16px;
          // position: relative;
          // &::after{
          //   content: '';
          //   position: absolute;
          //   right: 0;
          //   top: 20%;      /* 距顶部30% */
          //   height: 60%;   /* 高度为元素的40% */
          //   width: 0;
          //   border-right: 1px solid #fff;
          // }
          span {
            cursor: pointer;
          }
        }
      }

      .count {
        float: right;
        height: 28px;
        line-height: 28px;
        padding: 0 20px;
        margin-right: 30px;
        font-size: 19px;
        color: #fff;
        margin-top: 15px;
        text-align: center;
      }
    }
  }

  .container {
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }

    .midleContaner {
      width: 80vw;
      margin: 20px auto 22px;
      position: relative;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      // box-shadow: 0 0 10px rgba(0, 0, 0, .25);
      .slider {
        position: absolute;
        width: 178px;
        // background: #0398d6;
        height: 100%;
        left: 0;
        top: 0;

        .top_tit {
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          background: #0398d6;
        }

        ul {
          // margin-top: 30px;

          li {
            height: 35px;
            line-height: 35px;
            // border-bottom: 1px solid #fff;
            margin-bottom: 10px;
            color: #fff;
            font-size: 14px;
            position: relative;
            border-bottom: none; // 先去掉原有的
            &::after {
              content: '';
              position: absolute;
              left: 20px; // 距离左侧20px
              right: 20px; // 距离右侧20px
              bottom: 0;
              height: 1px;
              background: #f8f7f7;
            }
            span {
              display: block;
              cursor: pointer;
              height: 35px;
              padding-left: 66px;

              &.icon1 {
                background: url(../../assets/images/xinxi.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }

              &.icon2 {
                background: url(../../assets/images/kaihu.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }

              &.icon3 {
                background: url(../../assets/images/jiesuan.png) no-repeat 40px
                  center;
                background-size: auto 18px;
              }

              &.icon4 {
                background: url(../../assets/images/ejmm.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }

              &.icon5 {
                background: url(../../assets/images/tgfy.png) no-repeat 40px
                  center;
                background-size: auto 18px;
              }

              &.icon6 {
                background: url(../../assets/images/wxbd.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }

              &.icon7 {
                background: url(../../assets/images/jsjl.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }
              &.icon8 {
                background: url(../../assets/images/zhaq.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }
              &.icon9 {
                background: url(../../assets/images/txjl.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }
              &.icon10 {
                background: url(../../assets/images/dsrw.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }
              &.icon11 {
                background: url(../../assets/images/yhrz.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }
              &.icon12 {
                background: url(../../assets/images/dtmb.png) no-repeat 39px
                  center;
                background-size: auto 18px;
              }
            }
          }
        }
      }

      .contentbox {
        min-height: 800px;
        margin-left: 178px;
      }
    }
  }

  .areaContainer {
    padding: 0 0 20px 15px;

    li {
      position: relative;
      float: left;
      border: 1px solid #ddd;
      padding: 4px;
      cursor: pointer;
      margin-right: 17px;

      .imgbox {
        padding: 15px 8px;
      }

      .mask {
        display: none;
        position: absolute;
        top: 4px;
        left: 4px;
        width: 112px;
        height: 90px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        text-align: center;
        line-height: 90px;
      }

      &:hover {
        border-color: #00b066;

        .mask {
          display: block;
        }
      }

      img {
        display: block;
      }
    }
  }
}
</style>
