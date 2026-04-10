// Quest System

const QUESTS = {
    agoge_start: {
        id: 'agoge_start',
        title: '🛡️ The Agoge Begins',
        description: 'Every Spartan must endure the Agoge. Report to the Barracks and complete your first combat drill to prove you are not just another mouth to feed.',
        difficulty: 'easy',
        requirements: { level: 1 },
        objectives: {
            type: 'train_location',
            target: 'barracks',
            count: 1
        },
        rewards: {
            xp: 60,
            gold: 15,
            skills: { combat: 3 }
        },
        repeatable: false
    },
    garden_survival: {
        id: 'garden_survival',
        title: '🌿 Lessons of the Earth',
        description: 'A warrior who cannot survive in the wild is useless to the King. Go to the Great Garden and train your survival instincts among the thorns.',
        difficulty: 'easy',
        requirements: { level: 1 },
        objectives: {
            type: 'train_location',
            target: 'garden',
            count: 1
        },
        rewards: {
            xp: 60,
            gold: 10,
            skills: { survival: 5 }
        },
        repeatable: false
    },
    blood_and_dust: {
        id: 'blood_and_dust',
        title: '⚔️ Blood and Dust',
        description: 'The training dummies do not bleed, but they still teach. Defeat three opponents in the Training Grounds to show your progress.',
        difficulty: 'easy',
        requirements: { level: 2 },
        objectives: {
            type: 'win_battles',
            target: 'training_dummy',
            count: 3
        },
        rewards: {
            xp: 120,
            gold: 40,
            skills: { combat: 8 }
        },
        repeatable: true
    },
    mountain_boar: {
        id: 'mountain_boar',
        title: '🐗 The Mountain Terror',
        description: 'A massive boar has been sighted near the northern passes. Its tusks are like spear-points. Bring its head back to the barracks.',
        difficulty: 'medium',
        requirements: { level: 4, skills: { hunting: 8 } },
        objectives: {
            type: 'win_battles',
            target: 'boar',
            count: 1
        },
        rewards: {
            xp: 250,
            gold: 100,
            skills: { hunting: 12, survival: 5 }
        },
        repeatable: false
    },
    spartan_leadership: {
        id: 'spartan_leadership',
        title: '👑 Voice of Command',
        description: 'A Spartan does not just fight; he leads. Study the elders in the Agora until you understand the weight of the crown.',
        difficulty: 'medium',
        requirements: { level: 8 },
        objectives: {
            type: 'train_location',
            target: 'agora',
            count: 3
        },
        rewards: {
            xp: 400,
            gold: 50,
            skills: { leadership: 20, tactics: 10 }
        },
        repeatable: false
    }
};

let activeQuests = [];
let completedQuests = [];

// Load quests
function loadQuests() {
    renderQuestsList('available');
}

// Render quests list
function renderQuestsList(category) {
    const questsList = document.getElementById('quests-list');
    if (!questsList) return;
    
    questsList.innerHTML = '';
    
    let questsToShow = [];
    
    switch (category) {
        case 'available':
            questsToShow = Object.values(QUESTS).filter(quest => {
                const meetsRequirements = checkQuestRequirements(quest);
                const notCompleted = !completedQuests.includes(quest.id) || quest.repeatable;
                const notActive = !activeQuests.some(q => q.id === quest.id);
                return meetsRequirements && notCompleted && notActive;
            });
            break;
        case 'active':
            questsToShow = activeQuests;
            break;
        case 'completed':
            questsToShow = Object.values(QUESTS).filter(quest => 
                completedQuests.includes(quest.id)
            );
            break;
    }
    
    if (questsToShow.length === 0) {
        questsList.innerHTML = '<p style="color: var(--text-gray); text-align: center; padding: 2rem;">No quests in this category</p>';
        return;
    }
    
    questsToShow.forEach(quest => {
        const questCard = createQuestCard(quest, category);
        questsList.appendChild(questCard);
    });
}

// Create quest card
function createQuestCard(quest, category) {
    const card = document.createElement('div');
    card.className = 'quest-item';
    
    const reqText = [];
    if (quest.requirements.level) reqText.push(`Level ${quest.requirements.level}`);
    if (quest.requirements.skills) {
        Object.entries(quest.requirements.skills).forEach(([skill, value]) => {
            reqText.push(`${skill.charAt(0).toUpperCase() + skill.slice(1)} ${value}`);
        });
    }
    
    const rewardText = [];
    if (quest.rewards.xp) rewardText.push(`${quest.rewards.xp} XP`);
    if (quest.rewards.gold) rewardText.push(`${quest.rewards.gold} Gold`);
    if (quest.rewards.reputation) rewardText.push(`${quest.rewards.reputation} Rep`);
    
    let actionButton = '';
    if (category === 'available') {
        actionButton = `<button class="btn btn-primary" onclick="acceptQuest('${quest.id}')">Accept Quest</button>`;
    } else if (category === 'active') {
        const progress = getQuestProgress(quest);
        actionButton = `
            <div style="margin-bottom: 1rem;">
                <strong>Progress:</strong> ${progress.current}/${progress.total}
            </div>
            <button class="btn btn-secondary" onclick="abandonQuest('${quest.id}')">Abandon</button>
        `;
    }
    
    card.innerHTML = `
        <div class="quest-header">
            <div class="quest-title">${quest.title}</div>
            <div class="quest-difficulty ${quest.difficulty}">${quest.difficulty.toUpperCase()}</div>
        </div>
        <div class="quest-description">${quest.description}</div>
        <div class="quest-requirements">
            <h4>Requirements:</h4>
            <ul>
                ${reqText.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        <div class="quest-rewards">
            ${rewardText.map(reward => `<div class="reward-badge">${reward}</div>`).join('')}
        </div>
        ${actionButton}
    `;
    
    return card;
}

