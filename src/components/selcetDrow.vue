<template>
  <div class="slectContainer">
    <el-popover popper-class="gs_drowContainer" placement="bottom-start" width="400" v-model="visible">
      <div class="drowList" style="margin: 0">
        <ul class="clearfix" v-if="itemList.length>0">
          <li v-for="(item,i) in itemList" :key="'item'+i" @click="slectitem(item.machineCode,item.name)">{{item.name}} <span @click.stop="delitem(item.machineCode)"></span></li>
        </ul>
        <div v-else class="tc" style="color: #ccc;">暂无内容</div>
      </div>
      <!-- <el-button slot="reference">删除</el-button> -->
      <div class="slectBox" :class="{'on':visible}" slot="reference">
        <i class="icon"></i>
        <span class="gray" v-if="showText===''">请选择</span>
        <span v-else>{{showText}}</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      default: () => []
    },
    slect: {
      type: String,
      default: ''
    }
  },
  computed: {
    showText: function() {
      if (this.slect === '') {
        return '';
      } else {
        let val = this.itemList.filter((item) => {
          return item.machineCode === this.slect;
        });
        if (JSON.stringify(val) === '[]') {
          return '';
        } else {
          return val[0].name;
        }
      }
    }
  },
  data() {
    return {
      visible: false
      // showText: this.slect
    };
  },
  watch: {},
  methods: {
    slectitem(code, text) {
      this.$emit('update:slect', code);
      this.visible = false;
    },
    delitem(code) {
      this.$emit('delitem', code);
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {}
};
</script>

<style scoped lang="scss">
.slectContainer {
  .slectBox {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: block;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    padding-right: 30px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    cursor: pointer;
    .gray {
      color: #ccc;
    }
    &.on {
      border-color: #409eff;
      .icon {
        transform: rotateZ(180deg);
      }
    }
    .icon {
      transform: rotateZ(0);
      transition: transform 0.3s;
      position: absolute;
      width: 12px;
      height: 12px;
      background: url(../assets/images/arrow.jpg) no-repeat center center;
      right: 8px;
      top: 10px;
    }
  }
}
</style>
