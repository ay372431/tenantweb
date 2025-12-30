<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-tabs -->
<template>
    <div class="container">
        <login-header></login-header>
        <div style="position: relative;top: 126px;overflow-y: hidden;">
            <div class="line"></div>
            <div class="banner"></div>
            <!-- <img height="280" width="100%" src="../../assets/images/banner2.png" alt=""> -->
            <div class="content" style="padding: 30px 0 160px;background: #fff;">
                <div class="marginAt">
					<h1 class=" animated animate__animated  animate__backInLeft">分润标准</h1>
					<div class="promise-main">
						<div id="pricing-table" class="clearfix">

							<div class="plan animated animate__animated  animate__backInUp" data-wow-duration="1s" data-wow-offset="10" data-wow-iteration="1">
								<h3 >微信支付<span >97.00%</span></h3>
								<ul class=" list-paddingleft-2"><li><p><strong>不限</strong> 面额</p></li><li><p><strong>满10元</strong> 自动分润</p></li></ul>
							</div>

							<div class="plan animated animate__animated  animate__backInDown" data-wow-duration="1s" data-wow-offset="10" data-wow-iteration="1">
								<h3 >支付宝<span >97.00%</span></h3>
								<ul class=" list-paddingleft-2"><li><p><strong>不限</strong> 面额</p></li><li><p><strong>满10元</strong> 自动分润</p></li></ul>
							</div>

							<div class="plan animated animate__animated  animate__backInUp" data-wow-duration="1s" data-wow-offset="10" data-wow-iteration="1">
								<h3 >支付宝花呗<span >97.00%</span></h3>
								<ul class=" list-paddingleft-2"><li><p><strong>不限</strong> 面额</p></li><li><p><strong>满10元</strong> 自动分润</p></li></ul>
							</div>

							<div class="plan animated animate__animated  animate__backInUp" data-wow-duration="1s" data-wow-offset="10" data-wow-iteration="1">
								<h3 >云闪付<span >97.00%</span></h3>
								<ul class=" list-paddingleft-2"><li><p><strong>不限</strong> 面额</p></li><li><p><strong>满10元</strong> 自动分润</p></li></ul>
							</div>

							<div class="plan animated animate__animated  animate__backInDown" data-wow-duration="1s" data-wow-offset="10" data-wow-iteration="1">
								<h3 >银联扫码<span >97.00%</span></h3>
								<ul class=" list-paddingleft-2"><li><p><strong>不限</strong> 面额</p></li><li><p><strong>满10元</strong> 自动分润</p></li></ul>
							</div>

							<div class="plan animated animate__animated  animate__backInDown" data-wow-duration="1s" data-wow-offset="10" data-wow-iteration="1">
								<h3 >网上银行<span >97.00%</span></h3>
								<ul class=" list-paddingleft-2"><li><p><strong>不限</strong> 面额</p></li><li><p><strong>满10元</strong> 自动分润</p></li></ul>
							</div>

						</div>
					</div>
				</div>
            </div>
            <login-footer></login-footer>
        </div>
    </div>
