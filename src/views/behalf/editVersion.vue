<template>
  <div class="wrap-box">
    <div class="sonbar"><img src="../../assets/img/san.png" />编辑版本规则</div>
    <div class="wrap-box-c">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <div class="fieldset">
          <el-divider content-position="left"
            ><span class="legend">基础配置</span></el-divider
          >
          <div class="mgt15 mgb15 mgl15 mgr15">
            <div class="search-box mgb15">
              <div class="item w2 label">版本名称</div>
              <div class="item">
                <el-input size="small" v-model="form.versionName"></el-input>
              </div>
              <div class="item hint">名字，无实际用途，仅仅是个名字而已</div>
            </div>
            <div class="search-box mgb15">
              <div class="item w2 label">时段限制</div>
              <div class="item w1">
                <el-select
                  placeholder="请选择"
                  size="small"
                  v-model="form.startTime"
                >
                  <el-option
                    v-for="(item, index) in 25"
                    :value="index"
                    :label="index + '点'"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="item">
                <span style="padding: 0 10rpx;">-</span>
              </div>
              <div class="item w1">
                <el-select
                  placeholder="请选择"
                  size="small"
                  v-model="form.endTime"
                >
                  <el-option
                    v-for="(item, index) in 25"
                    :value="index"
                    :label="index + '点'"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="item hint">
                系统将在此时段内不提供秒提服务，订单将会是待审核状态，比如22~8点(实际是22:00~08:59之间)，0~0代表不限制
              </div>
            </div>
            <div class="search-box mgb15">
              <div class="item w2 label">支付宝替换符</div>
              <div class="item">
                <el-input
                  size="small"
                  v-model="form.aliPayReplaceSymbol"
                ></el-input>
              </div>
              <div class="item hint">支付宝账户中@符号 替换符，默认为#</div>
            </div>
            <div class="search-box mgb25">
              <div class="item w2 label">玩家手续费(%)</div>
              <div class="item">
                <el-input size="small" v-model="form.procedureFee"></el-input>
              </div>
              <div class="item hint">
                玩家提交的金额，扣除手续费后再转出(不是平台扣GM的，是GM扣玩家的费用)
              </div>
            </div>
          </div>
        </div>
        <div class="fieldset">
          <el-divider content-position="left"
            ><span class="legend">限额设置</span></el-divider
          >
          <div class="mgt15 mgb15 mgl15 mgr15">
            <div class="search-box mgb15">
              <div class="item w2 label">笔限额(元)</div>
              <div class="item">
                <el-input size="small" v-model="form.singleLimit"></el-input>
              </div>
              <div class="item hint">
                单笔转出金额超过此限制时，自动转出将失败，手动转出不受影响，0为不限
              </div>
            </div>

            <div class="search-box mgb15">
              <div class="item w2 label">日限额(元)</div>
              <div class="item">
                <el-input size="small" v-model="form.daySumLimited"></el-input>
              </div>
              <div class="item hint">
                当日通过平台转出的累计金额超过此限制时，自动转出将失败，手动转出不受影响，0为不限
              </div>
            </div>
            <div class="search-box mgb15">
              <div class="item w2 label">支付宝账号(次)</div>
              <div class="item">
                <el-input
                  size="small"
                  v-model="form.aliPayAccountDayTimesLimited"
                ></el-input>
              </div>
              <div class="item hint">
                当日相同支付宝账号转出次数超过
                此限制时，自动转出将失效，手动转出不受影响
              </div>
            </div>
            <div class="search-box mgb15">
              <div class="item w2 label">玩家角色名(次)</div>
              <div class="item">
                <el-input
                  size="small"
                  v-model="form.playerRoleDayTimesLimited"
                ></el-input>
              </div>
              <div class="item hint">
                当日相同玩家角色名转出次数超过此限制时，自动转出将失效，手动转出不受影响
              </div>
            </div>
            <div class="search-box mgb25">
              <div class="item w2 label">支付宝、角色名黑名单</div>
              <div class="item">
                <el-button
                  type="primary"
                  class="w2"
                  size="small"
                  @click="$router.push('/audit/blacklist')"
                  >前往黑名单管理</el-button
                >
              </div>
              <div class="item hint">
                黑名单管理请移步至【左侧菜单->订单管理->黑名单管理】
              </div>
            </div>
          </div>
        </div>
        <div class="fieldset">
          <el-divider content-position="left"
            ><span class="legend">网页显示设置</span></el-divider
          >
          <div class="mgt15 mgb15 mgl15 mgr15">
            <div class="search-box mgb15">
              <div class="item w2 label">是否开启网页显示</div>
              <div class="item">
                <el-select
                  placeholder="请选择"
                  size="small"
                  v-model="form.isWebDisplay"
                >
                  <el-option label="开启显示" :value="true"> </el-option>
                  <el-option label="关闭显示" :value="false"> </el-option>
                </el-select>
              </div>
              <div class="item hint">
                玩家通过平台提供的网页查看提现记录，待审核订单不会显示
              </div>
            </div>
            <div class="search-box mgb15">
              <div class="item w2 label">显示的金额类型</div>
              <div class="item">
                <el-select
                  placeholder="请选择"
                  size="small"
                  v-model="form.displayPaidMoneyType"
                >
                  <el-option label="申请金额" :value="0"> </el-option>
                  <el-option label="折扣金额" :value="1"> </el-option>
                </el-select>
              </div>
              <div class="item hint">
                申请金额是玩家申请的金额，折扣金额时扣除玩家手续费后的金额
              </div>
            </div>
            <div class="search-box mgb15">
              <div class="item w2 label">可显示的最小金额</div>
              <div class="item">
                <el-input
                  size="small"
                  v-model="form.minDisplayAmount"
                ></el-input>
              </div>
              <div class="item hint">小于此金额的订单，不会显示</div>
            </div>
            <div class="search-box mgb15">
              <div class="item w2 label">网页LOGO链接</div>
              <div class="item">
                <el-input size="small" v-model="form.logo"></el-input>
              </div>
              <div class="item hint">
                显示在网页左上角，如http//www.baidu.com/logo.png
              </div>
            </div>
            <div class="search-box mgb15">
              <div class="item w2 label">在线客服</div>
              <div class="item">
                <el-input
                  size="small"
                  v-model="form.onlineCustomerService"
                ></el-input>
              </div>
              <div class="item hint">
                网页右上角点击即可跳转，如http://wap.qq.com/msgrd?v=3&uin=123123&site=qq&menu=yes
              </div>
            </div>
            <div class="search-box mgb25">
              <div class="item w2 label">游戏官网</div>
              <div class="item">
                <el-input size="small" v-model="form.gameUrl"></el-input>
              </div>
              <div class="item hint">
                网页右上角点击即可跳转，必须带http://,如http://www.baidu.com
              </div>
            </div>
            <div class="search-box mgb25">
              <div class="item w2 label">公告</div>
              <div class="item">
                <el-input size="small" v-model="form.notice"></el-input>
              </div>
              <div class="item hint">网页顶部可显示公告</div>
            </div>
            <div class="search-box mgb25">
              <div class="item w2 label"></div>
              <div class="item">
                <el-button type="primary" class="w2" size="small" @click="save"
                  >立即提交</el-button
                >
                <el-button
                  class="w2"
                  size="small"
                  @click="$router.push('/behalf/version')"
                  >取消</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import mgr from '../../assets/js/securityapi';
