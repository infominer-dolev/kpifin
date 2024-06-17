<template>
<div class="form" v-if="firstStageLogin" dir="rtl">
<form @submit.prevent="apiPostFirstLogin" @keyup.enter="apiPostFirstLogin" >
    <h2>התחברות למערכת</h2>
    <div class="user-input">
        <div class="first-user-input">
  <label >שם משתמש</label><br>
  <input type="text" v-model="passport" ><br>
</div>
  <div class="second-user-input">
  <!-- <label for="lname">מספר דרכון:</label><br>
  <input type="text" id="lname" name="lname" v-model="passport" ><br> -->
  <label >מספר טלפון</label><br>
  <input type="text" v-model="telephone" ><br><br>
</div>
</div>
<div class="wrong-password" v-if="wrongPassword">פרטי הזדהות שגויים</div>
<input class="submit-button" type="submit" value="לשלב הבא">
</form>
</div>

<div class="form" v-if="!firstStageLogin" dir="rtl">
<form @submit.prevent="apiPostSecondLogin" @keyup.enter="apiPostSecondLogin" >
    <div class="user-input">
        <div class="first-user-input">
  <label for="fname">שם משתמש</label><br>
  <input type="text" id="fname" name="fname" v-model="username" ><br>
  </div>
  <div class="second-user-input">
  <label for="lname">סיסמא</label><br>
  <input type="text" id="lname" name="lname" v-model="password" ><br>
</div>
</div>

  <input class="submit-button" type="submit" value="התחבר">
</form>
</div>
</template>

<script>
import axios from 'axios'

export default{
    data(){
        return{
            username:null,
            passport:null,
            telephone:null,
            firstStageLogin:true,
            wrongPassword:false,
            loginToken:null,
        }
    },
    methods:{
        
        apiPostFirstLogin(){
            axios.post('https://api.kpi-fin.co.il/public/api/connection', {
                userName: this.passport,
                telephone: this.telephone,
                passport: this.passport
                })
                .then( (response)=> {
                    console.log(response);
                    this.firstStageLogin=false;
                })
                .catch( (error) =>{
                    console.log(error);
                    console.log("problem")
                    this.wrongPassword=true;
                });
        },
        apiPostSecondLogin(){
            axios.post('https://api.kpi-fin.co.il/public/api/connection', {
                userName: this.username,
                password: this.telephone,
                })
                .then( (response)=> {
                    console.log(response);
                    this.loginToken=response.data.token;
                })
                .catch( (error)=> {
                    console.log(error);
                });
        },
        submitLogin(){
            this.$router.push("/")
        }
    }
}

</script>


<style>

.form{
    
    width: 40vw;
    height: 30vh;
    background-color: white;
    position: absolute;
    left: 30vw;
    top: 20vh;
}
.wrong-password{
    position: absolute;
    top: 19vh;
    left: 16.7vw;
}
.first-user-input{
    position: absolute;
    top: 7vh;
    left:23vw;
    text-align: right;
   
}
.second-user-input{
    position: absolute;
    top: 7vh;
    left:8vw;
    text-align: right;

}
input{
    height: 2.4vh;
}
.user-input{
    display: flex;
}
.submit-button{
    background-color: #939597;
    width: 8vw;
    height: 3.5vh;
    position: absolute;
    top: 23vh;
    left:16vw;
    border: none;
    color:white;
    }
</style>