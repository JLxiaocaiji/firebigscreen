import { defHttp } from "/@/utils/http/axios";

enum Api {
  selectUnitList = "/companyPosition/selectUnitList",
  fireAlarmSituation = "/fireRecords/fireAlarmSituation",
  fireAlarmTrends = "/fireRecords/fireAlarmTrends",
  indexSelectTypeFront = "/companyPosition/indexSelectTypeFront",
}

/**
 * 区域单位筛选
 * @param params
 * @returns
 */
export const selectUnitList = (params) => defHttp.post({ url: Api.selectUnitList, params: params }, { joinTime: false, isTransformResponse: false });

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

/**
 * 区域单位筛选下拉
 * @param params
 * @returns
 */
export const indexSelectTypeFront = () => defHttp.post({ url: Api.indexSelectTypeFront }, { isTransformResponse: false });
