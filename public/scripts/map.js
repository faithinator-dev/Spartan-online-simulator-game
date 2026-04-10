// Map and Territory System

let territories = {};
let selectedTerritory = null;

// Initialize territories
async function initializeTerritories() {
    try {
        const territoriesDoc = await db.collection('game_data').doc('territories').get();
        
        if (territoriesDoc.exists) {
            territories = territoriesDoc.data().territories;
        } else {
            // Create default territories
            territories = createDefaultTerritories();
            await db.collection('game_data').doc('territories').set({ territories });
        }
        
        renderMap();
    } catch (error) {
        console.error('Error loading territories:', error);
        // Use default territories offline
        territories = createDefaultTerritories();
        renderMap();
    }
}

// Random territory generator
function generateRandomTerritories(count = 20) {
    const regions = ["Greece", "Persia", "Egypt", "Macedonia", "Asia Minor", "Sicily", "Thrace"];
    const types = ["city", "fortress", "village", "trade-hub", "mountain-pass", "port", "temple"];
    const prefixes = ["New", "Old", "Great", "Lesser", "Upper", "Lower", "East", "West", "North", "South"];
    const names = [
        "Argos", "Delphi", "Olympia", "Epidaurus", "Corinth", "Mycenae", "Pylos", "Knossos",
        "Rhodes", "Samos", "Miletus", "Ephesus", "Pergamon", "Sardis", "Lydia", "Phrygia",
        "Memphis", "Alexandria", "Thebes", "Karnak", "Persepolis", "Babylon", "Susa", "Ecbatana",
        "Thermopylae", "Marathon", "Plataea", "Salamis", "Leuctra", "Chaeronea", "Issus", "Gaugamela"
    ];
    
    const territories = {};
    const territoryIds = [];
    
    // Generate territories
    for (let i = 0; i < count; i++) {
        const usedNames = Object.values(territories).map(t => t.name);
        let name;
        
        // Generate unique name
        do {
            const baseName = names[Math.floor(Math.random() * names.length)];
            const prefix = Math.random() > 0.7 ? prefixes[Math.floor(Math.random() * prefixes.length)] + " " : "";
            name = prefix + baseName;
        } while (usedNames.includes(name));
        
        const id = name.toLowerCase().replace(/\s+/g, '-');
        const type = types[Math.floor(Math.random() * types.length)];
        const region = regions[Math.floor(Math.random() * regions.length)];
        
        // Random stats based on type
        let baseDefense, baseResources, basePopulation, baseGarrison, bonus;
        
        switch(type) {
            case "fortress":
                baseDefense = 700 + Math.floor(Math.random() * 300);
                baseResources = 200 + Math.floor(Math.random() * 200);
                basePopulation = 3000 + Math.floor(Math.random() * 3000);
                baseGarrison = 300 + Math.floor(Math.random() * 200);
                bonus = { type: 'defense', value: 10, label: '+10% Combat Defense' };
                break;
            case "city":
                baseDefense = 400 + Math.floor(Math.random() * 200);
                baseResources = 400 + Math.floor(Math.random() * 300);
                basePopulation = 8000 + Math.floor(Math.random() * 7000);
                baseGarrison = 200 + Math.floor(Math.random() * 150);
                bonus = { type: 'xp', value: 15, label: '+15% XP Gain' };
                break;
            case "trade-hub":
                baseDefense = 300 + Math.floor(Math.random() * 200);
                baseResources = 800 + Math.floor(Math.random() * 400);
                basePopulation = 10000 + Math.floor(Math.random() * 8000);
                baseGarrison = 150 + Math.floor(Math.random() * 100);
                bonus = { type: 'gold', value: 20, label: '+20% Gold from Battles' };
                break;
            case "port":
                baseDefense = 350 + Math.floor(Math.random() * 150);
                baseResources = 600 + Math.floor(Math.random() * 300);
                basePopulation = 7000 + Math.floor(Math.random() * 5000);
                baseGarrison = 180 + Math.floor(Math.random() * 120);
                bonus = { type: 'discount', value: 10, label: '10% Equipment Discount' };
                break;
            case "mountain-pass":
                baseDefense = 600 + Math.floor(Math.random() * 400);
                baseResources = 150 + Math.floor(Math.random() * 150);
                basePopulation = 2000 + Math.floor(Math.random() * 2000);
                baseGarrison = 250 + Math.floor(Math.random() * 150);
                bonus = { type: 'stamina', value: 20, label: '+20 Max Stamina' };
                break;
            case "temple":
                baseDefense = 250 + Math.floor(Math.random() * 150);
                baseResources = 300 + Math.floor(Math.random() * 200);
                basePopulation = 4000 + Math.floor(Math.random() * 3000);
                baseGarrison = 100 + Math.floor(Math.random() * 100);
                bonus = { type: 'regen', value: 5, label: '+5 HP Regen/Turn' };
                break;
            default: // village
                baseDefense = 200 + Math.floor(Math.random() * 150);
                baseResources = 250 + Math.floor(Math.random() * 200);
                basePopulation = 3000 + Math.floor(Math.random() * 4000);
                baseGarrison = 100 + Math.floor(Math.random() * 100);
                bonus = { type: 'squad', value: 1, label: '+1 Max Squad Size' };
        }
        
        territories[id] = {
            name: name,
            region: region,
            owner: Math.random() > 0.7 ? null : region + " (NPC)",
            type: type,
            defense: baseDefense,
            resources: baseResources,
            population: basePopulation,
            garrison: baseGarrison,
            bonus: bonus,
            isPlayerOwned: false,
            connectedTo: [], // Will be filled later
            description: generateDescription(name, type, region)
        };
        
        territoryIds.push(id);
    }
    
    // Create connections (each territory connects to 2-4 neighbors)
    territoryIds.forEach((id, index) => {
        const connectionCount = 2 + Math.floor(Math.random() * 3); // 2-4 connections
        const connections = new Set();
        
        // Connect to next/previous territories
        if (index > 0) connections.add(territoryIds[index - 1]);
        if (index < territoryIds.length - 1) connections.add(territoryIds[index + 1]);
        
        // Add random connections
        while (connections.size < connectionCount && connections.size < territoryIds.length - 1) {
            const randomId = territoryIds[Math.floor(Math.random() * territoryIds.length)];
            if (randomId !== id) connections.add(randomId);
        }
        
        territories[id].connectedTo = Array.from(connections);
    });
    
    return territories;
}

