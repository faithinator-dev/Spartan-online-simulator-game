// ============================================
// DEMO MODE - Play WITHOUT Firebase!
// ============================================
// Set DEMO_MODE = true to play offline (saves to browser)
// Set DEMO_MODE = false to use real Firebase (requires setup)

const DEMO_MODE = false; // 👈 Change this to false when you add Firebase

let auth, db, rtdb;

if (DEMO_MODE) {
    console.log('🎮 DEMO MODE ACTIVE - Game works without Firebase!');
    console.log('💾 Your progress saves to browser localStorage');
    console.log('✨ Play the full game now, add Firebase later!');
    
    // Mock Firebase Auth
    auth = {
        currentUser: null,
        _listeners: [],
        
        onAuthStateChanged(callback) {
            this._listeners.push(callback);
            const savedUser = localStorage.getItem('demo_user');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                setTimeout(() => callback(this.currentUser), 100);
            } else {
                setTimeout(() => callback(null), 100);
            }
        },
        
        async createUserWithEmailAndPassword(email, password) {
            const user = { uid: 'demo_' + Date.now(), email: email };
            this.currentUser = user;
            localStorage.setItem('demo_user', JSON.stringify(user));
            this._listeners.forEach(cb => cb(user));
            return { user };
        },
        
        async signInWithEmailAndPassword(email, password) {
            const savedUser = localStorage.getItem('demo_user');
            if (!savedUser) {
                throw { code: 'auth/user-not-found', message: 'No account found. Register first!' };
            }
            const user = JSON.parse(savedUser);
            if (user.email !== email) {
                throw { code: 'auth/user-not-found', message: 'Email not found' };
            }
            this.currentUser = user;
            this._listeners.forEach(cb => cb(user));
            return { user };
        },
        
        async signOut() {
            this.currentUser = null;
            this._listeners.forEach(cb => cb(null));
        }
    };
    
    // Mock Firestore
    db = {
        collection(name) {
            return {
                doc(id) {
                    return {
                        async get() {
                            const key = `demo_${name}_${id}`;
                            const data = localStorage.getItem(key);
                            return {
                                exists: !!data,
                                data: () => data ? JSON.parse(data) : null
                            };
                        },
                        async set(data) {
                            const key = `demo_${name}_${id}`;
                            localStorage.setItem(key, JSON.stringify(data));
                        },
                        async update(data) {
                            const key = `demo_${name}_${id}`;
                            const existing = localStorage.getItem(key);
                            const current = existing ? JSON.parse(existing) : {};
                            localStorage.setItem(key, JSON.stringify({ ...current, ...data }));
                        }
                    };
                },
                orderBy() {
                    return {
                        limit() {
                            return {
                                async get() {
                                    return { empty: true, forEach: () => {} };
                                }
                            };
                        }
                    };
                }
            };
        }
    };
    
    rtdb = {
        ref() {
            return {
                set() {},
                on() {}
            };
        }
    };
    
    console.log('✅ Demo Mode Ready - Start Playing!');
    
} else {
    // ============================================
    // REAL FIREBASE MODE
    // ============================================
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBQdtOIYTH3qLPLactUl96oL95nAfnhRWk",
        authDomain: "spartan-conquest.firebaseapp.com",
        projectId: "spartan-conquest",
        storageBucket: "spartan-conquest.firebasestorage.app",
        messagingSenderId: "938977103556",
        appId: "1:938977103556:web:dec6a12963e1a910eb4391"
    };
    
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase SDK not loaded!');
        alert('Firebase not loaded. Check your internet connection or set DEMO_MODE = true to play offline.');
    } else {
        // Initialize Firebase with v8 SDK (used in index.html)
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        rtdb = firebase.database();
        
        console.log('✅ Firebase initialized!');
        console.log('📦 Project:', firebaseConfig.projectId);
        console.log('🔐 Auth Domain:', firebaseConfig.authDomain);
    }
}
