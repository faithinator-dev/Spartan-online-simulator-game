// Admin Settings Manager - Control Game Content & Visuals

// Default game settings
const DEFAULT_GAME_SETTINGS = {
    // Visual Theme
    theme: {
        primaryColor: '#FFD700',      // Gold
        secondaryColor: '#8B0000',    // Dark Red
        backgroundColor: '#1a1a2e',   // Dark Blue
        accentColor: '#DC143C',       // Crimson
        textColor: '#f5f5dc',         // Beige
        backgroundImage: '',          // Custom background URL
        backgroundStyle: 'gradient'   // 'gradient', 'image', 'solid'
    },
    
    // Game Content
    content: {
        gameTitle: '⚔️ SPARTAN CONQUEST',
        gameSubtitle: 'Rise of Legends',
        welcomeMessage: 'Rise from trainee to legendary commander',
        loadingText: 'Loading the ancient world...',
        victoryMessage: 'Victory is yours, mighty warrior!',
        defeatMessage: 'The gods were not with you today...'
    },
    
    // Storyline
    storyline: {
        intro: `In ancient Sparta, you begin your journey as a young warrior. The path to glory is steep, but your resolve is unbreakable. Train hard, fight bravely, and conquer the known world!`,
        
        levelMilestones: {
            5: 'You have proven yourself worthy. The elders recognize your strength.',
            10: 'Your name spreads across the land. Warriors speak of your prowess.',
            15: 'Kings seek your counsel. Your legend grows.',
            20: 'The gods themselves take notice of your achievements.',
            25: 'You stand among the immortals. Your legacy is eternal.'
        },
        
        questTexts: {
            training: 'Train with the best warriors to hone your skills.',
            battle: 'Prove your worth in glorious combat.',
            conquest: 'Expand your territory and build an empire.',
            legendary: 'Achieve immortality through legendary deeds.'
        }
    },
    
    // Game Rules
    rules: {
        startingGold: 50,
        startingLevel: 1,
        xpPerLevel: 100,
        criticalHitChance: 0.05,
        dailyLoginBonus: 10,
        squadUnlockLevel: 5,
        maxSquadSize: 5
    }
};

// Load game settings from storage
function loadGameSettings() {
    try {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            // Load from Firebase
            return loadSettingsFromFirebase();
        } else {
            // Load from localStorage
            const saved = localStorage.getItem('spartanGameSettings');
            return saved ? JSON.parse(saved) : DEFAULT_GAME_SETTINGS;
        }
    } catch (error) {
        console.error('Error loading game settings:', error);
        return DEFAULT_GAME_SETTINGS;
    }
}

// Save game settings to storage
async function saveGameSettings(settings) {
    try {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            // Save to Firebase
            await saveSettingsToFirebase(settings);
        } else {
            // Save to localStorage
            localStorage.setItem('spartanGameSettings', JSON.stringify(settings));
        }
        console.log('✅ Game settings saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving game settings:', error);
        return false;
    }
}

// Firebase operations
async function loadSettingsFromFirebase() {
    try {
        const db = firebase.firestore();
        const doc = await db.collection('gameSettings').doc('config').get();
        
        if (doc.exists) {
            return doc.data();
        } else {
            // Initialize with defaults
            await saveSettingsToFirebase(DEFAULT_GAME_SETTINGS);
            return DEFAULT_GAME_SETTINGS;
        }
    } catch (error) {
        console.error('Firebase load error:', error);
        return DEFAULT_GAME_SETTINGS;
    }
}

async function saveSettingsToFirebase(settings) {
    try {
        const db = firebase.firestore();
        await db.collection('gameSettings').doc('config').set(settings, { merge: true });
        return true;
    } catch (error) {
        console.error('Firebase save error:', error);
        return false;
    }
}

// Apply theme to current page
function applyTheme(theme) {
    const root = document.documentElement;
    
    root.style.setProperty('--gold', theme.primaryColor);
    root.style.setProperty('--dark-red', theme.secondaryColor);
    root.style.setProperty('--bg-primary', theme.backgroundColor);
    root.style.setProperty('--accent', theme.accentColor);
    root.style.setProperty('--text-primary', theme.textColor);
    
    // Apply background style
    if (theme.backgroundStyle === 'image' && theme.backgroundImage) {
        document.body.style.background = `url('${theme.backgroundImage}') center/cover fixed`;
    } else if (theme.backgroundStyle === 'solid') {
        document.body.style.background = theme.backgroundColor;
    } else {
        // Gradient (default)
        document.body.style.background = `linear-gradient(135deg, ${theme.backgroundColor} 0%, ${theme.secondaryColor} 100%)`;
    }
}

// Export for use in game
if (typeof window !== 'undefined') {
    window.gameSettings = DEFAULT_GAME_SETTINGS;
    window.loadGameSettings = loadGameSettings;
    window.saveGameSettings = saveGameSettings;
    window.applyTheme = applyTheme;
}

console.log('✅ Admin settings manager loaded');
