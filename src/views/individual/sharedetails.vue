<!--
 * @Description: 个人中心
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-06-23 18:08:56
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff pdb25">
      <div v-if="!showResult">
        <!-- <div class="info-title">分账三方个人电子账户开户信息</div> -->
        <el-form ref="openForm" :model="form" :rules="rules" label-width="120px" class="open-account-form">
          <!-- <el-form-item label="三方户唯一标识" prop="uniqueId">
            <el-input v-model="form.uniqueId" placeholder="请输入唯一标识" />
          </el-form-item> -->
          <el-form-item label="开户银行" prop="bank">
            <el-input v-model="form.bank" placeholder="请输入开户银行" />
          </el-form-item>
          <el-form-item label="收款人" prop="name">
            <el-input v-model="form.name" placeholder="请输入收款人" />
          </el-form-item>
          <el-form-item label="身份证" prop="idCard">
            <el-input v-model="form.idCard" placeholder="请输入身份证号" />
          </el-form-item>
          <el-form-item label="证件图片" required>
            <div style="display:flex;gap:24px;">
              <div>
                <div style="margin-bottom:4px;font-size:13px;color:#666;">正面</div>
                <el-upload
                  v-if="form.idImageFront.length === 0"
                  action=""
                  :http-request="dummyUploadFront"
                  list-type="picture-card"
                  :file-list="form.idImageFront"
                  :on-preview="handlePreview"
                  :on-remove="removeIdImageFront"
                  :limit="1"
                  :on-exceed="() => $message.warning('只能上传1张正面证件图片')"
                  :before-upload="beforeUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <div v-else>
                  <img :src="form.idImageFront[0].url" style="width:100px;height:60px;border-radius:4px;border:1px solid #eee;cursor:pointer;" @click="handlePreview(form.idImageFront[0])" />
                  <el-button type="text" size="mini" style="color:#f56c6c;margin-left:4px;" @click="removeIdImageFront(form.idImageFront[0],[])">移除</el-button>
                </div>
              </div>
              <div>
                <div style="margin-bottom:4px;font-size:13px;color:#666;">背面</div>
                <el-upload
                  v-if="form.idImageBack.length === 0"
                  action=""
                  :http-request="dummyUploadBack"
                  list-type="picture-card"
                  :file-list="form.idImageBack"
                  :on-preview="handlePreview"
                  :on-remove="removeIdImageBack"
                  :limit="1"
                  :on-exceed="() => $message.warning('只能上传1张背面证件图片')"
                  :before-upload="beforeUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <div v-else>
                  <img :src="form.idImageBack[0].url" style="width:100px;height:60px;border-radius:4px;border:1px solid #eee;cursor:pointer;" @click="handlePreview(form.idImageBack[0])" />
                  <el-button type="text" size="mini" style="color:#f56c6c;margin-left:4px;" @click="removeIdImageBack(form.idImageBack[0],[])">移除</el-button>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bankNo">
            <el-input v-model="form.bankNo" placeholder="请输入银行卡号" />
          </el-form-item>
          <el-form-item label="银行预留电话" prop="bankPhone">
            <el-input v-model="form.bankPhone" placeholder="请输入银行预留电话" />
          </el-form-item>
          <el-form-item label="账户照片" prop="accountPhoto">
            <el-upload
              v-if="form.accountPhoto.length === 0"
              action=""
              :http-request="dummyUpload"
              list-type="picture-card"
              :file-list="form.accountPhoto"
              :on-preview="handlePreview"
              :on-remove="removeAccountPhoto"
              :limit="1"
              :on-exceed="() => $message.warning('最多上传1张账户照片')"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <div v-else>
              <img :src="form.accountPhoto[0].url" style="width:120px;height:70px;border-radius:4px;border:1px solid #eee;cursor:pointer;" @click="handlePreview(form.accountPhoto[0])" />
              <el-button type="text" size="mini" style="color:#f56c6c;margin-left:4px;" @click="removeAccountPhoto(form.accountPhoto[0],[])">移除</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
        <el-dialog :visible.sync="previewDialog.visible" width="400px">
          <img :src="previewDialog.url" alt="预览" style="width:100%;" />
        </el-dialog>
      </div>
      <div v-else class="open-result">
        <div class="result-title">分账三方个人电子账户开户信息</div>
        <div class="result-row">
          <span class="result-label">开户状态：</span>
          <span class="result-success"><i class="el-icon-success" style="color:#67c23a;font-size:18px;vertical-align:-2px;"></i> 开户成功!</span>
        </div>
        <div class="result-row"><span class="result-label">*三方户唯一标识：</span>{{ result.uniqueId }}</div>
        <div class="result-row"><span class="result-label">*开户银行：</span>{{ result.bank }}</div>
        <div class="result-row"><span class="result-label">*收款人：</span>{{ result.name }}</div>
        <div class="result-row"><span class="result-label">*身份证：</span>{{ result.idCard }}</div>
        <div class="result-row">
          <span class="result-label">*证件图片：</span>
          <span class="result-img" v-if="result.idImageFront && result.idImageFront[0]">
            <span style="font-size:13px;color:#666;">正面</span>
            <img :src="result.idImageFront[0].url" style="width:140px;height:90px;margin:0 10px 0 4px;" />
          </span>
          <span class="result-img" v-if="result.idImageBack && result.idImageBack[0]">
            <span style="font-size:13px;color:#666;">背面</span>
            <img :src="result.idImageBack[0].url" style="width:140px;height:90px;margin:0 10px 0 4px;" />
          </span>
        </div>
        <div class="result-row"><span class="result-label">*银行卡号：</span>{{ result.bankNo }}</div>
        <div class="result-row"><span class="result-label">*银行预留电话：</span>{{ result.bankPhone }}</div>
        <div class="result-row">
          <span class="result-label">账户照片：</span>
          <img v-if="result.accountPhoto[0]" :src="result.accountPhoto[0].url" style="width:180px;height:110px;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showResult: false,
      form: {
        // uniqueId: '',
        bank: '',
        name: '',
        idCard: '',
        idImageFront: [],
        idImageBack: [],
        bankNo: '',
        bankPhone: '',
        accountPhoto: []
      },
      rules: {
        // uniqueId: [{ required: true, message: '请输入唯一标识', trigger: 'blur' }],
        bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        name: [{ required: true, message: '请输入收款人', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        idImageFront: [{ required: true, type: 'array', min: 1, message: '请上传正面证件图片', trigger: 'change' }],
        idImageBack: [{ required: true, type: 'array', min: 1, message: '请上传背面证件图片', trigger: 'change' }],
        bankNo: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
        bankPhone: [{ required: true, message: '请输入银行预留电话', trigger: 'blur' }],
        accountPhoto: [{ required: true, type: 'array', min: 1, message: '请上传账户照片', trigger: 'change' }]
      },
      result: {},
      previewDialog: {
        visible: false,
        url: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.openForm.validate((valid) => {
        if (!valid) return;
        this.result = {
          ...this.form,
          idImageFront: this.form.idImageFront.map(f => ({ url: f.url || f.rawUrl })),
          idImageBack: this.form.idImageBack.map(f => ({ url: f.url || f.rawUrl })),
          accountPhoto: this.form.accountPhoto.map(f => ({ url: f.url || f.rawUrl }))
        };
        console.log(this.result);
        this.$api.personCenter
        .CreateAccountAsync({
          MerId: '1',
          ThirdUserID: '1234567890',
          CardFrontName: '11',
          CardBackName: '22',
          CardFrontUrl: '33',
          CardBackUrl: '44',
          userName: this.result.name,
          IdentificationCard: this.result.idCard,
          Mobile: this.result.bankPhone,
          BankName: this.result.bank,
          BankAccount: this.result.bankNo,
        })
        .then((data) => {
          console.log(data.data);
          // this.userInfo.imgurl = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
        // this.showResult = true;
      });
    },
    dummyUploadFront(param) {
      const file = param.file;
      const reader = new FileReader();
      reader.onload = e => {
        param.onSuccess();
        this.form.idImageFront = [{ name: file.name, url: e.target.result, rawUrl: e.target.result }];
      };
      reader.readAsDataURL(file);
    },
    dummyUploadBack(param) {
      const file = param.file;
      const reader = new FileReader();
      reader.onload = e => {
        param.onSuccess();
        this.form.idImageBack = [{ name: file.name, url: e.target.result, rawUrl: e.target.result }];
      };
      reader.readAsDataURL(file);
    },
    dummyUpload(param) {
      const file = param.file;
      const reader = new FileReader();
      reader.onload = e => {
        param.onSuccess();
        this.form.accountPhoto = [{ name: file.name, url: e.target.result, rawUrl: e.target.result }];
      };
      reader.readAsDataURL(file);
    },
    beforeUpload(file) {
      const isImg = file.type.startsWith('image/');
      if (!isImg) {
        this.$message.error('只能上传图片文件');
      }
      return isImg;
    },
    handlePreview(file) {
      this.previewDialog.url = file.url || file.rawUrl;
      this.previewDialog.visible = true;
    },
    removeIdImageFront(file, fileList) {
      this.form.idImageFront = fileList;
    },
    removeIdImageBack(file, fileList) {
      this.form.idImageBack = fileList;
    },
    removeAccountPhoto(file, fileList) {
      this.form.accountPhoto = fileList;
    }
  }
};
</script>

<style lang="scss" scoped>
.info-title, .result-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 18px;
  margin-top: 8px;
}
.open-account-form {
  max-width: 520px;
  margin: 0 auto;
  padding-top: 18px;
}
.result-row {
  font-size: 15px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  .result-label {
    min-width: 150px;
    color: #222;
    font-weight: 500;
  }
  .result-success {
    color: #67c23a;
    font-weight: bold;
    font-size: 16px;
    margin-left: 6px;
  }
  .result-img {
    display: inline-block;
    margin-right: 8px;
  }
}
</style>