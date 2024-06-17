<template>
        <div class="eco_sys">
        <text>תקופה</text>
        <button class="periodo" :class="{active: period === 12}" @click="setPeriod(12)">1Y</button>
        <button class="periodo" :class="{active: period === 36}" @click="setPeriod(36)">3Y</button>
        <button class="periodo" :class="{active: period === 60}" @click="setPeriod(60)">5Y</button>
    </div>
    <div>
        <Line :data="data" :options="options" :width="width" :height="height"/>
    </div>
  </template>
  
  <script>
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Line } from 'vue-chartjs'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  export default {
    mounted(){
        this.setPeriod(12);
        
    },
    components: {
      Line
    },
    
    data(){
        return{
            gra_p_1: [],
            period: 12,
        };
    },
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
        },
    },
    computed:{
        data(){
            return{
                labels: this.gra_p_1.labels,
                datasets: this.gra_p_1.map(data_graph => ({
                    label: `${data_graph.clickedWord}`,
                    data: data_graph.y,
                    borderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 10,
                }))
            }},
        options(){
            debugger
            if(this.gra_p_1.length==0)
            {
                return {
                responsive: true,
                maintainAspectRatio: false,
                }
            }
            const labels = this.gra_p_1[0].labels;
            return {
                responsive: true,
                maintainAspectRatio: false,
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
        }
    },
    }
  }

  </script>


<style>

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

</style>