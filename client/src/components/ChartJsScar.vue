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
            type: Array,
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
    
    mounted(){
        this.$nextTick(() => {
        this.renderChart();
    });

    },
    beforeUnmount() {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
    },
    watch:{
        data_graph:{
            handler(){
                this.renderChart();
            },
            deep: true,
        }        
    },
    methods:{
        renderChart(){
            if(!this.data_graph  || this.data_graph.length === 0){
                console.error('undefined or emptydata');
                return;
            }
            if(!this.$refs.myChart)
                {
                    return;
                }
            const ctx = this.$refs.myChart.getContext('2d');
            if(this.chartInstance){
                this.chartInstance.destroy();
            }
            
            const data = {                
                datasets: this.data_graph[0].xyValues.map(xyValue => ({                    
                    label: xyValue.label,
                    data: [{ x: xyValue.x, y: xyValue.y }],
                    borderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 10,
                }))
            };
            const options = {
                responsive: true,
                scales: {
                    x:{
                        type: 'linear',
                        position: 'bottom',                        
                        ticks: {
                            autoSkip: false,
                            maxTicksLimit: 5,
                            beginAtZero: false,
                            max: 10,
                            color: (context) => {
                                if (context.index === 0){
                                    return '#00000'
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'רווח באחוזים'
                        }
                    },
                    y:{
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'שונות באחוזים'
                        },
                        ticks: {
                            color: (context) => {
                                if (context.index === 0){
                                    return '#00000'
                                }
                            }
                        }
                    }
                }
            };
  
            // Create the chart
            this.chartInstance = new Chart(ctx, {
                type: 'scatter',
                data: data,
                options: options

            });

        }
    },
} 
</script>