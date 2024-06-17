<template>
    <div class="counter">
      <button @click="increment">+</button>
      <input type="number" v-model="count" step="25000" appearance="none" />
      <button @click="decrement">-</button>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    formattedCount() {
      return this.count.toLocaleString();
    },
  },
  methods: {
    increment() {
      this.count += 25000;
    },
    decrement() {
      this.count -= 25000;
    },
  },
};
</script>

<style scoped>
    .counter {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .counter button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: #77B9AF;
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

    .counter input {
        width: 10vw;
        text-align: center;
        font-size: 1rem;
        font-weight: 600;
        border-color: transparent;
        border-radius: 20px; 
        font-family: 'Rubik';

    }
</style>