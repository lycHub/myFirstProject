export interface Country {
  id: number;
  name: string;
  name_native: string;
  minimum_age: number;
  default_unit: string;
  default_currency: number;
  retreat_rule: string;
  deposit_account: string;
  image: string;
}


export interface City {
  id: number;
  name: string;
  name_native: string;
  longitude: string;
  latitude: string;
  country: number;
  province: number;
  priority: number;
}
