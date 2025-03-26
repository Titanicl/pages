// 为图表应用暗色主题
function applyDarkThemeToChart(chart) {
  const darkThemeOption = {
    backgroundColor: "transparent",
    textStyle: {
      color: "#fff",
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
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
    yAxis: {
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
    tooltip: {
      backgroundColor: "rgba(12, 33, 53, 0.9)",
      borderColor: "#1f3a5f",
      textStyle: {
        color: "#fff",
      },
    },
  };

  chart.setOption(darkThemeOption, false);
}
