<template>
  <div class="container">
    <div class="content">
       <h3 class="toptitle">新闻中心</h3>
      <table class="tablebox">
        <thead>
          <tr>
            <th>标题</th>
            <th>简介</th>
            <th>发布人</th>
            <th>日期</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="item in noticeList" :key="item.id"  @click="detialNotice(item)">
            <td style="float:left">{{item.title.substring(0,10)+"..."}}</td>
            <td >{{item.content.substring(0,20)+"..."}}</td>
            <td>{{item.publisher}}</td>
            <td>{{item.date}}</td>
          </tr>
        </tbody>
      </table>
      <!-- <h3 class="toptitle">资费标准</h3>
      <table class="tablebox">
        <thead>
          <tr>
            <th>支付类型</th>
            <th>支持金额</th>
            <th>商户比例</th>
            <th>结算周期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in list" :key="'list'+i">
            <td>{{item.type}}</td>
            <td>{{item.des}}</td>
            <td>{{item.rate}}</td>
            <td>{{item.settleType}}</td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <login-footer></login-footer>
     <!-- 公告详情弹框 -->
    <el-dialog title=""
    :visible.sync="noticeDialog.show"
    top="100px"
    >
      <div>
        <h3 class="title">{{noticeDialog.detail.title}}</h3>
        <p class="time">{{noticeDialog.detail.date}}</p>
        <div class="content1">
          {{noticeDialog.detail.content}}
        </div>
      </div>
    </el-dialog>
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
      noticeList: [], // 公告信息
      list: [],
      // 公告详情弹框
      noticeDialog: {
        show: false,
        detail: {}
      }
    };
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

<style lang="scss" scoped>
.container {
  padding-top: 1px;
  background: url(../../assets/images/login/rejester.jpg) no-repeat center top;
  .content {
    width: 1000px;
    margin: 0 auto;
    margin-top: 15px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 1px 30px;
    padding-bottom: 50px;
    min-height: 698px;
    .toptitle {
      padding: 20px 0;
      font-size: 25px;
      color: #373737;
      font-weight: normal;
    }
    .tablebox {
      width: 100%;
      thead {
        th {
          height: 42px;
          font-size: 16px;
          color: #333;
          background: #dfe9eb;
        }
      }
      tbody {
        tr {
          td {
            height: 50px;
            text-align: center;
            font-size: 16px;
            color: #333;
          }
          &:nth-child(EVEN) {
            td {
              background: #f5f5f5;
            }
          }
          &:hover {
            td {
              background: #ccc;
            }
          }
        }
      }
    }
  }
}
  .title {
    text-align: center;
  }
  .time {
    text-align: center;
    margin-top: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ccc;
  }
  .content1 {
    padding: 10px 0;
    word-break: break-all;
    height: 400px;
    overflow-y: auto;
  }

</style>
