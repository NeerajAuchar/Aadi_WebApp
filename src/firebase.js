import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8NRmnuTyi3PVYiSfpfCgzAgAbNDMYvy4",
  authDomain: "aadi-development.firebaseapp.com",
  projectId: "aadi-development",
  storageBucket: "aadi-development.appspot.com",
  messagingSenderId: "495387086498",
  appId: "1:495387086498:web:b6721080bdd9c9d56d91fb"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth();
 
export{app,auth};