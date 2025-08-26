import { dayjs } from 'element-plus'

//#region interface & Type
/** 当前环境识别结果 */
interface Tequipment {
  /** 安卓 */
  isAndroid: Boolean
  /** 苹果 */
  isIOS: Boolean
  /** 手机 */
  isMobile: Boolean
  /** 微信 */
  isWeixin: Boolean
  /** QQ */
  isQQ: Boolean
  /** QQ浏览器 */
  isQQbrw: Boolean
  /** PC */
  isPC: Boolean
  /** 微博 */
  isWeibo: Boolean
  /** Safari */
  isSafari: Boolean
}
type enumVerifi = 'photo' | 'email' | 'identity' | 'postalCode' | 'password' | 'social'
//#endregion

// const UTLPATH = import.meta.env.VITE_UTLPATH
const UTLNAME = import.meta.env.VITE_TITLE

/** 设置页面标题
 * @param title 标题
 */
export function setTitle(title: string) {
  title = title || UTLNAME
  window.document.title = title
}

/** 判断页面的打开环境 */
export function isEquipment(): Tequipment {
  const UA = navigator.userAgent,
    isAndroid = /android|adr|linux/gi.test(UA),
    isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
    isBlackBerry = /BlackBerry/i.test(UA),
    isWindowPhone = /IEMobile/i.test(UA),
    isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone
  return {
    isAndroid,
    isIOS,
    isMobile,
    isWeixin: /MicroMessenger/gi.test(UA),
    isQQ: /QQ/gi.test(UA),
    isQQbrw: UA.indexOf('MQQBrowser') > -1,
    isPC: !isMobile,
    isWeibo: /WeiBo/gi.test(UA),
    isSafari: /Safari/.test(UA) && !/Chrome/.test(UA),
  }
}

/** Day.js格式化时间
 * @param dateTimes 时间戳
 * @param formatStr 自定义占位符
 */
export function dayjsFormat(dateTimes: string | number, formatStr = 'YYYY-MM-DD') {
  return dayjs(dateTimes).format(formatStr)
}

/** 自定义通用校验模板
 * @param value 校验文本
 * @param type 校验类型
 */
export function customValidate(value: string, type: enumVerifi) {
  let errorMsg = undefined
  switch (type) {
    case 'photo':
      if (!/^1[3456789]\d{9}$/.test(value)) errorMsg = '手机号码'
      break
    case 'email':
      if (!/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) errorMsg = '电子邮件'
      break
    case 'identity':
      if (
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
      )
        errorMsg = '身份证'
      break
    case 'postalCode':
      if (!/^\d{6}$/.test(value)) errorMsg = '邮政编码'
      break
    case 'password':
      if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(value)) errorMsg = '密码'
      break
    case 'social':
      if (!/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g.test(value)) errorMsg = '统一社会信用代码'
      break
    default:
      break
  }
  return {
    result: Boolean(errorMsg),
    errorMsg: errorMsg && `${errorMsg}格式不合格`,
  }
}

/** 深拷贝
 * @param obj 深拷贝的对象
 */
export function deepCopyFunc<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
/** 转换大数字
 * @param num 传入的数字
 * @param fixed 保留小数点（默认值：2）
 */
export function formatterBigNumber(num: number | string, fixed = 2) {
  const currNum = Number(num)
  if (isNaN(currNum)) return null
  let resNum = currNum
  let unitStr = ''
  if (currNum >= 1000000000000) {
    resNum = currNum / 1000000000000
    unitStr = '万亿'
  } else if (currNum >= 100000000) {
    resNum = currNum / 100000000
    unitStr = '亿'
  } else if (currNum >= 10000) {
    resNum = currNum / 10000
    unitStr = '万'
  } else {
    return String(resNum)
  }
  return (fixed == 0 ? Math.floor(resNum) : resNum.toFixed(fixed)) + unitStr
}
/** 计算百分占比
 * @param value 当前值
 * @param total 总值
 * @param fixed 保留小数点（默认：2）
 */
export function countPercent(value: number | string, total: number | string, fixed = 2) {
  return total == 0 ? 0 : ((Number(value) / Number(total)) * 100).toFixed(Number(fixed))
}
/** 将数字转换成千位字符串
 * @param num
 */
export function number2StringKB(num: number | string) {
  return num ? String(num).replace(/(?=(?!\b)(\d{3})+$)/g, ',') : '0'
}
