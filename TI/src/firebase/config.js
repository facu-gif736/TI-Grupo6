import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBCXMeH2kDhN4Yqyy6hB0isIG0fxNTyzok",
  authDomain: "tifinal.firebaseapp.com",
  projectId: "tifinal",
  storageBucket: "tifinal.firebasestorage.app",
  messagingSenderId: "519657169411",
  appId: "1:519657169411:web:4f87514ceff204bbe3e436"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firebase()