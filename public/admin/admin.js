// Enhanced Admin Panel - Full Control Portal

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // CHANGE THIS IN PRODUCTION!
};

let currentAdminUser = null;
let selectedPlayer = null;
let allPlayers = [];
let currentSettings = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupColorPickers();
    setupBackgroundStyleSelector();
});

// ============== LOGIN ==============

document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('login-error');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        currentAdminUser = username;
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        initializeDashboard();
    } else {
        errorEl.textContent = '❌ Invalid username or password';
        errorEl.classList.add('show');
    }
});

function logout() {
    if (confirm('Are you sure you want to logout? Unsaved changes will be lost.')) {
        currentAdminUser = null;
        document.getElementById('admin-login').style.display = 'flex';
        document.getElementById('admin-dashboard').style.display = 'none';
        document.getElementById('admin-username').value = '';
        document.getElementById('admin-password').value = '';
    }
}

// ============== DASHBOARD INITIALIZATION ==============

async function initializeDashboard() {
    console.log('🚀 Initializing Admin Dashboard...');
    
    try {
        // Load current settings
        currentSettings = await loadGameSettings();
        
        // Load players
        await loadPlayers();
        
        // Populate all form fields
        populateContentFields();
        populateStorylineFields();
        populateVisualFields();
        populateSettingsFields();
        
        // Update stats
        updateStats();
        
        console.log('✅ Dashboard initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing dashboard:', error);
    }
}

// ============== TAB NAVIGATION ==============

function switchTab(tabName) {
    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Deactivate all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected panel
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    // Activate selected tab
    event.target.classList.add('active');
}

// ============== PLAYERS MANAGEMENT ==============

async function loadPlayers() {
    console.log('Loading players...');
    document.getElementById('loading').style.display = 'block';
    
    try {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0 && !DEMO_MODE) {
            await loadPlayersFromFirebase();
        } else {
            loadDemoPlayers();
        }
        
        renderPlayers(allPlayers);
    } catch (error) {
        console.error('Error loading players:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

async function loadPlayersFromFirebase() {
    const db = firebase.firestore();
    const snapshot = await db.collection('users').get();
    
    allPlayers = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        allPlayers.push({
            uid: doc.id,
            username: data.username || 'Unknown',
            email: data.email || 'N/A',
            level: data.level || 1,
            rank: data.rank || 'Trainee',
            gold: data.gold || 0,
            avatar: data.avatar || 'spartan_warrior',
            lastLogin: data.lastActive || data.lastLogin || new Date()
        });
    });
}

function loadDemoPlayers() {
    allPlayers = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('demo_users_')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                allPlayers.push({
                    uid: key,
                    username: data.username || 'Demo Player',
                    email: data.email || 'demo@example.com',
                    level: data.level || 1,
                    rank: data.rank || 'Trainee',
                    gold: data.gold || 0,
                    avatar: data.avatar || 'spartan_warrior',
                    lastLogin: data.lastActive || data.lastLogin || new Date()
                });
            } catch (error) {
                console.error('Error parsing player data:', error);
            }
        }
    }
}

function renderPlayers(players) {
    const tbody = document.getElementById('players-tbody');
    
    if (players.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No players found</td></tr>';
        return;
    }
    
    tbody.innerHTML = players.map(player => {
        const avatarId = player.avatar || 'spartan_warrior';
        const avatar = typeof getAvatarById === 'function' ? getAvatarById(avatarId) : null;
        const avatarClass = avatar ? avatar.cssClass : 'avatar-spartan-warrior';
        
        return `
        <tr>
            <td>
                <div class="avatar-container" style="width: 50px; height: 50px; margin: 0 auto;">
                    <div class="avatar-preview ${avatarClass}" style="width: 100%; height: 100%;"></div>
                </div>
            </td>
            <td>${player.username || 'Unknown'}</td>
            <td>${player.email || 'N/A'}</td>
            <td>${player.level || 1}</td>
            <td>${player.rank || 'Trainee'}</td>
            <td>💰 ${player.gold || 0}</td>
            <td>${formatDate(player.lastLogin)}</td>
            <td>
                <button class="action-btn" onclick="openGiftModal('${player.uid}', '${player.username}')">🎁 Gift</button>
                <button class="action-btn" onclick="viewPlayer('${player.uid}')">👁️ View</button>
            </td>
        </tr>
        `;
    }).join('');
}

