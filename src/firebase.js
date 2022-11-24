
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDQPsaMOD_f7rQD4r5g2ISPO4lDyRAveww",
    authDomain: "optipapa-c3caa.firebaseapp.com",
    databaseURL: "https://optipapa-c3caa-default-rtdb.firebaseio.com",
    projectId: "optipapa-c3caa",
    storageBucket: "optipapa-c3caa.appspot.com",
    messagingSenderId: "18434677692",
    appId: "1:18434677692:web:12771ee4727680e97029b9",
    databaseURL: "https://optipapa-c3caa-default-rtdb.firebaseio.com",
  };

  const app = initializeApp(firebaseConfig);

  export const database = getDatabase(app);

