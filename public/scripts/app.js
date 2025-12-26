// Main Application Entry Point

// Load and apply admin settings
let gameSettings = null;

async function initializeGameSettings() {
    try {
        if (typeof loadGameSettings === 'function') {
            gameSettings = await loadGameSettings();
            console.log('✅ Game settings loaded:', gameSettings);
            
            // Apply theme if available
            if (gameSettings.theme && typeof applyTheme === 'function') {
                applyTheme(gameSettings.theme);
            }
            
            // Update content if available
            if (gameSettings.content) {
                updateGameContent(gameSettings.content);
            }
        }
    } catch (error) {
        console.log('⚠️ Using default settings');
    }
}

function updateGameContent(content) {
    // Update game title
    const titleElements = document.querySelectorAll('.spartan-title');
    titleElements.forEach(el => {
        if (content.gameTitle) el.textContent = content.gameTitle;
    });
    
    // Update subtitle/tagline
    const taglines = document.querySelectorAll('.tagline');
    taglines.forEach(el => {
        if (content.welcomeMessage) el.textContent = content.welcomeMessage;
    });
    
    // Update loading text
    const loadingText = document.querySelector('#loading-screen p');
    if (loadingText && content.loadingText) {
        loadingText.textContent = content.loadingText;
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎮 Spartan Conquest - Initializing...');
    
    // Load admin settings first
    await initializeGameSettings();
    
    // Show loading screen initially
    const loadingScreen = document.getElementById('loading-screen');
    const authScreen = document.getElementById('auth-screen');
    const gameScreen = document.getElementById('game-screen');
    
    // Make sure only loading screen is visible at start
    if (loadingScreen) loadingScreen.classList.add('active');
    if (authScreen) authScreen.classList.remove('active');
    if (gameScreen) gameScreen.classList.remove('active');
    
    // Hide loading screen after 7.5 seconds and show login section
    setTimeout(() => {
        console.log('🔄 Hiding loading screen after 7.5 seconds...');
        
        if (loadingScreen) {
            loadingScreen.classList.remove('active');
            console.log('✅ Loading screen hidden (display: none)');
        }
        
        // If no auth state has been triggered yet, show auth screen
        setTimeout(() => {
            const anyScreenActive = document.querySelector('.screen.active');
            if (!anyScreenActive) {
                console.log('⚠️ No screen active, showing login section');
                if (authScreen) authScreen.classList.add('active');
            }
        }, 200);
    }, 7500);
    
    // Initialize UI listeners
    initializeUIListeners();
    
    // Load saved quest progress
    loadQuestProgress();
    
    console.log('✅ Game initialized successfully!');
});

// Global window functions for onclick handlers
window.navigateToView = navigateToView;
window.startTrainingBattle = startTrainingBattle;
window.startHuntingBattle = startHuntingBattle;
window.startRandomBattle = startRandomBattle;
window.battleAction = battleAction;
window.trainSkill = trainSkill;
window.acceptQuest = acceptQuest;
window.abandonQuest = abandonQuest;
window.buyItem = buyItem;

console.log("✅ Main app loaded");
