document.addEventListener("DOMContentLoaded", function () {
  // 初始化所有图表
  initCorrelationChart();
  initSectorLinkageChart();
  initFundFlowComparisonChart();

  // 初始化表格数据
  initComparisonTable();

  // 绑定搜索按钮事件
  document.getElementById("searchBtn").addEventListener("click", handleSearch);
});

// 处理搜索事件
function handleSearch() {
  const stockCode = document.getElementById("stockCode").value;
  if (!stockCode) {
    alert("请输入股票代码");
    return;
  }
  console.log("搜索股票:", stockCode);
  // 模拟加载数据
  setTimeout(() => {
    updateCharts();
  }, 500);
}

// 初始化相关性分析图表
function initCorrelationChart() {
  const chart = echarts.init(document.getElementById("correlationChart"));

  const option = {
    tooltip: {
      formatter: function (params) {
        return params.name + ": " + params.value.toFixed(2);
      },
    },
    series: [
      {
        type: "graph",
        layout: "force",
        animation: false,
        label: {
          show: true,
          position: "right",
        },
        draggable: true,
        data: generateCorrelationData(),
        categories: [
          {
            name: "目标股票",
          },
          {
            name: "相关股票",
          },
        ],
        force: {
          repulsion: 100,
          edgeLength: [50, 100],
        },
        edges: generateCorrelationEdges(),
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化板块联动分析图表
function initSectorLinkageChart() {
  const chart = echarts.init(document.getElementById("sectorLinkageChart"));

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      data: ["互联网", "电商", "云计算", "金融科技", "物流", "其他"],
    },
    series: [
      {
        name: "板块联动",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "18",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 35, name: "互联网" },
          { value: 25, name: "电商" },
          { value: 15, name: "云计算" },
          { value: 10, name: "金融科技" },
          { value: 10, name: "物流" },
          { value: 5, name: "其他" },
        ],
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化资金流向对比图表
function initFundFlowComparisonChart() {
  const chart = echarts.init(
    document.getElementById("fundFlowComparisonChart")
  );

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["阿里巴巴", "腾讯控股", "京东集团", "拼多多"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: generateDateData(7),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "阿里巴巴",
        type: "line",
        data: generateFundFlowData(7),
      },
      {
        name: "腾讯控股",
        type: "line",
        data: generateFundFlowData(7),
      },
      {
        name: "京东集团",
        type: "line",
        data: generateFundFlowData(7),
      },
      {
        name: "拼多多",
        type: "line",
        data: generateFundFlowData(7),
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化对比表格
function initComparisonTable() {
  const tableData = [
    {
      name: "腾讯控股",
      code: "00700.HK",
      price: 368.4,
      change: 1.2,
      marketCap: "3.52万亿",
      pe: 18.5,
    },
    {
      name: "京东集团",
      code: "JD",
      price: 26.85,
      change: -0.8,
      marketCap: "4210亿",
      pe: 15.2,
    },
    {
      name: "拼多多",
      code: "PDD",
      price: 128.56,
      change: 3.5,
      marketCap: "1.72万亿",
      pe: 22.7,
    },
    {
      name: "美团",
      code: "03690.HK",
      price: 98.75,
      change: 0.5,
      marketCap: "6050亿",
      pe: 20.1,
    },
  ];

  const tbody = document.getElementById("comparisonTableBody");
  tbody.innerHTML = tableData
    .map(
      (stock) => `
    <tr>
      <td>${stock.name}</td>
      <td>${stock.price}</td>
      <td class="${stock.change >= 0 ? "up" : "down"}">${
        stock.change >= 0 ? "+" : ""
      }${stock.change}%</td>
      <td>${stock.marketCap}</td>
      <td>${stock.pe}</td>
    </tr>
  `
    )
    .join("");
}

// 更新图表数据
function updateCharts() {
  // 这里可以实现实际的数据更新逻辑
  console.log("更新图表数据");
}

// 生成相关性数据
function generateCorrelationData() {
  return [
    {
      name: "阿里巴巴",
      symbolSize: 50,
      category: 0,
    },
    {
      name: "腾讯控股",
      symbolSize: 40,
      category: 1,
    },
    {
      name: "京东集团",
      symbolSize: 35,
      category: 1,
    },
    {
      name: "拼多多",
      symbolSize: 30,
      category: 1,
    },
    {
      name: "美团",
      symbolSize: 25,
      category: 1,
    },
    {
      name: "百度",
      symbolSize: 20,
      category: 1,
    },
  ];
}

// 生成相关性边
function generateCorrelationEdges() {
  return [
    {
      source: "阿里巴巴",
      target: "腾讯控股",
      value: 0.65,
    },
    {
      source: "阿里巴巴",
      target: "京东集团",
      value: 0.82,
    },
    {
      source: "阿里巴巴",
      target: "拼多多",
      value: 0.75,
    },
    {
      source: "阿里巴巴",
      target: "美团",
      value: 0.58,
    },
    {
      source: "阿里巴巴",
      target: "百度",
      value: 0.42,
    },
  ];
}

// 生成日期数据
function generateDateData(days) {
  const dates = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}

// 生成资金流向数据
function generateFundFlowData(count) {
  const data = [];
  let value = 0;
  for (let i = 0; i < count; i++) {
    value = value + Math.random() * 20 - 10;
    data.push(value.toFixed(2));
  }
  return data;
}
