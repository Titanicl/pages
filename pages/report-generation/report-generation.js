document.addEventListener("DOMContentLoaded", function () {
  // 绑定生成报告按钮事件
  document
    .getElementById("generateBtn")
    .addEventListener("click", generateReport);

  // 绑定导出按钮事件
  document.querySelectorAll(".export-btn").forEach((btn) => {
    btn.addEventListener("click", handleExport);
  });

  // 绑定配置表单变化事件
  document
    .getElementById("reportType")
    .addEventListener("change", updatePreview);
  document
    .getElementById("analysisPeriod")
    .addEventListener("change", updatePreview);
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", updatePreview);
  });
});

// 处理生成报告事件
function generateReport() {
  const stockCode = document.getElementById("stockCode").value;
  if (!stockCode) {
    alert("请输入股票代码");
    return;
  }

  // 获取报告配置
  const reportType = document.getElementById("reportType").value;
  const analysisPeriod = document.getElementById("analysisPeriod").value;
  const focusPoints = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((cb) => cb.value);

  console.log("生成报告:", {
    stockCode,
    reportType,
    analysisPeriod,
    focusPoints,
  });

  // 模拟加载数据
  showLoading();
  setTimeout(() => {
    generateReportContent();
    hideLoading();
  }, 1500);
}

// 显示加载状态
function showLoading() {
  const previewContent = document.querySelector(".preview-content");
  previewContent.innerHTML =
    '<div class="loading">正在生成报告，请稍候...</div>';
}

// 隐藏加载状态
function hideLoading() {
  // 加载完成后会自动替换内容，无需特别处理
}

// 生成报告内容
function generateReportContent() {
  const stockCode = document.getElementById("stockCode").value || "BABA";
  const reportType = document.getElementById("reportType").value;
  const analysisPeriod = document.getElementById("analysisPeriod").value;

  // 获取当前时间
  const now = new Date();
  const dateStr = now.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 根据报告类型生成不同内容
  let reportTitle, recommendation, summary;
  switch (reportType) {
    case "comprehensive":
      reportTitle = "综合分析报告";
      recommendation = "买入";
      summary = '基于公司良好的基本面和行业领先地位，给予"买入"评级。';
      break;
    case "technical":
      reportTitle = "技术分析报告";
      recommendation = "持有";
      summary = "短期技术指标显示中性，建议持有观望。";
      break;
    case "fundamental":
      reportTitle = "基本面分析报告";
      recommendation = "增持";
      summary = '公司财务状况稳健，业绩增长符合预期，给予"增持"评级。';
      break;
  }

  // 生成报告HTML
  const previewContent = document.querySelector(".preview-content");
  previewContent.innerHTML = `
    <div class="report-header">
      <h3>阿里巴巴(${stockCode})${reportTitle}</h3>
      <p class="report-meta">生成时间：${dateStr}</p>
    </div>
    <div class="report-body">
      <section class="report-section">
        <h4>投资建议</h4>
        <p class="recommendation">推荐评级：${recommendation}</p>
        <p class="summary">${summary}</p>
      </section>
      <section class="report-section">
        <h4>公司概况</h4>
        <p>阿里巴巴集团是全球最大的零售商业体之一，创建于1999年，业务横跨电子商务、云计算、数字媒体及娱乐和创新业务。公司在全球拥有超过10万名员工，业务覆盖200多个国家和地区。</p>
      </section>
      <section class="report-section">
        <h4>财务分析</h4>
        <p>2023财年，阿里巴巴集团实现营收8,689亿元人民币，同比增长2%；经调整EBITA为1,307亿元人民币，经调整EBITA利润率为15%。</p>
        <div class="report-chart" id="financialChart"></div>
      </section>
      <section class="report-section">
        <h4>风险提示</h4>
        <ul>
          <li>宏观经济下行风险</li>
          <li>行业竞争加剧风险</li>
          <li>监管政策变化风险</li>
          <li>技术创新不及预期风险</li>
        </ul>
      </section>
    </div>
  `;

  // 初始化报告中的图表
  setTimeout(() => {
    initFinancialChart();
  }, 100);
}

// 初始化财务图表
function initFinancialChart() {
  const chartElement = document.getElementById("financialChart");
  if (!chartElement) return;

  const chart = echarts.init(chartElement);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["营收", "净利润", "毛利率"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["2019", "2020", "2021", "2022", "2023"],
    },
    yAxis: [
      {
        type: "value",
        name: "金额(亿元)",
        min: 0,
        max: 10000,
      },
      {
        type: "value",
        name: "比率(%)",
        min: 0,
        max: 100,
      },
    ],
    series: [
      {
        name: "营收",
        type: "bar",
        data: [3768, 5097, 7173, 8529, 8689],
      },
      {
        name: "净利润",
        type: "bar",
        data: [872, 1494, 1504, 612, 720],
      },
      {
        name: "毛利率",
        type: "line",
        yAxisIndex: 1,
        data: [42, 43, 40, 37, 36],
      },
    ],
  };

  chart.setOption(option);
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

// 更新预览
function updatePreview() {
  // 当配置变化时更新预览
  generateReportContent();
}

// 处理导出事件
function handleExport(event) {
  const exportType = event.target.classList[1]; // pdf, word, excel
  const stockCode = document.getElementById("stockCode").value || "BABA";

  console.log(`导出${exportType}格式报告:`, stockCode);
  alert(`报告已导出为${exportType.toUpperCase()}格式`);
}