</template>
<script>
import loginFooter from '../../components/loginFooter';
import loginHeader from '../../components/loginHeader.vue';
import wxlogin from 'vue-wxlogin';
export default {
  components: {
    loginFooter,
    loginHeader,
    // eslint-disable-next-line vue/no-unused-components
    wxlogin
  },
  directives: {
    // v-hover-active：通用 hover/动画指令
    // 用法示例：
    //  <div v-hover-active="{ animation: 'animate__animated animate__pulse', enterDelay:80, leaveDelay:0, once:false }"></div>
    // 或只用默认 active 类： <div v-hover-active></div>
    hoverActive: {
      inserted(el, binding = {}) {
        const opts = binding.value || {};
        const activeClass = (binding.arg || 'active');
        // 向后兼容：若只传 animation，则既可用于 inView 也用于 hover（按 inView/hovr 标志决定）
        const rawAnimation = (opts.animation || '').trim();
        const inViewAnimation = opts.inViewAnimation || (opts.inView ? rawAnimation : '');
        const hoverAnimation = opts.hoverAnimation || (!opts.inView && rawAnimation ? rawAnimation : opts.hoverAnimation || '');
        const enterDelay = opts.enterDelay || 0;
        const leaveDelay = opts.leaveDelay || 0;
        const once = !!opts.once;
        const enableInView = !!opts.inView;

        // 状态标记，分别管理视口激活与 hover 动画，避免互相干扰
        el.__ha_inview = false;
        el.__ha_inviewAnimating = false;
        el.__ha_hoverAnimating = false;

        let enterTimer = null;
        let leaveTimer = null;
        let io = null;

        const addAnimClasses = (clsStr) => {
          if (!clsStr) return;
          clsStr.split(/\s+/).forEach(c => c && el.classList.add(c));
          // 强制重绘以确保动画能重触发
          // eslint-disable-next-line no-unused-expressions, no-void
          void el.offsetWidth;
        };
        const removeAnimClasses = (clsStr) => {
          if (!clsStr) return;
          clsStr.split(/\s+/).forEach(c => c && el.classList.remove(c));
        };

        // --- in-view logic ---
        const onInView = () => {
          if (el.__ha_inview) return;
          el.__ha_inview = true;
          el.classList.add(activeClass);
          if (inViewAnimation) {
            if (el.__ha_inviewAnimating) return;
            el.__ha_inviewAnimating = true;
            addAnimClasses(inViewAnimation);
            const onEnd = () => {
              if (once) removeAnimClasses(inViewAnimation);
              el.__ha_inviewAnimating = false;
              el.removeEventListener('animationend', onEnd);
            };
            el.addEventListener('animationend', onEnd);
          }
        };

        // 如果开启 inView，则建立 IntersectionObserver（支持老浏览器可自行降级）
        if (enableInView && typeof IntersectionObserver !== 'undefined') {
          io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                onInView();
                if (once && io) {
                  io.disconnect();
                  io = null;
                }
              }
            });
          }, { threshold: 0.25 }); // 元素 25% 可见即触发
          io.observe(el);
        } else if (enableInView && inViewAnimation) {
          // 降级：若不支持 IO，立即触发（或根据需要改为窗口 scroll 监听）
          onInView();
        }

        // --- hover logic ---
        const startHoverAnim = () => {
          if (!hoverAnimation) return;
          if (el.__ha_hoverAnimating) return;
          el.__ha_hoverAnimating = true;
          addAnimClasses(hoverAnimation);
          const onEnd = () => {
            // hover 动画一般不保留类，移除以便下次可重触发
            removeAnimClasses(hoverAnimation);
            el.__ha_hoverAnimating = false;
            el.removeEventListener('animationend', onEnd);
          };
          el.addEventListener('animationend', onEnd);
        };

        const addHoverActive = () => {
          // hover 样式（transform / 阴影）通过 activeClass 控制，允许与 inView 共存
          el.classList.add(activeClass);
          startHoverAnim();
        };
        const removeHoverActive = () => {
          // 仅移除 hover 导致的 active（若元素由 inView 激活则保留 inview 状态）
          // 我们无法区分是谁加的 activeClass，若要求区分需改为不同 class 名称；
          // 这里采用：若 inView 已激活，则保留 activeClass；否则移除。
          if (el.__ha_inview) return;
          el.classList.remove(activeClass);
        };

        el.addEventListener('mouseenter', () => {
          if (leaveTimer) {
            clearTimeout(leaveTimer);
            leaveTimer = null;
          }
          if (enterTimer) clearTimeout(enterTimer);
          enterTimer = setTimeout(addHoverActive, enterDelay);
        });

        el.addEventListener('mouseleave', () => {
          if (enterTimer) {
            clearTimeout(enterTimer);
            enterTimer = null;
          }
          if (leaveTimer) clearTimeout(leaveTimer);
          leaveTimer = setTimeout(removeHoverActive, leaveDelay);
        });

        // 清理（在元素卸载时断开 observer）
        // Vue directive 没有 unbind/ beforeUnmount here because this is Vue2 file — add unbind if needed
        if (el.__vue__ && el.__vue__.$onBeforeDestroy) {
          // noop
        }
        // 为确保在卸载时释放 IO（Vue2 支持 unbind，需要在 directive 中添加 unbind）
        // 这里直接挂载到元素上，方便在 unbind 中取用
        el.__ha_io = io;
      },
      // Vue2/3 都支持 unbind / beforeUnmount 不同名字；这里实现 unbind 用于 Vue2
      unbind(el) {
        if (el.__ha_io) {
          try { el.__ha_io.disconnect(); } catch (e) { }
          el.__ha_io = null;
        }
      }
    }

  },
  data() {
    return {
      current: 1,
      serviceQq: [],
      qrExpired: false,
      form: {
        username: '',
        password: '',
        code: '',
        checkKey: '',
        returnUrl: ''
      },
      qqSignin: '',
      wxQrSignin: '',
      isPwdLoginShow: true,
      isWxQrLoginShow: false,
      wxqrimgurl: '',
      wxvalidKey: '',
      randomCode:
                'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
      appid: 'wx937e63f717108262',
      scope: 'snsapi_login',
      redirect_uri: 'http://localhost:5000/External/WeixinOpen',
      qrCodeUrl: '',
      returnUrl: '',
      code: ''
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }

};
</script>

