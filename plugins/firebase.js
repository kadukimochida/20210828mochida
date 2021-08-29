import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
    apiKey: "AIzaSyBrXZRu9PidETjL4H143Dletw-gcxJP4uw",
    authDomain: "mochida-9aa97.firebaseapp.com",
    projectId: "mochida-9aa97",
    storageBucket: "mochida-9aa97.appspot.com",
    messagingSenderId: "910769317079",
    appId: "1:910769317079:web:820e9f614873471263bc92",
    measurementId: "G-17FMJVPNR5"
    }
  )
}

export default firebase