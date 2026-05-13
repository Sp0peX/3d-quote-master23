/**
 * DbService - Gestione salvataggio e recupero dati (Storico preventivi)
 */
const DbService = {
    /**
     * Salva un preventivo nel cloud
     */
    async saveQuote(userId, quoteData) {
        try {
            const docRef = await db.collection('quotes').add({
                userId: userId,
                ...quoteData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            return docRef.id;
        } catch (error) {
            console.error("Errore salvataggio preventivo:", error);
            throw error;
        }
    },

    /**
     * Recupera lo storico dei preventivi di un utente
     */
    async getUserQuotes(userId) {
        try {
            console.log("Query Firestore per userId:", userId);
            const snapshot = await db.collection('quotes')
                .where('userId', '==', userId)
                .orderBy('timestamp', 'desc')
                .get();
            
            console.log("Snapshot ricevuto, documenti:", snapshot.size);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Errore recupero storico Firestore:", error);
            throw error;
        }
    },

    /**
     * Elimina un preventivo dallo storico
     */
    async deleteQuote(quoteId) {
        try {
            await db.collection('quotes').doc(quoteId).delete();
        } catch (error) {
            console.error("Errore eliminazione preventivo:", error);
            throw error;
        }
    },

    // --- METODI ADMIN ---

    /**
     * [ADMIN] Recupera tutti i preventivi di tutti gli utenti
     */
    async getAllQuotes() {
        try {
            const snapshot = await db.collection('quotes')
                .orderBy('timestamp', 'desc')
                .limit(100)
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Errore recupero tutti i preventivi:", error);
            throw error;
        }
    },

    /**
     * [ADMIN] Recupera tutti gli utenti registrati
     */
    async getAllUsers() {
        try {
            const snapshot = await db.collection('users')
                .orderBy('createdAt', 'desc')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Errore recupero tutti gli utenti:", error);
            throw error;
        }
    },

    /**
     * [ADMIN] Cambia il ruolo di un utente
     */
    async updateUserRole(userId, newRole) {
        try {
            await db.collection('users').doc(userId).update({
                role: newRole
            });
        } catch (error) {
            console.error("Errore aggiornamento ruolo:", error);
            throw error;
        }
    }
};

window.DbService = DbService;
