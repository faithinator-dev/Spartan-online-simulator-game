// Admin Panel JavaScript

// Admin credentials (you should change these!)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // CHANGE THIS!
};

let currentAdminUser = null;
let selectedPlayer = null;
let allPlayers = [];

// Login
document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('login-error');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        currentAdminUser = username;
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'block';
        loadDashboard();
    } else {
        errorEl.textContent = '❌ Invalid username or password';
        errorEl.classList.add('show');
    }
});

// Logout
function logout() {
    currentAdminUser = null;
    document.getElementById('admin-login').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
}

// Load Dashboard
async function loadDashboard() {
    console.log('Loading admin dashboard...');
    document.getElementById('loading').style.display = 'block';
    
    try {
        await loadPlayers();
        updateStats();
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert('Error loading dashboard. Check console for details.');
    }
    
    document.getElementById('loading').style.display = 'none';
}

// Load all players
async function loadPlayers() {
    allPlayers = [];
    
    if (typeof db === 'undefined') {
        console.error('Database not initialized');
        return;
    }
    
    try {
        // Get all users from Firestore
        const usersSnapshot = await db.collection('users').get();
        
        if (usersSnapshot.empty) {
            console.log('No players found');
            document.getElementById('players-tbody').innerHTML = '<tr><td colspan="7" style="text-align: center;">No players yet</td></tr>';
            return;
        }
        
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            allPlayers.push({
                uid: doc.id,
                ...data
            });
        });
        
        console.log(`Loaded ${allPlayers.length} players`);
        renderPlayers(allPlayers);
        
    } catch (error) {
        console.error('Error loading players:', error);
        
        // If using demo mode, load from localStorage
        if (window.DEMO_MODE) {
            loadDemoPlayers();
        }
    }
}

// Load demo mode players
function loadDemoPlayers() {
    allPlayers = [];
    
    // Scan localStorage for demo users
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('demo_users_')) {
            const uid = key.replace('demo_users_', '');
            const data = JSON.parse(localStorage.getItem(key));
            allPlayers.push({
                uid: uid,
                ...data
            });
        }
    }
    
    console.log(`Loaded ${allPlayers.length} demo players`);
    renderPlayers(allPlayers);
}

