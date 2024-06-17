<template>

  <searchBar></searchBar><br><br>
  
  <tikSintetik></tikSintetik>
</template>


<script>
import searchBar from '../components/searchBar.vue';
import tikSintetik from '../components/tikSintetik.vue';
import axios from "axios";
import storeManager from "@/storeManager"; // corrected file extension

export default {
  data() {
    return {
    }
  },
  components: {
    searchBar,
    tikSintetik
  },
  methods: {
  },async mounted () {
      const hasifot=await axios.get(`http://localhost:58822/rstsrv/readHasifot/list`)
          storeManager.storeHasifot(this,hasifot.data.Rows);
      const yields=await axios.get(`http://localhost:58822/rstsrv/readYields/list`)
        storeManager.storeYields(this,yields.data.Rows);
    console.log(this.$store)
;
  },
}
</script>

<style>

</style>