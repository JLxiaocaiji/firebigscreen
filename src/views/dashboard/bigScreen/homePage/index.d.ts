/* 下拉框 */
export interface FormState {
  administrationRegion?: string | number;
  upUnitId?: string | number;
  unitId?: string | number;
}

export interface HeaderItem {
  label: string;
  value: string;
  url: string;
}

export interface headerDataType {
  img?: string;
  describe?: string;
  num?: number;
  detail?: Record<string, string | number | undefined>[];
}