// Render players table
function renderPlayers(players) {
    const tbody = document.getElementById('players-tbody');
    
    if (players.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No players found</td></tr>';
        return;
    }
    
    tbody.innerHTML = players.map(player => {
        // Get avatar info
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
                <button class="action-btn btn-gift" onclick="openGiftModal('${player.uid}', '${player.username}')">🎁 Gift</button>
                <button class="action-btn btn-view" onclick="viewPlayer('${player.uid}')">👁️ View</button>
            </td>
        </tr>
        `;
    }).join('');
}

// Search players
document.getElementById('search-players').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filtered = allPlayers.filter(player => {
        return (player.username && player.username.toLowerCase().includes(searchTerm)) ||
               (player.email && player.email.toLowerCase().includes(searchTerm));
    });
    
    renderPlayers(filtered);
});

// Update stats
function updateStats() {
    document.getElementById('total-players').textContent = allPlayers.length;
    
    // Count online players (logged in within last 5 minutes)
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    const onlinePlayers = allPlayers.filter(p => p.lastLogin && p.lastLogin > fiveMinutesAgo);
    document.getElementById('online-players').textContent = onlinePlayers.length;
    
    // Total territories conquered
    const totalTerritories = allPlayers.reduce((sum, p) => sum + (p.territoriesConquered || 0), 0);
    document.getElementById('total-territories').textContent = totalTerritories;
    
    // Battles today (mock data for now)
    document.getElementById('battles-today').textContent = Math.floor(Math.random() * 50);
}

// Open gift modal
function openGiftModal(uid, username) {
    selectedPlayer = allPlayers.find(p => p.uid === uid);
    document.getElementById('gift-player-name').textContent = username;
    document.getElementById('gift-modal').classList.add('show');
    
    // Load equipment options
    loadEquipmentOptions();
}

// Close gift modal
function closeGiftModal() {
    document.getElementById('gift-modal').classList.remove('show');
    selectedPlayer = null;
}

// Gift type change
document.getElementById('gift-type').addEventListener('change', (e) => {
    const type = e.target.value;
    
    document.getElementById('gold-section').style.display = type === 'gold' ? 'block' : 'none';
    document.getElementById('xp-section').style.display = type === 'xp' ? 'block' : 'none';
    document.getElementById('equipment-section').style.display = type === 'equipment' ? 'block' : 'none';
});

// Load equipment options
function loadEquipmentOptions() {
    const container = document.getElementById('equipment-options');
    
    // Get all equipment from database
    const allEquipment = [];
    for (const category in EQUIPMENT_DATABASE) {
        EQUIPMENT_DATABASE[category].forEach(item => {
            allEquipment.push({ ...item, category });
        });
    }
    
    // Sort by tier and value
    allEquipment.sort((a, b) => a.tier - b.tier || a.value - b.value);
    
    // Show first 20 items (scrollable)
    const displayItems = allEquipment.slice(0, 30);
    
    container.innerHTML = displayItems.map(item => {
        const spriteClass = getEquipmentSpriteClass(item);
        const stats = [];
        if (item.strength) stats.push(`⚔️${item.strength}`);
        if (item.defense) stats.push(`🛡️${item.defense}`);
        if (item.agility) stats.push(`⚡${item.agility}`);
        
        return `
            <div class="gift-item" data-equipment='${JSON.stringify(item)}' onclick="selectEquipment(this)" style="border-color: ${RARITY_COLORS[item.rarity]}">
                <div class="equipment-icon ${item.rarity} ${spriteClass}" style="width: 32px; height: 32px; margin: 5px auto;"></div>
                <div style="font-size: 11px; margin-top: 5px; font-weight: bold; color: ${RARITY_COLORS[item.rarity]}">${item.name}</div>
                <div style="font-size: 10px; color: #999;">T${item.tier} ${stats.join(' ')}</div>
            </div>
        `;
    }).join('');
    
    container.style.maxHeight = '300px';
    container.style.overflowY = 'auto';
}

// Select equipment
function selectEquipment(element) {
    // Deselect all
    document.querySelectorAll('.gift-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select this one
    element.classList.add('selected');
}

// Confirm gift
async function confirmGift() {
    if (!selectedPlayer) return;
    
    const giftType = document.getElementById('gift-type').value;
    
    try {
        if (giftType === 'gold') {
            const amount = parseInt(document.getElementById('gift-gold-amount').value);
            await giftGold(selectedPlayer.uid, amount);
            alert(`✅ Successfully gifted ${amount} gold to ${selectedPlayer.username}!`);
        } else if (giftType === 'xp') {
            const amount = parseInt(document.getElementById('gift-xp-amount').value);
            await giftXP(selectedPlayer.uid, amount);
            alert(`✅ Successfully gifted ${amount} XP to ${selectedPlayer.username}!`);
        } else if (giftType === 'equipment') {
            const selectedItem = document.querySelector('.gift-item.selected');
            if (!selectedItem) {
                alert('Please select an equipment item');
                return;
            }
            const equipment = JSON.parse(selectedItem.dataset.equipment);
            await giftEquipment(selectedPlayer.uid, equipment);
            alert(`✅ Successfully gifted ${equipment.name} to ${selectedPlayer.username}!`);
        }
        
        closeGiftModal();
        await loadPlayers();
        updateStats();
        
    } catch (error) {
        console.error('Error gifting:', error);
        alert('❌ Error sending gift. Check console for details.');
    }
}

// Gift gold
async function giftGold(uid, amount) {
    if (window.DEMO_MODE || typeof db === 'undefined') {
        // Demo mode - localStorage
        const key = `demo_users_${uid}`;
        const userData = JSON.parse(localStorage.getItem(key));
        userData.gold = (userData.gold || 0) + amount;
        localStorage.setItem(key, JSON.stringify(userData));
    } else {
        // Firebase mode
        const userRef = db.collection('users').doc(uid);
        await userRef.update({
            gold: firebase.firestore.FieldValue.increment(amount)
        });
    }
}

// Gift XP
async function giftXP(uid, amount) {
    if (window.DEMO_MODE || typeof db === 'undefined') {
        // Demo mode - localStorage
        const key = `demo_users_${uid}`;
        const userData = JSON.parse(localStorage.getItem(key));
        userData.experience = (userData.experience || 0) + amount;
        localStorage.setItem(key, JSON.stringify(userData));
    } else {
        // Firebase mode
        const userRef = db.collection('users').doc(uid);
        await userRef.update({
            experience: firebase.firestore.FieldValue.increment(amount)
        });
    }
}

// Gift equipment
async function giftEquipment(uid, equipment) {
    if (window.DEMO_MODE || typeof db === 'undefined') {
        // Demo mode - localStorage
        const key = `demo_users_${uid}`;
        const userData = JSON.parse(localStorage.getItem(key));
        if (!userData.inventory) userData.inventory = {};
        if (!userData.inventory[equipment.slot]) userData.inventory[equipment.slot] = [];
        userData.inventory[equipment.slot].push(equipment);
        localStorage.setItem(key, JSON.stringify(userData));
    } else {
        // Firebase mode
        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();
        const userData = userDoc.data();
        
        if (!userData.inventory) userData.inventory = {};
        if (!userData.inventory[equipment.slot]) userData.inventory[equipment.slot] = [];
        userData.inventory[equipment.slot].push(equipment);
        
        await userRef.update({
            inventory: userData.inventory
        });
    }
}

// View player details
function viewPlayer(uid) {
    const player = allPlayers.find(p => p.uid === uid);
    if (!player) return;
    
    const details = `
Player Details:
━━━━━━━━━━━━━━
Username: ${player.username}
Email: ${player.email}
Level: ${player.level}
Rank: ${player.rank}
Gold: ${player.gold}
Experience: ${player.experience}/${player.xpToNextLevel}
Health: ${player.health}/${player.maxHealth}
Strength: ${player.strength}
Defense: ${player.defense}
Agility: ${player.agility}
Territories: ${player.territoriesConquered || 0}
Battles Won: ${player.battlesWon || 0}
Last Login: ${formatDate(player.lastLogin)}
    `;
    
    alert(details);
}

// Format date
function formatDate(timestamp) {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Admin panel loaded');
});