// Check quest requirements
function checkQuestRequirements(quest) {
    if (quest.requirements.level && playerCharacter.level < quest.requirements.level) {
        return false;
    }
    
    if (quest.requirements.skills) {
        for (const [skill, value] of Object.entries(quest.requirements.skills)) {
            if (playerCharacter.skills[skill] < value) {
                return false;
            }
        }
    }
    
    return true;
}

// Accept quest
function acceptQuest(questId) {
    const quest = QUESTS[questId];
    if (!quest) return;
    
    if (!checkQuestRequirements(quest)) {
        showNotification('You don\'t meet the requirements for this quest!');
        return;
    }
    
    activeQuests.push({ ...quest, progress: 0 });
    showNotification(`Quest accepted: ${quest.title}`);
    
    saveQuestProgress();
    renderQuestsList('active');
}

// Abandon quest
function abandonQuest(questId) {
    activeQuests = activeQuests.filter(q => q.id !== questId);
    showNotification('Quest abandoned');
    
    saveQuestProgress();
    renderQuestsList('active');
}

// Get quest progress
function getQuestProgress(quest) {
    const activeQuest = activeQuests.find(q => q.id === quest.id);
    if (!activeQuest) return { current: 0, total: 0 };
    
    let total = 0;
    switch (quest.objectives.type) {
        case 'win_battles':
            total = quest.objectives.count;
            break;
        case 'reach_level':
            total = quest.objectives.level;
            break;
        case 'recruit_squad':
            total = quest.objectives.count;
            break;
        case 'conquer_territory':
            total = quest.objectives.count;
            break;
        case 'train_location':
            total = quest.objectives.count;
            break;
    }
    
    return {
        current: activeQuest.progress || 0,
        total: total
    };
}

// Update quest progress (called from other systems)
function updateQuestProgress(type, value) {
    activeQuests.forEach(quest => {
        if (quest.objectives.type === type) {
            if (type === 'reach_level') {
                quest.progress = playerCharacter.level;
            } else if (type === 'win_battles') {
                if (!quest.objectives.target || quest.objectives.target === value) {
                    quest.progress = (quest.progress || 0) + 1;
                }
            } else if (type === 'recruit_squad') {
                quest.progress = playerCharacter.squadSize;
            } else if (type === 'conquer_territory') {
                quest.progress = playerCharacter.territoriesConquered;
            } else if (type === 'train_location') {
                if (quest.objectives.target === value) {
                    quest.progress = (quest.progress || 0) + 1;
                }
            }
            
            // Check if quest completed
            const progress = getQuestProgress(quest);
            if (progress.current >= progress.total) {
                // Delay completion slightly for UI feel
                setTimeout(() => completeQuest(quest.id), 500);
            }
        }
    });
    
    saveQuestProgress();
}

// Complete quest
async function completeQuest(questId) {
    const questIndex = activeQuests.findIndex(q => q.id === questId);
    if (questIndex === -1) return;
    
    const quest = activeQuests[questIndex];
    
    // Award rewards
    if (quest.rewards.xp) await addExperience(quest.rewards.xp);
    if (quest.rewards.gold) await addGold(quest.rewards.gold);
    if (quest.rewards.reputation) {
        playerCharacter.reputation += quest.rewards.reputation;
    }
    if (quest.rewards.skills) {
        Object.entries(quest.rewards.skills).forEach(([skill, value]) => {
            playerCharacter.skills[skill] = Math.min(100, playerCharacter.skills[skill] + value);
        });
    }
    
    // Remove from active
    activeQuests.splice(questIndex, 1);
    
    // Add to completed
    if (!quest.repeatable) {
        completedQuests.push(questId);
    }
    
    showNotification(`✅ Quest Complete: ${quest.title}!`, 5000);
    playSound('quest-complete');
    
    await saveCharacter();
    saveQuestProgress();
    
    renderQuestsList('active');
}

// Save quest progress
function saveQuestProgress() {
    saveToLocal('activeQuests', activeQuests);
    saveToLocal('completedQuests', completedQuests);
}

// Load quest progress
function loadQuestProgress() {
    activeQuests = loadFromLocal('activeQuests') || [];
    completedQuests = loadFromLocal('completedQuests') || [];
}

// Quest tab switching
document.querySelectorAll('.quest-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.tab;
        
        document.querySelectorAll('.quest-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        renderQuestsList(category);
    });
});

console.log("✅ Quest system loaded");
