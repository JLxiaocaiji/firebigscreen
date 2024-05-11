export interface HeaderItem {
  label: string;
  value: string;
  url: string;
}

/* 下拉框 */
interface FormState {
  region?: string | number;
  superior?: string | number;
  unitType?: string | number;
  unit?: string | number;
}
