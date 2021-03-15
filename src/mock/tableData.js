import Mock from "mockjs";
import { builder, getQueryParameters } from "./util";

const data = options => {
  const queryParameters = getQueryParameters(options);
  console.log("queryParameters", queryParameters);
  if (queryParameters && !queryParameters.total) {
    queryParameters.total = 100;
  }

  const list = [];
  for (let i = 0; i < queryParameters.total; i++) {
    list.push({
      id: Mock.Random.id(),
      factoryNum: Mock.mock({
        "factoryNum|1-2000": 202
      }).factoryNum,
      key: "1360001",
      location: { elevation: 0, latitude: 0, longitude: 0 },
      placeCode: "1360",
      placeName: '3PL寄售区' + i,
      source: "chenzhuang" + i,
      sourceType: "User",
      tags: [],
      timestamp: 1608087850251,
      warehouseType: "毛坯库",
      warehouse_Num: Mock.mock({
        "warehouse_Num|1-1360001": 12345
      }).warehouse_Num,
      warehouse_name: "3PL寄售区" + i
    });
  }
  return builder({data: list, total: queryParameters.total});
};

Mock.mock(/\/api\/list/, "get", data);
Mock.mock(/\/api\/list\/del/, "delete", data);
