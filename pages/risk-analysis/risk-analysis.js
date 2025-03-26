document.addEventListener("DOMContentLoaded", function () {
  // 初始化所有图表
  initVolatilityChart();
  initStressTestChart();

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

// 初始化波动性分析图表
function initVolatilityChart() {
  const chart = echarts.init(document.getElementById("volatilityChart"));

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["股价波动率", "行业平均波动率"],
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
      name: "波动率(%)",
      min: 0,
      max: 5,
    },
    series: [
      {
        name: "股价波动率",
        type: "line",
        data: generateVolatilityData(30, 1, 4),
        markLine: {
          data: [{ type: "average", name: "平均值" }],
        },
      },
      {
        name: "行业平均波动率",
        type: "line",
        data: generateVolatilityData(30, 0.5, 2.5),
        lineStyle: {
          type: "dashed",
        },
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 初始化压力测试图表
function initStressTestChart() {
  const chart = echarts.init(document.getElementById("stressTestChart"));

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["基准情景", "轻度压力", "中度压力", "严重压力"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: generateDateData(12),
    },
    yAxis: {
      type: "value",
      name: "股价预测",
      axisLabel: {
        formatter: "{value} 元",
      },
    },
    series: [
      {
        name: "基准情景",
        type: "line",
        data: generateStressTestData(12, 100, 1.1),
      },
      {
        name: "轻度压力",
        type: "line",
        data: generateStressTestData(12, 100, 0.95),
      },
      {
        name: "中度压力",
        type: "line",
        data: generateStressTestData(12, 100, 0.85),
      },
      {
        name: "严重压力",
        type: "line",
        data: generateStressTestData(12, 100, 0.7),
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
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

// 生成波动率数据
function generateVolatilityData(count, min, max) {
  const data = [];
  let value = (min + max) / 2;
  for (let i = 0; i < count; i++) {
    value = value + Math.random() * 0.6 - 0.3;
    value = Math.max(min, Math.min(max, value));
    data.push(value.toFixed(2));
  }
  return data;
}

// 生成压力测试数据
function generateStressTestData(count, startPrice, factor) {
  const data = [];
  let price = startPrice;
  for (let i = 0; i < count; i++) {
    price = price * (factor + (Math.random() * 0.06 - 0.03));
    data.push(price.toFixed(2));
  }
  return data;
}
