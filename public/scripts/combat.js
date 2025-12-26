// Combat System

let currentBattle = null;
let battleLog = [];

// Enemy templates
const ENEMIES = {
    training_dummy: {
        name: "Training Dummy",
        avatar: "🎯",
        level: 1,
        health: 30,
        maxHealth: 30,
        strength: 5,
        defense: 2,
        agility: 1,
        xpReward: 20,
        goldReward: 5
    },
    boar: {
        name: "Wild Boar",
        avatar: "🐗",
        level: 3,
        health: 60,
        maxHealth: 60,
        strength: 15,
        defense: 5,
        agility: 8,
        xpReward: 40,
        goldReward: 15
    },
    bandit: {
        name: "Bandit",
        avatar: "🗡️",
        level: 5,
        health: 80,
        maxHealth: 80,
        strength: 20,
        defense: 10,
        agility: 12,
        xpReward: 60,
        goldReward: 30
    },
    athenian_warrior: {
        name: "Athenian Warrior",
        avatar: "⚔️",
        level: 10,
        health: 120,
        maxHealth: 120,
        strength: 30,
        defense: 20,
        agility: 15,
        xpReward: 100,
        goldReward: 50
    },
    persian_soldier: {
        name: "Persian Soldier",
        avatar: "🏹",
        level: 15,
        health: 150,
        maxHealth: 150,
        strength: 35,
        defense: 25,
        agility: 18,
        xpReward: 150,
        goldReward: 75
    },
    champion: {
        name: "Enemy Champion",
        avatar: "👑",
        level: 20,
        health: 200,
        maxHealth: 200,
        strength: 45,
        defense: 30,
        agility: 20,
        xpReward: 250,
        goldReward: 150
    }
};

// Start training battle
function startTrainingBattle() {
    const enemy = deepClone(ENEMIES.training_dummy);
    initiateBattle(enemy);
}

// Start hunting battle
function startHuntingBattle() {
    const enemy = deepClone(ENEMIES.boar);
    initiateBattle(enemy);
}

// Start random battle
function startRandomBattle() {
    const enemyTypes = ['bandit', 'athenian_warrior', 'persian_soldier'];
    const randomType = getRandomElement(enemyTypes);
    const enemy = deepClone(ENEMIES[randomType]);
    
    // Scale enemy to player level
    const levelDiff = playerCharacter.level - enemy.level;
    if (levelDiff > 0) {
        enemy.level += levelDiff;
        enemy.maxHealth += levelDiff * 15;
        enemy.health = enemy.maxHealth;
        enemy.strength += levelDiff * 3;
        enemy.defense += levelDiff * 2;
        enemy.xpReward += levelDiff * 20;
        enemy.goldReward += levelDiff * 10;
    }
    
    initiateBattle(enemy);
}

// Initiate battle
function initiateBattle(enemy) {
    currentBattle = {
        enemy: enemy,
        turn: 1,
        playerHealth: playerCharacter.health,
        enemyHealth: enemy.health
    };
    
    battleLog = [];
    
    // Hide selection, show arena
    document.getElementById('battle-selection').classList.add('hidden');
    document.getElementById('battle-arena').classList.remove('hidden');
    
    renderBattleUI();
    addToBattleLog(`⚔️ Battle started against ${enemy.name}!`, 'system');
}

// Render battle UI
function renderBattleUI() {
    const arena = document.getElementById('battle-arena');
    
    const battleHTML = `
        <div class="battle-header">
            <h2>⚔️ Battle - Turn ${currentBattle.turn}</h2>
        </div>
        
        <div class="battle-combatants">
            <div class="combatant player">
                <div class="combatant-avatar">🛡️</div>
                <div class="combatant-name">${playerCharacter.username}</div>
                <div class="stat-bar-container">
                    <div class="stat-label">
                        <span>❤️ HP</span>
                        <span>${currentBattle.playerHealth}/${playerCharacter.maxHealth}</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-fill health" style="width: ${calculatePercentage(currentBattle.playerHealth, playerCharacter.maxHealth)}%"></div>
                    </div>
                </div>
                <div style="margin-top: 1rem; text-align: center;">
                    <div><strong>⚔️ Attack:</strong> ${getTotalAttack()}</div>
                    <div><strong>🛡️ Defense:</strong> ${getTotalArmor()}</div>
                </div>
            </div>
            
            <div class="vs-divider">VS</div>
            
            <div class="combatant enemy">
                <div class="combatant-avatar">${currentBattle.enemy.avatar}</div>
                <div class="combatant-name">${currentBattle.enemy.name}</div>
                <div class="stat-bar-container">
                    <div class="stat-label">
                        <span>❤️ HP</span>
                        <span>${currentBattle.enemyHealth}/${currentBattle.enemy.maxHealth}</span>
                    </div>
                    <div class="stat-bar">
                        <div class="stat-fill health" style="width: ${calculatePercentage(currentBattle.enemyHealth, currentBattle.enemy.maxHealth)}%"></div>
                    </div>
                </div>
                <div style="margin-top: 1rem; text-align: center;">
                    <div><strong>Level:</strong> ${currentBattle.enemy.level}</div>
                    <div><strong>⚔️ Attack:</strong> ${currentBattle.enemy.strength}</div>
                    <div><strong>🛡️ Defense:</strong> ${currentBattle.enemy.defense}</div>
                </div>
            </div>
        </div>
        
        <div class="battle-actions">
            <button class="btn btn-danger" onclick="battleAction('attack')">⚔️ Attack</button>
            <button class="btn btn-primary" onclick="battleAction('defend')">🛡️ Defend</button>
            <button class="btn btn-secondary" onclick="battleAction('item')">🧪 Use Item</button>
            <button class="btn btn-secondary" onclick="battleAction('flee')">🏃 Flee</button>
        </div>
        
        <div class="battle-log">
            <h3>Battle Log</h3>
            <div id="battle-log-entries"></div>
        </div>
    `;
    
    arena.innerHTML = battleHTML;
    renderBattleLog();
}

