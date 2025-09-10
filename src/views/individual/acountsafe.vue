<!--
 * @Description: 帐户安全
 * @Author: xu wei
 * @Date: 2020-03-05 14:42:45
 * @LastEditTime: 2020-06-17 16:24:58
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="person_tit">安全中心</div>
    <el-table :data="tableData" border style="width: 100%;padding-left: 2%;padding-right: 2%;">
      <el-table-column prop="date" label="绑定项目" min-width="180">

      </el-table-column>
      <el-table-column prop="name" label="状态" min-width="180">

      </el-table-column>
      <el-table-column prop="address" label="操作" min-width="180">

      </el-table-column>
    </el-table>
    <div class="person_tit" style="margin-top: 5%;">帐户安全</div>
    <div class="ipbox">
      <el-row  type="flex" justify="center" style="line-height: 50px;">
        <el-col :span="4">
          <div class="mgr15" style="text-align: right;width: 100%;">登录选项：</div>
        </el-col>
        <el-col :span="8">
          <p class="">
          <span class="inputbox pdt5">
            <el-radio-group>
              <el-radio style="margin-right: initial;color: #ff4440 !important;" :label="0">网站登录</el-radio>
              <el-radio style="margin-right: initial;color: blue;" :label="1">扫码登录</el-radio>
              <el-radio style="margin-right: initial;color: green;" :label="2">网站+扫码登录</el-radio>
            </el-radio-group>
          </span>
        </p>
        </el-col>
      </el-row>
      <el-row  type="flex" justify="center" style="line-height: 50px;">
        <el-col :span="4">
          <div class="mgr15" style="text-align: right;width: 100%;">异地登录验证：</div>
        </el-col>
        <el-col :span="8">
          <p class="">
          <span class="inputbox pdt5">
            <el-checkbox>启用异地登录验证(开启该功能需绑定微信)</el-checkbox>
          </span>
        </p>
        </el-col>
      </el-row>
      <el-row  type="flex" justify="center" style="line-height: 50px;">
        <el-col :span="4">
          <div class="mgr15" style="text-align: right;width: 100%;">启用安全IP：</div>
        </el-col>
        <el-col :span="8">
          <p class="">
          <span class="inputbox pdt5">
            <el-checkbox>启用安全IP登录</el-checkbox>
          </span>
        </p>
        </el-col>
      </el-row>
      <div style="display: flex;flex-direction: column;align-items: center;">
        <el-checkbox v-model="checked">限制登录账户的计算机IP</el-checkbox>
        <p class="tip">请确保你的计算机在公网拥有固定输入的IP，而不是动态分配的，如ADSL</p>
        <div class="iplistBox">
          <div class="tit">授权IP :</div>
          <div class="addBox">
            <el-tag :key="tag" v-for="(tag, i) in ipList" closable :disable-transitions="false" @close="handleClose(tag,i)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button class="button-new-tag" size="small" @click="showInput">+ 增加授权ip</el-button>
          </div>
        </div>
        <p class="btnBox">
          <el-button size="small" type="primary" @click="dialog.show= true">确定保存</el-button>
        </p>
      </div>
    </div>
    <!-- 二级密码的确认 -->
    <el-dialog title="提示" :visible.sync="dialog.show" @close="dialog.secondPassword=''" custom-class="gs_dialog" width="400px">
      <div class="passwordBox">
        <span class="tit">二级密码：</span>
        <div class="inputBox">
          <el-input style="width:220px;" type="password" size="small" v-model="dialog.secondPassword" placeholder="请输入二级密码"></el-input>
        </div>
      </div>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="sureSeeaccount">确定</el-button>
        <el-button size="small" type="info" @click="dialog.show=false">取消</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      ipList: [],
      inputVisible: false,
      inputValue: '',
      dialog: {
        show: false,
        secondPassword: ''
      },
      tableData: [{
          date: '安全码',
          name: '未设置',
          address: '前往设定'
        }, {
          date: '邮箱认证',
          name: '未认证',
          address: '前往认证邮箱'
        }, {
          date: '手机绑定',
          name: '未绑定',
          address: '前往绑定手机'
        }, {
          date: '密钥',
          name: '已设定',
          address: '前往设定'
        }
      ],
    };
  },
  methods: {
    // 获取商户安全IP
    getSafeIp() {
      this.$api.personCenter
        .getsafeIp()
        .then((data) => {
          if (data.status === 200) {
            this.checked = data.data.isOpenSecurityLimit;
            this.ipList = data.data.securityIp;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 输入二级密码后确认
    sureSeeaccount() {
      if (this.dialog.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      this.$api.personCenter
        .setsafeIp({
          tenantSafetyIP: {
            isOpenSecurityLimit: this.checked,
            securityIp: this.ipList
          },
          password: this.dialog.secondPassword
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('设置成功！');
            this.dialog.show = false;
            this.getSafeIp();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 一篮子增加IP
    handleClose(tag, index) {
      this.ipList.splice(index, 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.ipList.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
  created() {
    this.getSafeIp();
  }
};
</script>

<style lang="scss" scoped>
.ipbox {
  background: #fff;
  padding: 0 30px 20px;
  .tip {
    font-size: 15px;
    color: #333;
    margin: 10px 0;
  }
  .iplistBox {
    display: flex;
    flex-flow: row nowrap;
    .tit {
      width: 120px;
      padding-left: 20px;
      line-height: 32px;
    }
    .addBox {
      width: 150px;
      &::v-deep .el-tag {
        position: relative;
        display: block;
        margin-bottom: 10px;
        padding-right: 30px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .el-icon-close {
          right: 5px;
          top: 8px;
          position: absolute;
        }
      }
      .input-new-tag {
        margin-bottom: 10px;
      }
    }
  }
  .btnBox {
    padding-left: 140px;
    margin-top: 20px;
  }
}
.person_tit {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
  background: #fff;
  padding-left: 20px;
}
.passwordBox {
  padding-left: 20px;
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 16px;
  .tit {
    display: block;
    width: 100px;
    height: 32px;
    line-height: 32px;
  }
}
</style>
