import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAFPJ2G6yrOUhP19CxXxzk3TEVUBhnQ4qA",
  authDomain: "localhost:3000",
  projectId: "travel-map-844d2",
};

const Firebase = firebase.initializeApp(config);

const database = Firebase.firestore();
export const dataCollection = database.collection("data");

export const auth = firebase.auth();

export default Firebase;
