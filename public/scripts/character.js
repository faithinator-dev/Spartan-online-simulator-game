// Character Management System

let playerCharacter = null;

// Create new character
async function createCharacter(uid, username) {
    const age = getRandomInt(8, 16); // Random starting age
    const now = Date.now();
    
    const newCharacter = {
        uid: uid,
        username: username,
        age: age,
        level: 1,
        experience: 1,
        rank: "Trainee",
        
        // Core Stats
        health: 100,
        maxHealth: 100,
        strength: 20,
        defense: 5,
        agility: 10,
        stamina: 50,
        
        // Equipment
        equipment: {
            head: { name: "Training Cloth", armor: 1 },
            body: { name: "Roman Tunic", armor: 3 },
            legs: { name: "Simple Sandals", armor: 1 },
            weapon: { name: "Wooden Sword", damage: 5 },
            shield: null
        },
        
        // Skills
        skills: {
            combat: 5,
            tactics: 0,
            leadership: 0,
            survival: 3,
            hunting: 2,
            stealth: 1
        },
        
        // Progression
        gold: 50,
        reputation: 0,
        battlesWon: 0,
        territoriesConquered: 0,
        
        // Time System
        year: 480, // 480 BC
        day: 1,
        
        // Squad
        squad: null,
        squadSize: 0,
        maxSquadSize: 0,
        
        // Location
        location: "Sparta",
        
        // Timestamps
        createdAt: now,
        lastActive: now
    };
    
    try {
        console.log('💾 Saving character to Firestore...');
        
        if (!db) {
            throw new Error('Firestore not initialized!');
        }
        
        await db.collection('users').doc(uid).set(newCharacter);
        playerCharacter = newCharacter;
        console.log('✅ Character created successfully:', username);
        console.log('Character data:', newCharacter);
        return newCharacter;
    } catch (error) {
        console.error('❌ Error creating character:', error);
        console.error('UID:', uid);
        console.error('Username:', username);
        throw new Error('Failed to create character: ' + error.message);
    }
}

// Load user character
async function loadUserCharacter(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        
        if (doc.exists) {
            playerCharacter = doc.data();
            
            // Update last active
            await db.collection('users').doc(uid).update({
                lastActive: Date.now()
            });
            
            updateCharacterUI();
            console.log('✅ Character loaded:', playerCharacter.username);
        } else {
            console.error('Character not found');
        }
    } catch (error) {
        console.error('Error loading character:', error);
    }
}

// Save character to database
async function saveCharacter() {
    if (!playerCharacter || !currentUser) return;
    
    try {
        playerCharacter.lastActive = Date.now();
        await db.collection('users').doc(currentUser.uid).update(playerCharacter);
        console.log('💾 Character saved');
    } catch (error) {
        console.error('Error saving character:', error);
    }
}

// Update character UI
function updateCharacterUI() {
    if (!playerCharacter) return;
    
    // Top nav
    document.getElementById('player-name').textContent = playerCharacter.username;
    document.getElementById('player-gold').textContent = `💰 ${formatNumber(playerCharacter.gold)}`;
    
    // Sidebar
    document.getElementById('char-name').textContent = playerCharacter.username;
    document.getElementById('char-rank').textContent = playerCharacter.rank;
    document.getElementById('char-level').textContent = playerCharacter.level;
    document.getElementById('char-age').textContent = playerCharacter.age;
    document.getElementById('char-year').textContent = `${playerCharacter.year || 480} BC`;
    document.getElementById('char-location').textContent = playerCharacter.location;
    
    // Health bar
    const healthPercent = calculatePercentage(playerCharacter.health, playerCharacter.maxHealth);
    document.getElementById('health-bar').style.width = `${healthPercent}%`;
    document.getElementById('health-text').textContent = `${playerCharacter.health}/${playerCharacter.maxHealth}`;
    
    // XP bar
    const xpRequired = getXPRequired(playerCharacter.level);
    const xpPercent = calculatePercentage(playerCharacter.experience, xpRequired);
    document.getElementById('xp-bar').style.width = `${xpPercent}%`;
    document.getElementById('xp-text').textContent = `${playerCharacter.experience}/${xpRequired}`;
    
    // Stats
    document.getElementById('stat-strength').textContent = playerCharacter.strength;
    document.getElementById('stat-defense').textContent = playerCharacter.defense;
    document.getElementById('stat-agility').textContent = playerCharacter.agility;
    document.getElementById('stat-stamina').textContent = playerCharacter.stamina;
    
    // Achievements
    document.getElementById('battles-won').textContent = playerCharacter.battlesWon;
    document.getElementById('territories-conquered').textContent = playerCharacter.territoriesConquered;
    document.getElementById('reputation').textContent = playerCharacter.reputation;
    
    // Skills
    updateSkillsUI();
    
    // Equipment
    updateEquipmentUI();
    
    // Check for level up
    checkLevelUp();
    
    // Update rank info
    updateRankInfo();
    
    // Update squad lock status
    updateSquadLockStatus();
}

// Update skills UI
function updateSkillsUI() {
    if (!playerCharacter) return;
    
    const skills = ['combat', 'tactics', 'leadership', 'survival', 'hunting', 'stealth'];
    
    skills.forEach(skill => {
        const value = playerCharacter.skills[skill];
        const valueEl = document.getElementById(`skill-${skill}`);
        const barEl = document.getElementById(`skill-bar-${skill}`);
        
        if (valueEl) valueEl.textContent = value;
        if (barEl) barEl.style.width = `${value}%`;
    });
}

