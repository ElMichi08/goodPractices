import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUj9QforIzAWTIL_KOJPYyhKwydDtscP8",
  authDomain: "fir-flutter-5e00c.firebaseapp.com",
  projectId: "fir-flutter-5e00c",
  storageBucket: "fir-flutter-5e00c.appspot.com",
  messagingSenderId: "843221703970",
  appId: "1:843221703970:android:755fec7f3d582de479997b",
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { app, db };
