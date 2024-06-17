<template>
<csvArray import_file="History"></csvArray>
  <text> Historia {{ $store.state.hist_count }} </text>
  <br>
  <csvArray import_file="Hasifa"></csvArray>
  <text> Hasifa {{ $store.state.count }} </text>
  <br>
<button @click="move">move</button>
</template>

<script>
import csvArray from '../components/csvArray.vue';

export default{
    components: {
    csvArray,
  },mounted () {
    //temp=6;
  },
  methods: {
    move() {
        console.log(this.$store)
      this.$router.push('/');  
    }
  },
}
</script>

<style>


</style>