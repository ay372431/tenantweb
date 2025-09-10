<!--
 * @Description: 二级密码设置
 * @Author: gao shuai
 * @Date: 2020-08-19 14:19:13
 * @LastEditTime: 2020-09-10 10:43:35
 * @LastEditors: gao shuai
-->

<template>
  <div class="passwordList">
    <ul>
      <li class="clearfix">
        <span class="tit">原始二级密码：</span>
        <div class="content">
          <el-input style="width:220px;" type="password" size="small" v-model="password" placeholder="请输入原始二级密码"></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class="tit">新二级密码：</span>
        <div class="content">
          <el-input style="width:220px;" type="password" size="small" v-model="newPassword" placeholder="请输入新二级密码"></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class="tit">确认新二级密码：</span>
        <div class="content">
          <el-input style="width:220px;" type="password" size="small" v-model="confirmPassword" placeholder="请再次输入二级密码"></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class="tit"></span>
        <div class="content">
          <el-button size="small" type="primary" @click="changePassword">确认</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '', // 二级密码
      newPassword: '', // 新二级密码
      confirmPassword: '' // 新二级密码
    };
  },
  methods: {
    changePassword() {
      if (this.password === '') {
        this.$messageError('请输入原始二级密码');
        return;
      } else if (this.newPassword === '') {
        this.$messageError('请输入新二级密码');
        return;
      } else if (this.newPassword !== this.confirmPassword) {
        this.$messageError('两次输入新二级密码不一致');
        return;
      }
      this.$api.personCenter
        .changePassword({
          oldPassword: this.password,
          password: this.newPassword,
          confirmPassword: this.confirmPassword
        })
        .then((data) => {
          if (data.status === 200) {
            this.password = '';
            this.newPassword = '';
            this.confirmPassword = '';
            this.$messageSuccess('更改二级密码成功！');
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.passwordList {
  background: #fff;
  padding: 70px 20px 30px;
  ul {
    li {
      margin-bottom: 20px;
      .tit {
        float: left;
        color: #555;
        width: 200px;
        text-align: right;
        margin-right: 15px;
        height: 32px;
        line-height: 32px;
      }
      .content {
        float: left;
      }
    }
  }
}
</style>
