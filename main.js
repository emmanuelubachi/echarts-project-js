import * as echarts from "echarts";
import csv from "csvtojson";
import * as dataForge from "data-forge";
import "data-forge-fs";

// (async () => {
//   // Load the CSV file
//   const data = await csv().fromFile("2022_trade.csv");

//   // Show the data in the console
// })();

//const xdata = ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"];
//const ydata = [5, 20, 36, 10, 10, 20];

const xdata = [];
const ydata = [];
const cdata = [];

barChart();
barCategory();

async function getData() {
  //const xs = [];
  //const ys = [];

  const response = await fetch("2022_trade.csv");
  const data = await response.text();

  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const columns = row.split(",");
    const country = columns[0];
    const flow = columns[1];
    const commodity = columns[2];
    const value = columns[3];
    xdata.push(country);
    ydata.push(value);
    cdata.push(flow);
  });
  console.log(xdata);
}

async function barChart() {
  await getData();
  // Create the echarts instance
  const myChart = echarts.init(document.getElementById("main"));

  // Draw the chart
  myChart.setOption({
    title: {
      text: "ECharts Getting Started Example",
    },
    tooltip: {},
    xAxis: {
      data: xdata,
    },
    yAxis: {},
    series: [
      {
        name: "sales",
        type: "bar",
        data: ydata,
      },
    ],
  });
}

async function barCategory() {
  await getData();

  const myChart = echarts.init(document.getElementById("bar-y-category"));

  const option = {
    title: {
      text: "World Population",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
    },
    series: [
      {
        name: "2011",
        type: "bar",
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
      {
        name: "2012",
        type: "bar",
        data: [19325, 23438, 31000, 121594, 134141, 681807],
      },
    ],
  };

  option && myChart.setOption(option);
}

// // Create the echarts instance
// //var myChart = echarts.init(document.getElementById("main"));
// console.log(data);
// // Draw the chart
// myChart.setOption({
//   dataset: {
//     dimensions: ["Country", "Flow", "Commodity", "Value"],
//     source: data,
//   },
//   title: {
//     text: "ECharts Getting Started Example",
//   },
//   tooltip: {},
//   xAxis: {
//     type: "category",
//   },
//   yAxis: {},
//   series: [
//     {
//       type: "bar",
//       encode: {
//         x: "Country",
//         y: "Value",
//       },
//     },
//   ],
// });
