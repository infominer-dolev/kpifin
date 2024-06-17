<template>
  <div v-if="isModalOpen" class="modal-of-show-container" @click="$emit('close-modal')">
    <div class="modal-content" @click.stop="" :style="{ marginLeft: marginLeft, marginTop: marginTop }">
      <input dir="rtl" class="search-input" v-model="search_input_modal" :placeholder="textToDisplay" @input="$emit('handle-input-change',search_input_modal)">
      <div class="search-results">
        <div v-for="result in arrayOfInfo" :key="result" >
          <div class="big_order">
            <div class="counter">
              <button @click="emitAddToResults(result)">+</button>
            </div>
            <GenToolTip :text="result" :top="'20vh'" :left="'51vw'">
              {{ result[1] }} | {{ result[0] }}
            </GenToolTip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenToolTip from '../components/GenToolTip.vue'
export default {

  components:{
    GenToolTip,
  },
  mounted() {
    this.keyupListener = event => {
      if (event.key === 'Escape') {
        this.$emit('close-modal');
        this.showModalOfListOfContainers = false;
      }

    };
    window.addEventListener('keyup', this.keyupListener);
  },
  unmounted() {
    window.removeEventListener('keyup', this.keyupListener);
  },

  data() {
    return {
      search_input_modal:'',
    }
  },
  methods: {
    gotIt() {
      this.$emit('agree-action');
      this.$emit('close-modal');
    },
    emitAddToResults(result){
      this.$emit('add-to-results',result)
    }
  },
  computed: {
    mobileDevice(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },
  },
  props: {
    arrayOfInfo: {
      
    },

    gotItText: {
      type: String,
      default: 'הבנתי'
    },
    agreeText: {
      type: String,
      default: 'אשר'
    },
    cancelText: {
      type: String,
      default: 'בטל'
    },
    textToDisplay: {
      type: String,
      default: '',
    },
    isMessageModal: {
      type: Boolean,
      default: false,
    },
    isYesOrNoModal: {
      type: Boolean,
      default: false,
    },
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    marginLeft: {
      type: String,
      default: '70vw', // Default margin left
    },
    marginTop: {
      type: String,
      default: '12vh', // Default margin top
    },
  }
}
</script>

<style scoped>
.search-input{
  border: none; 
  outline: none;
  padding: 10px; 
  font-family: 'Assistant';
  font-size: 1.5rem;
  background: none;
  color:black;
  width: 22vw;
}
.search-results{
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 1vh;
  width: 22vw;
  gap: 0.5vw;
  font-family: 'Assistant';
  font-size: 1.5rem;
  font-weight: 500;
  color: #0E7E7A; 
}
.big_order{
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  /* margin-right: 2vw; */
  width: 22vw;
  gap: 0.5vw;
  font-family: 'Assistant';
  font-size: 1rem;
  font-weight: 500;
  text-align:right;
  color: #0E7E7A;
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
  margin: 0vw 0.5vw 0.4vw 0vw;
  border: none;
  border-color: transparent;
  cursor: pointer;
}



.blue-modal-button {
  position: relative;
  top: 90px;
  margin-left: 12px;
  background-color: #007bff;
  cursor: pointer;
  color: white;
  /* Text color that contrasts with the background */
  border-radius: 3px;
  /* Rounded corners for a modern button look */
  text-align: center;
  /* Center the text inside the div */
  font-weight: bold;
  font-size: 20px;
  padding: 5px 30px;
  transition: background-color 0.3s;
  /* Smooth transition for hover effect */
}

.got-it-modal-button {
  position: relative;
  top: 90px;
  margin-left: 80px;
  margin-right: 80px;
  background-color: #007bff;
  cursor: pointer;
  color: white;
  /* Text color that contrasts with the background */
  border-radius: 3px;
  /* Rounded corners for a modern button look */
  text-align: center;
  /* Center the text inside the div */
  font-weight: bold;
  font-size: 20px;
  padding: 5px 15px;
  transition: background-color 0.3s;
  /* Smooth transition for hover effect */
}
ul {
  list-style-type: none;
}

