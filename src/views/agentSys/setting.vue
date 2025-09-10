<!--
 * @Description: 代理系统
 * @Author: gao shuai
 * @Date: 2020-05-18 09:46:49
 * @LastEditTime: 2020-08-24 15:20:31
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title">网站设置</div>
    <div class="gs_tabbox clearfix mgt15">
      <form class="site-setting-form">
        <div class="form-row">
          <label class="form-label">网站名称：</label>
          <input v-model="form.siteName" class="form-input" type="text" />
          <span class="form-desc">您的网站名称</span>
        </div>
        <div class="form-row">
          <label class="form-label">代理域名：</label>
          <input v-model="form.agentDomain" class="form-input highlight" type="text" />
          <span class="form-desc">您的网站域名(不加 http://)</span>
        </div>
        <div class="form-row">
          <label class="form-label">注册地址：</label>
          <input v-model="form.registerUrl" class="form-input" type="text" />
        </div>
        <div class="form-row">
          <label class="form-label"></label>
          <span class="form-desc">用户注册地址</span>
        </div>
        <div class="form-row">
          <label class="form-label">充值域名：</label>
          <input v-model="form.chargeDomain" class="form-input" type="text" />
        </div>
        <div class="form-row">
          <label class="form-label"></label>
          <span class="form-desc">不加 http://，多个域名请用“；”分隔</span>
        </div>
        <div class="form-row">
          <label class="form-label">联系电话：</label>
          <input v-model="form.phone" class="form-input" type="text" />
          <span class="form-desc">将显示您的网站上</span>
        </div>
        <div class="form-row">
          <label class="form-label">客服QQ：</label>
          <input v-model="form.serviceQQ" class="form-input" type="text" />
          <span class="form-desc">格式:姓名,QQ号码,多个QQ用|分隔</span>
        </div>
        <div class="form-row">
          <label class="form-label">技术QQ：</label>
          <input v-model="form.techQQ" class="form-input" type="text" />
          <span class="form-desc">格式:姓名,QQ号码,多个QQ用|分隔</span>
        </div>
        <div class="form-row">
          <label class="form-label">版权：</label>
          <input v-model="form.copyright" class="form-input" type="text" />
          <span class="form-desc">底部版权</span>
        </div>
        <div class="form-row">
          <label class="form-label">流量统计代码：</label>
          <textarea v-model="form.statCode" class="form-textarea"></textarea>
        </div>
        <div class="form-row">
          <label class="form-label"></label>
          <span class="form-desc">网站流量统计,支持cnzz,51la,51yes流量统计</span>
        </div>
        <div class="form-row">
          <label class="form-label"></label>
          <el-button type="primary" @click.prevent="saveSetting">确定保存</el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { loginUrl } from '../../assets/js/version';
export default {
  inject: ['reload'],
  data() {
    return {
      activeName: '0',
      subMerchant: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rateDraw: [],
        tableData: [],
        dialog: {
          show: false,
          nickName: '',
          name: '',
          password: '',
          mail: '',
          qq: '',
          phone: '',
          rate: ''
        }
      },
      form: {
        siteName: '',
        agentDomain: '',
        registerUrl: '',
        chargeDomain: '',
        phone: '',
        serviceQQ: '',
        techQQ: '',
        copyright: '',
        statCode: ''
      }
    };
  },
  methods: {
    // 下属商户列表
    getlist() {
      this.$api.agent
        .submerchantList({
          PageNumber: this.subMerchant.pageIndex,
          PageSize: this.subMerchant.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.subMerchant.tableData = [];
            this.subMerchant.total = 0;
          } else if (data.status === 200) {
            this.subMerchant.tableData = data.data;
            this.subMerchant.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 比率组下拉
    rankDraw() {
      this.$api.agent
        .rankDraw()
        .then((data) => {
          if (data.status === 200) {
            this.subMerchant.rateDraw = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加商户
    addMerchant() {
      if (this.subMerchant.dialog.nickName === '') {
        this.$messageError('请输入昵称！');
        return;
      } else if (this.subMerchant.dialog.name === '') {
        this.$messageError('请输入用户名！');
        return;
      } else if (this.subMerchant.dialog.password === '') {
        this.$messageError('请输入密码！');
        return;
      } else if (this.subMerchant.dialog.mail === '') {
        this.$messageError('请输入邮箱！');
        return;
      } else if (this.subMerchant.dialog.qq === '') {
        this.$messageError('请输入联系qq！');
        return;
      } else if (this.subMerchant.dialog.phone === '') {
        this.$messageError('请输入联系电话！');
        return;
      } else if (this.subMerchant.dialog.rate === '') {
        this.$messageError('请选择比率组！');
        return;
      }
      this.$api.agent
        .addMerchant({
          nickname: this.subMerchant.dialog.nickName,
          loginName: this.subMerchant.dialog.name,
          password: this.subMerchant.dialog.password,
          email: this.subMerchant.dialog.mail,
          qqNumber: this.subMerchant.dialog.qq,
          phoneNumber: this.subMerchant.dialog.phone,
          rankId: this.subMerchant.dialog.rate
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('新增商户成功！');
            this.subMerchant.dialog.show = false;
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加商户弹框初始化
    subMerchantInit() {
      this.subMerchant.dialog.nickName = '';
      this.subMerchant.dialog.name = '';
      this.subMerchant.dialog.password = '';
      this.subMerchant.dialog.mail = '';
      this.subMerchant.dialog.qq = '';
      this.subMerchant.dialog.phone = '';
      this.subMerchant.dialog.rate = '';
    },
    // 用户名不能中文
    noChinese() {
      this.subMerchant.dialog.name = this.subMerchant.dialog.name.replace(
        /[\u4E00-\u9FA5]/g,
        ''
      );
    },
    // 保存设置
    saveSetting() {
      this.$message.success('保存成功');
    }
  },
  created() {
    this.getlist();
    this.rankDraw();
  }
};
</script>

<style lang="scss" scoped>
.gs_tabbox {
  background: #fff;
  padding: 20px 0 20px 0;
}
.site-setting-form {
  width: 800px;
  margin: 0 auto;
}
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.form-label {
  width: 110px;
  text-align: right;
  color: #333;
  font-size: 14px;
  margin-right: 8px;
  flex-shrink: 0;
}
.form-input {
  width: 320px;
  height: 28px;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 2px 8px;
  font-size: 14px;
  background: #fff;
  margin-right: 10px;
}
.form-input.highlight {
  background: #f6ffcc;
}
.form-textarea {
  width: 320px;
  min-height: 60px;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 4px 8px;
  font-size: 14px;
  resize: vertical;
  margin-right: 10px;
}
.form-desc {
  color: #888;
  font-size: 13px;
  margin-left: 2px;
  flex: 1;
}
.opeartbox {
  padding: 15px 20px 5px;
  background: #fff;
  &.titwidth {
    ul {
      li {
        .tit {
          display: inline-block;
          width: 80px;
        }
      }
    }
  }
  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;
      .tit {
        font-size: 14px;
        color: #2d2d2d;
        margin-right: 5px;
      }
      .txtbox {
        display: inline-block;
      }
    }
  }
}
.orderForm {
  // margin-top: 10px;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #d9edf7;
  color: #999;
}
.font {
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}
.weight {
  width: 18%;
  padding-bottom: 5px;
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
.progressBox {
  height: 16px;
  background: #bbb;
  position: relative;
  .textbox {
    position: absolute;
    top: 0;
    left: 50%;
    height: 16px;
    line-height: 16px;
    color: #fff;
  }
  .progressBar {
    height: 100%;
    width: 0;
    background: #67c23a;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    animation: progress-bar-stripes 2s linear infinite;
    transition: all ease-out 0.3s;
  }
}
.roadlist {
  border: 1px solid #ccc;
  width: 753px;
  li {
    float: left;
    width: 250px;
    height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    margin-bottom: -1px;
    &:nth-child(3n + 2) {
      border-right: none;
    }
    .tit {
      display: inline-block;
      vertical-align: middle;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .content {
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 32px;
      padding: 4px 9px;
      text-align: center;
    }
  }
}
.stateColor {
  background: red;
  // margin-left: 20px;
  color: #fff;
  display: inline-block;
  padding-left: 5px;
  position: relative;
  height: 22px;
  line-height: 22px;
  &.color1 {
    background: green;
    &:after {
      border-color: green;
    }
    &:before {
      border-right-color: green;
    }
  }
  &:after {
    content: '';
    position: absolute;
    border: 1px solid red;
    border-width: 11px 5px;
    top: 0;
    right: -10px;
    border-right-color: transparent !important;
  }
  &:before {
    content: '';
    position: absolute;
    border: 1px solid transparent;
    border-width: 11px 5px;
    top: 0;
    left: -10px;
    border-right-color: red;
  }
}
.checkdetail {
  cursor: pointer;
  &:hover {
    color: #0099ff;
    text-decoration: underline;
  }
}
.dialogOrder {
  padding-bottom: 20px;
  table {
    width: 100%;
    tr {
      td {
        border: 1px solid #ccc;
        text-align: center;
        height: 40px;
        color: #008194;
        &.tit {
          background: #edfdff;
          color: #6f6f6f;
          font-weight: bold;
          width: 100px;
        }
      }
    }
  }
}
</style>
