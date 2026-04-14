// The Great Scroll - Epic Narrative Engine
// Designed for 10+ hours of gameplay using a mix of Milestone Chapters and Procedural Life Events

// Track where the player is in their life
let currentPhase = "agoge_child"; 
let monthsInPhase = 0;

const PHASES = {
    agoge_child: { title: "The Agoge: Childhood", minAge: 7, maxAge: 12, next: "agoge_youth" },
    agoge_youth: { title: "The Agoge: Youth", minAge: 13, maxAge: 17, next: "krypteia" },
    krypteia: { title: "The Krypteia (Secret Police)", minAge: 18, maxAge: 19, next: "hoplite_rookie" },
    hoplite_rookie: { title: "Hoplite: The Vanguard", minAge: 20, maxAge: 24, next: "hoplite_veteran" },
    hoplite_veteran: { title: "Hoplite: Veteran", minAge: 25, maxAge: 29, next: "spartiote" },
    spartiote: { title: "Spartiote: Full Citizen", minAge: 30, maxAge: 60, next: "gerousia" }
};

// MAJOR MILESTONES (Triggered at specific ages or conditions)
const MILESTONE_NODES = {
    start: {
        title: "Chapter I: Blood and Dust (Age 7)",
        text: "You are seven years old. Today, you are taken from your mother's arms and given to the State. You stand shivering in the Taygetos Mountains. The Paidonomos approaches with a whip. 'Your life is no longer your own,' he barks. 'You belong to Sparta.'",
        choices: [
            { text: "Accept your fate in silence.", next: "procedural", stats: { defense: 2, strength: 1 } },
            { text: "Cry for your mother.", next: "agoge_punishment", stats: { health: -10, agility: 2 } },
            { text: "Glare at the Paidonomos.", next: "agoge_defiance", stats: { reputation: 5, health: -15, strength: 3 } }
        ]
    },
    agoge_punishment: {
        title: "The First Lesson",
        text: "The whip cracks. Pain explodes across your back. 'Tears are for the weak!' the master roars. You quickly learn to hide your emotions.",
        choices: [{ text: "Endure.", next: "procedural", stats: { defense: 3, stealth: 2 } }]
    },
    agoge_defiance: {
        title: "Broken but Unbowed",
        text: "He beats you until you cannot stand, but you never break eye contact. The older boys whisper about your resilience.",
        choices: [{ text: "Rise to your feet.", next: "procedural", stats: { reputation: 10, leadership: 2 } }]
    },
    milestone_age_13: {
        title: "Chapter II: The Rites of Artemis (Age 13)",
        text: "You have survived to thirteen. Today is the contest of endurance at the altar of Artemis Orthia. You must steal cheese from the altar while being whipped by the older boys.",
        choices: [
            { text: "Rely on speed to dodge the whips.", next: "procedural", stats: { agility: 10, stealth: 5 } },
            { text: "Charge straight through, ignoring the pain.", next: "procedural", stats: { strength: 10, health: -30, reputation: 20 } },
            { text: "Work with a friend to distract them.", next: "procedural", stats: { tactics: 10, leadership: 5 } }
        ]
    },
    milestone_age_18: {
        title: "Chapter III: The Krypteia (Age 18)",
        text: "You are eighteen. You are given only a knife and sent into the wilderness. You are now part of the Krypteia. Your mission: survive, stay unseen, and eliminate any Helots who show signs of rebellion.",
        choices: [
            { text: "Embrace the shadows.", next: "procedural", equip: { slot: 'weapon', item: { name: "Iron Dagger", damage: 12, sprite: "sprite-dagger" } }, stats: { stealth: 20, hunting: 15 } }
        ]
    },
    milestone_age_20: {
        title: "Chapter IV: The Crimson Tunic (Age 20)",
        text: "You have passed the Agoge and the Krypteia. You are officially a Hoplite of the Spartan army. You are given your crimson tunic and a heavy bronze shield.",
        choices: [
            { text: "Join your Phalanx.", next: "procedural", 
              equip: { slot: 'body', item: { name: "Crimson Tunic", armor: 8, sprite: "sprite-body" } },
              equip_extra: { slot: 'shield', item: { name: "Bronze Hoplon", armor: 15, sprite: "sprite-shield" } },
              stats: { combat: 20, tactics: 10 } 
            }
        ]
    }
};

