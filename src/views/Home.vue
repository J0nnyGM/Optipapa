<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper ">
            <img :src="leaf4" alt="leaf4" class="leaf4" v-show="leafShow" />
            <img :src="leaf3" alt="leaf3" class="leaf3" v-show="leafShow" />
            <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow" />
            <div class="brand">
              <h1>OptiPapa</h1>
              <h3>Donde tus papas viven.</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <md-toolbar md-elevation="1" class="md-primary">
        <h3 class="md-title" style="flex: 1">Cultivos</h3>
      </md-toolbar>
      <div>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>ID</md-table-head>
            <md-table-head>Nombre</md-table-head>
            <md-table-head>Descripcion</md-table-head>
            <md-table-head>Temperatura</md-table-head>
            <md-table-head>Ultima vez que llovio</md-table-head>
            <md-table-head>Esta lloviendo</md-table-head>
            <md-table-head>Humedad del ambiente</md-table-head>
            <md-table-head>Luz</md-table-head>
            <md-table-head>Humedad del suelo</md-table-head>
          </md-table-row>

          <md-table-row v-for="item in items" :key="item.id">
            <md-table-cell md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell>{{ item.name }}</md-table-cell>
            <md-table-cell>{{ item.description }}</md-table-cell>
            <md-table-cell>{{
              getLastProperty(item.temperature).value
            }}</md-table-cell>
            <md-table-cell>{{
             getLastPropertyWithCondition(item.lluviaDigital,element => element.value==1).date
            }}</md-table-cell>
            <md-table-cell>{{
              getLastProperty(item.lluviaAnalog).value==1?"Si":"No"
            }}</md-table-cell>
            <md-table-cell>{{
              getLastProperty(item.humidity).value
            }}</md-table-cell>
            <md-table-cell>{{ getLastProperty(item.square_ratio).value }}</md-table-cell>
            <md-table-cell>{{ getLastProperty(item.sueloAnalog).value }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <md-snackbar
      :style="{ backgroundColor: colorSnackbar }"
      :md-position="position"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ message }}</span>
      <!-- <md-button class="md-primary" @click="showSnackbar = false"
                >Retry</md-button> -->
    </md-snackbar>
  </div>
</template>

<script>
import {database} from "../firebase";
import { ref, onValue } from "firebase/database";
import BasicElements from "./components/BasicElementsSection";
import Navigation from "./components/NavigationSection";
import SmallNavigation from "./components/SmallNavigationSection";
import Tabs from "./components/TabsSection";
import NavPills from "./components/NavPillsSection";
import Notifications from "./components/NotificationsSection";
import TypographyImages from "./components/TypographyImagesSection";
import JavascriptComponents from "./components/JavascriptComponentsSection";
import { LoginCard } from "@/components";
import Axios from "axios";
export default {
  components: {
    // BasicElements,
    // Navigation,
    // SmallNavigation,
    // Tabs,
    // NavPills,
    // Notifications,
    // TypographyImages,
    // JavascriptComponents,
    // LoginCard
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/papa.jpg"),
    },
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png"),
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png"),
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png"),
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png"),
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg"),
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg"),
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg"),
    },
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      leafShow: false,
      cultivos: [],
      items: [],
      showDialog: false,
      crop: {
        name: "",
        duration: 0,
        photo: "",
        description: "",
        water: 0,
        hydrogen: 0,
        temperature: 0,
        time: 0,
      },
      colorSnackbar: "#4caf50",
      showSnackbar: false,
      message:
        "Si su correo existe, se ha enviado con exito el link de restablecimiento de contrasena",
      position: "center",
      duration: 4000,
      isInfinity: false,
    };
  },
  beforeMount() {
    console.log(this.$cookies.get("userID"));
    const users = ref(database, "users/"+this.$cookies.get("userID") +
          "/cultivos");
    onValue(users, (snapshot) => {
      this.items = snapshot.val();
    });
  },
  methods: {
    getLastProperty(json) {
      var lastKey = Object.keys(json).sort().reverse()[0];
      return json[lastKey];
    },
    getLastPropertyWithCondition(json,condition) {
      var keys = Object.keys(json).sort().reverse();
      for(var i =0;i<keys.length;i++){
        if(condition(json[keys[i]])){      
          return json[keys[i]];
        }
      }
    },
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`,
      };
    },
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  },
};
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}

.imagenCultivo {
  width: 20em;
}
</style>
