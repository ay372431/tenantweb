<template>
  <div class="gs_container">
    <div class="gs_crumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          ><span class="local">你的位置</span></el-breadcrumb-item
        >
        <el-breadcrumb-item>自有账户</el-breadcrumb-item>
        <el-breadcrumb-item>新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card shadow="never">
      <div slot="header" class="box-card">
        <span>新增</span>
      </div>
      <div class="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form ref="form" :model="form" label-width="200px">
              <el-form-item label="商户ID">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="账户或角色">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="选择类型">
                <el-select v-model="form.region">
                  <el-option>
                    全部
                  </el-option>
                  <el-option>
                    支付宝黑名单
                  </el-option>
                  <el-option>
                    角色名黑名单
                  </el-option>
                  <el-option>
                    永久名黑名单
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  methods: {}
};
</script>

<style scoped></style>