// PROCEDURAL EVENTS (Randomly selected based on phase to create infinite, varied gameplay)
const PROCEDURAL_EVENTS = {
    agoge_child: [
        {
            title: "Winter Training",
            text: "It is the dead of winter. You are given only one thin cloak for the year. You are freezing.",
            choices: [
                { text: "Steal a blanket from a sleeping boy.", stats: { stealth: 3, reputation: -2 }, result: "You sleep warmly, but you must constantly watch your back." },
                { text: "Sleep in the reeds and endure the frost.", stats: { survival: 5, health: -5 }, result: "You shiver through the night, but your body hardens against the cold." }
            ]
        },
        {
            title: "Ration Shortage",
            text: "Food is kept intentionally scarce to encourage cunning. You are starving.",
            choices: [
                { text: "Hunt a wild dog in the hills.", stats: { hunting: 5, agility: 2 }, result: "You catch the dog and feast in secret." },
                { text: "Steal from the market.", stats: { stealth: 5, gold: 5 }, result: "You snatch some olives and a few coins." },
                { text: "Fast and meditate.", stats: { defense: 2, tactics: 2 }, result: "You train your mind to ignore the hunger." }
            ]
        }
    ],
    agoge_youth: [
        {
            title: "The Pankration",
            text: "Today is a brutal wrestling tournament. There are no rules except 'no biting' and 'no eye-gouging'. Your opponent is massive.",
            choices: [
                { text: "Use pure strength.", stats: { strength: 5, health: -10 }, result: "You overpower him, but take heavy blows to the ribs." },
                { text: "Use agility to exhaust him.", stats: { agility: 5, stamina: -15 }, result: "You dance around him until he collapses, then strike." },
                { text: "Fight dirty.", stats: { combat: 5, reputation: -5 }, result: "You break his finger. You win, but the elders frown upon it." }
            ]
        },
        {
            title: "Weapon Drills",
            text: "You are given blunt wooden spears for phalanx drills. The formation is sloppy.",
            choices: [
                { text: "Shout commands to organize the line.", stats: { leadership: 5, tactics: 3 }, result: "The boys listen. The line holds. The master nods." },
                { text: "Focus only on your own form.", stats: { combat: 5 }, result: "Your form is perfect, but the line breaks." }
            ]
        }
    ],
    krypteia: [
        {
            title: "Night Patrol",
            text: "You are stalking through the Helot farming villages at night. You hear a group of men gathering in a barn.",
            choices: [
                { text: "Eavesdrop from the roof.", stats: { stealth: 5, tactics: 2 }, result: "You learn of a minor plot and report it." },
                { text: "Ambush them to assert dominance.", stats: { combat: 5, reputation: 5, health: -10 }, result: "You strike fear into their hearts, but sustain a knife wound." },
                { text: "Ignore it. Let the gods sort them out.", stats: { survival: 2 }, result: "You move on into the cold night." }
            ]
        }
    ],
    hoplite_rookie: [
        {
            title: "Border Skirmish",
            text: "Arcadian raiders have crossed the border. The horns blow. You are marching to actual war for the first time.",
            choices: [
                { text: "Lock shields and advance.", stats: { defense: 8, tactics: 5 }, result: "The Spartan wall is impenetrable. The raiders break." },
                { text: "Break rank to chase a fleeing enemy.", stats: { strength: 5, hunting: 5, reputation: -10 }, result: "You run him down, but your commander berates your lack of discipline." }
            ]
        },
        {
            title: "The Mess Hall (Syssitia)",
            text: "You must contribute to the communal meals. What will you bring today?",
            choices: [
                { text: "Hunt a wild boar.", stats: { hunting: 5, reputation: 5 }, result: "The men cheer as you bring in fresh meat." },
                { text: "Buy fine wine from the market.", stats: { gold: -20, leadership: 5 }, result: "The wine flows, and bonds of brotherhood are forged." }
            ]
        }
    ],
    hoplite_veteran: [
        {
            title: "The Persian Threat",
            text: "Scouts report a massive Persian army landing on the coast. The King calls for volunteers for a vanguard force.",
            choices: [
                { text: "Step forward immediately.", stats: { reputation: 20, leadership: 10 }, result: "Your bravery inspires the younger men. You will march to glory." },
                { text: "Wait for orders.", stats: { tactics: 5 }, result: "You stand resolute, ready to do your duty when commanded." }
            ]
        },
        {
            title: "Upgrading your Arsenal",
            text: "A master smith from Corinth has arrived, offering finely crafted weapons.",
            choices: [
                { text: "Commission a Xiphos (Short Sword). (50 Gold)", stats: { gold: -50 }, equip: { slot: 'weapon', item: { name: "Corinthian Xiphos", damage: 25, sprite: "sprite-sword" } }, result: "The blade is perfectly balanced." },
                { text: "Commission a Dory (Spear). (40 Gold)", stats: { gold: -40 }, equip: { slot: 'weapon', item: { name: "Ash-wood Dory", damage: 20, sprite: "sprite-spear" } }, result: "The spear gives you excellent reach." },
                { text: "Keep your current weapons.", stats: {}, result: "A Spartan relies on his arm, not his steel." }
            ]
        }
    ],
    spartiote: [
        {
            title: "The Assembly (Apella)",
            text: "You are now a full citizen with voting rights. A debate rages about declaring war on Athens.",
            choices: [
                { text: "Vote for War.", stats: { combat: 5, reputation: 10 }, result: "You clash your shield in approval. War is coming." },
                { text: "Vote for Peace and preparation.", stats: { tactics: 10, leadership: 5 }, result: "You urge caution, gaining the respect of the elders." }
            ]
        },
        {
            title: "Owning an Estate",
            text: "As a Spartiote, you have been granted a kleros (estate) and Helots to work it.",
            choices: [
                { text: "Manage them harshly.", stats: { gold: 30, reputation: 5 }, result: "Production is high, but tensions are rising." },
                { text: "Manage them fairly.", stats: { gold: 15, leadership: 10 }, result: "The yield is lower, but the estate is peaceful." }
            ]
        }
    ]
};

