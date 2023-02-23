// 手机号码简易版本，位数11 首字母1
export function validatePhone(phone) {
    let rex = /^1\d{10}$/;
    return phone && (rex.test(phone));
}


/**
 * 只能输入2位小数
 * @param text
 * @returns {*}
 */
export function isTwoFloat(text) {
    text = text.replace(/[^\d.]/g, "");
    //必须保证第一位为数字而不是.
    text = text.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    text = text.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    text = text.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

    // 小数点后只支持输入两个字符
    if (text.indexOf('.') >= 0) {
        console.log('小数截取长度', text.substring(text.indexOf('.'), text.length).length);
        if (text.substring(text.indexOf('.'), text.length).length >= 3) {
            const amount = text.substring(0, text.indexOf('.') + 3);
            return parseFloat(amount) + ''; //有四舍五入的作用
        }
    }
    return text;
}


/**
 * @description 解析身份证信息
 * @param {String} idCard - 身份证号
 * @param {Number} analyseType - 解析类型（birthDate-出生日期 sex-性别 age-年龄）
 * @return {String}
 */
export function getAnalysisIdCard(idCard = "", analyseType = "birthDate") {
    const analyseTypeArr = ["birthDate", "sex", "age"];
    if (idCard === "") {
        throw new Error("请输入身份证号！");
    }
    if (typeof idCard !== "string") {
        // 避免精度丢失 例如 210321198708251611 --> 210321198708251620
        throw new Error("身份证号字段类型应为字符型！");
    }
    if (!analyseTypeArr.includes(analyseType)) {
        throw new Error("请传入正确的解析类型！");
    }
    if (!validIdCard(idCard)) {
        throw new Error("身份证号格式有误!");
    }
    const analyseObj = {
        birthDate: (idCard) => {
            // 获取出生日期
            const birth = `${idCard.substring(6, 10)}-${idCard.substring(
                10,
                12
            )}-${idCard.substring(12, 14)}`;
            return birth;
        },
        sex: (idCard) => {
            //获取性别
            return parseInt(idCard.substr(16, 1)) % 2 === 1 ? "男" : "女";
        },
        age: (idCard) => {
            //获取年龄(计算周岁，未过今年的生日则不加上一岁)
            const myDate = new Date(),
                month = myDate.getMonth() + 1,
                day = myDate.getDate();
            let age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
            if (
                idCard.substring(10, 12) < month ||
                (idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day)
            ) {
                age++;
            }
            return age;
        },
    };
    return analyseObj[analyseType](idCard);
}

function validIdCard(idCard) {
    // 例如 "11":"北京"
    const cityCodeArr = [
        "11",
        "12",
        "13",
        "14",
        "15",
        "21",
        "22",
        "23",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "50",
        "51",
        "52",
        "53",
        "54",
        "61",
        "62",
        "63",
        "64",
        "65",
        "71",
        "81",
        "82",
        "91",
    ];
    //是否为空
    if (idCard === "") {
        return false;
    }
    //校验长度，类型
    if (isRightIdCardLength(idCard) === false) {
        return false;
    }
    //检查省份
    if (checkProvince(idCard, cityCodeArr) === false) {
        return false;
    }
    //校验生日
    if (checkBirthday(idCard) === false) {
        return false;
    }
    //检验位的检测
    return checkParity(idCard) !== false;

}

function isRightIdCardLength(card) {
    // 身份证位数校验，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const reg = /^\d{17}(\d|X|x)$/;
    return reg.test(card);
}

function checkProvince(card, cityCodeArr) {
    const province = card.substr(0, 2);
    return cityCodeArr.includes(province);
}

function checkBirthday(card) {
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    const reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    const arrData = card.match(reg);
    const year = arrData[2];
    const month = arrData[3];
    const day = arrData[4];
    const birthday = new Date(year + "/" + month + "/" + day);
    return verifyBirthday(year, month, day, birthday);
}

// 校验日期
function verifyBirthday(year, month, day, birthday) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    //年月日是否合理
    if (
        birthday.getFullYear() == year &&
        birthday.getMonth() + 1 == month &&
        birthday.getDate() == day
    ) {
        //判断年份的范围（0岁到100岁之间)
        const time = currentYear - year;
        return time >= 0 && time <= 100;

    }
    return false;
}

// 检测校验位
function checkParity(card) {
    // 第一代居民身份证(15位)已经于2013年1月1日正式退出
    // 故不做15位转18位换算
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ["1",
        "0",
        "X",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2"];
    let cardTemp = 0;
    for (let i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
    }
    const checkBit = arrCh[cardTemp % 11];
    return checkBit === card.substr(17, 1).toLocaleUpperCase();

}
