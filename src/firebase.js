import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA2eE-aQifIYn6B7gFw-vanR6Gwa_A8wwY",
    authDomain: "instagram-ee95e.firebaseapp.com",
    projectId: "instagram-ee95e",
    storageBucket: "instagram-ee95e.appspot.com",
    messagingSenderId: "976558285844",
    appId: "1:976558285844:web:248abd1b4fd7f5f1ac7301",
    measurementId: "G-SMY3R1CDC1"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };