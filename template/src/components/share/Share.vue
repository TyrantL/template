<template>
  <van-popup v-model="visible" round position="bottom" :class="popupClass" :style="popupStyle">
    <div class="grid">
      <van-grid
        :border="false"
        :column-num="defaultList.length"
        :gutter="gutter"
        :icon-size="iconSize"
      >
        <van-grid-item
          v-for="item in defaultList"
          :icon="item.icon"
          :text="item.text"
          :key="item.type"
          :style="gridItemStyle"
          @click="onClick(item)"
        />
      </van-grid>
    </div>
    <div class="spacex-share-cancel-btn" @click="cancel" v-html="cancelText"></div>
  </van-popup>
</template>

<script>
  import { Popup, Grid, GridItem } from "vant";

  /**
   * enum
   */
  const ASSETS_BASE = "https://static.zmjx.com/fe/images/free-order";

  /**
   * core module
   */
  export default {
    name: "share",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      config: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },

    computed: {
      cancelText() {
        const { cancelText } = this.config;
        return cancelText || "取消";
      },
      iconSize() {
        const { iconSize } = this.config;
        return iconSize || "45";
      },
      popupStyle() {
        return { paddingTop: "0.05rem" };
      },
      gutter() {
        const { gutter } = this.config;
        return gutter || "0";
      },
      popupClass() {
        const { fontSize } = this.config;
        if (fontSize) {
          return "spacex-share-popup spacex-share-popup-auto-font-size";
        } else {
          return "spacex-share-popup";
        }
      },
      gridItemStyle() {
        const { fontSize } = this.config;
        if (fontSize) {
          return { fontSize: fontSize/100 + "rem" };
        }else{
          return {}
        }
      }
    },
    data() {
      const types = this.config.types;
      const custom = this.config.custom;
      let defaultData = [];
      let _defaultData = [
        {
          icon: `${ASSETS_BASE}/weixin.png`,
          text: "微信邀请",
          type: 1,
          fn: this.shareLinkToWxFriend
        },
        {
          icon: `${ASSETS_BASE}/pengyouquan.png`,
          text: "朋友圈邀请",
          type: 2,
          fn: this.shareLinkToWxMoments
        },
        {
          icon: `${ASSETS_BASE}/hiabaoyaoqing.png`,
          text: "海报邀请",
          type: 3,
          fn: this.showPoster
        },
        {
          icon: `${ASSETS_BASE}/mianduimianyaoqing.png`,
          text: "面对面邀请",
          type: 4,
          fn: this.gotoFaceToFaceInvite
        }
      ];

      if (custom) {
        let _arr = [];
        custom.forEach(item => {
          let flag = 0;
          _defaultData.forEach((subitem, idx) => {
            if (item.type && item.type === subitem.type) {
              flag++;
              _defaultData[idx] = { ...subitem, ...item };
            }
          });
          if (flag == 0) {
            _arr.push(item);
          }
        });
        _defaultData = _defaultData.concat(_arr);
      }

      if (types && types.length != 0) {
        _defaultData.forEach(item => {
          if (types.indexOf(item.type) !== -1) {
            defaultData.push(item);
          }
        });
      } else {
        defaultData = _defaultData;
      }

      return {
        visible: false,
        defaultList: defaultData
        //len : defaultData.length
      };
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit("input", val);
      }
      // defaultList(val){
      //   this.len = this.defaultList.length;

      // }
    },
    methods: {
      onClick(item) {
        item.fn && item.fn();
      },
      cancel() {
        this.visible = false;
      },
      _share(cfg) {
        let shareConfig = {
          picUrl: "https://static.zmjx.com/fe/images/course/share-logo.png",
          url: window.location.href,
          title: "芝麻鲸选",
          subTitle: "芝麻鲸选"
        };
        shareConfig = { ...shareConfig, ...cfg, ...this.config };
        window.dsBridge &&
        window.dsBridge.call("async.shareLinkToWx", shareConfig, function() {});
      },
      shareLinkToWxFriend() {
        this._share({
          sence: 0,
          scene: 0
        });
      },
      shareLinkToWxMoments() {
        this._share({
          sence: 1,
          scene: 1
        });
      },
      showPoster() {
        if (this.config.posterType) {
          window.dsBridge.call(
            this.config.posterType || "",
            { qrStr: this.config.qrStr },
            function() {}
          );
        }
      },
      gotoFaceToFaceInvite() {
        window.dsBridge.call("async.pushPage", {
          url: `zhimajx://faceToFaceInvite`
        });
      }
    },
    mounted() {
      if (this.value) {
        this.visible = true;
      }
    }
  };
</script>
<style lang="less" >
  .spacex-share-cancel-btn {
    height: 60px;
    line-height: 60px;
    border: 1px solid rgba(225, 225, 225, 0.7);
    color: #1b1b1f;
    font-size: 17px;
    text-align: center;
  }

  .spacex-share-popup-auto-font-size {
    .van-grid-item__text {
      //font-size: 11px !important;
      font-size: 100% !important;
    }
  }

  .spacex-share-popup.van-popup--bottom.van-popup--round {
    border-radius: 0.1rem 0.1rem 0 0;
  }
</style>
