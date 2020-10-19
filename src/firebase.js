import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAm9X3kS6LtVktE30F9vzzcKwotd-kzu3I",
  authDomain: "fullecommerce-a01bb.firebaseapp.com",
  databaseURL: "https://fullecommerce-a01bb.firebaseio.com",
  projectId: "fullecommerce-a01bb",
  storageBucket: "fullecommerce-a01bb.appspot.com",
  messagingSenderId: "410485774327",
  appId: "1:410485774327:web:b4713cc4a056b0d6f940f2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