function generateDescription(name, type, region) {
    const descriptions = {
        "city": [
            `A bustling ${region} city with markets and temples.`,
            `${name} stands as a beacon of civilization in ${region}.`,
            `The citizens of ${name} are known for their craftsmanship.`,
            `This city has withstood many sieges throughout history.`
        ],
        "fortress": [
            `An impregnable stronghold guarding the borders of ${region}.`,
            `${name}'s walls have never been breached by enemy forces.`,
            `A military outpost of strategic importance.`,
            `The garrison here is legendary for their discipline.`
        ],
        "village": [
            `A peaceful settlement in the ${region} countryside.`,
            `The villagers of ${name} live simple, honest lives.`,
            `This rural community supplies food to nearby cities.`,
            `A quiet place, far from the chaos of war.`
        ],
        "trade-hub": [
            `Merchants from across ${region} gather here to trade.`,
            `${name}'s markets overflow with exotic goods.`,
            `The wealth of ${region} flows through this trade center.`,
            `Caravans arrive daily with treasures from distant lands.`
        ],
        "mountain-pass": [
            `A narrow passage through treacherous mountain terrain.`,
            `Whoever controls ${name} controls access to ${region}.`,
            `Many armies have perished attempting to take this pass.`,
            `The cliffs here are stained with the blood of invaders.`
        ],
        "port": [
            `A busy harbor connecting ${region} to distant shores.`,
            `Ships from every corner of the Mediterranean dock here.`,
            `${name}'s fleet dominates the nearby waters.`,
            `The smell of salt and fish permeates this coastal city.`
        ],
        "temple": [
            `A sacred site dedicated to the gods of ${region}.`,
            `Pilgrims travel from far and wide to worship at ${name}.`,
            `The priests here claim to speak with divine authority.`,
            `Ancient rituals are performed within these holy walls.`
        ]
    };
    
    const typeDescriptions = descriptions[type] || descriptions["city"];
    return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
}

