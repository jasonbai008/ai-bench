/**
 * 将数字转换为汉语大写金额
 * @param {number|string} num 要转换的数字
 * @return {string} 汉语大写金额
 */
function numberToChineseCurrency(num) {
  // 数字对应的汉字
  const chineseNums = [
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖",
  ];
  // 整数部分的单位
  const integerUnits = [
    "",
    "拾",
    "佰",
    "仟",
    "万",
    "拾",
    "佰",
    "仟",
    "亿",
    "拾",
    "佰",
    "仟",
    "万亿",
  ];

  // 检查输入是否有效
  if (isNaN(num) || num === "") {
    return "无效输入";
  }

  // 转换为字符串并处理整数部分
  const numStr = String(num);
  const integerPart = numStr.split(".")[0];

  // 处理整数部分
  let result = "";
  let zeroFlag = false; // 用于处理连续的零

  // 从右向左处理整数部分
  for (let i = 0; i < integerPart.length; i++) {
    // 当前数字的索引（从右向左）
    const index = integerPart.length - 1 - i;
    // 当前数字
    const digit = parseInt(integerPart[index]);

    // 处理数字为零的情况
    if (digit === 0) {
      // 在万位或亿位上要加单位
      if (i === 4 || i === 8) {
        result = integerUnits[i] + result;
        zeroFlag = false;
      } else if (!zeroFlag) {
        // 第一次出现零时添加"零"
        result = chineseNums[0] + result;
        zeroFlag = true;
      }
    } else {
      // 非零数字，添加数字和单位
      result = chineseNums[digit] + integerUnits[i] + result;
      zeroFlag = false;
    }
  }

  // 处理特殊情况：全为零或空字符串
  if (result === "") {
    return "零元整";
  }

  // 添加"元整"后缀
  result += "元整";

  // 处理一些特殊情况的格式调整
  result = result.replace(/零亿/g, "亿").replace(/零万/g, "万");
  result = result.replace(/亿万/g, "亿");
  result = result.replace(/零+/g, "零");
  result = result.replace(/零元整/g, "元整");

  return result;
}

// 测试函数
function test() {
  console.log(numberToChineseCurrency(1234567890)); // 应输出：壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾元整
  console.log(numberToChineseCurrency(1001)); // 壹仟零壹元整
  console.log(numberToChineseCurrency(10001)); // 壹万零壹元整
  console.log(numberToChineseCurrency(100000001)); // 壹亿零壹元整
}

test();

// 导出函数
//   module.exports = {
//     numberToChineseCurrency,
//     test
//   };