// Update equipment UI
function updateEquipmentUI() {
    if (!playerCharacter) return;
    
    const slots = ['head', 'body', 'legs', 'weapon', 'shield'];
    
    slots.forEach(slot => {
        const item = playerCharacter.equipment[slot];
        const el = document.getElementById(`equipped-${slot}`);
        
        if (el) {
            if (item) {
                const statText = item.armor ? `(+${item.armor} armor)` : `(+${item.damage} dmg)`;
                el.textContent = `${item.name} ${statText}`;
            } else {
                el.textContent = 'Empty';
            }
        }
    });
}

// Check for level up
function checkLevelUp() {
    const xpRequired = getXPRequired(playerCharacter.level);
    
    if (playerCharacter.experience >= xpRequired) {
        levelUp();
    }
}

// Level up character
async function levelUp() {
    playerCharacter.level++;
    playerCharacter.experience -= getXPRequired(playerCharacter.level - 1);
    
    // Increase stats
    playerCharacter.maxHealth += 10;
    playerCharacter.health = playerCharacter.maxHealth; // Full heal on level up
    playerCharacter.strength += getRandomInt(2, 5);
    playerCharacter.defense += getRandomInt(1, 3);
    playerCharacter.agility += getRandomInt(1, 2);
    playerCharacter.stamina += 5;
    
    // Update rank
    const rankInfo = getRankInfo(playerCharacter.level);
    playerCharacter.rank = rankInfo.current.name;
    playerCharacter.maxSquadSize = rankInfo.current.squadSize;
    
    // Show notification
    showNotification(`🎉 LEVEL UP! You are now level ${playerCharacter.level}!`, 5000);
    playSound('levelup');
    
    // Update UI
    updateCharacterUI();
    
    // Save to database
    await saveCharacter();
    
    // Check for more level ups
    checkLevelUp();
}

// Add experience
async function addExperience(amount) {
    playerCharacter.experience += amount;
    updateCharacterUI();
    showNotification(`+${amount} XP`);
    await saveCharacter();
}

// Add gold
async function addGold(amount) {
    playerCharacter.gold += amount;
    updateCharacterUI();
    showNotification(`+${amount} Gold`);
    await saveCharacter();
}

// Take damage
function takeDamage(amount) {
    playerCharacter.health = Math.max(0, playerCharacter.health - amount);
    updateCharacterUI();
    
    if (playerCharacter.health === 0) {
        return true; // Defeated
    }
    return false;
}

// Heal
function heal(amount) {
    playerCharacter.health = Math.min(playerCharacter.maxHealth, playerCharacter.health + amount);
    updateCharacterUI();
}

// Train skill
async function trainSkill(skillName) {
    const cost = {
        combat: 10,
        tactics: 15,
        leadership: 20,
        survival: 10,
        hunting: 10,
        stealth: 15
    };
    
    const skillCost = cost[skillName] || 10;
    
    if (playerCharacter.gold < skillCost) {
        showNotification('Not enough gold!');
        return;
    }
    
    if (playerCharacter.skills[skillName] >= 100) {
        showNotification('Skill maxed out!');
        return;
    }
    
    playerCharacter.gold -= skillCost;
    playerCharacter.skills[skillName] = Math.min(100, playerCharacter.skills[skillName] + getRandomInt(2, 5));
    
    updateCharacterUI();
    showNotification(`${skillName.charAt(0).toUpperCase() + skillName.slice(1)} skill increased!`);
    await saveCharacter();
}

// Update rank info
function updateRankInfo() {
    const rankInfo = getRankInfo(playerCharacter.level);
    
    if (rankInfo.next) {
        document.getElementById('next-rank').textContent = rankInfo.next.name;
    } else {
        document.getElementById('next-rank').textContent = 'MAX RANK';
    }
}

// Update squad lock status
function updateSquadLockStatus() {
    const squadLocked = document.getElementById('squad-locked');
    const squadUnlocked = document.getElementById('squad-unlocked');
    
    if (playerCharacter.level >= 5) {
        squadLocked.classList.add('hidden');
        squadUnlocked.classList.remove('hidden');
        loadSquad();
    } else {
        squadLocked.classList.remove('hidden');
        squadUnlocked.classList.add('hidden');
        document.getElementById('squad-lock-level').textContent = playerCharacter.level;
    }
}

// Get total armor value
function getTotalArmor() {
    let total = playerCharacter.defense;
    Object.values(playerCharacter.equipment).forEach(item => {
        if (item && item.armor) {
            total += item.armor;
        }
    });
    return total;
}

// Get total attack value
function getTotalAttack() {
    let total = playerCharacter.strength;
    if (playerCharacter.equipment.weapon && playerCharacter.equipment.weapon.damage) {
        total += playerCharacter.equipment.weapon.damage;
    }
    return total;
}

// Progress time (called after actions)
async function progressTime(days = 1) {
    if (!playerCharacter) return;
    
    playerCharacter.day = (playerCharacter.day || 1) + days;
    
    // 365 days in a year
    if (playerCharacter.day > 365) {
        playerCharacter.day = 1;
        playerCharacter.year = (playerCharacter.year || 480) - 1; // BC counts backwards
        playerCharacter.age++;
        showNotification(`🎉 A year has passed! You are now ${playerCharacter.age} years old.`, 5000);
    }
    
    // Update UI if on dashboard
    const yearEl = document.getElementById('char-year');
    if (yearEl) yearEl.textContent = `${playerCharacter.year} BC`;
    
    await saveCharacter();
}

console.log("✅ Character system loaded");
