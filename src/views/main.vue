<!--
 * @Description: 主进入口
 * @Author: gao shuai
 * @Date: 2020-03-16 18:56:21
 * @LastEditTime: 2020-09-19 17:42:27
 * @LastEditors: gao shuai
 -->
<template>
  <div class="main">
    <div class="header" :style="headboxStyle">
      <div class="headbox clearfix" :style="headboxStyle" style="display: flex;">
        <div class="logo"><img src="http://www.10pay.com/themes/ucenter/default/images/uc.png" alt="" /></div>
        <ul class="navbox clearfix" style="width: 75%;">
          <li 
          :class="{ active: activeNav === '/main/home' }" 
          :style="activeNav === '/main/home' ? activeNavStyle : (hoverNav === '/main/home' ? hoverNavStyle : null)"
          
          @click="setActive('/main/home')">
            <span class="icon1">首页</span>
          </li>
          <li 
          :class="{ active: activeNav === '/main/Ordermanagement' }" 
          :style="activeNav === '/main/Ordermanagement' ? activeNavStyle : (hoverNav === '/main/Ordermanagement' ? hoverNavStyle : null)"
          
          @click="setActive('/main/Ordermanagement')">
            <span class="icon1">订单管理</span
            >
          </li>
          <li 
          :class="{ active: activeNav === '/main/Zoningmanagement' }" 
          :style="activeNav === '/main/Zoningmanagement' ? activeNavStyle : (hoverNav === '/main/Zoningmanagement' ? hoverNavStyle : null)"
          
          @click="setActive('/main/Zoningmanagement')">
            <span class="icon1">分区管理</span
            >
          </li>
          <li 
          :class="{ active: activeNav === '/main/DA' }" 
          :style="activeNav === '/main/DA' ? activeNavStyle : (hoverNav === '/main/DA' ? hoverNavStyle : null)"
          
          @click="setActive('/main/DA')">
            <span class="icon1">数据分析</span>
          </li>
          <li @click="refresh('/personal')"
          :style="hoverNav === 'account' ? hoverNavStyle : null"
          >
            <span class="icon1">账户管理</span>
          </li>
          <li v-if="$store.state.isEnabledPaid" @click="refresh('/behalf')"
          :style="hoverNav === 'paid' ? hoverNavStyle : null"
          >
            <span class="icon1">代付管理</span>
          </li>
          <li v-if="userType" @click="refresh('/agentsystem')"
          :style="hoverNav === 'agent' ? hoverNavStyle : null"
          >
            <span class="icon1">代理系统</span>
          </li>
          <li 
          :class="{ active: activeNav === '/main/employee' }" 
          :style="activeNav === '/main/employee' ? activeNavStyle : (hoverNav === '/main/employee' ? hoverNavStyle : null)"
          
          @click="setActive('/main/employee')">
            <span class="icon1">员工管理</span>
          </li>
        </ul>
        <div class="count" style="width: 6%;">{{ nickName }}</div>
      </div>
    </div>
    <div class="container">
      <div class="midleContaner" style="background: #f2f2f2;width: 1280px;">
        <div class="slider" :style="sliderStyle">
          <div class="top_tit" :style="headboxStyle">控制面板</div>
          <ul>
            <li :style="sliderStyle" style="margin-top: 10px;">
              <span class="icon1" @click="refresh('/main/partmodules')"
                >分区模板</span
              >
            </li>
            <li :style="sliderStyle">
              <span class="icon2" @click="refresh('/main/partinstalls')"
                >安装分区</span
              >
            </li>
            <li :style="sliderStyle">
              <span class="icon3" @click="refresh('/main/Zoningmanagement')"
                >分区管理</span
              >
            </li>
            <li :style="sliderStyle">
              <span class="icon4" @click="refresh('/main/Groupmanagement')"
                >分组管理</span
              >
            </li>
            <li :style="sliderStyle">
              <span class="icon6" @click="refresh('/main/Orderreissue')"
                >订单补发</span
              >
            </li>
            <li :style="sliderStyle">
              <span class="icon5" @click="refresh('/main/Replacementofrecords')"
                >补发记录</span
              >
            </li>
            <li :style="sliderStyle">
              <span class="icon12" @click="refresh('/main/conectKey')"
                >通讯秘钥</span
              >
            </li>
            <!-- <li style="color: black;">
              <span class="icon7" @click="refresh('/main/Withdrawalrecords')"
                >提现记录</span
              >
            </li>
            <li style="color: black;">
              <span class="icon12" @click="refresh('/main/orderInterval')"
                >定时任务</span
              >
            </li> -->
            <!-- <li>
              <router-link tag="span" :to="{path:'/main/Userlogs'}" class="icon8">用户日志</router-link>
            </li> -->
            <li :style="sliderStyle">
              <span class="icon9" @click="refresh('/main/gaincode')"
                >获取代码</span
              >
            </li>
             <!-- <li style="color: black;">
              <span class="icon8" @click="refresh('/main/fenyong')"
                >推广分佣</span
              >
            </li> -->
            <li :style="sliderStyle">
              <span class="icon10" @click="download">下载网关</span>
            </li>
            <!-- <li>
              <span class="icon6" @click="refresh('/main/MobileGameDown')"
                >手游接口</span
              >
            </li> -->
            <li :style="sliderStyle">
              <span class="icon11" @click="loginOut">退出登录</span>
            </li>
          </ul>
        </div>
        <div class="contentbox" style="background: white;">
          <router-view />
        </div>
      </div>
    </div>
    <!-- 网关下载弹框 -->
    <el-dialog
      title="网关下载"
      :visible.sync="dialog.show"
      @close="dialoginit"
      custom-class="gs_dialog"
      width="350px"
    >
      <ul class="areaContainer clearfix">
        <!-- <li>
          <a href="http://192.168.1.80:5003/GateWay_Agent.rar">
            <el-tooltip class="item" effect="dark" content="热血传奇" placement="bottom">
              <div class="imgbox">
                <img src="../assets/images/index.png" alt="">
                <span class="mask">{{dialog.wg===''?'暂无下载':'点击下载'}}</span>
              </div>
            </el-tooltip>
          </a>
        </li> -->
        <li>
          <el-tooltip
            class="item"
            effect="dark"
            content="热血传奇"
            placement="bottom"
          >
            <div class="imgbox">
              <img src="../assets/images/index.png" alt="" />
              <span class="mask" @click="loadzip(1)">{{
                dialog.wg === '' ? '暂无下载' : '点击下载'
              }}</span>
            </div>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip
            class="item"
            effect="dark"
            content="传奇世界"
            placement="bottom"
          >
            <div class="imgbox">
              <img src="../assets/images/cs.png" alt="" />
              <span class="mask" @click="loadzip(2)">{{
                dialog.ty === '' ? '暂无下载' : '点击下载'
              }}</span>
            </div>
          </el-tooltip>
        </li>

        <!-- <li>
          <el-tooltip
            class="item"
            effect="dark"
            content="传奇三"
            placement="bottom"
          >
            <div class="imgbox">
              <img src="../assets/images/cq3.png" alt="" />
              <span class="mask" @click="loadzip(3)">{{
                dialog.cq3 === '' ? '暂无下载' : '点击下载'
              }}</span>
            </div>
          </el-tooltip>
        </li>
         <li>
          <el-tooltip class="item" effect="dark" content="奇迹MU" placement="bottom">
            <div class="imgbox">
              <img src="../assets/images/qiji.png" style="width: 96px;" alt="">
              <span class="mask" @click="loadzip(1)">{{dialog.wg===''?'暂无下载':'点击下载'}}</span>
            </div>
          </el-tooltip>
        </li> -->
        <!-- <li :class="{on:typeindex===4}" @click="typeChange(4)">
          <el-tooltip class="item" effect="dark" content="WEB通讯" placement="bottom">
            <img src="../assets/images/web.png" alt="">
          </el-tooltip>
        </li> -->
      </ul>
    </el-dialog>
    <charge-link
      v-if="preview"
      :chargeUrl="chargeUrl"
      :styleNum="floatingpictures"
      :styletype="floatstyle"
    ></charge-link>
    <iframe name="downloadIframe" style="display:none;"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import chargeLink from '../components/chargeLink';
