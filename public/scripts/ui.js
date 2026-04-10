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

// Location Navigation
function navigateToLocation(locationId) {
    const cityGrid = document.querySelector('.city-grid');
    const detailView = document.getElementById('location-detail');
    const content = document.getElementById('location-content');
    
    if (!cityGrid || !detailView || !content) return;
    
    cityGrid.classList.add('hidden');
    detailView.classList.remove('hidden');
    
    let html = '';
    switch(locationId) {
        case 'barracks':
            html = `
                <h2>⚔️ The Royal Barracks</h2>
                <p>The air is thick with the smell of sweat and iron. Veterans spar with wooden swords while recruits look on in awe.</p>
                <div class="location-actions">
                    <div class="action-card">
                        <h4>Drill Training</h4>
                        <p>Focus on basic combat drills to sharpen your sword hand.</p>
                        <button class="btn btn-primary" onclick="performLocationAction('train_combat')">Train (10 Gold)</button>
                    </div>
                    <div class="action-card">
                        <h4>Listen to Veterans</h4>
                        <p>Hear tales of past battles and learn tactical positioning.</p>
                        <button class="btn btn-primary" onclick="performLocationAction('train_tactics')">Learn (15 Gold)</button>
                    </div>
                </div>
            `;
            break;
        case 'garden':
            html = `
                <h2>🌿 The Great Garden</h2>
                <p>A lush, wild area where Spartan youths learn to live off the land. It is beautiful but dangerous.</p>
                <div class="location-actions">
                    <div class="action-card">
                        <h4>Survival Training</h4>
                        <p>Practice tracking and finding edible plants in the dense brush.</p>
                        <button class="btn btn-primary" onclick="performLocationAction('train_survival')">Train (10 Gold)</button>
                    </div>
                    <div class="action-card">
                        <h4>Hunt Small Game</h4>
                        <p>Track and catch rabbits or birds to hone your hunting instincts.</p>
                        <button class="btn btn-primary" onclick="performLocationAction('train_hunting')">Hunt (10 Gold)</button>
                    </div>
                </div>
            `;
            break;
        case 'market':
            html = `
                <h2>💰 Marketplace</h2>
                <p>Traders from across the Aegean display their wares. The clink of coins and shouting of barters fills the air.</p>
                <div class="location-actions">
                    <button class="btn btn-primary" onclick="navigateToView('inventory')">Open Shop</button>
                    <button class="btn btn-secondary" onclick="performLocationAction('scavenge')">Scavenge for Scraps</button>
                </div>
            `;
            break;
        case 'agora':
            html = `
                <h2>🏛️ The Agora</h2>
                <p>The center of Spartan political life. Elders debate the future of the city-state here.</p>
                <div class="location-actions">
                    <div class="action-card">
                        <h4>Observe Debates</h4>
                        <p>Learn how to influence and lead others by watching the masters.</p>
                        <button class="btn btn-primary" onclick="performLocationAction('train_leadership')">Study (20 Gold)</button>
                    </div>
                </div>
            `;
            break;
        case 'village':
            html = `
                <h2>🏘️ Shadow Village</h2>
                <p>A humble settlement on the outskirts of Spartan territory. The people here look tired and afraid.</p>
                <div class="location-actions">
                    <div class="action-card">
                        <h4>Talk to Elder</h4>
                        <p>Hear about the bandit raids and how you can help.</p>
                        <button class="btn btn-primary" onclick="performLocationAction('village_info')">Listen</button>
                    </div>
                    <div class="action-card">
                        <h4>Help Villagers</h4>
                        <p>Perform manual labor to earn trust and small rewards.</p>
                        <button class="btn btn-primary" onclick="performLocationAction('village_help')">Work (1 Day)</button>
                    </div>
                    <div class="action-card">
                        <h4>Patrol Perimeter</h4>
                        <p>Search for signs of bandit activity in the nearby woods.</p>
                        <button class="btn btn-danger" onclick="performLocationAction('village_patrol')">Patrol (3 Days)</button>
                    </div>
                </div>
            `;
            break;
    }
    content.innerHTML = html;
}

function backToCity() {
    document.querySelector('.city-grid').classList.remove('hidden');
    document.getElementById('location-detail').classList.add('hidden');
}

async function performLocationAction(action) {
    if (!playerCharacter) return;
    
    let daysPassed = 0;

    switch(action) {
        case 'train_combat':
            await trainSkill('combat');
            updateQuestProgress('train_location', 'barracks');
            daysPassed = 2;
            break;
        case 'train_tactics':
            await trainSkill('tactics');
            daysPassed = 2;
            break;
        case 'train_survival':
            await trainSkill('survival');
            updateQuestProgress('train_location', 'garden');
            daysPassed = 3;
            break;
        case 'train_hunting':
            await trainSkill('hunting');
            daysPassed = 3;
            break;
        case 'train_leadership':
            await trainSkill('leadership');
            daysPassed = 5;
            break;
        case 'scavenge':
            const foundGold = getRandomInt(1, 5);
            await addGold(foundGold);
            showNotification(`You found ${foundGold} gold scraps in the market!`);
            daysPassed = 1;
            break;
        case 'village_info':
            showNotification("The Elder tells you of a bandit camp to the North.");
            daysPassed = 0;
            break;
        case 'village_help':
            await addGold(2);
            showNotification("The villagers appreciate your help! You earned 2 gold.");
            daysPassed = 1;
            break;
        case 'village_patrol':
            showNotification("You found signs of a bandit group nearby!");
            updateQuestProgress('patrol_location', 'village');
            daysPassed = 3;
            break;
    }
    
    if (daysPassed > 0) {
        await progressTime(daysPassed);
    }
    updateCharacterUI();
}

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
