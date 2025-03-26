document.addEventListener("DOMContentLoaded", function () {
  // 更新时间显示
  updateTime();
  setInterval(updateTime, 1000);

  // 初始化所有图表
  initSentimentChart();
  initSectorHeatmap();
  initFundFlowChart();
  initMarketBreadthChart();
});

// 更新时间显示
function updateTime() {
  const now = new Date();
  document.getElementById("currentTime").textContent = now.toLocaleString(
    "zh-CN",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
}

// 初始化市场情绪图表
function initSentimentChart() {
  const chart = echarts.init(document.getElementById("sentimentChart"));

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["市场情绪指数", "大盘指数"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: generateDateData(30),
    },
    yAxis: [
      {
        type: "value",
        name: "情绪指数",
        min: 0,
        max: 100,
        position: "left",
      },
      {
        type: "value",
        name: "大盘指数",
        min: 2800,
        max: 3500,
        position: "right",
      },
    ],
    series: [
      {
        name: "市场情绪指数",
        type: "line",
        yAxisIndex: 0,
        data: generateSentimentData(30),
        markLine: {
          data: [
            { yAxis: 20, lineStyle: { color: "#c23531" }, name: "恐慌" },
            { yAxis: 80, lineStyle: { color: "#c23531" }, name: "贪婪" },
          ],
        },
      },
      {
        name: "大盘指数",
        type: "line",
        yAxisIndex: 1,
        data: generateIndexData(30),
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化行业板块热力图
function initSectorHeatmap() {
  const chart = echarts.init(document.getElementById("sectorHeatmap"));

  const sectors = [
    "金融",
    "科技",
    "医药",
    "消费",
    "能源",
    "材料",
    "工业",
    "通信",
    "公用事业",
    "房地产",
  ];

  const data = sectors.map((sector) => {
    return {
      name: sector,
      value: (Math.random() * 10 - 5).toFixed(2),
    };
  });

  const option = {
    tooltip: {
      formatter: function (params) {
        return params.name + ": " + params.value + "%";
      },
    },
    visualMap: {
      min: -5,
      max: 5,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
      inRange: {
        color: [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026",
        ],
      },
    },
    series: [
      {
        name: "行业涨跌幅",
        type: "treemap",
        data: data,
        label: {
          show: true,
          formatter: "{b}\n{c}%",
        },
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化资金流向图表
function initFundFlowChart() {
  const chart = echarts.init(document.getElementById("fundFlowChart"));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["主力净流入", "散户净流入"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: generateDateData(10),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "主力净流入",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        data: generateFundFlowData(10),
      },
      {
        name: "散户净流入",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        data: generateFundFlowData(10),
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化市场宽度图表
function initMarketBreadthChart() {
  const chart = echarts.init(document.getElementById("marketBreadthChart"));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["上涨", "下跌", "平盘"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: generateDateData(10),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "上涨",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "#c23531",
        },
        data: generateMarketBreadthData(10, 800, 1500),
      },
      {
        name: "平盘",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "#91c7ae",
        },
        data: generateMarketBreadthData(10, 100, 300),
      },
      {
        name: "下跌",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "#2f4554",
        },
        data: generateMarketBreadthData(10, 500, 1200),
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
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

// 生成情绪数据
function generateSentimentData(count) {
  const data = [];
  let value = 50;
  for (let i = 0; i < count; i++) {
    value = value + Math.random() * 10 - 5;
    value = Math.max(0, Math.min(100, value));
    data.push(value.toFixed(1));
  }
  return data;
}

// 生成指数数据
function generateIndexData(count) {
  const data = [];
  let value = 3100;
  for (let i = 0; i < count; i++) {
    value = value * (1 + (Math.random() * 0.02 - 0.01));
    data.push(value.toFixed(2));
  }
  return data;
}

// 生成资金流向数据
function generateFundFlowData(count) {
  return Array.from({ length: count }, () =>
    (Math.random() * 200 - 100).toFixed(2)
  );
}

// 生成市场宽度数据
function generateMarketBreadthData(count, min, max) {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min) + min)
  );
}
