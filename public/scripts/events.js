// Narrative Event System - The "Dilemma" Engine

const DILEMMAS = {
    agoge_training: [
        {
            id: "the_stolen_fox",
            title: "🦊 The Stolen Fox",
            text: "You have stolen a young fox from the wild to prove your stealth. A patrol is approaching. If they find the fox under your tunic, you will be beaten for being caught, not for stealing.",
            choices: [
                {
                    text: "Hold it tight and stay silent (Let it bite you)",
                    result: "You endure the pain as the fox claws at your stomach. The patrol passes. You are praised for your silence.",
                    stats: { health: -15, reputation: 20, skills: { stealth: 5 } }
                },
                {
                    text: "Release the fox and hide",
                    result: "The fox runs away. You aren't caught, but you have no trophy to show.",
                    stats: { reputation: -5, skills: { stealth: 2 } }
                }
            ],
            requirements: { level_max: 5 }
        }
    ],
    battlefield: [
        {
            id: "the_fallen_comrade",
            title: "🛡️ The Fallen Comrade",
            text: "The line is breaking. A friend from your mess-hall has fallen. His shield is lost. To stop and help him is to risk the entire phalanx.",
            choices: [
                {
                    text: "Hold the line. Focus on the enemy.",
                    result: "The phalanx holds. Your friend survives, but he looks at you with cold eyes.",
                    stats: { tactics: 10, reputation: 10, squad_loyalty: -15 }
                },
                {
                    text: "Break rank to drag him to safety.",
                    result: "The enemy almost breaches the gap, but your friend is safe. The Sergeant is furious.",
                    stats: { health: -10, reputation: -20, squad_loyalty: 30 }
                }
            ],
            requirements: { level_min: 5 }
        }
    ],
    political: [
        {
            id: "the_ephor_demand",
            title: "🏛️ The Ephor's Demand",
            text: "An Elder Ephor demands you give up a portion of your newly conquered land to the Temple of Artemis.",
            choices: [
                {
                    text: "Agree to the donation.",
                    result: "The gods—and the Ephors—are pleased. Your gold income drops, but your influence grows.",
                    stats: { gold: -100, reputation: 50, favor_elders: 20 }
                },
                {
                    text: "Refuse. The land belongs to your men.",
                    result: "The Ephors mark you as a 'New King' with dangerous ambition. Your men would die for you.",
                    stats: { reputation: -30, favor_elders: -20, squad_loyalty: 40 }
                }
            ],
            requirements: { territories_min: 1 }
        }
    ]
};

let eventLog = [];

function triggerRandomEvent(category = 'agoge_training') {
    const possible = DILEMMAS[category].filter(e => {
        if (e.requirements.level_min && playerCharacter.level < e.requirements.level_min) return false;
        if (e.requirements.level_max && playerCharacter.level > e.requirements.level_max) return false;
        if (e.requirements.territories_min && playerCharacter.territoriesConquered < e.requirements.territories_min) return false;
        return true;
    });

    if (possible.length === 0) return null;
    
    const event = possible[Math.floor(Math.random() * possible.length)];
    showEventModal(event);
}

function showEventModal(event) {
    // Create modal if doesn't exist
    let modal = document.getElementById('event-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'event-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content narrative-box" style="border: 3px solid var(--gold); background: #1a1a2e; padding: 30px; max-width: 500px; margin: 100px auto; animation: slideIn 0.5s ease;">
            <h2 style="color: var(--gold); margin-bottom: 15px;">${event.title}</h2>
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px;">${event.text}</p>
            <div class="event-choices" style="display: flex; flex-direction: column; gap: 10px;">
                ${event.choices.map((c, i) => `
                    <button class="btn btn-secondary choice-btn" onclick="makeChoice('${event.id}', ${i})">${c.text}</button>
                `).join('')}
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

async function makeChoice(eventId, choiceIndex) {
    const category = Object.keys(DILEMMAS).find(cat => DILEMMAS[category].find(e => e.id === eventId)); // Simple search
    // Manual search for now
    let event = null;
    for (const cat in DILEMMAS) {
        event = DILEMMAS[cat].find(e => e.id === eventId);
        if (event) break;
    }

    const choice = event.choices[choiceIndex];
    
    // Apply stats
    if (choice.stats) {
        if (choice.stats.health) playerCharacter.health = Math.max(0, playerCharacter.health + choice.stats.health);
        if (choice.stats.gold) playerCharacter.gold = Math.max(0, playerCharacter.gold + choice.stats.gold);
        if (choice.stats.reputation) playerCharacter.reputation += choice.stats.reputation;
        
        if (choice.stats.skills) {
            for (const s in choice.stats.skills) {
                playerCharacter.skills[s] = Math.min(100, (playerCharacter.skills[s] || 0) + choice.stats.skills[s]);
            }
        }
    }

    // Add to Chronicle
    addToChronicle(event.title, choice.result);

    // Hide modal
    document.getElementById('event-modal').style.display = 'none';
    
    await saveCharacter();
    updateCharacterUI();
    
    alert(choice.result);
}

function addToChronicle(title, result) {
    const entry = {
        year: playerCharacter.year,
        title: title,
        result: result,
        timestamp: Date.now()
    };
    
    if (!playerCharacter.chronicle) playerCharacter.chronicle = [];
    playerCharacter.chronicle.unshift(entry);
    renderChronicle();
}

function renderChronicle() {
    const container = document.getElementById('chronicle-feed');
    if (!container || !playerCharacter.chronicle) return;
    
    container.innerHTML = playerCharacter.chronicle.map(entry => `
        <div class="chronicle-entry" style="border-left: 2px solid var(--gold); padding-left: 15px; margin-bottom: 20px;">
            <div style="color: var(--gold); font-weight: bold; font-size: 0.8rem;">${entry.year} BC</div>
            <div style="font-weight: bold; margin: 5px 0;">${entry.title}</div>
            <div style="color: #ccc; font-style: italic;">"${entry.result}"</div>
        </div>
    `).join('');
}

console.log("✅ Narrative Engine loaded");
