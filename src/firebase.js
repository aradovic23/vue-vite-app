import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPHAZkIhoU71wbKB6p9zeVBo43iXJO5wk",
  authDomain: "agape-vue-app.firebaseapp.com",
  projectId: "agape-vue-app",
  storageBucket: "agape-vue-app.appspot.com",
  messagingSenderId: "70815157100",
  appId: "1:70815157100:web:8116b79d4025f5f9888149",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
