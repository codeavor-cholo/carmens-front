import VueFirestore from 'vue-firestore'
import firebase from 'firebase'
require('firebase/firestore')
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCzM2V7tH7ELZu4D4Lz4SePEVE4-UZCVVI",
    authDomain: "itsbuco-27df9.firebaseapp.com",
    databaseURL: "https://itsbuco-27df9.firebaseio.com",
    projectId: "itsbuco-27df9",
    storageBucket: "itsbuco-27df9.appspot.com",
    messagingSenderId: "18658101035",
    appId: "1:18658101035:web:a294c648fdbc85a5b9276e",
    measurementId: "G-3GE8VKCWKK"
  };

  export var firebase2 = firebase.initializeApp(firebaseConfig, 'firebase2')
  export var AUTH = firebase2.auth()


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // "async" is optional
  export default async ({ Vue }) => {
    // something to do
    Vue.prototype.$firebase = firebase
    Vue.prototype.$firestoreApp = firebase.firestore()
    Vue.prototype.$auth = AUTH
    Vue.use(VueFirestore)
    Vue.use(firebase)
  }