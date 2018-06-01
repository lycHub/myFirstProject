export interface CarConfig {
  id: number;
  name: string;
  name_english: string;
  search_filter: boolean;
  display: boolean;
  data_type: string;
  descrition: string;
  type: 1;
}


export interface CarConfigType {
  id: number;
  vehicle_spec: CarConfig[];
}