// Search players
document.getElementById('search-players')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allPlayers.filter(player => {
        return (player.username && player.username.toLowerCase().includes(searchTerm)) ||
               (player.email && player.email.toLowerCase().includes(searchTerm));
    });
    renderPlayers(filtered);
});

function formatDate(date) {
    if (!date) return 'Never';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Unknown';
    return d.toLocaleString();
}

function updateStats() {
    document.getElementById('stat-players').textContent = allPlayers.length;
    
    const now = new Date();
    const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);
    const onlinePlayers = allPlayers.filter(p => new Date(p.lastLogin) > fiveMinutesAgo);
    document.getElementById('stat-online').textContent = onlinePlayers.length;
    
    // These would come from actual game data
    document.getElementById('stat-territories').textContent = '50+';
    document.getElementById('stat-battles').textContent = Math.floor(Math.random() * 100);
}

// ============== CONTENT EDITOR ==============

function populateContentFields() {
    if (!currentSettings || !currentSettings.content) return;
    
    const content = currentSettings.content;
    document.getElementById('content-title').value = content.gameTitle || '';
    document.getElementById('content-subtitle').value = content.gameSubtitle || '';
    document.getElementById('content-welcome').value = content.welcomeMessage || '';
    document.getElementById('content-loading').value = content.loadingText || '';
    document.getElementById('content-victory').value = content.victoryMessage || '';
    document.getElementById('content-defeat').value = content.defeatMessage || '';
}

async function saveContent() {
    const content = {
        gameTitle: document.getElementById('content-title').value,
        gameSubtitle: document.getElementById('content-subtitle').value,
        welcomeMessage: document.getElementById('content-welcome').value,
        loadingText: document.getElementById('content-loading').value,
        victoryMessage: document.getElementById('content-victory').value,
        defeatMessage: document.getElementById('content-defeat').value
    };
    
    currentSettings.content = content;
    
    if (await saveGameSettings(currentSettings)) {
        showSuccess('✅ Content saved successfully!');
    } else {
        alert('❌ Error saving content');
    }
}

// ============== STORYLINE EDITOR ==============

function populateStorylineFields() {
    if (!currentSettings || !currentSettings.storyline) return;
    
    const story = currentSettings.storyline;
    document.getElementById('story-intro').value = story.intro || '';
    document.getElementById('quest-training').value = story.questTexts?.training || '';
    document.getElementById('quest-battle').value = story.questTexts?.battle || '';
    document.getElementById('quest-conquest').value = story.questTexts?.conquest || '';
    document.getElementById('quest-legendary').value = story.questTexts?.legendary || '';
    
    loadMilestones();
}

function loadMilestones() {
    const container = document.getElementById('milestones-list');
    const milestones = currentSettings.storyline.levelMilestones || {};
    
    container.innerHTML = '';
    
    Object.entries(milestones).sort((a, b) => Number(a[0]) - Number(b[0])).forEach(([level, text]) => {
        const item = document.createElement('div');
        item.className = 'milestone-item';
        item.innerHTML = `
            <div class="milestone-item-content">
                <div class="milestone-level">Level ${level}</div>
                <div class="milestone-text">${text}</div>
            </div>
            <button class="action-btn" onclick="editMilestone(${level}, '${text.replace(/'/g, "\\'")}')">✏️ Edit</button>
            <button class="action-btn" onclick="deleteMilestone(${level})" style="background: rgba(220, 20, 60, 0.2);">🗑️</button>
        `;
        container.appendChild(item);
    });
}

function addMilestone() {
    const level = prompt('Enter level number for milestone (e.g., 5, 10, 15):');
    if (!level || isNaN(level)) return;
    
    const text = prompt('Enter milestone message:');
    if (!text) return;
    
    if (!currentSettings.storyline.levelMilestones) {
        currentSettings.storyline.levelMilestones = {};
    }
    
    currentSettings.storyline.levelMilestones[level] = text;
    loadMilestones();
}

function editMilestone(level, currentText) {
    const newText = prompt('Edit milestone message:', currentText);
    if (newText) {
        currentSettings.storyline.levelMilestones[level] = newText;
        loadMilestones();
    }
}

function deleteMilestone(level) {
    if (confirm(`Delete milestone for level ${level}?`)) {
        delete currentSettings.storyline.levelMilestones[level];
        loadMilestones();
    }
}

async function saveStoryline() {
    currentSettings.storyline = {
        intro: document.getElementById('story-intro').value,
        levelMilestones: currentSettings.storyline.levelMilestones || {},
        questTexts: {
            training: document.getElementById('quest-training').value,
            battle: document.getElementById('quest-battle').value,
            conquest: document.getElementById('quest-conquest').value,
            legendary: document.getElementById('quest-legendary').value
        }
    };
    
    if (await saveGameSettings(currentSettings)) {
        showSuccess('✅ Storyline saved successfully!');
    } else {
        alert('❌ Error saving storyline');
    }
}

