<template>
  <div v-show="!mobileDevice">
    <div class="navbar">
      <div>
        <img src="../assets/kpilogo.svg" class="kpi_logo"> 
      </div>
      <ul class="nav-links">
        <!-- <img src="../assets/userpic.svg" class="user-image">     put user pic here-->
        <div class="hello-username text-size-" >{{ username }}</div>
        <span class="material-symbols-outlined icon-lg-low">notifications</span>
        <span class="material-symbols-outlined icon-lg-low">help</span>
      </ul>   
    </div>
  </div>
</template>

<script>

export default {
  props:{
    userName:String,
  },
  name: 'NavBar',
  components: {
  },
  data() {
    return {
      username:"שם משתמש"
    };
  },
  computed:{
    mobileDevice(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true
          } else {
            return false
          }
        },
      },
  methods: {
    popUpMessage(){
      this.$swal({
        title: ' כרגע המודל שלנו יודע לחפש רק מושגים ולא שאלות',
        icon:'info'
      })
    },
    setStoreUseName(){
      this.$store.state.username = localStorage.getItem('username');
    },
}
};
</script>

<style scoped>
.kpi_logo{
  height: 6vh;
  align-items: right;
  margin-right: 0.3vw;
  padding: 2% 2%;
  z-index: 500;
}
.navbar {
    position: fixed;
    width: 100%;
    height: 6.1%;
    display: flex;
    top: 0;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-bottom: solid 0.1rem;
    border-color: aliceblue;
    z-index: 10;
    transition: transform 0.3s ease-in-out;
    transform: translateY(var(--navbar-translate));
}
nav a.router-link-exact-active {
    color: #1E86FF;
}

.hello-username{
font-size: 1.2em;
color:#465C7B;
margin-left: 0.5vw;
}

nav a {
    font-weight: bold;
    color: #1E86FF;
}
.logo {
  font-size: 2rem;
  margin-right: .5rem!important;
  color: #1E86FF;
}
.nav-links {
  list-style: none;
  display: flex;
  font-family:'Rubik', sans-serif;
  align-items: center;

}

.nav-links li {
  margin: 0 0.5rem;
}
.material-symbols-outlined{
  vertical-align: middle;
  margin-left: 0.5rem;
  color: #465C7B;
  cursor: pointer;
  
}

.nav-links li a {
  color: #1E86FF;
}

/* .burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
} */



.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  display: none;
}

@media screen and (max-width: 600px) {

  .nav-links {
    position: fixed;
    width: 0%;
    height: 0vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 3;
  }
}
.user-image{
  margin-left:3vh;
  top:0;
  cursor: pointer;
}
.icon-lg{
  font-size: 1.6rem;
}
.icon-lg-low{
  font-size: 1.6rem;
  color: rgb(221, 237, 237);
}

</style>
