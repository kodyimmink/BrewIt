import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCaiIxEBFGrHEH5iXKysPZOfYC1GbviWFE",
    authDomain: "brewit-1bc4c.firebaseapp.com",
    databaseURL: "https://brewit-1bc4c.firebaseio.com",
    projectId: "brewit-1bc4c",
    storageBucket: "brewit-1bc4c.appspot.com",
    messagingSenderId: "172112327087"
  };
var fire = firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default fire;

// TO-DO: create better rules for security https://firebase.google.com/docs/database/security/