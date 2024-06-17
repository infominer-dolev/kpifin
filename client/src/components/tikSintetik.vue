<template>   
<!--    Side Bar Menu   -->
<div class="sidebar-right" :class="{ 'sidebar-hidden-right': value }">
    <div class="sidebar-item-right" title="איפוס תיק">
        <img src="../assets/icon_restart.svg" @click="reset_tik">
    </div>
    <div class="sidebar-item-right" title="שמירת סימולציה" @click="exportToPDF">
        <img src="../assets/icon_file.svg" >
    </div>
    <div class="sidebar-item-right" title="התנתק">
        <router-link to="/" :class="{'selected-item-right': $route.name==='login'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.55vw" viewBox="0 0 36 36" fill="none" alt="Description of SVG" @click="isLogoutModalOpen=!isLogoutModalOpen">
                <path d="M7.96155 30.7499C7.20385 30.7499 6.5625 30.4874 6.0375 29.9624C5.5125 29.4374 5.25 28.7961 5.25 28.0384V7.96155C5.25 7.20385 5.5125 6.5625 6.0375 6.0375C6.5625 5.5125 7.20385 5.25 7.96155 5.25H18.0144V7.49996H7.96155C7.84615 7.49996 7.74036 7.54804 7.64419 7.64419C7.54804 7.74036 7.49996 7.84615 7.49996 7.96155V28.0384C7.49996 28.1538 7.54804 28.2596 7.64419 28.3557C7.74036 28.4519 7.84615 28.5 7.96155 28.5H18.0144V30.7499H7.96155ZM24.3461 24.4037L22.7885 22.7769L26.4404 19.1249H13.6442V16.875H26.4404L22.7885 13.2231L24.3461 11.5962L30.7499 18L24.3461 24.4037Z" fill="white"/>
            </svg>
        </router-link>
    </div>
    <gen-modal :isYesOrNoModal="true" :isModalOpen="isLogoutModalOpen" :textToDisplay="'האם ברצונך לצאת מהמערכת ?'" :agreeText="' צא'" :cancelText="'בטל'" @agree-action="logoutInSideBar()" @close-modal="isLogoutModalOpen=false"> </gen-modal>
</div>
    
