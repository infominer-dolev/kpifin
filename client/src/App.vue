<template>
  <div class="nav-bar">
    <navBar></navBar>
  </div>
  <RouterView></RouterView>

</template>

<script>
import navBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    navBar,
  },
  methods: {
    dataFromCsv(data){
      this.hafisotData=data;
    }
  },
  data() {
    return {
      dato: '',
    }      
  },
  

}
 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #F5F9FF;
}
.nav-bar{
  margin-bottom: 6.3vh;
}

</style>
