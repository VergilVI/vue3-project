import api from '@/api/api.js'
import httpAxios from '@/api/http'
// import Mshare from 'm-share' // 浏览器分享
import { Toast } from 'vant'
// import wx from 'weixin-js-sdk'; //

let UTLPATH = import.meta.env.VUE_APP_UTLPATH
let UTLNAME = import.meta.env.VUE_APP_TITLE
let util = {
  setTitle(title) {
    title = title || UTLNAME
    window.document.title = title
  },
  isEquipment() {
    //判断页面的打开环境
    let UA = navigator.userAgent,
      isAndroid = /android|adr|linux/gi.test(UA),
      isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
      isBlackBerry = /BlackBerry/i.test(UA),
      isWindowPhone = /IEMobile/i.test(UA),
      isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone,
      isQQbrw = UA.indexOf('MQQBrowser') > -1,
      isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    return {
      isAndroid: isAndroid, //是安卓
      isIOS: isIOS, //是苹果
      isMobile: isMobile, //是手机
      isWeixin: /MicroMessenger/gi.test(UA), //是微信
      isQQ: /QQ/gi.test(UA), //是QQ
      isQQbrw: isQQbrw,
      isPC: !isMobile, //是PC
      isWeibo: /WeiBo/gi.test(UA),
      isSafari: isSafari
    }
  },
  appId: '',
  timestamp: '',
  nonceStr: '',
  signature: '',
  getWxSignature(url, callback) {
    // 获取微信参数
    // let _that = this
    let ip = window.location.host //获取服务器ip地址
    let protocolStr = document.location.protocol // 协议头
    url = url == '/' ? (url = '') : url
    let urls = url ? `${protocolStr}//${ip}${UTLPATH}${url}` : window.location.href
    let code = ip == '自己的打包的服务器域名' ? 'XXXX' : 'YYYY' // XXXX/YYYY 微信公众号的code，一个演示环境，一个生产环境
    httpAxios
      .post(
        api.getSignature,
        {
          url: encodeURI(urls), // encodeURI不转义参数带中文会导致签名错误
          code: code
        },
        true
      )
      .then((data) => {
        callback(data && data.rtn && data.rtn.data)
      })
  },
  // 获取url参数
  getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg) //匹配目标参数
    if (r != null) {
      return decodeURI(r[2])
    } else {
      return null //返回参数值
    }
  },
  getLoader(url, option = {}) {
    // var _that = this
    let ip = window.location.host //获取服务器ip地址
    let protocolStr = document.location.protocol // 协议头
    let urlss = ''
    urlss = `${protocolStr}//${ip}${UTLPATH}${url}`
    console.log('shareData', {
      link: option.link || urlss, // 覆盖分享到微信的链接
      title: option.title || '分享标题', // 覆盖分享到微信的标题
      desc: option.desc || '分享摘要', // 覆盖分享到微信的标题
      imgUrl: option.imgUrl
    })
    // if (_that.isEquipment().isWeixin || _that.isEquipment().isQQ) {
    // 	_that.getWxSignature(url, function (data) {
    // 		wx.config({
    // 			debug: false, // true:调试时候弹窗
    // 			appId: data.appId, // 必填，公众号的唯一标识
    // 			timestamp: data.timestamp, // 必填，生成签名的时间戳
    // 			nonceStr: data.nonceStr, // 必填，生成签名的随机串
    // 			signature: data.signature, // 必填，签名
    // 			jsApiList: [
    // 				// 所有要调用的 API 都要加到这个列表中
    // 				'onMenuShareTimeline', // 分享到朋友圈接口
    // 				'onMenuShareAppMessage', // 分享到朋友接口
    // 				'onMenuShareQQ', // 分享到QQ接口
    // 				'onMenuShareWeibo', // 分享到微博接口
    // 				'updateTimelineShareData',
    // 				'updateAppMessageShareData',
    // 				'closeWindow' // 关闭微信窗口
    // 			]
    // 		})

    // 		wx.ready(function () {
    // 			var shareData = {
    // 				link: option.link || urlss, // 覆盖分享到微信的链接
    // 				title: option.title || '', // 覆盖分享到微信的标题
    // 				desc: option.desc || '', // 覆盖分享到微信的标题
    // 				imgUrl: option.imgUrl || '默认图片', // 覆盖分享到微信的图片链接
    // 				success: function () {
    // 					// 分享成功可以做相应的数据处理

    // 				},
    // 				fail: function () {
    // 					// Toast('请点击右上角进行分享操作!')
    // 					// alert('调用失败')
    // 				},
    // 				complete: function () {
    // 					// alert('调用结束')
    // 				}
    // 			}

    // 			wx.onMenuShareQQ(shareData)
    // 			wx.onMenuShareWeibo(shareData)
    // 			wx.onMenuShareAppMessage(shareData)
    // 			wx.onMenuShareTimeline(shareData)
    // 			wx.updateTimelineShareData(shareData)
    // 			wx.updateAppMessageShareData(shareData)
    // 		})

    // 	})
    // } else {
    // 	Toast('需要在微信或QQ或app打开进行操作分享')
    // }
  },
  getUrl(router) {
    // 分享的url
    let ip = window.location.host //获取服务器ip地址
    let protocolStr = document.location.protocol // 协议头
    router = router ? router : ''
    let url = `${protocolStr}//${ip}${UTLPATH}${router}`
    return url
  },
  isZero(m) {
    return m < 10 ? '0' + m : m
  },
  formatDate(shijianchuo) {
    //时间戳是整数，否则要parseInt转换
    var time = new Date(shijianchuo) // 需要使用Date格式进行日期转化，若是时间戳、字符串时间，需要通过new Date(..)转化
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    return y + '-' + this.isZero(m) + '-' + this.isZero(d)
  },
  timestampToTime(timestamp) {
    // timestamp = timestamp.replace(/-/g, '/')
    var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    var strDate = Y + M + D + h + m + (s || '00')
    return strDate
  },
  verification(val, option = {}) {
    //val 需要验证的数据，option 需要验证的参数 name 如：电话 ，typeName 类型 如photo ，msgName提示语
    if (!val || val == '' || val == 0 || val == 999) {
      Toast.fail(option.name + '不能为空')
      return false
    }

    if (option.typeName) {
      let Reg = ''
      switch (option.typeName) {
        case 'photo':
          Reg = /^1[3456789]\d{9}$/
          break
        case 'email':
          Reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
          break
        case 'identity':
          Reg =
            /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
          break
        case 'emailCode':
          Reg = /^\d{6}$/
          break
        case 'password':
          Reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/
          break
        case 'social':
          Reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
          break
        default:
          break
      }

      if (!Reg.test(val)) {
        console.log(Reg)
        if (option.msgName) {
          Toast(option.msgName)
        } else {
          Toast(option.name + '格式不合格')
        }
        return false
      }
    }

    return true
  }
}
export default util
