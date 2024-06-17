<template>
    <div :style="{ width: width, height: height }">
      <Doughnut v-if="chartData" :data="chartData" :options="options" />
    </div>
  </template>
  
  <script>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Doughnut } from 'vue-chartjs'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'App',
    components: {
      Doughnut
    },
    props: {
      data_graph: {
        type: Object,
        required: true
      },
      width: {
        type: String,
        default: '800px',
        required: false
      },
      height: {
        type: String,
        default: '200px',
        required: true
      }
    },
    data() {
      return {
        chartData: null
      }
    },
    watch: {
      data_graph: {
        handler(newVal) {
          console.log('data_graph updated:', newVal);
          this.chartData = this.transformData(newVal);
          console.log('chartData updated:', this.chartData);
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      options() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'vue'
            }
          }
        }
      }
    },
    methods: {
      transformData(data) {
        if (!data || Object.keys(data).length === 0) {
          console.error('undefined or empty data');
          return { labels: [], datasets: [] };
        }
        return {
          labels: data.xValues || [],
          datasets: [
            {
              backgroundColor: data.barColors || [],
              data: data.yValues || []
            }
          ]
        };
      }
    }
  }
  </script>
  