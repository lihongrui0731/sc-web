<template>
  <div :options="option"></div>
</template>

<script>
import * as echarts from "echarts";

// import ECharts from "vue-echarts";

var chartDom = document.getElementById("main");
var myChart = echarts.init(chartDom);
var option;


  // components: { "v-chart": ECharts },

    var base = +new Date(2014, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];
    var data = [Math.random() * 10];
    var now = new Date(base);

      optionLeq= {
        xAxis: {
          type: "time",
          boundaryGap: false,
          data: date,
          axisLabel: {
            formatter: "{HH}:{mm}:{ss}:{SSS}",
          },
        },
        yAxis: {
          boundaryGap: [0, "50%"],
          type: "value",
          axisLabel: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            smooth: true,
            symbol: "none",
            // stack: 'a',
            // areaStyle: {
            //   normal: {}
            // },
            data: data,
          },
        ],
      };

  

function addData(shift) {
  now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/");
  date.push(now);
  data.push(Math.random() * 10 + data[data.length - 1]);
  if (shift) {
    date.shift();
    data.shift();
  }
  now = new Date(+new Date(now) + oneDay);
}
for (var i = 1; i < 100; i++) {
  addData();
}

setInterval(function () {
  addData(true);
  myChart.setOption({
    xAxis: {
      data: date,
    },
    series: [
      {
        data: data,
      },
    ],
  });
}, 500);

option && myChart.setOption(option);
</script>