// ENGINE LOGIC

async function renderStoryNode(nodeId, isProcedural = false, proceduralEvent = null) {
    let node;
    
    if (isProcedural && proceduralEvent) {
        node = proceduralEvent;
    } else {
        node = MILESTONE_NODES[nodeId];
    }

    if (!node) return;

    // Update UI
    document.getElementById('chapter-title').textContent = node.title;
    document.getElementById('story-text').innerHTML = node.text;
    document.getElementById('story-year').textContent = `${playerCharacter.year} BC - ${playerCharacter.age} Years Old (Phase: ${PHASES[currentPhase].title})`;

    const choicesContainer = document.getElementById('story-choices');
    choicesContainer.innerHTML = '';

    node.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = "btn choice-btn";
        btn.style.cssText = "background: #8b4513; color: #fdf5e6; border: 2px solid #5d2e0c; text-align: left; padding: 15px 20px; font-family: 'Georgia', serif; font-size: 1.1rem; transition: all 0.2s; margin-bottom: 10px;";
        btn.innerHTML = choice.text;
        
        btn.onmouseover = () => {
            btn.style.background = "#5d2e0c";
            btn.style.transform = "translateX(10px)";
        };
        btn.onmouseout = () => {
            btn.style.background = "#8b4513";
            btn.style.transform = "translateX(0)";
        };
        
        btn.onclick = () => handleStoryChoice(choice, isProcedural);
        choicesContainer.appendChild(btn);
    });

    // Only save milestone nodes as resume points
    if (!isProcedural) {
        playerCharacter.currentStoryNode = nodeId;
        await saveCharacter();
    }
}

