/**
 * ESEMPIO DI CONFIGURAZIONE FIREBASE
 * Rinomina questo file in 'firebase-config.js' e inserisci le tue chiavi.
 * NON caricare il file finale su GitHub (è già nel .gitignore).
 */
const firebaseConfig = {
    apiKey: "IL_TUO_API_KEY",
    authDomain: "IL_TUO_PROJECT_ID.firebaseapp.com",
    projectId: "IL_TUO_PROJECT_ID",
    storageBucket: "IL_TUO_PROJECT_ID.appspot.com",
    messagingSenderId: "IL_TUO_SENDER_ID",
    appId: "IL_TUO_APP_ID",
    measurementId: "IL_TUO_MEASUREMENT_ID"
};

// Inizializzazione Firebase
firebase.initializeApp(firebaseConfig);

// Riferimenti ai servizi
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
