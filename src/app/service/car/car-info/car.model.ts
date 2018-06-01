export interface Car {
  id: number;
  name: string;
  vehicle_image: string[];
  code: string;
  driver_license: string; // 驾照
  profile: string;      // 简介
  reminder: string | null;  // 提醒
  memo: string | null;       //备注
  score: number;            // 评分
  daily_price: number;    //日租价
  recommend: boolean;     // 是否推荐
  best_seats: number;
  max_seats: number;
  disabled: boolean;
  child_seats: number;
  length: number;
  width: number;
  height: number;
  innerheight: number;
  engine_size: number;        // 发动机排量
  fuel_type: string;          // 燃油类型
  transmission_type: string;  // 手动还是自动
  fuel_tank_size: number;         // 邮箱容量
  fuel_economy: number | null;         // 燃油消耗
  vehicle_age: number | null;
  water_tank_size: number;      // 水箱容量
  gray_tank_size: number | null;  // 灰水箱容量
  black_tank_size: number | null;        // 黑水箱容量
  outside_cabin: number | null;          // 外部行李舱
  abs: boolean;
  generator: boolean;         // 发电机
  propane: boolean;           // 煤气罐
  back_camera: boolean;       // 倒车影像
  amp: number;                    // 营地外接电源安倍数
  restroom: boolean;
  shower: boolean;
  hotwater: boolean;
  aircondition: boolean;      // 空调
  driver_ac: boolean;            // 驾驶室空调
  heater: boolean;
  table: boolean;
  stove: boolean;         // 炉子
  oven: boolean;          // 烤箱
  ref: boolean;           // 冰箱
  microwave: boolean;
  bed_amount: number;
  bed_info: string | null;
  dvd: boolean;
  tv: boolean;
  radio: boolean;
  usb: boolean;
  cd: boolean;
  mp3mp4: boolean;
  windowscreen: boolean;
  pet: boolean;
  cabthrough: boolean;    // 驾驶室联通
  awning: boolean;        // 遮阳棚
  bike_rack: boolean;     // 自行车架
  volt: number;                // 车内电源电压
  child_seat_slot: number;  // 儿童椅插槽数
  mtime?: null;
  ctime?: null;
  company: number;
  associated_company: number;    // 相关公司
  type: number;
  content: string;
}