<style lang="scss" scoped>
.gs_title {
    background: var(--theme-color);
}

.banner {
  height: 280px;
  background: url(../../assets/img/banner41.jpg) no-repeat center
    center;
  background-size: cover;
}
.marginAt {
    width: 1140px;
    margin: 0 auto;
}
h1 {
    font-size: 30px;
    margin-bottom: 15px;
    position: relative;
    color: #333;
    border-bottom: 1px solid #ccc;
    text-align: center;
}
h1:after {
    clear: both;
    content: "";
    display: block;
    width: 125px;
    height: 3px;
    background: #3c59db;
    margin-top: 15px;
    margin-bottom: -2px;
    margin-left: auto;
    margin-right: auto;
}
.promise-main {
    margin: 40px auto;
}
.promise-main #pricing-table {
    margin: 30px auto;
    text-align: center;
}
.promise-main #pricing-table .plan {
    border-radius: 5px;
}
.promise-main #pricing-table .plan {
    font: 14px Lucida Sans, trebuchet MS, Arial, Helvetica;
    background: #fea429;
    border: 1px solid #ddd;
    color: #333;
    padding: 20px;
    width: 170px;
    float: left;
    position: relative;
    margin-right: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.promise-main #pricing-table .plan h3 {
    border-radius: 3px 3px 5px 5px;
}
.promise-main #pricing-table h3 {
    font-size: 20px;
    font-weight: 400;
    padding: 20px;
    margin: -20px -20px 50px;
    background-color: #eee;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#eee));
    background-image: linear-gradient(#fff, #eee);
}
.promise-main #pricing-table h3 span {
    display: block;
    font: 700 15px/90px Georgia, Serif;
    color: #777;
    background: #fff;
    border: 5px solid #fff;
    height: 100px;
    width: 100px;
    margin: 10px auto -65px;
    border-radius: 100px;
    -webkit-box-shadow: 0 5px 20px #ddd inset, 0 3px 0 #999 inset;
    box-shadow: inset 0 5px 20px #ddd, inset 0 3px 0 #999;
}
.promise-main #pricing-table ul {
    margin: 20px 0 0;
    padding: 0;
    list-style: none;
}
.promise-main #pricing-table li {
    border-top: 1px solid #ddd;
    padding: 10px 0;
    color: #fff;
}
.promise-main #pricing-table li p {
    margin: 0px;
}
</style>