.message {
  font-family: "Rubik";
  font-size: 20px;
}

.gray-modal-button {
  position: relative;
  top: 90px;
  margin-left: 12px;
  cursor: pointer;
  background-color: #c1c2c4;
  color: white;
  /* Text color that contrasts with the background */
  border-radius: 3px;
  /* Rounded corners for a modern button look */
  text-align: center;
  /* Center the text inside the div */
  font-weight: bold;
  font-size: 20px;
  padding: 5px 30px;
  transition: background-color 0.3s;
  /* Smooth transition for hover effect */
}

.gray-modal-button:hover {
  background-color: #007bff;
}

.buttons-of-modal {
  display: flex;
  margin-left: 40px;
}

.modal-of-show-container {
  position: fixed;
  /* Stay in place */
  left: 0;
  z-index: 9999999;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  background-color: rgba(0, 0, 0, 0.7);
  /* Black w/ opacity */
  min-width: 1350px;
}

.modal-content {
  position: relative;
  cursor: pointer;
  background-color: #E6E9ED;
  margin-right: 6vw;
  padding: 14px 0px 0px 0px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  line-height:normal;
}

.modal-overlay {
  position: relative;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  /* Semi-transparent background */
  z-index: 999999;
  /* Place it behind the modal */
}

.close-content-modal {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #5a5858;
  cursor: pointer;
}

.modal {
  position: fixed;
  /* Stay in place */
  left: 0;
  z-index: 999999999999;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7);
  /* Black w/ opacity */
}

@media  only screen and (max-width: 600px){
  .modal-content {
    position: relative;
    background-color: #E6E9ED;
    margin-left: 6% !important;
    margin-top: 15% !important;
    padding: 1.5vh;
    border: 3px solid #888;
    height: 21vh !important;
    width: 53vw !important;
    overflow-y: auto;
    border-radius: 8px;
}
.message{
  font-size: 3.3vw;
}



.blue-modal-button {
  position: relative;
  background-color: #007bff;
  cursor: pointer;
  color: white;
  text-align: center;
  font-weight: 400;
  font-size: 4vw;
  padding: 1vw 2vw;
  top: 10.7vh;
  transition: background-color 0.3s;
  border-radius: 12px;
}

.got-it-modal-button {
  position: relative;
  top: 90px;
  margin-left: 80px;
  margin-right: 80px;
  background-color: #007bff;
  cursor: pointer;
  color: white;
  /* Text color that contrasts with the background */
  border-radius: 3px;
  /* Rounded corners for a modern button look */
  text-align: center;
  /* Center the text inside the div */
  font-weight: bold;
  font-size: 20px;
  padding: 5px 15px;
  transition: background-color 0.3s;
  /* Smooth transition for hover effect */
}


.gray-modal-button {
  position: relative;
  cursor: pointer;
  color: white;
  
    text-align: center;
    font-weight: 400;
    font-size: 4vw;
    padding: 1vw 2vw;
    top: 10.7vh;
    transition: background-color 0.3s;
    border-radius: 12px;
}

.gray-modal-button:hover {
  background-color: #007bff;
}

.buttons-of-modal {
  display: flex;
  margin-left: 40px;
}

.modal-of-show-container {
  position: fixed;
  /* Stay in place */
  left: 0;
  z-index: 9999999;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  background-color: rgba(0, 0, 0, 0.7);
  /* Black w/ opacity */
  min-width: 1350px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  /* Semi-transparent background */
  z-index: 999999;
  /* Place it behind the modal */
}

.close-content-modal {
  position: absolute;
  top: 0.3vh;
  left: 1vw;
  font-size: 30px;
  font-weight: bold;
  color: #5a5858;
  cursor: pointer;
}

.modal {
  position: fixed;
  /* Stay in place */
  left: 0;
  z-index: 999999999999;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7);
  /* Black w/ opacity */
}



}
</style>