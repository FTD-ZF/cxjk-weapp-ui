import Taro from "@tarojs/taro";

//提示toast
export const Toast = (title, duration = 1500, icon = 'none') => {
    Taro.showToast({ title: title, icon: icon, duration: duration, });
}

//所有整数
export const IntegerReg = /^(-)?[0-9]*$/

/**
 * 钉钉小程序使用
 * @param {*} format 日期格式
 * @param {*} currentDate 当前选择时间
 * @param {*} callBack 
 */
export const funcSelectDate_Mini = (format = 'yyyy-MM-dd', currentDate, callBack) => {
    dd.datePicker({
        format: format,
        currentDate: currentDate,
        success: (res) => {
            let date = res.date
            callBack && callBack(date)
        },
    });
}