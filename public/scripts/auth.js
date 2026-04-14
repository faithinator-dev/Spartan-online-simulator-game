// Authentication System

let currentUser = null;

// Initialize auth listeners
auth.onAuthStateChanged(async (user) => {
    console.log('🔐 Auth state changed:', user ? 'User logged in' : 'No user');
    
    if (user) {
        console.log('✅ User authenticated:', user.email || user.uid);
        currentUser = user;
        
        try {
            console.log('📥 Loading user character...');
            await loadUserCharacter(user.uid);
            console.log('✅ Character loaded, showing game screen');
            showScreen('game');
            
            // NEW: Initialize social and story systems
            if (playerCharacter) {
                if (typeof initializeChat === 'function') initializeChat();
                if (typeof loadProfileSettings === 'function') loadProfileSettings();
                
                // Story Engine Entry
                if (typeof renderStoryNode === 'function') {
                    if (playerCharacter.currentStoryNode) {
                        renderStoryNode(playerCharacter.currentStoryNode);
                    } else {
                        startNewStory();
                    }
                }
            }

            // Initialize game views
            navigateToView('dashboard');
        } catch (error) {
            console.error('❌ Failed to load character:', error);
            showNotification('Failed to load character. Please try again.');
            await auth.signOut();
        }
    } else {
        console.log('ℹ️ No user logged in, showing auth screen');
        currentUser = null;
        showScreen('auth');
    }
});

// Show specific screen
function showScreen(screenName) {
    console.log(`🖥️ Switching to screen: ${screenName}`);
    
    // Hide all screens with display: none
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        console.log(`  ↪️ Hiding (display:none): ${screen.id}`);
    });
    
    // Show target screen
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log(`  ✅ Showing (display:flex): ${screenName}-screen`);
    } else {
        console.error(`  ❌ Screen not found: ${screenName}-screen`);
    }
}

// Handle tab switching
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        // Update active tab
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding form
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${tabName}-form`).classList.add('active');
        
        // Clear error
        document.getElementById('auth-error').classList.remove('show');
    });
});

// Login
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');
    const errorEl = document.getElementById('auth-error');
    
    console.log('🔍 Login attempt:', { email });
    
    if (!email || !password) {
        showAuthError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email');
        return;
    }
    
    showLoading(btn, true);
    
    try {
        // Check if Firebase is initialized
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase is not loaded! Check firebase-config.js');
        }
        
        console.log('📝 Attempting login...');
        await auth.signInWithEmailAndPassword(email, password);
        console.log('✅ Login successful!');
        showNotification('⚔️ Welcome back, warrior!');
    } catch (error) {
        console.error('❌ Login error:', error);
        console.error('Error code:', error.code);
        
        let errorMessage = getAuthErrorMessage(error.code);
        if (error.message.includes('Firebase') || error.message.includes('not loaded')) {
            errorMessage = 'Firebase not configured! Please update firebase-config.js';
        }
        
        showAuthError(errorMessage);
        showLoading(btn, false);
    }
});

// Register
document.getElementById('register-btn').addEventListener('click', async () => {
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const btn = document.getElementById('register-btn');
    
    console.log('🔍 Registration attempt:', { username, email, passwordLength: password.length });
    
    if (!username || !email || !password) {
        showAuthError('Please fill in all fields');
        return;
    }
    
    if (username.length < 3) {
        showAuthError('Username must be at least 3 characters');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email');
        return;
    }
    
    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters');
        return;
    }
    
    showLoading(btn, true);
    
    try {
        console.log('📝 Creating Firebase account...');
        
        // Check if Firebase is initialized
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase is not loaded! Check firebase-config.js');
        }
        
        if (!auth) {
            throw new Error('Firebase Auth is not initialized!');
        }
        
        // Create user account
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        console.log('✅ Firebase account created:', user.uid);
        console.log('📝 Creating character profile...');
        
        // Create character
        await createCharacter(user.uid, username);
        
        console.log('✅ Registration complete!');
        showNotification('⚔️ Welcome to Sparta, warrior!');
    } catch (error) {
        console.error('❌ Registration error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        let errorMessage = getAuthErrorMessage(error.code);
        
        // Add more specific error messages
        if (error.message.includes('Firebase') || error.message.includes('not loaded')) {
            errorMessage = 'Firebase not configured! Please update firebase-config.js';
        } else if (error.code === 'auth/network-request-failed') {
            errorMessage = 'Network error. Check your internet connection and Firebase config.';
        } else if (!error.code) {
            errorMessage = error.message || 'Registration failed. Check console for details.';
        }
        
        showAuthError(errorMessage);
        showLoading(btn, false);
    }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
    console.log('🚪 Logout initiated...');
    try {
        await auth.signOut();
        console.log('✅ User logged out');
        showNotification('Farewell, warrior!');
        
        // The onAuthStateChanged listener will handle showing auth screen
        // No need to reload - just let the auth state handler do its job
    } catch (error) {
        console.error('❌ Logout error:', error);
        showNotification('Error logging out');
    }
});

// Show auth error
function showAuthError(message) {
    const errorEl = document.getElementById('auth-error');
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

// Get user-friendly auth error messages
function getAuthErrorMessage(errorCode) {
    const messages = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password is too weak',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Please try again later',
        'auth/network-request-failed': 'Network error. Check your connection'
    };
    
    return messages[errorCode] || 'An error occurred. Please try again';
}

console.log("✅ Auth system loaded");
