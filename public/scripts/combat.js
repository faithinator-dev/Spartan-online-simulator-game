// Combat System - Enhanced with Abilities and Stamina

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
        playerStamina: playerCharacter.stamina || 100,
        enemyHealth: enemy.health,
        effects: {
            player: { defenseBoost: 0, stun: 0 },
            enemy: { defenseBoost: 0, stun: 0 }
        }
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
    if (!arena) return;

    const battleHTML = `
        <div class="battle-header">
            <h2>⚔️ Turn ${currentBattle.turn}</h2>
        </div>
        
        <div class="battle-combatants">
            <!-- Player Side -->
            <div id="player-combatant" class="combatant player">
                <div class="character-avatar avatar-${playerCharacter.avatar || 'spartan_warrior'}" style="width: 100px; height: 100px;"></div>
                <div class="combatant-name">${playerCharacter.username}</div>
                
                <div class="stat-bars">
                    <div class="stat-bar-container">
                        <div class="stat-label"><span>❤️ HP</span><span>${currentBattle.playerHealth}/${playerCharacter.maxHealth}</span></div>
                        <div class="stat-bar"><div class="stat-fill health" style="width: ${calculatePercentage(currentBattle.playerHealth, playerCharacter.maxHealth)}%"></div></div>
                    </div>
                    <div class="stat-bar-container">
                        <div class="stat-label"><span>⚡ Stamina</span><span>${currentBattle.playerStamina}/100</span></div>
                        <div class="stat-bar"><div class="stat-fill" style="width: ${currentBattle.playerStamina}%; background: var(--success);"></div></div>
                    </div>
                </div>
            </div>
            
            <div class="vs-divider">VS</div>
            
            <!-- Enemy Side -->
            <div id="enemy-combatant" class="combatant enemy">
                <div class="combatant-avatar" style="font-size: 80px;">${currentBattle.enemy.avatar}</div>
                <div class="combatant-name">${currentBattle.enemy.name}</div>
                
                <div class="stat-bars">
                    <div class="stat-bar-container">
                        <div class="stat-label"><span>❤️ HP</span><span>${currentBattle.enemyHealth}/${currentBattle.enemy.maxHealth}</span></div>
                        <div class="stat-bar"><div class="stat-fill health" style="width: ${calculatePercentage(currentBattle.enemyHealth, currentBattle.enemy.maxHealth)}%"></div></div>
                    </div>
                </div>
                <div class="enemy-level">Level ${currentBattle.enemy.level}</div>
            </div>
        </div>
        
        <div class="battle-actions">
            <div class="action-group">
                <button class="btn btn-danger" onclick="battleAction('attack')">⚔️ Strike</button>
                <button class="btn btn-primary" onclick="battleAction('defend')">🛡️ Brace (Regen +10⚡)</button>
            </div>
            <div class="action-group" style="margin-top: 10px;">
                <button class="btn ${currentBattle.playerStamina >= 30 ? 'btn-warning' : 'btn-disabled'}" 
                    onclick="battleAction('skill_bash')" 
                    ${currentBattle.playerStamina < 30 ? 'disabled' : ''}>💥 Shield Bash (30⚡)</button>
                <button class="btn ${currentBattle.playerStamina >= 50 ? 'btn-warning' : 'btn-disabled'}" 
                    onclick="battleAction('skill_phalanx')"
                    ${currentBattle.playerStamina < 50 ? 'disabled' : ''}>🛡️ Phalanx (50⚡)</button>
            </div>
            <div class="action-group" style="margin-top: 10px;">
                <button class="btn btn-secondary" onclick="battleAction('flee')">🏃 Retreat</button>
            </div>
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
    if (!currentBattle || currentBattle.isProcessing) return;
    currentBattle.isProcessing = true;

    const playerEl = document.getElementById('player-combatant');
    const enemyEl = document.getElementById('enemy-combatant');
    
    // Player Turn
    let playerActionTaken = false;
    
    switch (action) {
        case 'attack':
            const attackResult = calculateDamage(
                { strength: getTotalAttack() },
                { defense: currentBattle.enemy.defense }
            );
            applyDamageToEnemy(attackResult.damage, attackResult.isCritical);
            playerActionTaken = true;
            break;
            
        case 'defend':
            currentBattle.effects.player.defenseBoost = 2.0; // Double defense
            currentBattle.playerStamina = Math.min(100, currentBattle.playerStamina + 10);
            addToBattleLog(`🛡️ You brace for impact and catch your breath! (+10⚡)`, 'player-action');
            playerActionTaken = true;
            break;

        case 'skill_bash':
            if (currentBattle.playerStamina >= 30) {
                currentBattle.playerStamina -= 30;
                const bashDamage = Math.floor(getTotalAttack() * 0.7);
                currentBattle.effects.enemy.stun = 1;
                applyDamageToEnemy(bashDamage, false);
                addToBattleLog(`💥 SHIELD BASH! Enemy is stunned! (-30⚡)`, 'critical');
                playerActionTaken = true;
            }
            break;

        case 'skill_phalanx':
            if (currentBattle.playerStamina >= 50) {
                currentBattle.playerStamina -= 50;
                currentBattle.effects.player.defenseBoost = 5.0; // Massive defense
                addToBattleLog(`🛡️ PHALANX FORMATION! Your defense is impenetrable! (-50⚡)`, 'critical');
                playerActionTaken = true;
            }
            break;
            
        case 'flee':
            if (Math.random() < 0.4) {
                addToBattleLog(`🏃 You successfully fled!`, 'system');
                await sleep(1500);
                endBattle(false);
                return;
            } else {
                addToBattleLog(`🏃 Failed to flee!`, 'enemy-action');
                playerActionTaken = true;
            }
            break;
    }

    if (playerActionTaken) {
        renderBattleUI();
        if (currentBattle.enemyHealth <= 0) {
            addToBattleLog(`🎉 Victory! ${currentBattle.enemy.name} has been defeated!`, 'critical');
            await sleep(1500);
            await endBattle(true);
            return;
        }

        await sleep(1000);

        // Enemy Turn
        if (currentBattle.effects.enemy.stun > 0) {
            addToBattleLog(`🌀 ${currentBattle.enemy.name} is stunned and skips their turn!`, 'system');
            currentBattle.effects.enemy.stun--;
        } else {
            const enemyAttack = calculateDamage(
                { strength: currentBattle.enemy.strength },
                { defense: getTotalArmor() * (currentBattle.effects.player.defenseBoost || 1) }
            );
            
            currentBattle.playerHealth = Math.max(0, currentBattle.playerHealth - enemyAttack.damage);
            playerEl.classList.add('hit-shake');
            
            if (enemyAttack.isCritical) {
                addToBattleLog(`💥 CRITICAL! ${currentBattle.enemy.name} deals ${enemyAttack.damage} damage!`, 'critical');
            } else {
                addToBattleLog(`⚔️ ${currentBattle.enemy.name} strikes for ${enemyAttack.damage} damage!`, 'enemy-action');
            }
            
            setTimeout(() => playerEl.classList.remove('hit-shake'), 200);
        }

        // Reset turn boosts
        currentBattle.effects.player.defenseBoost = 0;
        
        // Stamina Regen
        currentBattle.playerStamina = Math.min(100, currentBattle.playerStamina + 5);
        
        if (currentBattle.playerHealth <= 0) {
            addToBattleLog(`💀 You have been defeated...`, 'critical');
            await sleep(1500);
            await endBattle(false);
            return;
        }

        currentBattle.turn++;
        currentBattle.isProcessing = false;
        renderBattleUI();
    }
}

function applyDamageToEnemy(damage, isCritical) {
    const enemyEl = document.getElementById('enemy-combatant');
    currentBattle.enemyHealth = Math.max(0, currentBattle.enemyHealth - damage);
    
    if (enemyEl) {
        enemyEl.classList.add('hit-shake');
        if (isCritical) enemyEl.classList.add('crit-flash');
        
        setTimeout(() => {
            enemyEl.classList.remove('hit-shake');
            enemyEl.classList.remove('crit-flash');
        }, 300);
    }

    if (isCritical) {
        addToBattleLog(`💥 CRITICAL HIT! You deal ${damage} damage!`, 'critical');
        playSound('critical');
    } else {
        addToBattleLog(`⚔️ You deal ${damage} damage!`, 'player-action');
        playSound('attack');
    }
}

// Log and End functions...
function addToBattleLog(message, type = '') {
    battleLog.push({ message, type });
    renderBattleLog();
}

function renderBattleLog() {
    const logContainer = document.getElementById('battle-log-entries');
    if (!logContainer) return;
    
    const logHTML = battleLog.map(entry => 
        `<div class="battle-log-entry ${entry.type}">${entry.message}</div>`
    ).join('');
    
    logContainer.innerHTML = logHTML;
    logContainer.scrollTop = logContainer.scrollHeight;
}

async function endBattle(victory) {
    playerCharacter.health = currentBattle.playerHealth;
    playerCharacter.stamina = currentBattle.playerStamina;
    
    if (victory) {
        await addExperience(currentBattle.enemy.xpReward);
        await addGold(currentBattle.enemy.goldReward);
        playerCharacter.battlesWon++;
        playerCharacter.skills.combat = Math.min(100, playerCharacter.skills.combat + getRandomInt(1, 3));
        showNotification(`🎉 Victory! +${currentBattle.enemy.xpReward} XP, +${currentBattle.enemy.goldReward} Gold`);
    } else {
        playerCharacter.health = Math.floor(playerCharacter.maxHealth * 0.3);
        showNotification(`💀 Defeated! You retreat to recover...`);
    }
    
    await saveCharacter();
    updateCharacterUI();
    
    currentBattle = null;
    battleLog = [];
    
    document.getElementById('battle-arena').classList.add('hidden');
    document.getElementById('battle-selection').classList.remove('hidden');
}

console.log("✅ Combat system loaded");
