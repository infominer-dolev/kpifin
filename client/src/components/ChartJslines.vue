User
<template>
    <div class="eco_sys">
        <text>תקופה</text>
        <button class="periodo" :class="{active: period === 12}" @click="setPeriod(12)">1Y</button>
        <button class="periodo" :class="{active: period === 36}" @click="setPeriod(36)">3Y</button>
        <button class="periodo" :class="{active: period === 60}" @click="setPeriod(60)">5Y</button>
    </div>
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
            gra_p_1: [],
            period: 12,
        };
    },
    
    mounted(){
        this.setPeriod(12);
        
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
        setPeriod(period){
            this.period = period;
            this.gra_p_1 = [];
            console.log('period',period);
            console.log('lenght',this.data_graph.length)
            for(let i = 0; i < this.data_graph.length; i++){
                console.log(this.data_graph[i]);
                console.log('i',i);
                let gra_p_item = this.data_graph[i];
                this.gra_p_1.push({
                    labels: gra_p_item.labels.slice(0,period),
                    clickedWord: gra_p_item.clickedWord,
                    y: gra_p_item.y.slice(0,period),
                });
                console.log('new array',this.gra_p_1);
            }
            this.renderChart();
        },
        
        renderChart(){
            if(!this.gra_p_1){
                console.error('undefined data');
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
            const labels = this.gra_p_1[0].labels;
            const data = {
                labels: this.gra_p_1.labels,
                datasets: this.gra_p_1.map(data_graph => ({
                    label: `${data_graph.clickedWord}`,
                    data: data_graph.y,
                    borderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 10,
                }))
            }
            
            const options = {
                scales: {
                    x: {
                        type: 'category',
                        labels: labels, // Labels for x-axis
                        reverse: true
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        ticks: { 
                            beginAtZero: true,
                            color: (context) => {
                                return context.tick.value === 0 ? 'black' : 'gray';
                            }
                         },
                        title: {
                            display: true,
                            text: 'ביצוע באחוזים'
                        }
                    },
                }
            };
  
            // Create the chart
            this.chartInstance = new Chart(ctx, {
                type: 'line',
                data: data,
                options: options
            });

        }
    },
} 
</script>
<style scoped>
.periodo{
    width: 28px;
    height: 22px;
    border-radius: 4px;
    background-color: #818fb3;
    color: #fff;
    font-size: 0.8rem;
    line-height: 8px;
    text-align: center;
    font-weight: 600;
    padding: 0px 0px;
    margin: 0px 0px;
    border-color: transparent;
    cursor: pointer;
}
.periodo.active{
    background-color: #004166;
}
.periodo:hover{
    background-color: #9e8783;
    transition-duration: 0.5s;
}
.eco_sys{
    position: relative;
    display: flex;
    direction: rtl;
    justify-content: center;
    flex-direction: row;
    gap: 8px;
}
</style>