import Mgr from '../assets/js/SecurityService';
import mgrs from '../assets/js/securityapi';
import { netUrl } from '../assets/js/version';
import axios from 'axios';
export default {
  name: 'Home',
  inject: ['reload'],
  components: {
    chargeLink
  },
  data() {
    return {
      // nickName: '', // 用户名
      // isAgent: false, // 是否为代理
      // id: '',
      role:'',
      dialog: {
        show: false,
        cq3: '', // 传奇3
        ty: '', // 传奇世界
        wg: '', // 热血传奇
        sql: '', // sql
        ltcq: '',
        yktl: '',
        dslh: '',
        ymcq: '',
        cqby: '',
        xbnz: '',
        jxqy: '',
      },
      activeNav: '/main/home', // 默认选中首页
      skinNum: Number(localStorage.getItem('skinNum')) || 0,
      hoverNav: '', // 当前 hover 的菜单 path
    };
  },
  computed: {
    ...mapState([
      'preview',
      'floatstyle',
      'floatingpictures',
      'chargeUrl',
      'userType',
      'id',
      'nickName'
    ]),
    headboxStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#88434f',color: 'white'};
        case 2: return { background: '#2d3338',color: 'white' };
        case 3: return { background: '#3370ff',color: 'white'};
        case 4: return { background: '#d75f28',color: 'white' };
        case 5: return { background: '#88434f',color: 'white'};
        case 6: return { background: '#5d4aee',color: 'white' };
        default: return { background: '#0398d6',color: 'white' };
      }
    },
    sliderStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#eee2e4', color: 'grey' };
        case 2: return { background: 'var(--312143a6)', color: 'grey' };
        case 3: return { background: '#e5e6f6', color: 'grey' };
        case 4: return { background: '#f6e5e0', color: 'grey' };
        case 5: return { background: '#e9e3f4', color: 'grey' };
        case 6: return { background: '#e5e0e2', color: 'grey' };
        default: return { background: 'linear-gradient(to bottom,#f2f2f2 0,#f8f8f8 100%', color: 'grey' };;
      }
    },
    activeNavStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪绿
        case 2: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪蓝
        case 3: return { background: '#b7afc6', color: '#fff' }; // 莫兰迪紫
        case 4: return { background: '#e6c1c5', color: '#fff' }; // 莫兰迪粉
        case 5: return { background: '#e9d7a5', color: '#fff' }; // 莫兰迪黄
        case 6: return { background: '#b4b8ab', color: '#fff' }; // 莫兰迪灰
        default: return { background: '#a7c7e7', color: '#fff' };
      }
    },
    hoverNavStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪绿加深
        case 2: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪蓝加深
        case 3: return { background: '#b7afc6', color: '#fff' }; // 莫兰迪紫加深
        case 4: return { background: '#e6c1c5', color: '#fff' }; // 莫兰迪粉加深
        case 5: return { background: '#e9d7a5', color: '#fff' }; // 莫兰迪黄加深
        case 6: return { background: '#b4b8ab', color: '#fff' }; // 莫兰迪灰加深
        default: return { background: '#a7c7e7', color: '#fff' };
      }
    },
  },
  watch: {
    floatingpictures(n) {
      console.log(n);
    }
  },
  methods: {
    //选中事件
    setActive(path) {
      this.activeNav = path;
      if (this.$route.path.indexOf(path) > -1) {
        this.reload();
      } else {
        this.$router.push({ path: path });
      }
    },
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then(data => {
          // this.nickName = data.data.userName;
          // this.isAgent = data.data.type;
          // this.id = data.data.id;
          this.$store.commit('saveuuid', data.data.uuid);
          this.$store.commit('saveType', data.data.type);
          this.$store.commit('changeNickName', data.data.userName);
          this.$store.commit('changeId', data.data.id);
          // console.log(data);
          this.$store.commit('setEnabledPaid', data.data.isEnabledPaid);
          this.$store.commit('setEnabledWxValid', data.data.isEnabledWxValid);
          this.$store.commit('setPlatOpenWxValid', data.data.isPlatOpenWxValid);
          // this.role=data.profile.role;
          // console.log(data.profile)
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 退出登录
    loginOut() {
      // this.$api.home
      //   .loginOut()
      //   .then((data) => {})
      //   .catch((err) => {
      //     this.$messageError(err.message);
      //   });
      // 如果是从代理进入则直接关闭
      if (window.sessionStorage.getItem('agentMerchantId')) {
        window.opener = null;
        window.open('', '_self');
        window.close();
        return;
      }
      // 判断用户信息
      let user = new Mgr();
      user
        .getUser()
        .then(data => {
          if (
            data.profile.role === 'SuperAdmin' ||
            data.profile.role === 'Admin'
          ) {
            window.opener = null;
            window.open('', '_self');
            window.close();
          } else {
            user.signOut();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 下载网关
    async download() {
      this.dialog.show = true;
      let header = await mgrs();
      axios({
        method: 'get',
        url: netUrl + '/api/ManageResource/GetConfig',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + header
        }
      })
        .then(data => {
          if (data.status === 200) {
            this.dialog.cq3 = data.data.cq3 === '' ? '' : data.data.cq3;
            this.dialog.ty = data.data.ty === '' ? '' : data.data.ty;
            this.dialog.wg = data.data.wg === '' ? '' : data.data.wg;
            this.dialog.sql = data.data.sql === '' ? '' : data.data.sql;
            this.dialog.ltcq = data.data.ltcq === '' ? '' : data.data.ltcq;
            this.dialog.yktl = data.data.yktl === '' ? '' : data.data.yktl;
            this.dialog.dslh = data.data.dslh === '' ? '' : data.data.dslh;
            this.dialog.ymcq = data.data.ymcq === '' ? '' : data.data.ymcq;
            this.dialog.cqby = data.data.cqby === '' ? '' : data.data.cqby;
            this.dialog.xbnz = data.data.xbnz === '' ? '' : data.data.xbnz;
            this.dialog.jxqy = data.data.jxqy === '' ? '' : data.data.jxqy;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 弹框初始化
    dialoginit() {
      this.dialog.cq3 = ''; // 传奇3
      this.dialog.ty = ''; // 传奇世界
      this.dialog.wg = ''; // 热血传奇
      this.dialog.sql = ''; // sql
    },
    // 下载
    loadzip(num) {
      let url = '';
      if (num === 1) {
        if (this.dialog.wg === '') {
          return;
        } else {
          url = this.dialog.wg;
        }
      } else if (num === 2) {
        if (this.dialog.ty === '') {
          return;
        } else {
          url = this.dialog.ty;
        }
      } else if (num === 3) {
        if (this.dialog.cq3 === '') {
          return;
        } else {
          url = this.dialog.cq3;
        }
      } else if (num === 4) {
        if (this.dialog.sql === '') {
          return;
        } else {
          url = this.dialog.sql;
        }
      } else if (num === 6) {
        if (this.dialog.ltcq === '') {
          return;
        } else {
          url = this.dialog.ltcq;
        }
      } else if (num === 16) {
        if (this.dialog.yktl === '') {
          return;
        } else {
          url = this.dialog.yktl;
        }
      } else if (num === 17) {
        if (this.dialog.dslh === '') {
          return;
        } else {
          url = this.dialog.dslh;
        }
      } else if (num === 18) {
        if (this.dialog.ymcq === '') {
          return;
        } else {
          url = this.dialog.ymcq;
        }
      } else if (num === 19) {
        if (this.dialog.cqby === '') {
          return;
        } else {
          url = this.dialog.cqby;
        }
      } else if (num === 15) {
        if (this.dialog.xbnz === '') {
          return;
        } else {
          url = this.dialog.xbnz;
        }
      } else if (num === 14) {
        if (this.dialog.jxqy === '') {
          return;
        } else {
          url = this.dialog.jxqy;
        }
      }
      url = url + '&merchantId=' + this.id;
      // let elem = document.createElement('iframe');
      // elem.src = url;
      // elem.style.display = 'none';
      // document.body.appendChild(elem);
      // this.$api.home
      //   .downloadNet({ fileUrl: url })
      //   .then((data) => {
      //     // 创建隐藏的可下载链接
      //     var eleLink = document.createElement('a');
      //     eleLink.style.display = 'none';
      //     // 字符内容转变成blob地址
      //     // eleLink.href = 'http://192.168.1.79:5004/11_Agent.exe';
      //     // eleLink.href = 'https://down.qq.com/qqweb/PCQQ/PCQQ_EXE/PCQQ2020.exe';
      //     // eleLink.href = 'http://wxwx.45cx.com/GateWay_Agent.exe';
      //     eleLink.href = data.data;
      //     // 触发点击
      //     document.body.appendChild(eleLink);
      //     eleLink.click();
      //     // 然后移除
      //     this.dialog.show = false;
      //     document.body.removeChild(eleLink);
      //   })
      //   .catch((err) => {
      //     this.$messageError(err.message);
      //     this.dialog.show = false;
      //   });
      // url = 'http://36.250.236.209:5003/wg.rar';
      // url = 'http://36.250.236.209:5002/api/Upload/ShowFile?name=Wg&merchantId=1046&v=dd.exe';
      /* eslint-disable */
      // console.log(url);
      // window.frames['downloadIframe'].location.href = url;
      /* eslint-enable */
      // 创建隐藏的可下载链接
      var eleLink = document.createElement('a');
      eleLink.style.display = 'none';
      eleLink.setAttribute('target', 'blank');
      // 字符内容转变成blob地址
      eleLink.href = url;
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      this.dialog.show = false;
      document.body.removeChild(eleLink);
    },
    // 跳转路由刷新
    refresh(path) {
      if (this.$route.path.indexOf(path) > -1) {
        this.reload();
      } else {
        this.$router.push({ path: path });
      }
    }
  },
  created() {
    this.getUser();
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
    background: #24adec;
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
          span {
            cursor: pointer;
          }
          &.active {
            // background: #b5c9b8 !important; // 莫兰迪绿或你喜欢的色
            color: #fff;
          }
          // &::after{
          //   content: '';
          //   position: absolute;
          //   right: 0;
          //   top: 20%;      /* 距顶部30% */
          //   height: 60%;   /* 高度为元素的40% */
          //   width: 0;
          //   border-right: 1px solid #fff;
          // }
        }
        // & li:hover{
        //     filter: brightness(0.85);
        // }
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
        // width: 18%;
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
      //width: 1286px;
      //margin: 20px auto 22px;
      //position: relative;
      // box-shadow: 0 0 10px rgba(0, 0, 0, .25);
      .slider {
        position: absolute;
        width: 178px;
        background: #0398d6;
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
            // border-bottom: 1px solid #f8f7f7;
            margin-bottom: 10px;
            color: #fff;
            font-size: 14px;
            position: relative;
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
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px 0;
                height: 32px;
                line-height: 32px;
              }
              &.icon2 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -32px;
                height: 32px;
                line-height: 32px;
              }
              &.icon3 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -64px;
                height: 32px;
                line-height: 32px;
              }
              &.icon4 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -128px;
                height: 32px;
                line-height: 32px;
              }
              &.icon5 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -384px;
                height: 32px;
                line-height: 32px;
              }
              &.icon6 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -192px;
                height: 32px;
                line-height: 32px;
              }
              &.icon7 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -544px;
                height: 32px;
                line-height: 32px;
              }
              &.icon8 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -608px;
                height: 32px;
                line-height: 32px;
              }
              &.icon9 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -416px;
                height: 32px;
                line-height: 32px;
              }
              &.icon10 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -224px;
                height: 32px;
                line-height: 32px;
              }
              &.icon11 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -292px;
                height: 32px;
                line-height: 32px;
              }
              &.icon12 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -448px;
                height: 32px;
                line-height: 32px;
              }
            }
          }
        }
      }
      .contentbox {
        min-height: 900px;
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
