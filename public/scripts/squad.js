// Squad Management System

let squadMembers = [];

// Load squad
function loadSquad() {
    if (playerCharacter.level < 5) return;
    
    updateSquadUI();
}

// Update squad UI
function updateSquadUI() {
    document.getElementById('current-squad-size').textContent = playerCharacter.squadSize;
    document.getElementById('max-squad-size').textContent = playerCharacter.maxSquadSize;
    
    const squadContainer = document.getElementById('squad-members');
    if (!squadContainer) return;
    
    squadContainer.innerHTML = '';
    
    if (playerCharacter.squadSize === 0) {
        squadContainer.innerHTML = '<p style="color: var(--text-gray); text-align: center; padding: 2rem;">No squad members yet. Recruit warriors to build your army!</p>';
        return;
    }
    
    // Generate squad members (simplified)
    for (let i = 0; i < playerCharacter.squadSize; i++) {
        const member = createSquadMember(i);
        const memberCard = document.createElement('div');
        memberCard.className = 'squad-member';
        
        memberCard.innerHTML = `
            <div class="squad-member-avatar">🛡️</div>
            <div class="squad-member-name">${member.name}</div>
            <div class="squad-member-stats">
                Level: ${member.level}<br>
                HP: ${member.health}
            </div>
        `;
        
        squadContainer.appendChild(memberCard);
    }
}

// Create squad member
function createSquadMember(index) {
    const greekNames = [
        'Leonidas', 'Dienekes', 'Brasidas', 'Lysander', 'Agesilaus',
        'Pausanias', 'Cleomenes', 'Agis', 'Archidamus', 'Pleistoanax',
        'Telamon', 'Ajax', 'Hector', 'Achilles', 'Odysseus'
    ];
    
    return {
        name: greekNames[index % greekNames.length] + ' ' + (Math.floor(index / greekNames.length) + 1),
        level: Math.max(1, playerCharacter.level - getRandomInt(1, 3)),
        health: 80 + getRandomInt(0, 20)
    };
}

// Recruit warrior
document.getElementById('recruit-btn')?.addEventListener('click', async () => {
    const cost = 50;
    
    if (playerCharacter.gold < cost) {
        showNotification('Not enough gold! Need 50 gold to recruit.');
        return;
    }
    
    if (playerCharacter.squadSize >= playerCharacter.maxSquadSize) {
        showNotification('Squad is full! Level up to increase max squad size.');
        return;
    }
    
    playerCharacter.gold -= cost;
    playerCharacter.squadSize++;
    
    showNotification('⚔️ New warrior recruited!');
    playSound('recruit');
    
    updateCharacterUI();
    updateSquadUI();
    
    // Update quest progress
    updateQuestProgress('recruit_squad', playerCharacter.squadSize);
    
    await saveCharacter();
});

console.log("✅ Squad system loaded");
