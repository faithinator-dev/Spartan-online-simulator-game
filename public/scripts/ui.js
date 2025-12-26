// UI Management System

// Navigate to view
function navigateToView(viewName) {
    // Hide all views
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Deactivate all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected view
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    // Activate corresponding nav button
    const targetBtn = document.querySelector(`.nav-btn[data-view="${viewName}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // Load view-specific data
    loadViewData(viewName);
}

// Load view-specific data
function loadViewData(viewName) {
    switch (viewName) {
        case 'map':
            if (Object.keys(territories).length === 0) {
                initializeTerritories();
            }
            break;
        case 'quests':
            loadQuests();
            break;
        case 'inventory':
            loadShop();
            break;
        case 'squad':
            loadSquad();
            break;
        case 'leaderboard':
            loadLeaderboard();
            break;
    }
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const viewName = btn.dataset.view;
            navigateToView(viewName);
        });
    });
}

// Load leaderboard
async function loadLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;
    
    leaderboardList.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Loading leaderboard...</p>';
    
    try {
        // Get top players by level
        const usersSnapshot = await db.collection('users')
            .orderBy('level', 'desc')
            .limit(10)
            .get();
        
        if (usersSnapshot.empty) {
            leaderboardList.innerHTML = '<p style="text-align: center; color: var(--text-gray);">No players found</p>';
            return;
        }
        
        leaderboardList.innerHTML = '';
        
        usersSnapshot.forEach((doc, index) => {
            const player = doc.data();
            const entry = document.createElement('div');
            entry.className = 'leaderboard-entry';
            
            const rankClass = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
            
            entry.innerHTML = `
                <div class="leaderboard-rank ${rankClass}">#${index + 1}</div>
                <div class="leaderboard-player">
                    <div class="leaderboard-player-name">${player.username}</div>
                    <div class="leaderboard-player-rank">${player.rank}</div>
                </div>
                <div class="leaderboard-stat">Lvl ${player.level}</div>
            `;
            
            leaderboardList.appendChild(entry);
        });
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        leaderboardList.innerHTML = '<p style="text-align: center; color: var(--danger);">Failed to load leaderboard</p>';
    }
}

// Leaderboard tab switching
document.querySelectorAll('.leaderboard-tab').forEach(tab => {
    tab.addEventListener('click', async () => {
        const category = tab.dataset.category;
        
        document.querySelectorAll('.leaderboard-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Loading...</p>';
        
        try {
            let query;
            let statField = '';
            
            switch (category) {
                case 'level':
                    query = db.collection('users').orderBy('level', 'desc').limit(10);
                    statField = 'level';
                    break;
                case 'territories':
                    query = db.collection('users').orderBy('territoriesConquered', 'desc').limit(10);
                    statField = 'territoriesConquered';
                    break;
                case 'rating':
                    query = db.collection('users').orderBy('reputation', 'desc').limit(10);
                    statField = 'reputation';
                    break;
            }
            
            const snapshot = await query.get();
            
            if (snapshot.empty) {
                leaderboardList.innerHTML = '<p style="text-align: center; color: var(--text-gray);">No data available</p>';
                return;
            }
            
            leaderboardList.innerHTML = '';
            
            snapshot.forEach((doc, index) => {
                const player = doc.data();
                const entry = document.createElement('div');
                entry.className = 'leaderboard-entry';
                
                const rankClass = index === 0 ? 'top1' : index === 1 ? 'top2' : index === 2 ? 'top3' : '';
                
                let statText = '';
                if (category === 'level') {
                    statText = `Lvl ${player[statField]}`;
                } else if (category === 'territories') {
                    statText = `${player[statField]} territories`;
                } else {
                    statText = `${player[statField]} rep`;
                }
                
                entry.innerHTML = `
                    <div class="leaderboard-rank ${rankClass}">#${index + 1}</div>
                    <div class="leaderboard-player">
                        <div class="leaderboard-player-name">${player.username}</div>
                        <div class="leaderboard-player-rank">${player.rank}</div>
                    </div>
                    <div class="leaderboard-stat">${statText}</div>
                `;
                
                leaderboardList.appendChild(entry);
            });
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            leaderboardList.innerHTML = '<p style="text-align: center; color: var(--danger);">Failed to load data</p>';
        }
    });
});

// Update dashboard journey text based on level
function updateDashboardJourney() {
    const journeyText = document.getElementById('journey-text');
    if (!journeyText || !playerCharacter) return;
    
    let text = '';
    
    if (playerCharacter.level < 5) {
        text = 'You begin as a young trainee in the mighty city of Sparta. Train hard, fight bravely, and rise through the ranks!';
    } else if (playerCharacter.level < 15) {
        text = 'You have proven yourself as a capable warrior. Continue your training and prepare to lead others into battle!';
    } else if (playerCharacter.level < 25) {
        text = 'As a squad leader, you command warriors in battle. Expand Sparta\'s influence by conquering new territories!';
    } else if (playerCharacter.level < 50) {
        text = 'You are now a commander of great renown. Your tactical genius strikes fear into the hearts of enemies!';
    } else {
        text = 'You have become a legendary Spartan, celebrated throughout the ancient world. Your name will echo through history!';
    }
    
    journeyText.textContent = text;
}

// Setup periodic auto-save
function setupAutoSave() {
    setInterval(async () => {
        if (playerCharacter && currentUser) {
            await saveCharacter();
            console.log('🔄 Auto-saved');
        }
    }, 60000); // Save every minute
}

// Setup visibility change handler (save on tab close)
function setupVisibilityHandler() {
    document.addEventListener('visibilitychange', async () => {
        if (document.hidden && playerCharacter && currentUser) {
            await saveCharacter();
            console.log('💾 Saved on tab hide');
        }
    });
}

// Initialize UI event listeners
function initializeUIListeners() {
    setupNavigation();
    setupAutoSave();
    setupVisibilityHandler();
    
    console.log('✅ UI listeners initialized');
}

console.log("✅ UI system loaded");
