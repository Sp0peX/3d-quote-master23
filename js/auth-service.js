/**
 * AuthService - Gestione autenticazione Google, Email e Sessioni
 */
const AuthService = {
    /**
     * Login con Google
     */
    async loginWithGoogle() {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            return result.user;
        } catch (error) {
            console.error("Errore Login Google:", error);
            throw error;
        }
    },

    /**
     * Registrazione con Email e Password + Username
     */
    async registerWithEmail(email, password, username) {
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            const user = result.user;
            
            // Salviamo l'username nel profilo Firebase
            await user.updateProfile({ displayName: username });
            
            // Opzionale: Creiamo un documento utente nel database
            await db.collection('users').doc(user.uid).set({
                username: username,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                role: 'user'
            });

            return user;
        } catch (error) {
            console.error("Errore Registrazione:", error);
            throw error;
        }
    },

    /**
     * Login Classico (Email/Password)
     */
    async loginWithEmail(email, password) {
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            return result.user;
        } catch (error) {
            console.error("Errore Login:", error);
            throw error;
        }
    },

    /**
     * Logout
     */
    async logout() {
        try {
            await auth.signOut();
            window.location.href = 'auth.html';
        } catch (error) {
            console.error("Errore Logout:", error);
        }
    },

    /**
     * Recupera il profilo utente completo (inclusi i ruoli)
     */
    async getUserProfile(uid) {
        try {
            const doc = await db.collection('users').doc(uid).get();
            if (doc.exists) {
                return doc.data();
            }
            return { role: 'user' }; // Default se il documento non esiste
        } catch (error) {
            console.error("Errore recupero profilo:", error);
            return { role: 'user' };
        }
    },

    /**
     * Controlla lo stato della sessione e arricchisce l'utente con il profilo
     */
    onAuthStateChanged(callback) {
        auth.onAuthStateChanged(async user => {
            if (user) {
                const profile = await this.getUserProfile(user.uid);
                user.role = profile.role || 'user';
                user.username = profile.username || user.displayName;
            }
            callback(user);
        });
    }
};

window.AuthService = AuthService;