// Create default territories
function createDefaultTerritories() {
    // Generate a random map with 25 territories
    return generateRandomTerritories(25);
}

// Legacy static territories (kept for reference)
function createStaticTerritories() {
    const defaultTerritories = {
        sparta: {
            name: "Sparta",
            region: "Greece",
            owner: "Sparta (NPC)",
            type: "capital",
            defense: 1000,
            resources: 500,
            population: 10000,
            garrison: 500,
            isPlayerOwned: false,
            connectedTo: ["argos", "messene", "tegea"],
            description: "The heart of Spartan power, home to the mightiest warriors."
        },
        athens: {
            name: "Athens",
            region: "Greece",
            owner: "Athens (NPC)",
            type: "city-state",
            defense: 800,
            resources: 600,
            population: 15000,
            garrison: 400,
            isPlayerOwned: false,
            connectedTo: ["sparta", "thebes", "corinth"],
            description: "The cultural jewel of Greece, known for philosophy and democracy."
        },
        thebes: {
            name: "Thebes",
            region: "Greece",
            owner: null,
            type: "city",
            defense: 400,
            resources: 300,
            population: 8000,
            garrison: 200,
            isPlayerOwned: false,
            connectedTo: ["athens", "delphi"],
            description: "A proud Greek city with a strong military tradition."
        },
        corinth: {
            name: "Corinth",
            region: "Greece",
            owner: null,
            type: "trade-hub",
            defense: 500,
            resources: 800,
            population: 12000,
            garrison: 250,
            isPlayerOwned: false,
            connectedTo: ["athens", "argos"],
            description: "A wealthy trading city controlling important trade routes."
        },
        argos: {
            name: "Argos",
            region: "Greece",
            owner: null,
            type: "city",
            defense: 350,
            resources: 250,
            population: 6000,
            garrison: 150,
            isPlayerOwned: false,
            connectedTo: ["sparta", "corinth"],
            description: "An ancient city with a rich history."
        },
        messene: {
            name: "Messene",
            region: "Greece",
            owner: null,
            type: "city",
            defense: 300,
            resources: 200,
            population: 5000,
            garrison: 120,
            isPlayerOwned: false,
            connectedTo: ["sparta"],
            description: "A fertile region long contested by Sparta."
        },
        tegea: {
            name: "Tegea",
            region: "Greece",
            owner: null,
            type: "town",
            defense: 250,
            resources: 150,
            population: 4000,
            garrison: 100,
            isPlayerOwned: false,
            connectedTo: ["sparta"],
            description: "A small but strategic town in the Peloponnese."
        },
        delphi: {
            name: "Delphi",
            region: "Greece",
            owner: null,
            type: "sacred-site",
            defense: 600,
            resources: 400,
            population: 3000,
            garrison: 180,
            isPlayerOwned: false,
            connectedTo: ["thebes"],
            description: "The sacred site of the Oracle, revered by all Greeks."
        }
    };
    
    return defaultTerritories;
}

// Old territories removed - now using random generation

// Render map
function renderMap() {
    const mapGrid = document.getElementById('map-grid');
    if (!mapGrid) return;
    
    mapGrid.innerHTML = '';
    
    Object.entries(territories).forEach(([id, territory]) => {
        const node = document.createElement('div');
        node.className = 'territory-node';
        
        if (territory.isPlayerOwned) {
            node.classList.add('owned');
        } else if (territory.owner) {
            node.classList.add('enemy');
        } else {
            node.classList.add('neutral');
        }
        
        node.innerHTML = `
            <div class="territory-name">${territory.name}</div>
            <div class="territory-owner">${territory.owner || 'Neutral'}</div>
        `;
        
        node.addEventListener('click', () => selectTerritory(id));
        
        mapGrid.appendChild(node);
    });
    
    updateDashboardTerritoryStats();
}

