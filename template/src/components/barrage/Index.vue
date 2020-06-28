<template>
  <div class="barrage-wrapper">
    <spacex-barrage ref="barrage" :danmus="danmus" :config="config" @inited="onInit">
      <slot></slot>
    </spacex-barrage>
  </div>
</template>

<script>
  import spacexBarrage from "./barrage.vue";
  export default {
    name: "barrage",
    components: {
      spacexBarrage
    },
    props: {
      barrageList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      config: {
        type: Object,
        default: () => {
          return {
            channels: 2,
            loop: true,
            speed: 8
          };
        }
      }
    },
    //   data() {
    //     return {
    //       danmus: [],
    //     };
    //   },
    computed: {
      danmus() {
        let t =  this.format(this.barrageList);
        console.log(t);
        return t;
      }
    },
    methods: {
      onInit() {
        this.$refs.barrage.play();
      },
      format(barrageList) {
        let arr = [],
          str = "";
        if (barrageList && barrageList.length > 0) {
          barrageList.forEach(item => {
            str = `
            <div class="single-barrage">
                <span class="single-barrage-img"><img src=${item.avatar} ></span>
                <span class="single-barrage-txt">${item.content}</span>
                <span class="single-barrage-type">${item.type}</span>
            </div>`;
            arr.push(str);
          });
        }
        return arr;
      }
    },

    mounted() {
      // this.danmus = this.format(this.value);
      // this.config = this.barrageConfig;
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  .barrage-wrapper {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: transparent;

    .vue-danmaku {
      width: 100%;
      height: 100%;
    }
  }

  .single-barrage {
    padding: 3px 4px;
    display: flex;
    align-items: center;

    background: rgba(27, 27, 31, 0.66);
    border-radius: 13px;

    .single-barrage-img,
    .single-barrage-txt,
    .single-barrage-type {
      display: inline-flex;
      margin-right: 3px;
    }
    .single-barrage-txt {
      color: #fff;
      font-size: 12px;
    }
    .single-barrage-type {
      color: #f2b91b;
      font-size: 12px;
      margin-right: 2px;
    }
    .single-barrage-img {
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
    }
  }
</style>
