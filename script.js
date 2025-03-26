document.addEventListener("DOMContentLoaded", function () {
  // ?????
  initCharts();

  // ?????????
  initRelatedStocks();

  // ?????????
  initTabs();

  // ????????
  document.getElementById("searchBtn").addEventListener("click", handleSearch);
});

// ?????
function initCharts() {
  // ????????
  const priceChart = echarts.init(document.getElementById("priceChart"));
  const priceOption = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: generateDates(30),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: generatePriceData(30),
        type: "line",
        smooth: true,
      },
    ],
  };
  priceChart.setOption(priceOption);

  // ???????
  const volumeChart = echarts.init(document.getElementById("volumeChart"));
  const volumeOption = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: generateDates(30),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: generateVolumeData(30),
        type: "bar",
        itemStyle: {
          color: "#91cc75",
        },
      },
    ],
  };
  volumeChart.setOption(volumeOption);

  // ???????????????
  window.addEventListener("resize", function () {
    priceChart.resize();
    volumeChart.resize();
  });
}

// ?????????
function initRelatedStocks() {
  const relatedStocks = [
    { name: "????", code: "00700.HK", price: 368.4, changePercent: 1.2 },
    { name: "????", code: "JD", price: 26.85, changePercent: -0.8 },
    { name: "???", code: "PDD", price: 128.56, changePercent: 3.5 },
  ];

  const tbody = document.getElementById("relatedStocksBody");
  tbody.innerHTML = relatedStocks
    .map(
      (stock) => `
        <tr>
            <td>${stock.name}</td>
            <td>${stock.code}</td>
            <td>¥${stock.price.toFixed(2)}</td>
            <td class="${stock.changePercent >= 0 ? "up" : "down"}">
                ${stock.changePercent >= 0 ? "+" : ""}${stock.changePercent}%
            </td>
        </tr>
    `
    )
    .join("");
}

// ????????
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const charts = document.querySelectorAll(".chart");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // ????????
      tabBtns.forEach((b) => b.classList.remove("active"));
      charts.forEach((c) => c.classList.remove("active"));

      // ????????
      btn.classList.add("active");
      const targetChart = document.getElementById(`${btn.dataset.tab}Chart`);
      targetChart.classList.add("active");
    });
  });
}

// ??????
function handleSearch() {
  const stockCode = document.getElementById("stockInput").value;
  if (!stockCode) {
    alert("???????");
    return;
  }
  // TODO: ????????
  console.log("????:", stockCode);
}

// ??????
function generateDates(count) {
  const dates = [];
  const today = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
}

function generatePriceData(count) {
  const basePrice = 100;
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push((basePrice + Math.random() * 20 - 10).toFixed(2));
  }
  return data;
}

function generateVolumeData(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * 1000000));
  }
  return data;
}
