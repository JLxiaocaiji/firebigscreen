import { defHttp } from "/@/utils/http/axios";

enum Api {
  selectUnitList = "/companyPosition/selectUnitList",
  fireAlarmSituation = "/fireRecords/fireAlarmSituation",
  fireAlarmTrends = "/fireRecords/fireAlarmTrends",
}

/**
 * 大屏火警事件列表
 * @param params
 * @returns
 */
export const selectUnitList = () => defHttp.post({ url: Api.selectUnitList }, { joinTime: false });

/**
 * 大屏近30天火警处置情况
 * @param params
 * @returns
 */
export const fireAlarmSituation = () => defHttp.get({ url: Api.fireAlarmSituation }, { joinTime: false });
/**
 * 大屏近30天火警处置情况
 * @param params
 * @returns
 */
export const fireAlarmTrends = () => defHttp.get({ url: Api.fireAlarmTrends });
