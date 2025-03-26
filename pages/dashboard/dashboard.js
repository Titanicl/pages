document.addEventListener("DOMContentLoaded", function () {
  // 更新时间显示
  updateTime();
  setInterval(updateTime, 1000);

  // 确保图表容器存在并且有高度
  ensureChartContainers();

  // 初始化图表
  setTimeout(() => {
    initMarketOverviewChart();
    initSectorHeatmap();
    initFundFlowChart();
    initSentimentGauge();
    initVolumeAnalysisChart();

    // 初始化热门股票表格
    initHotStocksTable();
  }, 100);
});

// 确保图表容器存在并且有高度
function ensureChartContainers() {
  const containers = [
    "marketOverviewChart",
    "sectorHeatmap",
    "fundFlowChart",
    "sentimentGauge",
    "volumeAnalysisChart",
  ];

  containers.forEach((id) => {
    const container = document.getElementById(id);
    if (container) {
      // 确保图表容器有高度
      if (container.offsetHeight < 10) {
        container.style.height = "300px";
      }
      console.log(`图表容器 ${id} 已找到，高度: ${container.offsetHeight}px`);
    } else {
      console.error(`图表容器 ${id} 未找到!`);
    }
  });
}

// 创建图表时使用echarts
function createChart(domId) {
  const dom = document.getElementById(domId);
  if (!dom) {
    console.error(`图表容器 ${domId} 不存在!`);
    return null;
  }

  // 确保图表容器有高度
  if (dom.offsetHeight < 10) {
    dom.style.height = "300px";
  }

  try {
    // 使用echarts初始化图表
    const chart = echarts.init(dom, null, {
      renderer: "canvas",
    });
    console.log(`图表 ${domId} 初始化成功`);
    return chart;
  } catch (e) {
    console.error(`图表 ${domId} 初始化失败:`, e);
    return null;
  }
}

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

