document.addEventListener("DOMContentLoaded", function () {
  // 初始化所有图表
  initPriceTrendChart();
  initVolumeChart();
  initTechnicalIndicators();

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

// 初始化价格走势图
function initPriceTrendChart() {
  const chart = echarts.init(document.getElementById("priceTrendChart"));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["股价", "MA5", "MA10", "MA20"],
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
    yAxis: {
      type: "value",
      scale: true,
      splitArea: {
        show: true,
      },
    },
    series: [
      {
        name: "股价",
        type: "line",
        data: generatePriceData(30),
        markPoint: {
          data: [
            { type: "max", name: "最高点" },
            { type: "min", name: "最低点" },
          ],
        },
      },
      {
        name: "MA5",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 2,
        },
        data: generateMAData(5, 30),
      },
      {
        name: "MA10",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 2,
        },
        data: generateMAData(10, 30),
      },
      {
        name: "MA20",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 2,
        },
        data: generateMAData(20, 30),
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化成交量图表
function initVolumeChart() {
  const chart = echarts.init(document.getElementById("volumeChart"));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["成交量"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: generateDateData(30),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "成交量",
        type: "bar",
        data: generateVolumeData(30),
        itemStyle: {
          color: function (params) {
            // 根据涨跌设置颜色
            return params.value > 500000 ? "#c23531" : "#2f4554";
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

// 初始化技术指标图表
function initTechnicalIndicators() {
  // MACD图表
  const macdChart = echarts.init(document.getElementById("macdChart"));
  const macdOption = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: generateDateData(15).slice(-15),
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      scale: true,
    },
    series: [
      {
        name: "MACD",
        type: "bar",
        data: generateMACDData(15),
        itemStyle: {
          color: function (params) {
            return params.value >= 0 ? "#c23531" : "#2f4554";
          },
        },
      },
      {
        name: "DIF",
        type: "line",
        data: generateRandomData(15, 0, 2),
        lineStyle: {
          color: "#c23531",
        },
      },
      {
        name: "DEA",
        type: "line",
        data: generateRandomData(15, -1, 1),
        lineStyle: {
          color: "#2f4554",
        },
      },
    ],
  };
  macdChart.setOption(macdOption);

  // KDJ图表
  const kdjChart = echarts.init(document.getElementById("kdjChart"));
  const kdjOption = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: generateDateData(15).slice(-15),
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      scale: true,
    },
    series: [
      {
        name: "K",
        type: "line",
        data: generateRandomData(15, 20, 80),
        lineStyle: {
          color: "#c23531",
        },
      },
      {
        name: "D",
        type: "line",
        data: generateRandomData(15, 20, 80),
        lineStyle: {
          color: "#2f4554",
        },
      },
      {
        name: "J",
        type: "line",
        data: generateRandomData(15, 0, 100),
        lineStyle: {
          color: "#61a0a8",
        },
      },
    ],
  };
  kdjChart.setOption(kdjOption);

  // RSI图表
  const rsiChart = echarts.init(document.getElementById("rsiChart"));
  const rsiOption = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: generateDateData(15).slice(-15),
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 20,
    },
    series: [
      {
        name: "RSI",
        type: "line",
        data: generateRandomData(15, 30, 70),
        markLine: {
          data: [
            { yAxis: 30, lineStyle: { color: "#2f4554" } },
            { yAxis: 70, lineStyle: { color: "#c23531" } },
          ],
        },
      },
    ],
  };
  rsiChart.setOption(rsiOption);

  // 监听窗口大小变化
  window.addEventListener("resize", function () {
    macdChart.resize();
    kdjChart.resize();
    rsiChart.resize();
  });
}

// 更新图表数据
function updateCharts() {
  // 这里可以实现实际的数据更新逻辑
  console.log("更新图表数据");
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

// 生成价格数据
function generatePriceData(count) {
  const data = [];
  let price = 100;
  for (let i = 0; i < count; i++) {
    price = price * (1 + (Math.random() * 0.06 - 0.03));
    data.push(price.toFixed(2));
  }
  return data;
}

// 生成成交量数据
function generateVolumeData(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * 1000000));
  }
  return data;
}

// 生成移动平均线数据
function generateMAData(period, count) {
  const prices = generatePriceData(count);
  const result = [];

  for (let i = 0; i < count; i++) {
    if (i < period - 1) {
      result.push("-");
      continue;
    }

    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += parseFloat(prices[i - j]);
    }
    result.push((sum / period).toFixed(2));
  }

  return result;
}

// 生成MACD数据
function generateMACDData(count) {
  return Array.from({ length: count }, () =>
    (Math.random() * 2 - 1).toFixed(2)
  );
}

// 生成随机数据
function generateRandomData(count, min, max) {
  return Array.from({ length: count }, () =>
    (Math.random() * (max - min) + min).toFixed(2)
  );
}
