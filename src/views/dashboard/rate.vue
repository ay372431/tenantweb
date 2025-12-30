<template>
    <div>
        <div class="topimg" style="height: 225px;margin-top: 124px;"></div>
        <div class="container">
            <div class="title">
                <h1 class="animated fadeInLeft" style="visibility: visible;">分润标准</h1>
            </div>
            <div class="row">
                <table style="width:100%;" border="0" cellspacing="0"
                    class="table table-bordered table-hover payRate-table">
                    <tbody>
                        <tr>
                            <td colspan="4">十年老平台、真正秒到（最快0.1秒）、不限额 不黑单 不掉单、诚信共赢！</td>
                        </tr>
                        <tr>
                            <td style="background: #e9e8e8;_border:1px solid #ccc" width="150px" height="34" align="center"
                                bgcolor="#efeeee" class="td"><strong>兑换类型</strong></td>
                            <td style="background: #e9e8e8;_border:1px solid #ccc" width="290" height="34" align="center"
                                bgcolor="#efeeee" class="td"><strong>支持金额</strong></td>
                            <td style="background: #e9e8e8;_border:1px solid #ccc" width="100" height="34" align="center"
                                bgcolor="#efeeee" class="td"><strong>分润比例</strong></td>
                            <td style="background: #e9e8e8;_border:1px solid #ccc" width="180" height="34" align="center"
                                bgcolor="#efeeee" class="td"><strong>分润周期</strong></td>
                        </tr>
                        <tr>
                            <td style="_border:1px solid #ccc;_height: 30px">网上银行</td>
                            <td style="_border:1px solid #ccc;_height: 30px">不限面额</td>
                            <td style="_border:1px solid #ccc;_height: 30px">99.00%</td>
                            <td style="_border:1px solid #ccc;_height: 30px">满100元秒提秒到</td>
                        </tr>
                        <tr>
                            <td style="_border:1px solid #ccc;_height: 30px">微信支付</td>
                            <td style="_border:1px solid #ccc;_height: 30px">不限面额</td>
                            <td style="_border:1px solid #ccc;_height: 30px">96.50%</td>
                            <td style="_border:1px solid #ccc;_height: 30px">满100元秒提秒到</td>
                        </tr>
                        <tr>
                            <td style="_border:1px solid #ccc;_height: 30px">支付宝</td>
                            <td style="_border:1px solid #ccc;_height: 30px">不限面额</td>
                            <td style="_border:1px solid #ccc;_height: 30px">96.50%</td>
                            <td style="_border:1px solid #ccc;_height: 30px">满100元秒提秒到</td>
                        </tr>
                        <tr>
                            <td style="_border:1px solid #ccc;_height: 30px">支付宝花呗</td>
                            <td style="_border:1px solid #ccc;_height: 30px">不限面额</td>
                            <td style="_border:1px solid #ccc;_height: 30px">96.50%</td>
                            <td style="_border:1px solid #ccc;_height: 30px">满100元秒提秒到</td>
                        </tr>
                        <tr>
                            <td style="_border:1px solid #ccc;_height: 30px">QQ钱包</td>
                            <td style="_border:1px solid #ccc;_height: 30px">不限面额</td>
                            <td style="_border:1px solid #ccc;_height: 30px">96.5%</td>
                            <td style="_border:1px solid #ccc;_height: 30px">满100元秒提秒到</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <div class="newslists">
                <template v-for="(item, index) in noticeList">
                    <div class="item left" v-if="isDirect(index)" :key="'left-' + (item.id || index)">
                        <div class="time-box">
                            <div class="line"></div>
                            <div class="time-flex">
                                <div class="month">
                                    {{ month(item.date) }}
                                </div>
                                <div class="year">{{ year(item.date) }}</div>
                            </div>
                        </div>
                        <div class="info">
                            <div class="title">{{ item.title }}</div>
                            <div class="desc">
                                {{ item.content }}
                            </div>
                        </div>
                    </div>
                    <div class="item right" v-else :key="'right-' + (item.id || index)">
                        <div class="info">
                            <div class="title">{{ item.title }}</div>
                            <div class="desc">
                                {{ item.content }}
                            </div>
                        </div>
                        <div class="time-box">
                            <div class="time-flex">
                                <div class="month">
                                    {{ month(item.date) }}
                                </div>
                                <div class="year">{{ year(item.date) }}</div>
                            </div>
                            <div class="line"></div>
                        </div>
                    </div>
                </template>

            </div>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
