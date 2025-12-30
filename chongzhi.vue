<template>
  <div class="container">
    <div class="header-top">
      <img src="/src/assets/img/logo3.png" class="logo" />
      <div class="alert">
        <el-alert type="error" :closable="false">
          <div class="info">
            <img
              src="../../assets/img/info.png"
              class="icon"
            />重要提示:本平台禁止用于色情、赌博、毒品、钓鱼、诈骗套现等非法交易使用
          </div>
        </el-alert>
      </div>
      <div class="tabs">
        <div
          :class="{ 'tab-item': true, active: current == 1 ? true : false }"
          @click="tab(1)"
        >
          游戏充值
          <div class="line"></div>
        </div>
        <div
          :class="{ 'tab-item': true, active: current == 2 ? true : false }"
          @click="tab(2)"
        >
          订单查询
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="navtitle">
      请核对并选择您的充值大区！
    </div>
    <div class="table">
      <div class="th">
        <div class="td">服务器名</div>
        <div class="td">充值</div>
      </div>
      <div class="tr">
        <div class="td">服务器名</div>
        <div class="td">
          <el-button type="primary" round size="small">点击充值</el-button>
        </div>
      </div>
    </div>
    <div class="info-box">
      <div class="thumb">
        <img src="../../assets/img/zhuyi.png" class="icon" />
      </div>
      <div class="info">
        <div class="item">
          <div class="num">1</div>
          本平台仅限传奇游戏充值，其他游戏充值请立即进行举报
        </div>
        <div class="item">
          <div class="num">2</div>
          请勿向陌生人转发的支付二维码进行扫码付款请立即举报
        </div>
        <div class="item">
          <div class="num">3</div>
          请保存好您的游戏网站，以防止丢失，本平台将概不处理。
        </div>
        <div class="item">
          <div class="num">4</div>
          举报游戏涉及赌博行为，经核实情况，奖励人民市1000元。
        </div>
      </div>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import loginFooter from '../../components/loginFooter';

export default {
  components: {
    loginFooter
  },
  data() {
    return {
      address: '',
      phone: '',
      mail: [],
      current: 1
    };
  },
  methods: {
    tab(index) {
      this.current = index;
    },
    getinfo() {
      this.$api.login
        .contactinfo()
        .then(data => {
          if (data.status === 200) {
            this.address = data.data.companyAddress;
            this.phone = data.data.servicePhone;
            this.mail = JSON.parse(data.data.serviceQq).filter(item => {
              return item.type === 0;
            });
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getinfo();
  }
};
</script>

<style scoped>
.container {
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px 60px;
  border-bottom: #ddd 1px solid;
}

.header-top .alert {
  margin-left: 60px;
  margin-right: auto;
}

.header-top .alert .info {
  display: flex;
  align-items: center;
}

.header-top .alert .info .icon {
  margin-right: 10px;
}

.header-top .tabs {
  display: flex;
  justify-content: center;
  margin: 0;
}

.header-top .tabs .tab-item {
  padding-bottom: 8px;
  margin: 0 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
}

.header-top .tabs .tab-item .line {
  background-color: #fff;
  width: 30px;
  height: 3px;
  margin-top: 8px;
  border-radius: 3px;
}

.header-top .tabs .tab-item.active {
  color: #0195ff;
}

.header-top .tabs .tab-item.active .line {
  background-color: #0195ff;
}

.navtitle {
  margin: 30px auto;
  font-size: 24px;
  font-weight: bold;
  width: 1300px;
}

.table {
  width: 1300px;
  margin: 0 auto;
}

.table .th {
  background-color: #0195ff;
  color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: space-around;
  height: 45px;
  align-items: center;
}

.table .tr {
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-right: #ddd 1px solid;
}

.table .tr .td {
  border-left: #ddd 1px solid;
  border-bottom: #ddd 1px solid;
  width: 50%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-box {
  width: 1300px;
  margin: 30px auto 150px auto;
  display: flex;
}
.info-box .thumb {
  height: 140px;
  width: 240px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-box .info {
  flex: 1;
  border: #ddd 1px solid;
  border-left: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px 0 20px 30px;
}
.info-box .info .item {
  width: 50%;
  display: flex;
}
.info-box .info .item .num {
  border-radius: 100%;
  background-color: rgb(255, 87, 86);
  color: #fff;
  width: 24px;
  height: 24px;
  text-align: center;
  margin-right: 5px;
}
</style>