async function handleStoryChoice(choice, wasProcedural) {
    // Apply Stats
    if (choice.stats) {
        for (const s in choice.stats) {
            if (playerCharacter.skills && playerCharacter.skills[s] !== undefined) {
                playerCharacter.skills[s] = Math.min(100, playerCharacter.skills[s] + choice.stats[s]);
            } else if (playerCharacter[s] !== undefined) {
                playerCharacter[s] += choice.stats[s];
                if(s === 'health') playerCharacter.health = Math.min(playerCharacter.maxHealth, playerCharacter.health);
            }
        }
    }

    // Equip Items
    if (choice.equip) {
        playerCharacter.equipment[choice.equip.slot] = choice.equip.item;
        showNotification(`🗡️ Equipped: ${choice.equip.item.name}`);
    }
    if (choice.equip_extra) {
        playerCharacter.equipment[choice.equip_extra.slot] = choice.equip_extra.item;
    }

    // Add to Chronicle
    if (choice.result) {
        addToChronicle("Life Event", choice.result);
        showNotification(choice.result);
    }

    // Always progress time by 1-3 months for an action
    const monthsPassed = getRandomInt(1, 3);
    monthsInPhase += monthsPassed;
    await progressTime(monthsPassed * 30); // Approximate days

    // Determine the character's phase based on Age
    updatePhase();

    updateCharacterUI();
    
    // Determine what to show next
    if (choice.next && choice.next !== "procedural") {
        renderStoryNode(choice.next);
    } else {
        generateNextProceduralStep();
    }
}

function updatePhase() {
    const age = playerCharacter.age;
    for (const key in PHASES) {
        if (age >= PHASES[key].minAge && age <= PHASES[key].maxAge) {
            currentPhase = key;
            break;
        }
    }
}

function generateNextProceduralStep() {
    // 1. Check for Major Age Milestones first
    if (playerCharacter.age === 13 && playerCharacter.currentStoryNode !== "milestone_age_13") {
        renderStoryNode("milestone_age_13");
        return;
    }
    if (playerCharacter.age === 18 && playerCharacter.currentStoryNode !== "milestone_age_18") {
        renderStoryNode("milestone_age_18");
        return;
    }
    if (playerCharacter.age === 20 && playerCharacter.currentStoryNode !== "milestone_age_20") {
        renderStoryNode("milestone_age_20");
        return;
    }

    // 2. Otherwise, give them a procedural event based on their phase
    const eventPool = PROCEDURAL_EVENTS[currentPhase];
    
    // Add generic "Training/Rest" options if we want to pad out the time
    let eventsToChooseFrom = [];
    if (eventPool && eventPool.length > 0) {
        // Pick a random event from the pool
        const randomEvent = eventPool[Math.floor(Math.random() * eventPool.length)];
        eventsToChooseFrom.push(randomEvent);
    }

    // We can dynamically construct a "Months pass..." node
    const timeNode = {
        title: `${PHASES[currentPhase].title}`,
        text: `The relentless cycle of Spartan life continues. You are ${playerCharacter.age} years old. The seasons change, but the discipline remains absolute. What is your focus in the coming months?`,
        choices: [
            { text: "Focus strictly on Combat Drills.", stats: { combat: 3, stamina: -5 }, result: "You sweat blood in the training rings.", next: "procedural" },
            { text: "Study Tactics and History.", stats: { tactics: 3, leadership: 1 }, result: "You listen to the elders recount past wars.", next: "procedural" },
            { text: "Rest and recover your body.", stats: { health: 20, stamina: 20 }, result: "You nurse your wounds and eat hearty rations.", next: "procedural" }
        ]
    };

    // 30% chance to get a specific scenario, 70% chance to get the generic "time passes" training screen
    // This makes the game incredibly long and allows the player to "grind" their stats via text choices.
    if (eventsToChooseFrom.length > 0 && Math.random() < 0.4) {
        renderStoryNode(null, true, eventsToChooseFrom[0]);
    } else {
        renderStoryNode(null, true, timeNode);
    }
}

// Start for new character
function startNewStory() {
    updatePhase();
    renderStoryNode('start');
}

// Chronicle
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
            <div style="color: #ccc; font-style: italic;">"${entry.result}"</div>
        </div>
    `).join('');
}

console.log("📜 Epic Narrative Engine Initialized");
