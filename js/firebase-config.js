/**
 * Configurazione Firebase
 * Sostituisci i valori qui sotto con quelli del tuo progetto Firebase
 * (Vai su console.firebase.google.com -> Impostazioni Progetto -> La mia App -> Web)
 */
const firebaseConfig = {
  apiKey: "AIzaSyB37rS5Jvg_AuIV4kXYRy9gAcKkaXllL1I",
  authDomain: "d-quote-master.firebaseapp.com",
  projectId: "d-quote-master",
  storageBucket: "d-quote-master.firebasestorage.app",
  messagingSenderId: "395231552303",
  appId: "1:395231552303:web:d32cde256b1b4a7868f7da",
  measurementId: "G-W4FY5BQG2Y"
};

// Inizializzazione Firebase
firebase.initializeApp(firebaseConfig);

// Riferimenti ai servizi
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
