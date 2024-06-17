User
<template>
    <div>
        <canvas ref="myChart" :width="width" :height="height"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default{
    props: {
        data_graph:{
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

    data(){
        return{
            chartInstance: null,
        };
    },
    watch: {
        data_graph: {
            handler() {
                console.log('data_graph watch')
                this.renderChart();
            },
            immediate: true, // This ensures the handler is called immediately when the component is mounted
        },
    },

    beforeUnmount() {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
    },
    methods:{
        renderChart(){
            if(!this.data_graph  || this.data_graph.length === 0){
                console.error('undefined or emptydata');
                return;
            } else {

            this.$nextTick(() => {

                if(!this.$refs.myChart)
                {
                    console.log('next tick return');
                    return;
                }
                const ctx = this.$refs.myChart.getContext('2d');
                if(this.chartInstance){
                   this.chartInstance.destroy();
                }

                // Data Transform
                const xValues = this.data_graph.xValues;
                const yValues = this.data_graph.yValues;
                const barColors = this.data_graph.barColors;

                const data = {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                };
                const options = {
                    title: {
                        display: true,
                        text: 'vue'
                    
                    }
                };

                // Create the chart
                this.chartInstance = new Chart(ctx, {
                    type: 'doughnut',
                    data: data,
                    options: options

                });
            })
        }            
        }
    },
} 
</script>