<!--    Printable Zone  -->
<div>
    <div class="navigar">
        <div>
            <img style="height:8vh" src="../assets/kpilogo.svg" class="kpi_logo"> </div>
        </div>
        <div>
            <text>דוח סימולציה</text>
        </div>
        
        
    <div ref="contentToExport">
        <!--    MAIN    -->
        <div class="eco_system">
            <h1>תיק סימולציה</h1>
            <div class="big_picture">
                <div class="tab_out">
                    <!--    choose Kupot    -->
                    <div class="tab_in_tot">
                        <text class="tab_text_title" v-for="(title, index) in this.titles" :key="index">{{ title }}</text>
                        <button style="border: none; background: transparent; width: 28px; height: 28px;"></button>
                    </div>
                    <!--    show synthetic portfolio    -->
                    <div class="tab_in" v-for="(row, rowIndex) in tikTemp.slice(0)" :key="rowIndex">
                        <template v-for="cellIndex in order" :key="cellIndex">
                            <template v-if="cellIndex === 18">
                                <input class="tab_text_row" style="width: 5.7vw; height: 2vh; border-radius: 12px;" type="number" v-model="row[cellIndex]" step="25000" min="25000" @click="totalFun">
                            </template>
                            <template v-else-if="cellIndex === 19">
                                <input class="tab_text_row" style="height: 2vh; border-radius: 12px;" type="number" v-model="row[cellIndex]" step="0.1" appearance="percent" min="0" max="2" placeholder="דמי ניהול" @click="totalFun"/>
                            </template>
                            <template v-else-if="cellIndex === 1 || cellIndex === 5 || cellIndex === 2">
                                <text class="tab_text_row"> {{ row[cellIndex] }} </text>
                            </template>
                            <template v-else>
                                <text class="tab_text_row">{{ formatNumbertoString(row[cellIndex],2) }}% </text>
                            </template>
                            
                        </template>
                        <button class="resBtn" @click="removeRow(rowIndex)">X</button>
                    </div>
                    <!--    show Totals of synthetic portfolio  -->
                    <div class="tab_in_tot" v-if="total_tik[3]">
                        <div class="tab_text_row_out"> </div>
                        <div class="tab_text_row_out"> </div>
                        <div class="tab_text_row_out"> </div>
                        <text class="tab_text_row_out" > {{ formatNumbertoString(total_tik[3],0) }} </text>
                        <text class="tab_text_row_out"> {{ total_tik[4] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[5] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[6] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[7] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[8] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[9] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[10] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[11] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[12] }}% </text>
                        <text class="tab_text_row_out"> {{ total_tik[13] }}% </text>
                        <button style="border: none; background: transparent; width: 28px; height: 28px;"></button>
                    </div>
                </div>
            </div>
            <br>
            <button v-if="total_tik[3] && total_tik[13] > 0 && !simulation" @click="total_sim">הפעל סימולציה</button>
            <br>
            <h1 v-if="simulation">סיכום סימולציה לתיק</h1>
            <br>
            <div class="big_picture2"  v-if="simulation">
                <!--- totals BOX --->
                <div class="big_picture3" style="width: 22vw;">
                    <text class="tab_text_row_out">סיכום נתוני תיק</text>    
                    <div class="calculos2">
                        <text style="width: 15vw; text-align: right;">תשואות משוקללות</text>
                        <text> {{ formatNumbertoString(T_mesh, 2) }}%</text>
                    </div>
                
                    <div class="calculos2">
                        <text style="width: 15vw; text-align: right;">דמי ניהול משוקללים</text>
                        <text> {{ formatNumbertoString(D_niul, 2) }}%</text>
                    </div>
                    
                    <div class="calculos2">
                        <text style="width: 15vw; text-align: right;">תשואה משוקללת אחרי דמ"נ</text>
                        <text> {{ formatNumbertoString(T_mesh - D_niul, 2) }}%</text>
                    </div>

                    <div class="calculos2">
                        <text style="width: 15vw; text-align: right;">סטיית תקן</text>
                        <text> {{ formatNumbertoString(S_teken, 2) }}%</text>
                    </div>
                
                    <div class="calculos2">
                        <text style="width: 15vw; text-align: right;">יחס תשואה לסיכון משוקלל</text>
                        <text> {{ formatNumbertoString(Iahas_TS, 2) }}</text>
                    </div>

                    
                    <div class="calculos2">
                        <text style="width: 15vw; text-align: right;">שווי תיק סימולציה לפני דמי ניהול</text>
                        <text> {{ formatNumbertoString(total_tik[3] + revah_T[9], 2) }}</text>
                    </div>

                    <div class="calculos2">
                        <text style="width: 15vw; text-align: right;">שווי תיק סימולציה אחרי דמי ניהול</text>
                        <text> {{ formatNumbertoString(Shovi_Tik, 2) }}</text>
                    </div>

                </div>

                <div class="big_picture3" style="width: 22vw;">
                    <text class="tab_text_row_out">התפלגות חשיפת תיק</text>
                    <br>
                    <ChartJsD :data_graph="hasifot_p[0]" :width="'450px'" :height="'450px'"></ChartJsD>
                    <text>התפלגות לפי אפיק השקעה בהתאם להערכת תשומת המדד</text>
                </div>

                <div class="big_picture3" style="width: 39.5vw;">
                    <div class="tab_out">
                        <div class="tab_in_tot" style="margin-right: 0.5vw;">
                            <text class="tab_text_title" style="width: 9vw;" v-for="(title, index) in this.titles_T" :key="index">{{ title }}</text>
                        </div>    

                    </div>
                    <div class="tab_out">
                        <div class="calculos3" v-for="number in 10" :key="number">
                            <template v-if="number === 10">
                                <text class="tab_text_row_out" style="width: 14vw; color: #004066;"> {{ row_T[number - 1] }}</text>
                                <text class="tab_text_row"  style="width: 4vw;"></text>
                                
                                <text class="tab_text_row" style="width: 9vw;"></text>
                                <text class="tab_text_row" style="width: 9vw;"></text>
                                <text class="tab_text_row_out" style="width: 9vw; color: #004066;"> {{ formatNumbertoString(revah_T[number - 1], 0) }}</text>
                            </template>
                            <template v-else>
                                <text class="tab_text_row" style="width: 9vw;"> {{ row_T[number - 1] }}</text>
                                <div class="tab_text_row" style="width:0.45vw !important;">%</div>
                                <input class="tab_text_row" style="width: 3.7vw; margin-left:2vw; height: 2vh; border-radius: 12px;" v-model="madad_T[number-1]"  type="number" step="1" min="0"  @click="totalSum">
                                <text class="tab_text_row" style="width: 9vw;"> {{ total_tik[number+3] }}%</text>
                                <text class="tab_text_row" style="width: 9vw;"> {{ truma_T[number-1]}}%</text>
                                <text class="tab_text_row" style="width: 9vw;"> {{ formatNumbertoString(revah_T[number-1],0)}}</text>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="big_picture2" v-if="simulation">
                <div class="big_picture3" style="width: 43vw; height: 60vh;">
                    <text class="tab_text_row_out">ביצועים השוואתיים</text>

                    <ChartJslines :data_graph="gra_p" :height="'450px'" ></ChartJslines>
                </div>
                <div class="big_picture3" style="width: 43vw; height: 60vh;">
                    <text class="tab_text_row_out">יחס רווח מול שונות</text>
                    <ChartJsScar :data_graph="yield_p" :height="'450px'" ></ChartJsScar>
                </div>
            </div>
        </div>
    </div>
    <br>
    <text>נתוני המקור מבוססים על דוחות רשמיים ומתעדכנים מעת לעת בהתאם למדיניות הפרסום</text>