// 初始化大盘指数图表
function initMarketOverviewChart() {
  const chart = createChart("marketOverviewChart");
  if (!chart) return;

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["上证指数", "深证成指", "创业板指"],
      textStyle: {
        color: "#fff",
      },
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
      axisLine: {
        lineStyle: {
          color: "#1f3a5f",
        },
      },
      axisLabel: {
        color: "#8cc8ff",
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      axisLine: {
        lineStyle: {
          color: "#1f3a5f",
        },
      },
      axisLabel: {
        color: "#8cc8ff",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(31, 58, 95, 0.6)",
        },
      },
    },
    series: [
      {
        name: "上证指数",
        type: "line",
        data: generateIndexData(30, 3200, 200),
        lineStyle: {
          color: "#ff4d4f",
        },
        itemStyle: {
          color: "#ff4d4f",
        },
      },
      {
        name: "深证成指",
        type: "line",
        data: generateIndexData(30, 10000, 500),
        lineStyle: {
          color: "#1890ff",
        },
        itemStyle: {
          color: "#1890ff",
        },
      },
      {
        name: "创业板指",
        type: "line",
        data: generateIndexData(30, 2000, 150),
        lineStyle: {
          color: "#52c41a",
        },
        itemStyle: {
          color: "#52c41a",
        },
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
  const chart = createChart("sectorHeatmap");
  if (!chart) return;

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
    backgroundColor: "transparent",
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
      bottom: "0%",
      text: ["涨幅", "跌幅"],
      textStyle: {
        color: "#fff",
      },
      inRange: {
        color: ["#52c41a", "#faad14", "#f5222d"],
      },
    },
    series: [
      {
        type: "treemap",
        data: data.map((item) => {
          return {
            name: item.name,
            value: Math.abs(item.value),
            itemStyle: {
              color: item.value >= 0 ? "#f5222d" : "#52c41a",
            },
            label: {
              formatter: "{b}: {c}%",
              color: "#fff",
            },
          };
        }),
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
  const chart = createChart("fundFlowChart");
  if (!chart) return;

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["主力净流入", "散户净流入"],
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      axisLine: {
        lineStyle: {
          color: "#1f3a5f",
        },
      },
      axisLabel: {
        color: "#8cc8ff",
      },
    },
    yAxis: {
      type: "value",
      name: "金额(亿元)",
      axisLine: {
        lineStyle: {
          color: "#1f3a5f",
        },
      },
      axisLabel: {
        color: "#8cc8ff",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(31, 58, 95, 0.6)",
        },
      },
    },
    series: [
      {
        name: "主力净流入",
        type: "bar",
        stack: "资金",
        data: generateFundFlowData(7, -50, 100),
        itemStyle: {
          color: function (params) {
            return params.data >= 0 ? "#f5222d" : "#52c41a";
          },
        },
      },
      {
        name: "散户净流入",
        type: "bar",
        stack: "资金",
        data: generateFundFlowData(7, -30, 50),
        itemStyle: {
          color: function (params) {
            return params.data >= 0 ? "#faad14" : "#13c2c2";
          },
        },
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化市场情绪仪表盘
function initSentimentGauge() {
  const chart = createChart("sentimentGauge");
  if (!chart) return;

  const option = {
    backgroundColor: "transparent",
    series: [
      {
        name: "市场情绪",
        type: "gauge",
        radius: "90%",
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, "#52c41a"],
              [0.7, "#faad14"],
              [1, "#f5222d"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        axisLabel: {
          color: "#fff",
          distance: -40,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}%",
          color: "#fff",
          fontSize: 30,
          offsetCenter: [0, "70%"],
        },
        data: [
          {
            value: 68,
            name: "情绪指数",
          },
        ],
        title: {
          fontSize: 14,
          color: "#fff",
          offsetCenter: [0, "95%"],
        },
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化交易量分析图表
function initVolumeAnalysisChart() {
  const chart = createChart("volumeAnalysisChart");
  if (!chart) return;

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["成交量", "成交额"],
      textStyle: {
        color: "#fff",
      },
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
      axisLine: {
        lineStyle: {
          color: "#1f3a5f",
        },
      },
      axisLabel: {
        color: "#8cc8ff",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "成交量(万手)",
        axisLine: {
          lineStyle: {
            color: "#1f3a5f",
          },
        },
        axisLabel: {
          color: "#8cc8ff",
        },
        splitLine: {
          lineStyle: {
            color: "rgba(31, 58, 95, 0.6)",
          },
        },
      },
      {
        type: "value",
        name: "成交额(亿元)",
        axisLine: {
          lineStyle: {
            color: "#1f3a5f",
          },
        },
        axisLabel: {
          color: "#8cc8ff",
        },
        splitLine: {
          lineStyle: {
            color: "rgba(31, 58, 95, 0.6)",
          },
        },
      },
    ],
    series: [
      {
        name: "成交量",
        type: "bar",
        data: generateVolumeData(10, 3000, 5000),
        itemStyle: {
          color: "#1890ff",
        },
      },
      {
        name: "成交额",
        type: "line",
        yAxisIndex: 1,
        data: generateVolumeData(10, 30000, 50000),
        lineStyle: {
          color: "#faad14",
        },
        itemStyle: {
          color: "#faad14",
        },
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化热门个股表格
function initHotStocksTable() {
  const hotStocks = [
    {
      name: "贵州茅台",
      code: "600519",
      price: "1823.00",
      change: "+2.31%",
      volume: "32.5万",
    },
    {
      name: "宁德时代",
      code: "300750",
      price: "213.45",
      change: "+3.56%",
      volume: "156.2万",
    },
    {
      name: "中国平安",
      code: "601318",
      price: "48.23",
      change: "-0.82%",
      volume: "245.7万",
    },
    {
      name: "招商银行",
      code: "600036",
      price: "36.78",
      change: "+1.25%",
      volume: "189.3万",
    },
    {
      name: "腾讯控股",
      code: "00700",
      price: "328.60",
      change: "-1.45%",
      volume: "98.6万",
    },
    {
      name: "阿里巴巴",
      code: "09988",
      price: "86.35",
      change: "+2.75%",
      volume: "210.4万",
    },
  ];

  const tableBody = document.getElementById("hotStocksBody");
  if (!tableBody) return;

  tableBody.innerHTML = hotStocks
    .map((stock) => {
      const isUp = stock.change.startsWith("+");
      return `
      <tr>
        <td>${stock.name} (${stock.code})</td>
        <td>${stock.price}</td>
        <td class="${isUp ? "up" : "down"}">${stock.change}</td>
        <td>${stock.volume}</td>
      </tr>
    `;
    })
    .join("");
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

// 生成指数数据
function generateIndexData(count, base, range) {
  const data = [];
  let value = base;
  for (let i = 0; i < count; i++) {
    value = value * (1 + (Math.random() * 0.04 - 0.02));
    value = Math.max(base - range * 0.1, Math.min(base + range * 0.1, value));
    data.push(value.toFixed(2));
  }
  return data;
}

// 生成资金流向数据
function generateFundFlowData(count, min, max) {
  return Array.from({ length: count }, () =>
    (Math.random() * (max - min) + min).toFixed(2)
  );
}

// 生成成交量数据
function generateVolumeData(count, min, max) {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min) + min)
  );
}
