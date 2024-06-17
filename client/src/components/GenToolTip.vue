<template>
  <div class="tooltip">
    <div v-if="showTooltip" class="tooltip-text" :style="{top:top, left:left }">
      <br><text class="text_title">מוצר {{ text[1] }}</text><br><br>
      <div v-for="item in order" :key="item">
        <div class="big_order">
          <text style="color: black; width: 12vw;"> {{ titles[item] }}</text>
          <text style="margin-right: 2vw; font-weight: 600;"> {{ formatNumbertoString(text[item],2) }}%</text>
        </div>
        <hr style="border: 1px solid #9AD2D7;">  
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTooltip: true,
      order: [7, 8, 9, 10, 11, 12, 13, 15],
      titles: ['','מוצר','','','','','','חשיפה למניות','חשיפה לאגח ממשלתי','חשיפה לאגח קונצרני','חשיפה לקרנות לס','חשיפה להלוואות לס','אחר','מזומן ופקדונות','חול','מטח'],
    };
  },
  props: {
    text: {
      type: Array,
      required: true
    },
    left:{
      type: String,
      required: false,
      default: '12vh', // Default margin top
    },
    top:{
      type: String,
      required: false,
    },
  },
  methods: {
    show() {
      this.showTooltip = true;
    },
    hide() {
      this.showTooltip = false;
    },
    formatNumbertoString(value, step) {
      // Check if value is not empty and is a number
      if (value !== '' && !isNaN(value)) {
          // Parse the value as a float and round it to two decimal places
          const parsedValue = parseFloat(value).toFixed(step);
          // Return the parsed value
          return parsedValue;
      }
      // Return the original value if it's empty or not a number
      return value;
    },
  }
};
</script>

<style scoped>
.tooltip {
  z-index: 1000000;
  position: relative;
  display: inline-block;
  padding-left: 1vw;
  width: 22vw;
}

.tooltip-text {
  
  visibility: hidden;
  background: #E6E9ED;
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  position: fixed;
  z-index: 10;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid #323030;
  width: 22vw;
  text-align: right;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.big_order{
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  gap: 0.3vw;
  font-family: 'Assistant';
  font-size: 1rem;
  font-weight: 400;
  color: #0E7E7A;
  padding-bottom: 0.3vh;
  padding-right: 1vw;
  padding-top: 0.3vh;
}

.text_title{
  font-family: 'Assistant';
  font-size: 1.4rem;
  font-weight: 800;
  color: #0E7E7A;
  margin-top: 1vh;
  padding-right: 0.5vw;
}
</style>