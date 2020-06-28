## 何时使用

移动端弹幕。

## API

```js
import spacexBarrage from ".@spacex/barrage";
components: {
    spacexBarrage
},
data() {
    return {
        barrageList : [{
            avatar: "https://zmjx-public.oss-cn-hangzhou.aliyuncs.com/fe/images/free-order/avatar.png",
            content: "吴***弟刚刚获得一单",
            type: "免单"
        }],
        //默认可不配config
        config : {
          channels: 2,
          loop: true,
          speed: 8
        };
    }
}
<spacex-barrage :barrageList={barrageList} :config={config} />;
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| barrageList | 弹幕数据 | Array | [] |  |
| config.channels | 管道数据 | number | 2 |  |
| config.loop | 是否循环 | boolean | true |  |
| config.speed | 弹幕移动速度 | number | 8 | |


## FAQ

### 弹幕视窗大小

默认根据父元素的视窗大小适配, 内部默认 width:100%, height:100%