var dayjs = require('dayjs');
export default {
  name: 'rate',
  data() {
    return {
      noticeList: [], // 公告信息
      list: [],
      // 公告详情弹框
      noticeDialog: {
        show: false,
        detail: {}
      }
    };
  },
  computed: {
    isDirect: function () {
      return function (index) {
        console.log(index % 2 === 0);
        return index % 2 === 0;
      };
    },
    year: function () {
      return function (date) {
        return dayjs(date).year();
      };
    },
    month: function () {
      return function (date) {
        if (dayjs(date).month() < 10) {
          return '0' + dayjs(date).month() + ' - ' + dayjs(date).date();
        }
        return dayjs(date).month() + ' - ' + dayjs(date).date();
      };
    }
  },
  methods: {
    // 获取公告信息
    getNotice() {
      this.$api.login
        .getNotice()
        .then((data) => {
          if (data.status === 200) {
            this.noticeList = data.data;
          } else if (data.status === 204) {
            this.noticeList = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getlist() {
      this.$api.login
        .rechargeList()
        .then((data) => {
          if (data.status === 200) {
            this.list = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 公告详情弹框
    detialNotice(data) {
      this.noticeDialog.show = true;
      this.noticeDialog.detail = data;
    },
    // 公告详情弹框初始化
    noticeInit() {
      this.noticeDialog.detail = {};
    }
  },
  created() {
    // this.getlist();
    this.getNotice();
  }
};
</script>
<style scoped>
.topimg {
    height: 225px;
    background: url('../../assets/themes/images/subbanner.jpg') no-repeat center bottom;
}

.banner {
    background-image: url('../../assets/img/newsbg.png');
    background-size: 100% 100%;
    height: 433px;
    display: flex;
    align-items: center;
}

.banner-txt {
    background-color: rgba(255, 255, 255, 0.2);
    height: 160px;
    display: flex;
    align-items: center;
    width: 600px;
    justify-content: flex-end;
    padding-right: 30px;
}

.wrap {
    width: 1300px;
    margin: 0 auto;
}

.newslists {
    width: 1300px;
    margin: 50px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: #E5E5E5 1px solid;
    border-right: #E5E5E5 1px solid;
}

.newslists .item {
    box-sizing: border-box;
    width: 50%;
    height: 320px;
    display: flex;
    border: #E5E5E5 1px solid;
    border-bottom: none;
    border-right: none;
}

.newslists .item .time-box {

    margin: 60px 0 0 0;
    display: flex;
}

.newslists .item .time-box .month {
    font-size: 16px;
    display: flex;
    align-items: center;
    text-align: center;
}

.newslists .item .time-box .year {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
    text-align: center;
}

.newslists .item .info {
    flex: 1;
    margin-top: 60px;
    margin-right: 40px;
    margin-left: 50px;
}

.newslists .item .info .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 30px;
}

.newslists .item .info .desc {
    font-size: 14px;
    color: #555454;
    line-height: 24px;
}

.newslists .item.left .time-box .line {
    background-color: #0195FF;
    width: 3px;
    height: 20px;
    margin-right: 15px;
}

.newslists .item.right .time-box .line {
    background-color: #0195FF;
    width: 3px;
    height: 20px;
    margin-left: 15px;
}

.pagination {
    border: #F0F0F0 1px solid;
    height: 130px;
    width: 1300px;
    margin: 0 auto 100px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