// Select territory
function selectTerritory(territoryId) {
    selectedTerritory = territoryId;
    const territory = territories[territoryId];
    
    const detailsPanel = document.getElementById('territory-details');
    detailsPanel.classList.remove('hidden');
    
    document.getElementById('territory-name').textContent = territory.name;
    document.getElementById('territory-owner').textContent = territory.owner || 'Neutral';
    document.getElementById('territory-defense').textContent = territory.defense;
    document.getElementById('territory-garrison').textContent = territory.garrison;
    document.getElementById('territory-resources').textContent = territory.resources;
    document.getElementById('territory-description').textContent = territory.description;
    
    const attackBtn = document.getElementById('attack-territory-btn');
    const defendBtn = document.getElementById('defend-territory-btn');
    
    if (territory.isPlayerOwned) {
        attackBtn.classList.add('hidden');
        defendBtn.classList.remove('hidden');
    } else {
        attackBtn.classList.remove('hidden');
        defendBtn.classList.add('hidden');
    }
}

// Attack territory
document.getElementById('attack-territory-btn')?.addEventListener('click', async () => {
    if (!selectedTerritory) return;
    
    const territory = territories[selectedTerritory];
    
    // Check requirements
    if (playerCharacter.level < 15) {
        showNotification('You need to be level 15 to conquer territories!');
        return;
    }
    
    if (playerCharacter.squadSize === 0) {
        showNotification('You need a squad to attack territories!');
        return;
    }
    
    const confirmed = await showConfirm(`Attack ${territory.name}? This will cost 100 gold and start a siege battle.`);
    
    if (!confirmed) return;
    
    if (playerCharacter.gold < 100) {
        showNotification('Not enough gold! Need 100 gold to launch an attack.');
        return;
    }
    
    playerCharacter.gold -= 100;
    
    // Simulate siege battle (simplified for now)
    const playerPower = playerCharacter.level * 50 + playerCharacter.squadSize * 10;
    const territoryPower = territory.defense + territory.garrison;
    
    const successChance = playerPower / (playerPower + territoryPower);
    const success = Math.random() < successChance;
    
    if (success) {
        territory.isPlayerOwned = true;
        territory.owner = playerCharacter.username;
        playerCharacter.territoriesConquered++;
        
        await addExperience(500);
        await addGold(territory.resources);
        
        showNotification(`🏛️ Victory! ${territory.name} is now under your control!`);
        playSound('victory');
        
        renderMap();
        selectTerritory(selectedTerritory);
        
        // Save to database
        await saveCharacter();
        await saveTerritories();
    } else {
        showNotification(`💀 Defeat! Your attack on ${territory.name} was repelled.`);
        playSound('defeat');
        
        // Lose some squad members
        playerCharacter.squadSize = Math.max(0, playerCharacter.squadSize - getRandomInt(1, 3));
        await saveCharacter();
    }
    
    updateCharacterUI();
});

// Fortify territory
document.getElementById('defend-territory-btn')?.addEventListener('click', async () => {
    if (!selectedTerritory) return;
    
    const territory = territories[selectedTerritory];
    const cost = 50;
    
    if (playerCharacter.gold < cost) {
        showNotification('Not enough gold! Need 50 gold to fortify.');
        return;
    }
    
    playerCharacter.gold -= cost;
    territory.defense += 50;
    territory.garrison += 20;
    
    showNotification(`🛡️ ${territory.name} has been fortified!`);
    
    await saveCharacter();
    await saveTerritories();
    
    selectTerritory(selectedTerritory);
    updateCharacterUI();
});

// Save territories to database
async function saveTerritories() {
    try {
        await db.collection('game_data').doc('territories').set({ territories });
        console.log('💾 Territories saved');
    } catch (error) {
        console.error('Error saving territories:', error);
    }
}

// Update dashboard territory stats
function updateDashboardTerritoryStats() {
    let playerTerritories = 0;
    let totalTerritories = Object.keys(territories).length;
    
    Object.values(territories).forEach(territory => {
        if (territory.isPlayerOwned) {
            playerTerritories++;
        }
    });
    
    const spartanEl = document.getElementById('spartan-territories');
    const availableEl = document.getElementById('available-territories');
    
    if (spartanEl) spartanEl.textContent = playerTerritories;
    if (availableEl) availableEl.textContent = totalTerritories - playerTerritories;
}

console.log("✅ Map system loaded");
