// Main Application Entry Point

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Spartan Conquest - Initializing...');
    
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
