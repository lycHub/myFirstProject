function toBoolean(value: boolean | string): boolean {
  return value === '' || (value && value !== 'false');
}

// swiper插件
function swiper(el: string, configs: any) {
 return  new Swiper (el, configs);
}


// 返回倒计时字符串
// time是一个具体的日期或毫秒数
function countDown (time: Date | number): string {
    let formatime = null;
    if (time instanceof Date) {
      const now = new Date();
      formatime = time.getTime() - now.getTime();
    }else {
      formatime = time - 1000;
    }

    const dd = addZero(Math.round(formatime / 1000 / 60 / 60 / 24));     //天数
    const hh = addZero(Math.round(formatime / 1000 / 60 / 60 % 24));       //小时数
    const mm = addZero(Math.round(formatime / 1000 / 60 % 60));       //分钟数
    const ss = addZero(Math.round(formatime / 1000 % 60));       //秒数

    return `${dd}天 ${hh}：${mm}：${ss}`;
}


// 个位数补0
function addZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}

/*
* 数组排序
* basisKey => 根据哪个属性排序
* type => 规则，默认从低到高toUp
* */
function arrSort(arr: any[], basisKey: string, type?: string): any[] {
  type = type ? type : 'toUp';
  return arr.sort((a, b) => {
    return type === 'toUp' ? a[basisKey] - b[basisKey] : b[basisKey] - a[basisKey];
  });
}


// 判断某数组或字符串是否包含指定参数
function isIncludes(source: any, target: string | number): boolean {
  return source.indexOf(target) !== -1;
}


// 判断是否为空对象
function isEmptyObj(obj: Object) {
  return JSON.stringify(obj) === '{}';
}

// 是否是微信浏览器
function isWeixin(): boolean {
  const ua = window.navigator.userAgent.toLowerCase();
  return isIncludes(ua, 'micromessenger');
}




export {toBoolean, swiper, isWeixin, arrSort, countDown, isIncludes, isEmptyObj};
