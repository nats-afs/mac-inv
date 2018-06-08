import firebase from 'firebase'

export const config = {
  apiKey: "AIzaSyBcpDlob7AxFuMEeanOudG8ATsMZMgAjS8",
  authDomain: "mac-inv.firebaseapp.com",
  databaseURL: "https://mac-inv.firebaseio.com",
  projectId: "mac-inv",
  storageBucket: "mac-inv.appspot.com",
  messagingSenderId: "1094264451997"
}

let app = firebase.initializeApp(config);
export const db = app.database()


export const modelRef = db.ref('models');
export const projectRef = db.ref('projects');
export const storeRef = db.ref('store');
export const settingsRef = db.ref('settings');
export const noteRef = db.ref('note');
export const eventRef = db.ref('event');
export const placeRef = db.ref('place');
export const docsRef = db.ref('documents');

export const firebaseAuth = firebase.auth;

export function firebaseListener(func) {
  firebaseAuth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User log in success", user);
      func(true, user)
    } else {
      console.log("User log in failed", user);
      func(false)
    }
  }, function (error) {
    console.log(error)
  });
}