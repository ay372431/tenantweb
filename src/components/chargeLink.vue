<template>
  <div class="imgcontainer">
    <div class="imgbox" v-show="styletype===1">
      <a :href="chargeUrl" target="_blank">
        <img :src="imgurl[styleNum]" alt="">
      </a>
    </div>
    <div v-show="styletype===3">
      <div class="imgboxright">
        <a :href="chargeUrl" target="_blank">
          <img :src="imgurl[styleNum]" alt="">
        </a>
      </div>
      <div class="imgleft">
        <a :href="chargeUrl" target="_blank">
          <img :src="imgurl[styleNum]" alt="">
        </a>
      </div>
    </div>
    <div class="imgscroll" ref="scrollImg" v-show="styletype===2">
      <a :href="chargeUrl" target="_blank">
        <img :src="imgurl[styleNum]" alt="">
      </a>
    </div>
  </div>
</template>

<script>
import { url } from '../assets/js/version';
export default {
  props: {
    styletype: {
      type: Number,
      default: 2
    },
    styleNum: {
      type: Number,
      default: 0
    },
    chargeUrl: {
      type: String,
      default: ''
    }
  },
  computed: {},
  data() {
    return {
      x: true,
      y: true,
      steps: 10,
      lefts: 0,
      tops: parseInt((document.body.clientHeight - 200) / 2),
      timer: null,
      imgurl: [
        url + 'img/style1.png',
        url + 'img/style2.png',
        url + 'img/style3.png',
        url + 'img/style4.png',
        url + 'img/style5.png',
        url + 'img/style6.png',
        url + 'img/style7.png',
        url + 'img/style8.png'
      ]
    };
  },
  watch: {
    styletype(n) {
      if (n === 2) {
        this.$nextTick(() => {
          this.timer = setInterval(this.imgMove, 100);
        });
      } else {
        clearInterval(this.timer);
        this.timer = null;
        this.lefts = 0;
        this.tops = parseInt((document.body.clientHeight - 250) / 2);
        this.$refs.scrollImg.style.left = this.lefts + 'px';
        this.$refs.scrollImg.style.top = this.tops + 'px';
      }
    }
  },
  methods: {
    imgMove() {
      let bW = document.body.clientWidth;
      let bH = document.body.clientHeight;
      let h = this.$refs.scrollImg.offsetHeight;
      let w = this.$refs.scrollImg.offsetWidth;
      if (this.x) {
        this.lefts += this.steps;
      } else {
        this.lefts -= this.steps;
      }
      if (this.lefts < 0) {
        this.x = true;
        this.lefts = 0;
      }
      if (this.lefts >= bW - w) {
        this.x = false;
        this.lefts = bW - w;
      }
      if (this.y) {
        this.tops += this.steps;
      } else {
        this.tops -= this.steps;
      }
      if (this.tops < 0) {
        this.y = true;
        this.tops = 0;
      }
      if (this.tops >= bH - h) {
        this.y = false;
        this.top = bH - h;
      }
      this.$refs.scrollImg.style.left = this.lefts + 'px';
      this.$refs.scrollImg.style.top = this.tops + 'px';
    }
  },
  created() {},
  mounted() {
    if (this.styletype === 2) {
      this.timer = setInterval(this.imgMove, 100);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped lang="scss">
.imgbox {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.imgboxright {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.imgleft {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.imgscroll {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 0;
}
</style>
