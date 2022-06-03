<template>
  <div class="wrapper">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create crop</md-dialog-title>

      <div style="padding:  0em 1.5em 1.5em 1.5em ">
        <md-field>
          <label>Name</label>
          <md-input v-model="crop.name" :required="true"></md-input>
        </md-field>
        <md-field>
          <label>Duration</label>
          <md-input v-model="crop.duration" type="number" :required="true"></md-input>
        </md-field>
        <md-field>
          <label>Description</label>
          <md-input v-model="crop.description" :required="true"></md-input>
        </md-field>
        <md-field>
           <label>Water level</label>
      <md-input v-model="crop.water" type="number" :required="true"></md-input>
        </md-field>
        <md-field>
          <label>Hydrogen</label>
          <md-input v-model="crop.hydrogen" type="number" :required="true"></md-input>
        </md-field>
        <md-field>
          <label>Photo</label>
          <md-input v-model="crop.photo"></md-input>
        </md-field>
        <md-field>
          <label>Temperature</label>
          <md-input v-model="crop.temperature" type="number" :required="true"></md-input>
        </md-field>
        <md-field>
          <label>Time</label>
          <md-input v-model="crop.time" type="number" :required="true"></md-input>
        </md-field>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="createCrop"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img :src="leaf4" alt="leaf4" class="leaf4" v-show="leafShow" />
            <img :src="leaf3" alt="leaf3" class="leaf3" v-show="leafShow" />
            <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow" />
            <div class="brand">
              <h1>OptiPapa</h1>
              <h3>Donde tus cultivos viven.</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <md-toolbar md-elevation="1">
        <h3 class="md-title" style="flex: 1">Crops</h3>
        <md-button @click="showDialog = true">Create</md-button>
      </md-toolbar>
      <div>
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>ID</md-table-head>
            <md-table-head>Foto</md-table-head>
            <md-table-head>Nombre</md-table-head>
            <md-table-head>Descripcion</md-table-head>
            <md-table-head>Hidrogeno</md-table-head>
            <md-table-head>Agua</md-table-head>
          </md-table-row>

          <md-table-row v-for="item in items" :key="item.id">
            <md-table-cell md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell
              ><img class="imagenCultivo" :src="item.photo"
            /></md-table-cell>
            <md-table-cell>{{ item.name }}</md-table-cell>
            <md-table-cell>{{ item.description }}</md-table-cell>
            <md-table-cell>{{ item.hydrogen }}</md-table-cell>
            <md-table-cell>{{ item.water }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
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
</template>

<script>
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
      default: require("@/assets/img/vue-mk-header.jpg"),
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
      items: [],
      showDialog: false,
      crop:{
        name: "",
        duration:0,
        photo:"",
        description:"",
        water:0,
        hydrogen:0,
        temperature:0,
        time:0,
      },
      colorSnackbar:"#4caf50",
      showSnackbar: false,
      message:"Si su correo existe, se ha enviado con exito el link de restablecimiento de contrasena",
      position: 'center',
      duration: 4000,
      isInfinity: false
    };
  },
  beforeMount() {
    this.getAll();
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    },
    getAll(){
      Axios.get(
      "https://optipapa-c3caa-default-rtdb.firebaseio.com/users/" +
        this.$cookies.get("userID") +
        "/cultivos.json"
    )
      .then((value) => {
        if(value.data){
        this.items = value.data;
        }
        else{
          this.items = [];
        }
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    createCrop(){
      console.log(this.items.length);
      Axios.put(
      "https://optipapa-c3caa-default-rtdb.firebaseio.com/users/" +
        this.$cookies.get("userID") +
        "/cultivos/"+this.items.length+".json",
        {id:this.items.length+1,...this.crop}
    )
      .then((value) => {
        this.message = "Crop created successfully";
        this.showSnackbar = true;
        this.getAll();
        this.showDialog = false;
      })
      .catch((error) => {
        console.log(error);
        this.showDialog = false;
        this.getAll();
      });
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
