<template>
<div v-if="isModalOpen" class="modal-of-show-container" >
<div class="modal-content-container">
  <p class="modal-content-container-title">צור קונטיינר חדש</p>
  <input type="text" v-model="textInput" dir="rtl" class="modal-content-container-input" placeholder="שם הקונטיינר" @keyup.enter="closeModalIfThereIsInput()">
  <div class="buttons-of-container">
    <button class="modal-content-container-btn" @click="closeModalIfThereIsInput(), $emit('save-container-to-database')" >שמור</button>
    <button class="modal-content-container-btn" :style="{color:'#1E86FF'}" @click="$emit('close-modal'); cancelButtonClearInput()">בטל</button>
  </div>
</div>
</div>
<GenModal :is-modal-open="isMessageModalOpen" :is-message-modal="true" :text-to-display="'קיים כבר קונטיינר עם אותו שם'" @close-modal="isMessageModalOpen=false"></GenModal>
</template>

<script>
import GenModal from '@/components/GenModal.vue'
export default{
  data(){
    return{
    textInput:"",
    isMessageModalOpen:false,
    };
  },
  components:{
    GenModal,
  },
  props:["isModalOpen","containerArray"],
  methods: {
    cancelButtonClearInput(){
      this.textInput="";
    },
    isContainerEmpty(){
      return this.containerArray===""
    },
    closeModalIfThereIsInput(){  
      let isInList =this.containerArray.find(item => item.name === this.textInput)
      //need to check whats wrong-variable name
      if(this.textInput!="" && !isInList) {
        this.$emit('close-modal')
        let inputToPass = this.textInput
        this.$emit('new-container',inputToPass)
        this.textInput=""
      }
      if(isInList) {
        this.isMessageModalOpen=true;
      }
      return isInList;
    }        
  }
}
</script>

<style>
.modal-content-container{
  z-index: 99;
  position: fixed;
  top: 34vh;
  left: 43vw;
  display: flex;
  flex-direction: column;
  /* height: 17vh; */
  width: 300px;
  background: #FFF;
  padding: 20px 20px;
  gap: 10px;
  box-shadow: 0px 1px 4px 0px #D5D9E7;
  border-radius: 10px;
}
.modal-of-show-container {
  position: fixed; /* Stay in place */
  left: 0;
  z-index: 999;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
  min-width: 1350px;
}
.modal-content-container-title{
  text-align: right;
  font-family: "Rubik";
  font-size: 18px;
  font-style: normal;
  margin-top: 5px;
  font-weight: 700;
  line-height: 24px;
}
.buttons-of-container{
margin-right:170px;
}
.modal-content-container-input{
  padding: 16px 18px 16px 18px;
  text-align: right;
  font-family: "Rubik";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  flex-direction: column-reverse;
  max-height: 270px;
  border-radius: 9px;
}


.modal-content-container-btn{
  position: relative;
  padding: 8px 15px 8px 15px;
  justify-content: center;
  align-items: right;
  flex-direction: row-reverse;
  border-radius: 8px;
  background: var(--primary, #ffffff);
  color: #000000;
  font-family: "Rubik";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  border: none;
  transition-duration: 0.4s; 
}
.modal-content-container-btn:hover{
    background: var(--primary, #bad8fc);
    color: #465C7B;
}
.modal-content-container-btn:active{
    background: var(--primary, #545962);
    color: #465C7B;
}
</style>