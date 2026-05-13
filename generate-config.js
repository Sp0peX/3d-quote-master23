const fs = require('fs');
const path = require('path');

// Carica variabili da .env se presente (per sviluppo locale)
try {
    require('dotenv').config({ path: 'segreti_di_pulcinella.env' });
} catch (e) {
    console.log("File segreti_di_pulcinella.env non trovato, uso variabili d'ambiente di sistema");
}

const configContent = `/**
 * Configurazione Firebase Generata Automaticamente
 * NON MODIFICARE QUESTO FILE MANUALMENTE
 */
const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY || ''}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || ''}",
  projectId: "${process.env.FIREBASE_PROJECT_ID || ''}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || ''}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || ''}",
  appId: "${process.env.FIREBASE_APP_ID || ''}",
  measurementId: "${process.env.FIREBASE_MEASUREMENT_ID || ''}"
};

// Inizializzazione Firebase
firebase.initializeApp(firebaseConfig);

// Riferimenti ai servizi
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
`;

const outputPath = path.join(__dirname, 'js', 'firebase-config.js');

// Assicurati che la cartella js esista
if (!fs.existsSync(path.join(__dirname, 'js'))) {
    fs.mkdirSync(path.join(__dirname, 'js'));
}

fs.writeFileSync(outputPath, configContent);
console.log('File js/firebase-config.js generato con successo!');