// ============== VISUAL THEME EDITOR ==============

function setupColorPickers() {
    const colorInputs = [
        { picker: 'theme-primary', hex: 'theme-primary-hex', preview: 'preview-primary' },
        { picker: 'theme-secondary', hex: 'theme-secondary-hex', preview: 'preview-secondary' },
        { picker: 'theme-background', hex: 'theme-background-hex', preview: 'preview-background' },
        { picker: 'theme-accent', hex: 'theme-accent-hex', preview: 'preview-accent' },
        { picker: 'theme-text', hex: 'theme-text-hex', preview: 'preview-text' }
    ];
    
    colorInputs.forEach(({ picker, hex, preview }) => {
        const pickerEl = document.getElementById(picker);
        const hexEl = document.getElementById(hex);
        const previewEl = document.getElementById(preview);
        
        if (pickerEl && hexEl && previewEl) {
            pickerEl.addEventListener('input', (e) => {
                const color = e.target.value;
                hexEl.value = color;
                previewEl.style.background = color;
                updateLivePreview();
            });
            
            hexEl.addEventListener('input', (e) => {
                const color = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(color)) {
                    pickerEl.value = color;
                    previewEl.style.background = color;
                    updateLivePreview();
                }
            });
        }
    });
}

function setupBackgroundStyleSelector() {
    const styleSelect = document.getElementById('theme-bg-style');
    const imageGroup = document.getElementById('bg-image-group');
    
    if (styleSelect && imageGroup) {
        styleSelect.addEventListener('change', (e) => {
            imageGroup.style.display = e.target.value === 'image' ? 'block' : 'none';
            updateLivePreview();
        });
    }
}

function populateVisualFields() {
    if (!currentSettings || !currentSettings.theme) return;
    
    const theme = currentSettings.theme;
    
    // Set color values
    setColorValue('theme-primary', theme.primaryColor);
    setColorValue('theme-secondary', theme.secondaryColor);
    setColorValue('theme-background', theme.backgroundColor);
    setColorValue('theme-accent', theme.accentColor);
    setColorValue('theme-text', theme.textColor);
    
    // Set background settings
    document.getElementById('theme-bg-style').value = theme.backgroundStyle || 'gradient';
    document.getElementById('theme-bg-image').value = theme.backgroundImage || '';
    document.getElementById('bg-image-group').style.display = 
        theme.backgroundStyle === 'image' ? 'block' : 'none';
    
    updateLivePreview();
}

function setColorValue(baseid, color) {
    const picker = document.getElementById(baseid);
    const hex = document.getElementById(`${baseid}-hex`);
    const preview = document.getElementById(`preview-${baseid.replace('theme-', '')}`);
    
    if (picker && hex && preview) {
        picker.value = color;
        hex.value = color;
        preview.style.background = color;
    }
}

function updateLivePreview() {
    const preview = document.getElementById('live-preview');
    if (!preview) return;
    
    const primary = document.getElementById('theme-primary').value;
    const background = document.getElementById('theme-background').value;
    const text = document.getElementById('theme-text').value;
    
    preview.style.setProperty('--preview-primary', primary);
    preview.style.setProperty('--preview-bg', background);
    preview.style.setProperty('--preview-text', text);
    
    const bgStyle = document.getElementById('theme-bg-style').value;
    const bgImage = document.getElementById('theme-bg-image').value;
    const secondary = document.getElementById('theme-secondary').value;
    
    if (bgStyle === 'image' && bgImage) {
        preview.style.background = `url('${bgImage}') center/cover`;
    } else if (bgStyle === 'solid') {
        preview.style.background = background;
    } else {
        preview.style.background = `linear-gradient(135deg, ${background}, ${secondary})`;
    }
}

async function saveTheme() {
    currentSettings.theme = {
        primaryColor: document.getElementById('theme-primary').value,
        secondaryColor: document.getElementById('theme-secondary').value,
        backgroundColor: document.getElementById('theme-background').value,
        accentColor: document.getElementById('theme-accent').value,
        textColor: document.getElementById('theme-text').value,
        backgroundStyle: document.getElementById('theme-bg-style').value,
        backgroundImage: document.getElementById('theme-bg-image').value
    };
    
    if (await saveGameSettings(currentSettings)) {
        showSuccess('✅ Theme saved successfully!');
    } else {
        alert('❌ Error saving theme');
    }
}

