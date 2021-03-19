import Mock from "mockjs";
import { builder, getQueryParameters } from "./util";

let list = [];
const data = options => {
  const queryParameters = getQueryParameters(options);
  console.log("queryParameters", queryParameters);
  let { factoryNum, warehouse_Num, placeCode } = Mock.mock({
    "factoryNum|1-2000": 202,
    "warehouse_Num|1-1360001": 12345,
    "placeCode|1-2000": 1360
  })
  if (list.length <= 0) {
    for (let i = 0; i < 100; i++) {
      list.push({
        id: Mock.Random.id(),
        factoryNum: factoryNum,
        key: "1360001",
        location: { elevation: 0, latitude: 0, longitude: 0 },
        placeCode: placeCode,
        placeName: '3PL寄售区' + i,
        source: "chenzhuang" + i,
        sourceType: "User",
        tags: [],
        timestamp: 1608087850251,
        warehouseType: "毛坯库",
        warehouse_Num: warehouse_Num,
        warehouse_name: "3PL寄售区" + i
      });
    }
  }
  return builder({data: list, total: queryParameters.total}, '查询成功', true);
};
const delData = options => {
  const queryParameters = getQueryParameters(options);
  console.log("queryParameters", queryParameters);
  let delIdIndex = list.findIndex((v) => (v.id =  queryParameters.id))
    list.splice(delIdIndex, 1)
  return builder(null, '删除成功', true);
}
const addData = options => {
  const queryParameters = getQueryParameters(options);
  console.log("queryParameters", queryParameters);
  list.unshift(Object.assign(queryParameters, {id: Mock.Random.id()}))
  return builder(null, '添加成功', true);
}
const editData = options => {
  const queryParameters = getQueryParameters(options);
  console.log("queryParameters", queryParameters);
  let editData = list.find((v) => (v.id === queryParameters.id))
  Object.keys(queryParameters).forEach((key) => {
    editData[key] = queryParameters[key]
  })
  return builder(null, '修改成功', true);

}
Mock.mock(/\/api\/list/, "get", data);
Mock.mock(/\/api\/list\/del/, "delete", delData);
Mock.mock(/\/api\/list\/add/, "post", addData);
Mock.mock(/\/api\/list\/edit/, "put", editData);
