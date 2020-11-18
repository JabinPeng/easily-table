export default [
  {
    label: "样式",
    properties: [
      {
        type: "color",
        name: "填充",
        value: "",
      },
      {
        type: "border",
        name: "线条",
        value: "",
        attributes: [
          {
            type: "borderColor",
            name: "颜色",
            value: "#ffffff",
          },
          {
            type: "borderWidth",
            name: "粗细",
            value: "1",
            unit: "px",
          },
          {
            type: "borderStyle",
            name: "虚实",
            value: "solid",
          },
        ],
      },
      {
        type: "opacity",
        name: "不透明度",
        value: "",
      },
    ],
  },
  {
    label: "文本",
    properties: [
      {
        name: "字体",
        type: "fontFamily",
        value: "微软雅黑",
      },
      {
        name: "大小",
        type: "fontSize",
        value: 1,
        unit: "vw",
      },
      {
        name: "对齐方式",
        type: "textAlign",
        value: "left",
      },
      {
        name: "粗细",
        type: "fontWeight",
        value: 400,
      },
    ],
  },
  {
    label: "调整图形",
    properties: [
      {
        name: "宽",
        type: "width",
        value: 10,
        unit: "vw",
      },
      {
        name: "高",
        type: "height",
        value: 10,
        unit: "vh",
      },
      {
        name: "X轴",
        type: "x",
        value: 0,
        unit: "vw",
      },
      {
        name: "Y轴",
        type: "y",
        value: 0,
        unit: "vh",
      },
    ],
  },
];