function resetTheme() {
    if (confirm('Reset theme to default colors?')) {
        setColorValue('theme-primary', '#FFD700');
        setColorValue('theme-secondary', '#8B0000');
        setColorValue('theme-background', '#1a1a2e');
        setColorValue('theme-accent', '#DC143C');
        setColorValue('theme-text', '#f5f5dc');
        document.getElementById('theme-bg-style').value = 'gradient';
        document.getElementById('theme-bg-image').value = '';
        updateLivePreview();
    }
}

// ============== GAME SETTINGS ==============

function populateSettingsFields() {
    if (!currentSettings || !currentSettings.rules) return;
    
    const rules = currentSettings.rules;
    document.getElementById('setting-start-gold').value = rules.startingGold || 50;
    document.getElementById('setting-daily-bonus').value = rules.dailyLoginBonus || 10;
    document.getElementById('setting-start-level').value = rules.startingLevel || 1;
    document.getElementById('setting-xp-level').value = rules.xpPerLevel || 100;
    document.getElementById('setting-crit-chance').value = (rules.criticalHitChance || 0.05) * 100;
    document.getElementById('setting-crit-damage').value = rules.criticalDamageMultiplier || 2;
    document.getElementById('setting-squad-unlock').value = rules.squadUnlockLevel || 5;
    document.getElementById('setting-squad-max').value = rules.maxSquadSize || 5;
}

async function saveSettings() {
    currentSettings.rules = {
        startingGold: Number(document.getElementById('setting-start-gold').value),
        dailyLoginBonus: Number(document.getElementById('setting-daily-bonus').value),
        startingLevel: Number(document.getElementById('setting-start-level').value),
        xpPerLevel: Number(document.getElementById('setting-xp-level').value),
        criticalHitChance: Number(document.getElementById('setting-crit-chance').value) / 100,
        criticalDamageMultiplier: Number(document.getElementById('setting-crit-damage').value),
        squadUnlockLevel: Number(document.getElementById('setting-squad-unlock').value),
        maxSquadSize: Number(document.getElementById('setting-squad-max').value)
    };
    
    if (await saveGameSettings(currentSettings)) {
        showSuccess('✅ Game settings saved successfully!');
    } else {
        alert('❌ Error saving game settings');
    }
}

async function resetAllSettings() {
    if (confirm('⚠️ WARNING: This will reset ALL settings to defaults. Continue?')) {
        currentSettings = JSON.parse(JSON.stringify(DEFAULT_GAME_SETTINGS));
        await saveGameSettings(currentSettings);
        
        populateContentFields();
        populateStorylineFields();
        populateVisualFields();
        populateSettingsFields();
        
        showSuccess('✅ All settings reset to defaults!');
    }
}

// ============== SAVE ALL ==============

async function saveAllSettings() {
    if (confirm('Save all current settings?')) {
        // Collect all current form values
        await saveContent();
        await saveStoryline();
        await saveTheme();
        await saveSettings();
        
        showSuccess('✅ All settings saved successfully!');
    }
}

// ============== UTILITIES ==============

function showSuccess(message) {
    const notification = document.getElementById('success-notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function previewGame() {
    window.open('../index.html', '_blank');
}

function exportSettings() {
    const data = JSON.stringify(currentSettings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spartan-game-settings.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const text = await file.text();
            try {
                const imported = JSON.parse(text);
                currentSettings = imported;
                await saveGameSettings(currentSettings);
                
                populateContentFields();
                populateStorylineFields();
                populateVisualFields();
                populateSettingsFields();
                
                showSuccess('✅ Settings imported successfully!');
            } catch (error) {
                alert('❌ Error importing settings: Invalid JSON file');
            }
        }
    };
    input.click();
}

// ============== GIFT MODAL (from original) ==============

function openGiftModal(playerId, playerName) {
    selectedPlayer = { uid: playerId, username: playerName };
    document.getElementById('gift-player-name').textContent = playerName;
    document.getElementById('gift-modal').style.display = 'block';
    loadEquipmentOptions();
}

function closeGiftModal() {
    document.getElementById('gift-modal').style.display = 'none';
    selectedPlayer = null;
}

function updateGiftOptions() {
    const type = document.getElementById('gift-type').value;
    document.getElementById('gift-amount-container').style.display = 
        (type === 'gold' || type === 'xp') ? 'block' : 'none';
    document.getElementById('gift-equipment-container').style.display = 
        type === 'equipment' ? 'block' : 'none';
}

