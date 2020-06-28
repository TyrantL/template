# @spacex/share

## 何时使用

移动端底部全局分享组件

## 使用

```js
{
    isShow:true,
    shareConfig : {
        title: "标题标题标题",
        subTitle: "副标题副标题副标题",
        url: "https://kuaizhan.xxx.com/xx.html",
        picUrl:"https://static.zmjx.com/fe/images/course/share-logo.png",
    }
}
```



## 进阶

```js
import spacexShare from "@spacex/share";
components: {
    spacexShare
},
data() {
    return {
        isShow,
        //默认可不配config
        shareConfig : {
           title: "芝麻鲸选",
           subTitle: "芝麻鲸选",
           url: window.location.href,
           picUrl:"https://static.zmjx.com/fe/images/course/share-logo.png",
           iconSize: '33',
           types: [1, 2, 3, 4, 5],
           gutter: 0,
           fontSize: 11,
           cancelText: "取消",
           custom: [
                {
                    text: "纯品原木",
                    type: 2
                },
                {
                    text: "原木纯品",
                    type: 4
                },
                {
                    icon: `${ASSETS_BASE}/weixin.png`,
                    text: "我新的哦",
                    type: 5,
                    fn: fn
                }
            ],
            posterType: "async.shareDailyFreePoster",
            qrStr: ""
        };
    }
}
<spacex-share v-model="isShow" :config="shareConfig" />

```

## shareConfig

| 参数       | 说明            | 类型   | 默认值                                                    |
| ---------- | --------------- | ------ | --------------------------------------------------------- |
| picUrl     | 图片地址        | String | "https://static.zmjx.com/fe/images/course/share-logo.png" |
| url        | 分享地址        | String | window.location.href                                      |
| title      | 标题            | String | "芝麻鲸选"                                                |
| subTitle   | 副标题          | String | "芝麻鲸选"                                                |
| iconSize   | 图标大小        | Number | 45                                                       |
| types      | 显示的分享模块       | Array  | 1:朋友, 2:朋友圈, 3:海报 4:面对面邀请                     |
| posterType | 海报 bridgeName | String | ""                                                        |
| qrStr      | 邀请海报用二维码链接  | String | ""                                                        |
| custom     | 自定义修改/添加分享模块  | Array  | null                                                      |
| fontSize   | 字体大小        | Number | inline                                                    |
| gutter     | 模块间距            | Number | 0                                                         |
| cancelText     | 取消/关闭的文案            | string | "取消"                                                         |

---

## 0.0.14

`2019-11-12`

- 支持自定义增加分享模块 (icon、text、type、fn)
- 支持修改默认模块数据 ，如修改默认微信分享的图标、标题、事件等
- 支持控制**_types_**分享模块显示/隐藏
- 支持自定义字体，在需要时对字体进行大小控制，如多达5个模块时, 设置**_fontSize:11_** 将带来更好的体验
