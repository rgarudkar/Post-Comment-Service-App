import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import{ getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDyCLYoT-4kySxvN5ggrukytNBGcNYzfTY",
  authDomain: "cyberspacesavy.firebaseapp.com",
  databaseURL: "https://cyberspacesavy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cyberspacesavy",
  storageBucket: "cyberspacesavy.appspot.com",
  messagingSenderId: "643686411398",
  appId: "1:643686411398:web:59af0f466ba574053c7507",
  measurementId: "G-RSJT8687EG"
};
 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export{app,auth,firestore,storage}