function loadEquipmentOptions() {
    if (typeof EQUIPMENT_DATABASE === 'undefined') return;
    
    const container = document.getElementById('equipment-options');
    const items = Object.values(EQUIPMENT_DATABASE).flat().slice(0, 30);
    
    container.innerHTML = items.map(item => `
        <div style="display: flex; align-items: center; gap: 10px; padding: 10px; cursor: pointer; border: 1px solid transparent; border-radius: 5px;" 
             onclick="selectEquipment('${item.id}')"
             onmouseover="this.style.borderColor='var(--admin-gold)'"
             onmouseout="this.style.borderColor='transparent'">
            <div class="${typeof getEquipmentSpriteClass === 'function' ? getEquipmentSpriteClass(item) : ''}" 
                 style="width: 32px; height: 32px;"></div>
            <div>
                <div style="color: ${item.rarity === 'legendary' ? '#ff6600' : item.rarity === 'rare' ? '#0066ff' : '#999'};">
                    ${item.name}
                </div>
                <div style="font-size: 11px; color: #666;">Tier ${item.tier} ${item.category}</div>
            </div>
        </div>
    `).join('');
}

let selectedEquipmentId = null;

function selectEquipment(itemId) {
    selectedEquipmentId = itemId;
    document.querySelectorAll('#equipment-options > div').forEach(el => {
        el.style.background = el.onclick?.toString().includes(itemId) ? 'rgba(255,215,0,0.2)' : 'transparent';
    });
}

async function sendGift() {
    const type = document.getElementById('gift-type').value;
    const amount = Number(document.getElementById('gift-amount').value);
    
    if (!selectedPlayer) return;
    
    try {
        if (type === 'gold') {
            await giftGold(selectedPlayer.uid, amount);
            showSuccess(`✅ Gifted ${amount} gold to ${selectedPlayer.username}`);
        } else if (type === 'xp') {
            await giftXP(selectedPlayer.uid, amount);
            showSuccess(`✅ Gifted ${amount} XP to ${selectedPlayer.username}`);
        } else if (type === 'equipment' && selectedEquipmentId) {
            await giftEquipment(selectedPlayer.uid, selectedEquipmentId);
            showSuccess(`✅ Gifted equipment to ${selectedPlayer.username}`);
        }
        
        closeGiftModal();
        loadPlayers(); // Refresh list
    } catch (error) {
        alert('❌ Error sending gift: ' + error.message);
    }
}

async function giftGold(playerId, amount) {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0 && !DEMO_MODE) {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(playerId);
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            const currentGold = data.gold || 0;
            await docRef.update({ gold: currentGold + amount });
        }
    } else {
        const key = playerId.startsWith('demo_') ? playerId : `demo_users_${playerId}`;
        const data = JSON.parse(localStorage.getItem(key));
        if (data) {
            data.gold = (data.gold || 0) + amount;
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
}

async function giftXP(playerId, amount) {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0 && !DEMO_MODE) {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(playerId);
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            const currentXP = data.experience || 0;
            await docRef.update({ experience: currentXP + amount });
        }
    } else {
        const key = playerId.startsWith('demo_') ? playerId : `demo_users_${playerId}`;
        const data = JSON.parse(localStorage.getItem(key));
        if (data) {
            data.experience = (data.experience || 0) + amount;
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
}

async function giftEquipment(playerId, itemId) {
    // Find item in database
    let foundItem = null;
    for (const category in EQUIPMENT_DATABASE) {
        const item = EQUIPMENT_DATABASE[category].find(i => i.id === itemId);
        if (item) {
            foundItem = item;
            break;
        }
    }
    
    if (!foundItem) throw new Error('Item not found in database');

    if (typeof firebase !== 'undefined' && firebase.apps.length > 0 && !DEMO_MODE) {
        const db = firebase.firestore();
        const docRef = db.collection('users').doc(playerId);
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            const inventory = data.inventory || [];
            inventory.push(foundItem);
            await docRef.update({ inventory: inventory });
        }
    } else {
        const key = playerId.startsWith('demo_') ? playerId : `demo_users_${playerId}`;
        const data = JSON.parse(localStorage.getItem(key));
        if (data) {
            if (!data.inventory) data.inventory = [];
            data.inventory.push(foundItem);
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
}

function viewPlayer(playerId) {
    alert('Player details view - Coming soon!');
}

console.log('✅ Enhanced Admin Panel loaded');