// Battle actions
async function battleAction(action) {
    if (!currentBattle) return;
    
    let playerDamageDealt = 0;
    let enemyDamageDealt = 0;
    
    switch (action) {
        case 'attack':
            // Player attacks
            const attackResult = calculateDamage(
                { strength: getTotalAttack() },
                { defense: currentBattle.enemy.defense, armor: 0 }
            );
            
            playerDamageDealt = attackResult.damage;
            currentBattle.enemyHealth = Math.max(0, currentBattle.enemyHealth - playerDamageDealt);
            
            if (attackResult.isCritical) {
                addToBattleLog(`💥 CRITICAL HIT! You deal ${playerDamageDealt} damage!`, 'critical');
                playSound('critical');
            } else {
                addToBattleLog(`⚔️ You attack for ${playerDamageDealt} damage!`, 'player-action');
                playSound('attack');
            }
            break;
            
        case 'defend':
            addToBattleLog(`🛡️ You brace for the enemy's attack!`, 'player-action');
            // Reduce incoming damage by 50% this turn
            currentBattle.defendBonus = 0.5;
            break;
            
        case 'item':
            // TODO: Implement item usage
            addToBattleLog(`🧪 No items available!`, 'system');
            return; // Don't process turn
            
        case 'flee':
            const fleeChance = 0.5;
            if (Math.random() < fleeChance) {
                addToBattleLog(`🏃 You successfully fled from battle!`, 'system');
                await sleep(2000);
                endBattle(false);
                return;
            } else {
                addToBattleLog(`🏃 Failed to flee!`, 'system');
            }
            break;
    }
    
    // Check if enemy is defeated
    if (currentBattle.enemyHealth <= 0) {
        addToBattleLog(`🎉 Victory! ${currentBattle.enemy.name} has been defeated!`, 'critical');
        playSound('victory');
        await sleep(2000);
        await endBattle(true);
        return;
    }
    
    // Enemy turn
    await sleep(1000);
    
    const enemyAttack = calculateDamage(
        { strength: currentBattle.enemy.strength },
        { defense: getTotalArmor(), armor: 0 }
    );
    
    enemyDamageDealt = enemyAttack.damage;
    
    // Apply defend bonus if active
    if (currentBattle.defendBonus) {
        enemyDamageDealt = Math.floor(enemyDamageDealt * currentBattle.defendBonus);
        currentBattle.defendBonus = null;
    }
    
    currentBattle.playerHealth = Math.max(0, currentBattle.playerHealth - enemyDamageDealt);
    
    if (enemyAttack.isCritical) {
        addToBattleLog(`💥 CRITICAL HIT! ${currentBattle.enemy.name} deals ${enemyDamageDealt} damage!`, 'critical');
    } else {
        addToBattleLog(`⚔️ ${currentBattle.enemy.name} attacks for ${enemyDamageDealt} damage!`, 'enemy-action');
    }
    
    // Check if player is defeated
    if (currentBattle.playerHealth <= 0) {
        addToBattleLog(`💀 You have been defeated...`, 'critical');
        playSound('defeat');
        await sleep(2000);
        await endBattle(false);
        return;
    }
    
    // Next turn
    currentBattle.turn++;
    renderBattleUI();
}

// Add to battle log
function addToBattleLog(message, type = '') {
    battleLog.push({ message, type });
    renderBattleLog();
}

// Render battle log
function renderBattleLog() {
    const logContainer = document.getElementById('battle-log-entries');
    if (!logContainer) return;
    
    const logHTML = battleLog.map(entry => 
        `<div class="battle-log-entry ${entry.type}">${entry.message}</div>`
    ).join('');
    
    logContainer.innerHTML = logHTML;
    logContainer.scrollTop = logContainer.scrollHeight;
}

// End battle
async function endBattle(victory) {
    if (victory) {
        // Award XP and gold
        await addExperience(currentBattle.enemy.xpReward);
        await addGold(currentBattle.enemy.goldReward);
        
        // Update battles won
        playerCharacter.battlesWon++;
        
        // Increase combat skill
        playerCharacter.skills.combat = Math.min(100, playerCharacter.skills.combat + getRandomInt(1, 3));
        
        await saveCharacter();
        
        showNotification(`🎉 Victory! +${currentBattle.enemy.xpReward} XP, +${currentBattle.enemy.goldReward} Gold`);
    } else {
        // Penalty for losing
        playerCharacter.health = Math.floor(playerCharacter.maxHealth * 0.3); // Restore to 30% HP
        await saveCharacter();
        
        showNotification(`💀 Defeated! You retreat to recover...`);
    }
    
    // Update player health to match battle
    playerCharacter.health = currentBattle.playerHealth;
    updateCharacterUI();
    
    // Reset battle
    currentBattle = null;
    battleLog = [];
    
    // Show selection again
    document.getElementById('battle-arena').classList.add('hidden');
    document.getElementById('battle-selection').classList.remove('hidden');
}

console.log("✅ Combat system loaded");