</div>
</template>

<script>
import ChartJslines from './ChartJslines.vue';
import ChartJsScar from './ChartJsScar.vue';
import ChartJsD from './ChartJsD';
import html2pdf from 'html2pdf.js';


export default {
    name: 'SimulationPortfolio',
    data() {
        return {
            isLogoutModalOpen:false,
            // Tik Sintety
            tikTemp: this.$store.state.tikSintetik,
            titles: ['מוצר','חברה מנהלת','סוג','סכום השקעה','חשיפה למניות','חשיפה לאגח ממשלתי','חשיפה לאגח קונצרני','חשיפה לקרנות לס','חשיפה להלוואות לס','אחר','מזומן ופקדונות','מט"ח','חול','דמי ניהול'],
            order: [2, 6, 1, 18, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19],
            total_tik: ['','','',0,0,0,0,0,0,0,0,0,0,0],
            orderOfYield:[0,6,7],
            // Profit Data
            titles_T: ['חשיפה','תשואת מדד','חשיפה מקושללת לאפיק','תרומה לתשואה','רווח (הפסד) תיק משוקלל'],
            row_T: ['מניות','אג"ח ממשלתי','אג"ח קונצרני','קרנות לס','הלוואות לס','אחר','מזומן ופקדונות','חו"ל','מט"ח','רווח לתיק לפני דמי ניהול'],
            madad_T: [1,1,1,1,1,1,1,1,1,''],
            truma_T: [0,0,0,0,0,0,0,0,0,0,''],
            revah_T: [0,0,0,0,0,0,0,0,0,0],
            showGraphs:false,
            tsua_to_madadT:0,
            T_mesh: 0,
            D_niul: 0,
            S_teken: 0,
            Iahas_TS: 0,
            Shovi_Tik: 0,
            count: 0,
            graph_p:[],
            gra_p: [],
            yield_p: [{
                xyValues: []
            }],
            hasifot_p: [{
                xValues: ['חשיפה למניות','חשיפה לאגח ממשלתי','חשיפה לאגח קונצרני','חשיפה לקרנות לס','חשיפה להלוואות לס','אחר','מזומן ופקדונות','חול'],
                yValues: [],
                barColors: ['#006654','#664F00','#004166','#663A00','#3E8DBB','#73E6D2','#8D5EEA','#928906','#828906'],
            }],
            simulation: false,
        };
    },
    components: {
        ChartJslines,
        ChartJsScar, 
        ChartJsD
    },
  
    computed: {
        historyDB(){
            return this.$store.state.historyDB.map(o=>Object.values(o));
        },
        tik(){
            if(this.$store.state.tikSintetik.length > 0){
                return this.$store.state.tikSintetik; 
            }else{
                return this.tikTemp;
            }
        },

    },
    methods: {
        exportToPDF() {
            const element = this.$refs.contentToExport;
            const options = {
                margin: 0.5,
                filename: 'simulation-portfolio.pdf',
                image: {type: 'jpeg', quality: 0.98},
                html2canvas: {scale: 2},
                jsPDF: {unit: 'in', format: 'a2', orentation: 'landscape'}
            };
            html2pdf().set(options).from(element).save();
        },
        
        initGraphHistory(){
            console.log(this.historyDB.length)
            for(let i = 0;i < this.historyDB.length;i++)
            {
                this.graph_p.push({labels:[this.historyDB[i][this.orderOfYield[1]]],
                    clickedWord:this.historyDB[i][this.orderOfYield[0]],
                    y:[this.historyDB[i][this.orderOfYield[2]]]
                })
            }
        },
        // Standart deviation calculation
        calculateStandardDeviation() {
            let array = [0,0,0,0,0,0,0,0,0,0];
            for(let i = 0; i < 9; i++){
                array[i] = this.truma_T[i];
            }
            const n = array.length;
            if (n === 0) {
                return null;
            } else {
                const mean = array.reduce((acc, val) => acc + val, 0) / n;
                const squaredDifferences = array.map(val => Math.pow(val - mean, 2));
                const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / n;
                return Math.sqrt(variance);
            }
        },

        formatNumber(value, step) {
            // Check if value is not empty and is a number
            if (value !== '' && !isNaN(value)) {
                // Parse the value as a float and round it to two decimal places
                const parsedValue = parseFloat(parseFloat(value).toFixed(step));
                // Return the parsed value
                return parsedValue;
            }
            // Return the original value if it's empty or not a number
            return 0;
        },
        
        formatNumbertoString(value, step) {
            // Check if value is not empty and is a number
            if (value !== '' && !isNaN(value)) {
                // Parse the value as a float and round it to two decimal places
                const parsedValue = parseFloat(value).toFixed(step);
                const formattedValue = Intl.NumberFormat('en-US', { minimumFractionDigits: step, maximumFractionDigits: step }).format(parsedValue);
                // Return the parsed value
                return formattedValue;
            }
            // Return the original value if it's empty or not a number
            return value;
        },

        reset_tik(){
            console.log('tik temp length: ',this.tikTemp.length)
            // for(let i = 0; i <= this.tikTemp.length; i++){
                this.tikTemp.splice(0, this.tikTemp.length);
              //  console.log('i: ',i)
            //}
            console.log('tik temp length: ',this.tikTemp.length)
                this.titles = ['מוצר','חברה מנהלת','סוג','סכום השקעה','חשיפה למניות','חשיפה לאגח ממשלתי','חשיפה לאגח קונצרני','חשיפה לקרנות לס','חשיפה להלוואות לס','אחר','מזומן ופקדונות','מט"ח','חול','דמי ניהול'];
                this.order = [2, 4, 1, 18, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19];
                this.total_tik = ['','','',0,0,0,0,0,0,0,0,0,0,0];
                this.orderOfYield = [0,6,7];
                this.titles_T = ['חשיפה','תשואת מדד','חשיפה מקושללת לאפיק','תרומה לתשואה','רווח (הפסד) תיק משוקלל'];
                this.row_T = ['מניות','אג"ח ממשלתי','אג"ח קונצרני','קרנות לס','הלוואות לס','אחר','מזומן ופקדונות','חו"ל','מט"ח','רווח לתיק לפני דמי ניהול'];
                this.madad_T = [1,1,1,1,1,1,1,1,1,''];
                this.truma_T = [0,0,0,0,0,0,0,0,0,0,''];
                this.revah_T = [0,0,0,0,0,0,0,0,0,0];
                this.showGraphs = false;
                this.tsua_to_madadT = 0;
                this.T_mesh = 0;
                this.D_niul = 0;
                this.S_teken = 0;
                this.Iahas_TS = 0;
                this.Shovi_Tik = 0;
                this.count = 0;
                this.graph_p = [];
                this.gra_p = [];
                this.yield_p = [{
                    xyValues: []
                }];
                this.hasifot_p = [{
                    xValues: ['חשיפה למניות','חשיפה לאגח ממשלתי','חשיפה לאגח קונצרני','חשיפה לקרנות לס','חשיפה להלוואות לס','אחר','מזומן ופקדונות','חול'],
                    yValues: [],
                    barColors: ['#006654','#664F00','#004166','#663A00','#3E8DBB','#73E6D2','#8D5EEA','#928906','#828906'],
                }];
                this.simulation = false;
        },

        removeRow(index) {
            // Remove the row at the given index from the rows array
            this.tikTemp.splice(index, 1);
            // reset data
                this.revah_T[9] = 0;
                this.T_mesh = 0;
                this.D_niul = 0;
                this.S_teken = 0;
                this.Iahas_TS = 0;
                this.Shovi_Tik = 0;
                this.total_tik =  ['','','',0,0,0,0,0,0,0,0,0,0,0];
                this.truma_T = [0,0,0,0,0,0,0,0,0,0,''];
                this.revah_T = [0,0,0,0,0,0,0,0,0,0];
                this.gra_p = [];
                this.yield_p[0] = [];
                this.totalFun();
                this.simulation = false;
        },

        totalFun(){            
            this.simulation = false;
            const cnt = this.tikTemp.length;
            if(cnt > 0){
                let totalSum = 0;
                let menaiot = 0;
                let memA = 0;
                let conA = 0;
                let lesK = 0;
                let lesL = 0;
                let otherT = 0;
                let cashT = 0;
                let matah = 0;
                let workdT = 0;
                let amla = 0;
                for(let i = 0; i < cnt; i++){
                    totalSum += this.tikTemp[i][18];
                    menaiot += this.tikTemp[i][18]*this.tikTemp[i][8];
                    memA += this.tikTemp[i][18]*this.tikTemp[i][9];
                    conA += this.tikTemp[i][18]*this.tikTemp[i][10];
                    lesK += this.tikTemp[i][18]*this.tikTemp[i][11];
                    lesL += this.tikTemp[i][18]*this.tikTemp[i][12];
                    otherT += this.tikTemp[i][18]*this.tikTemp[i][13];
                    cashT += this.tikTemp[i][18]*this.tikTemp[i][14];
                    matah += this.tikTemp[i][18]*this.tikTemp[i][15];
                    workdT += this.tikTemp[i][18]*this.tikTemp[i][16];
                    amla += this.tikTemp[i][19];
                }
                this.total_tik[3] = totalSum;
                this.total_tik[4] = this.formatNumber(menaiot / totalSum, 2);
                this.total_tik[5] = this.formatNumber(memA / totalSum, 2);
                this.total_tik[6] = this.formatNumber(conA / totalSum, 2);
                this.total_tik[7] = this.formatNumber(lesK / totalSum, 2);
                this.total_tik[8] = this.formatNumber(lesL / totalSum, 2);
                this.total_tik[9] = this.formatNumber(otherT / totalSum, 2);
                this.total_tik[10] = this.formatNumber(cashT / totalSum, 2);
                this.total_tik[11] = this.formatNumber(matah / totalSum, 2);
                this.total_tik[12] = this.formatNumber(workdT / totalSum, 2);
                this.total_tik[13] = this.formatNumber(amla / cnt, 2);
                
                // --- Reset counters
                this.revah_T[9] = 0;
                this.T_mesh = 0;
                this.D_niul = 0;
                this.S_teken = 0;
                this.Iahas_TS = 0;
                this.Shovi_Tik = 0;

                for(let x = 0; x < 9; x++){                    
                    this.truma_T[x] = this.formatNumber((this.total_tik[x+4]/100) * (this.madad_T[x]/100) * 100, 2);
                    this.T_mesh = this.T_mesh + (this.total_tik[x+4]/100) * (this.madad_T[x]/100) * 100;
                    this.revah_T[x] = this.formatNumber(this.total_tik[3] * (this.total_tik[x+4]/100) * (this.madad_T[x]/100), 2);
                    this.revah_T[9] = this.revah_T[9] + (this.total_tik[3] * (this.total_tik[x+4]/100) * (this.madad_T[x]/100));        
                    this.D_niul = this.total_tik[13];
                    this.S_teken = this.calculateStandardDeviation();
                    this.Iahas_TS = this.T_mesh / this.S_teken;
                    this.Shovi_Tik = (this.revah_T[9] + this.total_tik[3]) - ((this.revah_T[9] + this.total_tik[3]) * this.D_niul / 100);
                }    
            }
            this.doughnutGraph();
            
        },
        totalSum(){            
            const cnt = this.tikTemp.length;
            if(cnt > 0){
                let totalSum = 0;
                let menaiot = 0;
                let memA = 0;
                let conA = 0;
                let lesK = 0;
                let lesL = 0;
                let otherT = 0;
                let cashT = 0;
                let matah = 0;
                let workdT = 0;
                let amla = 0;
                for(let i = 0; i < cnt; i++){
                    totalSum += this.tikTemp[i][18];
                    menaiot += this.tikTemp[i][18]*this.tikTemp[i][8];
                    memA += this.tikTemp[i][18]*this.tikTemp[i][9];
                    conA += this.tikTemp[i][18]*this.tikTemp[i][10];
                    lesK += this.tikTemp[i][18]*this.tikTemp[i][11];
                    lesL += this.tikTemp[i][18]*this.tikTemp[i][12];
                    otherT += this.tikTemp[i][18]*this.tikTemp[i][13];
                    cashT += this.tikTemp[i][18]*this.tikTemp[i][14];
                    matah += this.tikTemp[i][18]*this.tikTemp[i][15];
                    workdT += this.tikTemp[i][18]*this.tikTemp[i][16];
                    amla += this.tikTemp[i][19];
                }
                this.total_tik[3] = totalSum;
                this.total_tik[4] = this.formatNumber(menaiot / totalSum, 2);
                this.total_tik[5] = this.formatNumber(memA / totalSum, 2);
                this.total_tik[6] = this.formatNumber(conA / totalSum, 2);
                this.total_tik[7] = this.formatNumber(lesK / totalSum, 2);
                this.total_tik[8] = this.formatNumber(lesL / totalSum, 2);
                this.total_tik[9] = this.formatNumber(otherT / totalSum, 2);
                this.total_tik[10] = this.formatNumber(cashT / totalSum, 2);
                this.total_tik[11] = this.formatNumber(matah / totalSum, 2);
                this.total_tik[12] = this.formatNumber(workdT / totalSum, 2);
                this.total_tik[13] = this.formatNumber(amla / cnt, 2); // יחס
                
                // --- Reset counters
                this.revah_T[9] = 0;
                this.T_mesh = 0;
                this.D_niul = 0;
                this.S_teken = 0;
                this.Iahas_TS = 0;
                this.Shovi_Tik = 0;

                for(let x = 0; x < 9; x++){                    
                    this.truma_T[x] = this.formatNumber((this.total_tik[x+4]/100) * (this.madad_T[x]/100) * 100, 2);
                    this.T_mesh = this.T_mesh + (this.total_tik[x+4]/100) * (this.madad_T[x]/100) * 100;
                    this.revah_T[x] = this.formatNumber(this.total_tik[3] * (this.total_tik[x+4]/100) * (this.madad_T[x]/100), 2);
                    this.revah_T[9] = this.revah_T[9] + (this.total_tik[3] * (this.total_tik[x+4]/100) * (this.madad_T[x]/100));        
                    this.D_niul = this.total_tik[13];
                    this.S_teken = this.calculateStandardDeviation();
                    this.Iahas_TS = this.T_mesh / this.S_teken;
                    this.Shovi_Tik = (this.revah_T[9] + this.total_tik[3]) - ((this.revah_T[9] + this.total_tik[3]) * this.D_niul / 100);
                }    
            }
            if(this.simulation){
                const labelToUpdate = 'תיק סינטטי';
                const index = this.yield_p[0].xyValues.findIndex(obj => obj.label === labelToUpdate);
 
                if (index !== -1) {
                    this.yield_p[0].xyValues[index].x = this.T_mesh; // new_T_mesh is the new value for T_mesh
                    this.yield_p[0].xyValues[index].y = this.S_teken; // new_S_teken is the new value for S_teken
                } else {
                    console.log('Object with specified label not found.');
                }
                
                const index_2 = this.gra_p.findIndex(obj => obj.clickedWord === labelToUpdate);
                console.log(index_2);
                if (index_2 !== -1){
                    this.gra_p[index_2].y[0] = this.T_mesh;
                } else {
                    console.log('Object with specified label not found.');
                }
            }
            this.doughnutGraph();
            
        },
        genRevMonthArray(startMonth, numberOfMonths) {
            const result = [];
            const [month, year] = startMonth.split('/').map(Number);
            const startDate = new Date(year, month - 1, 1);
            console.log('start Date',startDate);

            for (let i = 0; i < numberOfMonths; i++) {
                const currentMonth = startDate.getMonth() + 1;
                const currentYear = startDate.getFullYear();
                const formattedDate = `${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
                result.unshift(formattedDate);
                startDate.setMonth(startDate.getMonth() + 1);
            }
            return result;
        },
        
        total_sim(){
            debugger
            // גרף ביצועים
            this.gra_p = [];
            this.gra_p.push({labels: this.genRevMonthArray('03/2019',60), clickedWord: 'תיק סינטטי', y: [this.T_mesh]})
            for(let j=0; j < this.tikTemp.length; j++){
                let Dlabels = [];
                let DclickedWord = this.tikTemp[j][2];
                let Dy = [];
                for(let k=0; k < this.$store.state.hist_count; k++){
                     if(this.tikTemp[j][0] == this.historyDB[k][0]){
                        Dlabels.push(this.getdate(this.historyDB[k][6]));
                        Dy.push(this.historyDB[k][7]);
                    }
                }
                this.gra_p.push({labels: Dlabels, clickedWord: DclickedWord, y: Dy})
            }               
            // גרף יחס רווח מול שונות
            this.yield_p[0].xyValues = [];
            this.yield_p[0].xyValues.push({x: this.T_mesh, y: this.S_teken, label: 'תיק סינטטי'})
            for(let j=0; j < this.tikTemp.length; j++){
                let Dx = 0;
                let Dy = 0;
                let Dlabel = this.tikTemp[j][2];
                let number = 0;
                for(let k = 0; k < this.$store.state.hist_count; k++){
                    if(this.tikTemp[j][0] == this.historyDB[k][0]){
                        if(this.historyDB[k][6] > number){
                            number = this.historyDB[k][6];
                            Dx = this.historyDB[k][7];
                            Dy = this.historyDB[k][8];
                        }
                    }
                }
                this.yield_p[0].xyValues.push({x: Dx, y: Dy, label: Dlabel})
            }
            
            this.simulation = true;
        },
        
        
        // exteract Date from excel format
        getdate(number){
            let baseDate = new Date(1900, 0, 1);
            let date = new Date(baseDate.getTime() + (number - 1) * 86400000);
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            month = month < 10 ? '0' + month: month;
            return `${month}/${year}`;
        },


        doughnutGraph(){
            const newHasifa={...this.hasifot_p[0]};
            newHasifa.yValues = [];
                if (this.total_tik[3] !== 0 || this.total_tik[3] !== null){
                     for(let i = 0; i < 8; i++){
                         newHasifa.yValues.push( this.total_tik[i+4]);
                     }
                }
                this.hasifot_p.splice(0,1);
                this.hasifot_p.push(newHasifa);
        },
    },

    watch: {
        tikTemp: {
            handler: 'totalFun',
            deep: true, // Call totalFun() immediately when the component is created
        },
        total_tik:{
            handler:'initGraphHistory'
        },
    },

    mounted(){
        // this.totalFun();
    }
};
</script>

<style scooped>
h1{
    direction: rtl;
    text-align: right;
    margin-right: 5vw;
    font-family: 'Assistant';
    font-size: 1.5rem;
    line-height: 22px;
}
.resBtn{
    width: 28px;
    height: 22px;
    border-radius: 50%;
    background-color: #004166;
    color: #fff;
    font-size: 0.6rem;
    line-height: 8px;
    text-align: center;
    font-weight: 600;
    padding: 0px 0px;
    margin: 0px 0px;
    border-color: transparent;
    cursor: pointer;
}
.resBtn:hover{
    background-color: #9e8783;
    transition-duration: 0.5s;
}

.calculos{
    cursor: pointer;
    background-color: #f0f3f5;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px 10px 10px;
    margin-top: 10px;
    border-radius: 8px;
    gap: 10px;
    width: 22vw;
}
.calculos2{
    display: flex;
    flex-direction: row;
    direction: rtl;
    background-color: #0041661a;
    color: #004066;
    align-items: center;
    padding: 10px 10px 10px 10px;
    margin: 5px 5px;
    border-radius: 8px;
    width: 20vw;
    text-align: center;
    font-family: 'Assistant';
    font-size: 1rem;
    font-weight: 700;
    gap: 1vw;
}
.calculos3{
    display: flex;
    flex-direction: row;
    direction: rtl;
    background-color: #0041661a;
    align-items: center;
    padding: 10px 10px 10px 10px;
    margin: 5px 5px;
    border-radius: 8px;
    gap: 0.5vw;
}

.tab_out{
  position: relative;
  align-items: center;
  flex-direction: column;
  gap: 0.5vw;
  font-family: 'Assistant';
}

.tab_in{
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 0.5vh;
  gap: 0.5vw;
  font-family: 'Assistant';
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.25);
}
.tab_in_tot{
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 0.5vh;
  gap: 0.5vw;
  font-family: 'Assistant';
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}


.tab_text_title{
    position: relative;
    font-family: 'Assistant';
    font-size: 0.8rem;
    font-weight: 500;
    width: 8vw;
    background: transparent;
    border-radius: 4px;
    text-align: right;
    color: black;
    justify-content: center;
}
.tab_text_row{
    position: relative;
    font-family: 'Assistant';
    font-size: 1rem;
    font-weight: 700;
    width: 8vw;
    background: transparent;
    border-radius: 4px;
    text-align: right;
    color: #13847A;
    justify-content: center;
}
.tab_text_row_out{
    position: relative;
    font-family: 'Assistant';
    font-size: 1.2rem;
    font-weight: 800;
    width: 8vw;

    background: transparent;
    border-radius: 4px;
    text-align: right;
    color: #004066;
    justify-content: center;
    
}
.eco_system{
    position: relative;
    display: block;
    flex-direction: column;
    width: 96vw;
    max-width: 96vw;
}

.big_picture{
    display: relative;
    background-color: #fff;  
    position: relative;
    justify-content: center;
    width: 90vw;
    padding: 10px;
    margin-left: 3vw;
    
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
}
.big_picture2{
    position: relative;
  display: flex;
  flex-direction: row;
  width: 90vw;  
  gap: 2vw;  
  margin-left: 3vw;
}
.big_picture3{
    display: relative;
    background-color: #fff;  
    position: relative;
    justify-content: center;
    width: 50vw;
    padding: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
}

/* sidebar styles */

.sidebar-right {
  position: fixed;
  padding: 8px 8px;
  top: 6.25%;
  right: 0;
  width: 2.3%;
  height: 93%;
  background-color: #02324f;
  z-index: 10;
  }
  .selected-item-right{
  background-color: rgba(62, 74, 83, 0.855) !important;
  border-radius: 18px;
}
  .sidebar-hidden-right {
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
  }

.sidebar-item-right{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 10px 10px;
  margin-top: 10px;
  border-radius: 18px;
}

.sidebar-item-right:hover{
  background-color: #103a72;
  border-radius: 18px;

}
.sidebar-item-right:active{
  background-color: #721068;
  border-radius: 18px;
}

.navigar {
    position: relative;
    display: flex;

    flex-direction: row-reverse;
    
}
</style>