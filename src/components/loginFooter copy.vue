<template>
  <div class="footerbox">
    <p>
    抵制不良游戏　拒绝盗版游戏　注意自我保护　谨防受骗上当　适度游戏益脑　沉迷游戏伤身　合理安排时间　享受健康生活
    </p>
    <p>
      {{ copyright }} Copyright 2021-2030  All Rights Reserved |
      <!-- <span
        ><a href="http://beian.miit.gov.cn/" target="_blank">
          赣ICP备2024033288号-1</a
        ></span
      > -->
      |

    </p>

    <p>本站严禁一切钓鱼、色情、赌博、私彩及违反国家法律法规等使用.</p>
    <el-backtop target=".contentBox"></el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webName: '', // 网站信息
      copyright: '' // 版权
    };
  },
  methods: {
    // 获取注册页面的底部信息
    footerInfo() {
      this.$api.login
        .footerInfo()
        .then(data => {
          if (data.status === 200) {
            this.webName = data.data.webName;
            this.copyright = data.data.copyright;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.footerInfo();
  }
};
</script>

<style scoped>
.footerbox {
  background-color: #f9f9f9;
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footerbox p {
  margin: 15px 0;
  color: #3a3a3a;
}
</style>
