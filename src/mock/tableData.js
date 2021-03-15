import Mock from "mockjs";
import { builder, getQueryParameters } from "./util";

const data = options => {
  const queryParameters = getQueryParameters(options);
  console.log("queryParameters", queryParameters);
  if (queryParameters && !queryParameters.count) {
    queryParameters.count = 5;
  }
  const data = [];
  for (let i = 0; i < queryParameters.count; i++) {
    data.push({
      id: Mock.Random.id(),
      factoryNum: "1300",
      key: "1360001",
      location: { elevation: 0, latitude: 0, longitude: 0 },
      placeCode: "1360",
      placeName: "3PL寄售区",
      source: "chenzhuang",
      sourceType: "User",
      tags: [],
      timestamp: 1608087850251,
      warehouseType: "毛坯库",
      warehouse_Num: "1360001",
      warehouse_name: "3PL寄售区"
    });
  }
  return builder(data);
};

Mock.mock(/\/api\/list/, "get", data);