import api from '../../assets/js/apiRequestHandler';
export default {
  data() {
    return {
      dialogConfig: false,
      isedit: false,
      tableData: [],
      form: {
        id: 0,
        versionName: '',
        startTime: 0,
        endTime: 0,
        aliPayReplaceSymbol: '#',
        procedureFee: '0',
        singleLimit: '100',
        daySumLimited: '500',
        aliPayAccountDayTimesLimited: '5',
        playerRoleDayTimesLimited: '5',
        isWebDisplay: true,
        displayPaidMoneyType: 0,
        minDisplayAmount: 0,
        logo: '',
        onlineCustomerService: '',
        gameUrl: '',
        notice: '',
        transferRecordUrl: ''
      },
      rules: {
        minDisplayAmount: [
          {
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.isedit = true;
    this.form.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      let header = await mgr();
      api
        .get('/api/TenantPaid/GetSingleVersionInfo', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {
            paidVersionId: this.form.id
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.form = res.data;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    async save() {
      let header = await mgr();
      let url = '/api/TenantPaid/AddVersion';
      if (this.isedit) {
        url = '/api/TenantPaid/EditVersion';
      }
      if (this.form.versionName === '') {
        this.$messageError('版本名称为空');
        return;
      }
      if (this.form.minDisplayAmount === 0) {
        this.$messageError('可显示的最小金额没填写');
        return;
      }
      api
        .post(url, this.form, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$messageSuccess('操作成功');
            this.$router.push('/behalf/version');
          } else {
            this.$message(res.title);
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  }
};
</script>

<style scoped>
.fieldset-con {
  margin: 0 0 20px 20px;
  display: flex;
  justify-content: space-around;
}
</style>
