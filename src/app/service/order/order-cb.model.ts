export interface OrderCarRes {
  id: number;
  order_no: string;
  order_status: string;   // 订单状态
  order_submitted: boolean;
  payment_submitted: boolean;
  memo: null;
  vehicle_status: string; // 车辆状态
  total: number;
  mtime: string;
  ctime: string;
  driver_name: string;
  first_name: string;
  last_name: string;
  birth: string;
  name: string;
  tel: string;
  email: string;
  amount: number;
  start_date: string;
  end_date: string;
  base_price: string;
  company_package: string;
  own_package: string;
  children: number;
  adult: number;
  elder: number;
  flight_no: number;
  flight_time: string;
  user_request: string;
  company: number;
  vehicle: number;
  pick_branch: number;
  drop_branch: number;
  symbol: string;
  discount: number;
}
