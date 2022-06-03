<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="
              md-layout-item
              md-size-33
              md-small-size-66
              md-xsmall-size-100
              md-medium-size-40
              mx-auto
            "
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button>
              <p slot="description" class="description">
                Cultivos a tu alcance
              </p>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="login"
              >
                Get Started
              </md-button>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="signUp"
              >
                Sign Up
              </md-button>
            </login-card>
            <router-link to="/forgot"
              ><p style="color: white">Forgot password?</p></router-link
            >
          </div>
          <md-snackbar
              :style="{backgroundColor:colorSnackbar}"
              :md-position="position"
              :md-duration="isInfinity ? Infinity : duration"
              :md-active.sync="showSnackbar"
              md-persistent
            >
              <span>{{message}}</span>
              <!-- <md-button class="md-primary" @click="showSnackbar = false"
                >Retry</md-button> -->              
            </md-snackbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import Axios from 'axios';
export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      colorSnackbar:"#4caf50",
      showSnackbar: false,
      message:"",
      position: 'center',
      duration: 4000,
      isInfinity: false,
      firstname: null,
      email: "",
      password: ""
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  beforeMount(){
    if(this.$cookies.get("userID")){
      this.$router.push({path:'/home'});
    }
  },
  methods:{
      signUp(){
        this.$router.push({path:"/register"});
      },
      login(){
        if(this.email.length==0 || this.password.length == 0){
          this.colorSnackbar = "#d32f2f";
          this.showSnackbar = true;
          this.message = "Email and password fields shouldn't be empty"
          return;
        }
        const validateEmail = String(this.email).toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!validateEmail){
          this.colorSnackbar = "#d32f2f";
          this.showSnackbar = true;
          this.message = "Email should be valid"
          return;
        }


        const validatePassword = String(this.password)
        .match(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/);
        if(!validatePassword){
          this.colorSnackbar = "#d32f2f";
          this.showSnackbar = true;
          this.message = "Password should be valid"
          return;
        }


        Axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQPsaMOD_f7rQD4r5g2ISPO4lDyRAveww",
        {email:this.email,password:this.password})
        .then((valueUser)=>{
          
          if(valueUser.status==200){
            Axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQPsaMOD_f7rQD4r5g2ISPO4lDyRAveww",{idToken:valueUser.data.idToken}).then((value)=>{

            if(value.status==200){
              this.$cookies.set("userID", value.data.users[0].localId, 100000)
              this.$router.push({path:'/home'});
            }
          }).catch((error)=>{
            console.log(error);
          });
          }

        }).catch((error)=>{
          console.log(error);
        });
      }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="css"></style>
