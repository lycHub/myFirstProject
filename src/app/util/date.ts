import {getYear, getMonth} from 'date-fns';

// 从当前月开始算 一共num个月的数据
export function getDate(num: number) {
  let year = getYear(new Date());
  let month = getMonth(new Date()) - 1;

  const dateArr = [];

  for (let i = 0; i < num; i++) {
    month < 12 ? month++ : (month = 1, year++);

    const data = new Date(year, month);
    dateArr.push({
      data_title: data
    });
  }

  return dateArr;
}
