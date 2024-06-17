<template>
  <div class="big_order">
    <div class="counter">
      <button @click="isSearchModalOpen=true">+</button>
    </div>
    <text>בחר מוצרים לסימולציה</text>
  </div>
  <SearchModal @close-modal="isSearchModalOpen=false" @add-to-results="addToResults" :array-of-info="results" :text-to-display="'הזינו קוד או שם מוצר'" :is-modal-open="isSearchModalOpen" @handle-input-change="handleInputChange"  ></SearchModal>
</template>
<script>

import SearchModal from './SearchModal.vue';
export default {
  data() {
    return {
      searchQuery: '',
      results: [],
      isSearchModalOpen:false,
    };
  },
  components:{
    SearchModal,
  },
    computed:{
        da(){
            return this.$store.state.hasiDB.map(o=>Object.values(o));
        },
        daText(){
            return this.da.map(o=>o.join('~'));
        },
    },
  methods:{
    addToResults(value){
      if(!this.$store.state.tikSintetik.includes(value)){
        this.$store.state.tikSintetik.push(value);
      }
    },
    handleInputChange(search_input){
       console.log("Data:", this.da);


      if(search_input.length > 0)
      {
        this.searchQuery = search_input;
      } else {
        this.searchQuery = '';
      }
      
      console.log("Search Query:", this.searchQuery);

      let resultados = [];
      const cnt = this.da.length;
      this.results = [];

      if((cnt > 0) && (this.searchQuery.length !== 0)){
        for(let i=0; i < cnt; i++){
          if(this.daText[i].includes(this.searchQuery)) {
            resultados.push(this.da[i]);
            if(resultados.length>=100)
                break;
          } 
        }
        this.results.push(...resultados);
        console.log("Results:", this.results);
      } else {
        this.results = [];
        console.log("No results found.");
      }
    }
  },
};
</script>

<style scoped>
.big_order{
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 2vh;
  margin-right: 5vw;
  gap: 0.5vw;
  font-family: 'Assistant';
  font-size: 1.5rem;
  font-weight: 500;
  color: #0E7E7A;
  /* color: #9AD2D7; */
}
.counter button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: #0E7E7A;
        color: #fff;
        font-size: 1.5rem;
        line-height: 12px;
        text-align: center;
        font-weight: 600;
        padding: 0px 0px;
        margin: 0px 0px;
        border-color: transparent;
        cursor: pointer;
    }
</style>