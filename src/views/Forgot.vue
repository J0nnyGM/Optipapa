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
              <h4 slot="title" class="card-title">Forgot password</h4>
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
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="login"
              >
                Send
              </md-button>
            </login-card>
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
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import Axios from "axios";
export default {
  components: {
    LoginCard,
  },
  bodyClass: "login-page",
  data() {
    return {
      email: null,
      colorSnackbar:"#4caf50",
      showSnackbar: false,
      message:"Si su correo existe, se ha enviado con exito el link de restablecimiento de contrasena",
      position: 'center',
      duration: 4000,
      isInfinity: false
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg"),
    },
  },
  beforeMount() {
    if (this.$cookies.get("userID")) {
      this.$router.push({ path: "/home" });
    }
  },
  methods: {
    login() {
      Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDQPsaMOD_f7rQD4r5g2ISPO4lDyRAveww",
        { requestType: "PASSWORD_RESET", email: this.email }
      )
        .then((valueUser) => {
          if (valueUser.status == 200) {
              this.showSnackbar = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
};
</script>

<style lang="css"></style>
