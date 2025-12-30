<!--
 * @Description: 个人中心
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-06-23 18:08:56
 * @LastEditors: gao shuai
 -->
<template>
  <div class="wrap-box">
    <div class="gs_title"><span style="color: white;">基本资料</span></div>
    <div class="wrap-box-c">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="baseinfo">
            <div class="item">
              <div class="title">账户余额</div>
              <div class="num">{{ result.overMoney }}</div>
              <el-button
                round
                size="small"
                type="primary"
                @click="dialogConfig = true"
                >点击充值</el-button
              >
            </div>
            <div class="item">
              <div class="title">待审核笔数</div>
              <div class="num">{{ result.auditingOrderNumber }}</div>
              <el-button
                round
                size="small"
                type="danger"
                @click="$router.push('/audit/audit')"
                >立即审核
              </el-button>
            </div>
            <div class="item">
              <div class="title">今日转出笔数</div>
              <div class="num">{{ result.todayTransOutOrderNumber }}</div>
              <el-button
                round
                size="small"
                type="success"
                @click="$router.push('/rollout/everyday')"
                >查看统计
              </el-button>
            </div>
            <div class="item">
              <div class="title">今日转出总额</div>
              <div class="num">{{ result.todayWithdrawalTotalAmount }}</div>
              <el-button
                round
                size="small"
                type="warning"
                @click="$router.push('/audit/success')"
                >查看订单
              </el-button>
            </div>
          </div>
          <div class="infos">
            <h1>使用须知</h1>
            <p>1、禁止跑路服、无良服、娱乐服接入！一经发现，冻结资金和账户！</p>
            <p>
              2、使用本功能，将会关闭每日系统自动结算功能，以保障余额充足，只支持手动提现。
            </p>
            <p>
              3、收费方式一，每笔1.00元+0.02%。举例：玩家申请100元，GM设置10%手续费，平台会打款90元，手续费为1.00+(90*0.0002)=1.0180元。说明：批量秒提时，平台会自动合并相同收款人的多笔提现申请，此时手续费只会收取1.00元。由此建议，每日定时定点处理提现申请，可有效减少手续费支出。
            </p>
            <p>
              4、收费方式二（推荐），每笔0.02%。说明：自己提供企业支付宝相关参数给平台客服配置，只需维护自己的企业支付宝里有钱可提就行。
            </p>
            <p>
              5、收费方式三，免费。说明：自行私下手动转账，平台提供可视化管理页面，比原始的txt文本里查阅提现申请更加方便快捷。
            </p>
            <p>
              ps：与玩家私下转账后，手动将待处理状态修改为已处理状态时，没有从平台出账，也不会产生手续费。
            </p>
            <p>
              ps：与玩家私下转账后，手动将待处理状态修改为已处理状态时，没有从平台出账，也不会产生手续费。
            </p>
            <h1>使用方法</h1>
            <p>1、在本页右上角，设置好IP白名单，平台只接受白名单IP提交的数据</p>
            <p>
              2、左侧菜单->版本管理，为版本设置转出规则，比如日转出限额、玩家支付宝黑名单等
            </p>
            <p>3、右侧区域，下载脚本，替换游戏中的提现NPC（可联系客服协助）</p>
            <p>
              4、在游戏网关设置内启动代付监控。Ps：请在游戏内提示玩家，务必填写正确的支付宝登录帐号（非绑定手机号），以及实名姓名（非昵称）
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <fieldset class="ipbox">
            <legend>IP白名单</legend>
            <el-input type="textarea" rows="8" v-model="ips"></el-input>
            <div class="mgt15 mgb15"  style="font-size:12px">
              多个IP请<font color="#FF0000">换行</font>隔开(最多可保存20个IP)
            </div>
            <div class="mgt10 mgb10">
              <el-button size="small" type="primary" @click="addIp"
                >保存ip白名单</el-button
              >
            </div>
            <ul class="down">
              <li>
                下载提现脚本示例
                <a :href="downurl" target="_blank">
                  <el-button size="mini" type="primary" round >下载</el-button>
                </a>
              </li>
              <!-- <li>
                下载代付网关程序
                <el-button size="mini" type="warning">下载</el-button>
              </li> -->
            </ul>
          </fieldset>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="信息" :visible.sync="dialogConfig" width="400px">
      <div class="chongzhi">
        <div class="mgb10">
          可充值最大金额：<font color="#FF0000">{{
            result.maxRechargeAmount
          }}</font
          >元
        </div>
        <div class="input">
          请填写充值金额：<el-input
            style="width: 100px"
            v-model="amount"
          ></el-input>
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="chongzhi">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mgr from '../../assets/js/securityapi';
import api from '../../assets/js/apiRequestHandler';
import { netUrl } from '../../assets/js/version';
export default {
  data() {
    return {
      dialogConfig: false,
      amount: '',
      ips: '',
      result: {},
      downurl: netUrl + '/api/Upload/ShowFileNew?name=代付示例'
    };
  },
  created() {
    this.getBaseinfo();
    this.getIp();
    // this.getSkin();
  },
  methods: {
    async getBaseinfo() {
      let header = await mgr();
      api
        .get('/api/TenantPaid/GetAccountOverview', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {}
        })
        .then((res) => {
          this.result = res.data;
        });
    },
    async chongzhi() {
      let header = await mgr();
      if (this.amount === '') {
        this.$message.error('金额不能为空');
        return;
      }
      if (this.amount > this.result.maxRechargeAmount) {
        this.$message.error('金额超过最大余额');
        return;
      }
      api
        .post(
          '/api/TenantPaid/Recharge',
          {
            amount: this.amount
          },
          {
            headers: {
              Authorization: 'Bearer ' + header
            }
          }
        )
        .then((res) => {
          this.$messageSuccess(res.data);
          this.getBaseinfo();
          this.dialogConfig = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async getIp() {
      let header = await mgr();
      api.get('/api/TenantPaid/GetWhiteList', {
        headers: {
          Authorization: 'Bearer ' + header
        }
      }).then(res => {
        if (res.status === 200) {
          //  console.log(res.data)
          this.ips = res.data.join('\n');
        }
      })
        .catch(err => {
          this.$messageError(err.message);
        });
    },

    async addIp() {
      let header = await mgr();
      let ip = this.ips.split('\n');
      if (this.ips === '') {
        this.$message.error('ip不能为空');
        return;
      }
      api
        .post('/api/TenantPaid/AddWhiteList', ip, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then((res) => {
          this.$message.success('保存成功');
        }).catch(err => {
          this.$messageError(err.message);
        });
    }
  }
};
</script>

<style scoped>
.gs_title {
  background: var(--theme-color);
}
.wrap-box {
  min-height: 800px;
  background-color: #fff;
}

.sonbar {
  background-color: #ecf5ff;
  height: 40px;
  line-height: 40px;
  color: black !important;
}

.wrap-box-c {
  margin: 15px 20px;
}

.baseinfo {
  display: flex;
  justify-content: space-around;
  background-color: #f7f7f7;
  border-radius: 4px;
  padding: 10px 0;
}

.baseinfo .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}

.baseinfo .item .num {
  margin: 8px 0;
  color: #ff0000;
}

.infos {
  background-color: #f7f7f7;
  font-size: 14px;
  line-height: 24px;
  color: #555;
  padding: 15px;
  margin-top: 15px;
}

.infos h1 {
  font-size: 16px;
  color: #ff0000;
  margin: 5px 0;
}

.ipbox {
  border: #e6e6e6 1px solid;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 10px;
}

.down li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-size: 14px;
}

.chongzhi .input {
  display: flex;
  align-items: center;
}
</style>
