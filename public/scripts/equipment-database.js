// Complete Equipment Database - 100+ Items with CSS-based Icons

const EQUIPMENT_DATABASE = {
    // ========== WEAPONS (50+) ==========
    weapons: [
        // Tier 1: Basic Training Weapons
        { id: 'wooden-stick', name: 'Wooden Stick', tier: 1, strength: 5, value: 5, rarity: 'common', description: 'A simple stick for beginners' },
        { id: 'training-sword', name: 'Training Sword', tier: 1, strength: 8, value: 10, rarity: 'common', description: 'Wooden practice sword' },
        { id: 'rusty-dagger', name: 'Rusty Dagger', tier: 1, strength: 10, value: 15, rarity: 'common', description: 'Old and worn dagger' },
        
        // Tier 2: Bronze Age
        { id: 'bronze-dagger', name: 'Bronze Dagger', tier: 2, strength: 15, value: 30, rarity: 'common', description: 'Sharp bronze blade' },
        { id: 'bronze-sword', name: 'Bronze Sword', tier: 2, strength: 20, value: 50, rarity: 'common', description: 'Standard bronze weapon' },
        { id: 'bronze-spear', name: 'Bronze Spear', tier: 2, strength: 22, value: 60, rarity: 'common', description: 'Long reach bronze spear' },
        { id: 'bronze-axe', name: 'Bronze Axe', tier: 2, strength: 25, value: 70, rarity: 'common', description: 'Heavy bronze axe' },
        { id: 'bronze-mace', name: 'Bronze Mace', tier: 2, strength: 23, value: 65, rarity: 'common', description: 'Crushing bronze mace' },
        
        // Tier 3: Iron Age
        { id: 'iron-dagger', name: 'Iron Dagger', tier: 3, strength: 28, value: 100, rarity: 'uncommon', description: 'Swift iron blade' },
        { id: 'iron-sword', name: 'Iron Sword', tier: 3, strength: 35, value: 150, rarity: 'uncommon', description: 'Reliable iron sword' },
        { id: 'iron-spear', name: 'Iron Spear', tier: 3, strength: 37, value: 160, rarity: 'uncommon', description: 'Sharp iron spear' },
        { id: 'iron-axe', name: 'Iron Axe', tier: 3, strength: 40, value: 170, rarity: 'uncommon', description: 'Heavy battle axe' },
        { id: 'iron-mace', name: 'Iron Mace', tier: 3, strength: 38, value: 165, rarity: 'uncommon', description: 'Iron crushing weapon' },
        { id: 'gladius', name: 'Gladius', tier: 3, strength: 42, value: 180, rarity: 'uncommon', description: 'Roman short sword' },
        { id: 'falcata', name: 'Falcata', tier: 3, strength: 44, value: 190, rarity: 'uncommon', description: 'Curved Iberian blade' },
        
        // Tier 4: Steel Weapons
        { id: 'steel-dagger', name: 'Steel Dagger', tier: 4, strength: 45, value: 250, rarity: 'rare', description: 'Finely crafted dagger' },
        { id: 'steel-sword', name: 'Steel Sword', tier: 4, strength: 55, value: 350, rarity: 'rare', description: 'Superior steel blade' },
        { id: 'steel-spear', name: 'Steel Spear', tier: 4, strength: 57, value: 360, rarity: 'rare', description: 'Deadly steel spear' },
        { id: 'steel-axe', name: 'Steel Axe', tier: 4, strength: 60, value: 380, rarity: 'rare', description: 'Powerful battle axe' },
        { id: 'war-hammer', name: 'War Hammer', tier: 4, strength: 62, value: 400, rarity: 'rare', description: 'Armor-crushing hammer' },
        { id: 'longsword', name: 'Longsword', tier: 4, strength: 58, value: 370, rarity: 'rare', description: 'Versatile two-handed blade' },
        { id: 'scimitar', name: 'Scimitar', tier: 4, strength: 56, value: 360, rarity: 'rare', description: 'Curved eastern blade' },
        { id: 'trident', name: 'Trident', tier: 4, strength: 54, value: 340, rarity: 'rare', description: 'Three-pronged spear' },
        { id: 'halberd', name: 'Halberd', tier: 4, strength: 65, value: 420, rarity: 'rare', description: 'Axe-spear combination' },
        
        // Tier 5: Master Crafted
        { id: 'kopis', name: 'Kopis', tier: 5, strength: 70, value: 500, rarity: 'epic', description: 'Greek curved sword' },
        { id: 'xiphos', name: 'Xiphos', tier: 5, strength: 72, value: 520, rarity: 'epic', description: 'Classic Greek blade' },
        { id: 'sarissa', name: 'Sarissa', tier: 5, strength: 75, value: 550, rarity: 'epic', description: 'Macedonian pike' },
        { id: 'rhomphaia', name: 'Rhomphaia', tier: 5, strength: 78, value: 580, rarity: 'epic', description: 'Thracian falx' },
        { id: 'cavalry-spear', name: 'Cavalry Spear', tier: 5, strength: 76, value: 560, rarity: 'epic', description: 'Mounted warrior lance' },
        { id: 'battle-axe', name: 'Battle Axe', tier: 5, strength: 80, value: 600, rarity: 'epic', description: 'Two-handed axe' },
        { id: 'war-scythe', name: 'War Scythe', tier: 5, strength: 77, value: 570, rarity: 'epic', description: 'Curved polearm' },
        { id: 'morning-star', name: 'Morning Star', tier: 5, strength: 79, value: 590, rarity: 'epic', description: 'Spiked mace' },
        
        // Tier 6: Legendary Spartan
        { id: 'spartan-blade', name: 'Spartan Blade', tier: 6, strength: 90, value: 800, rarity: 'legendary', description: 'Forged in Sparta\'s furnaces' },
        { id: 'leonidas-sword', name: 'Leonidas\' Sword', tier: 6, strength: 95, value: 900, rarity: 'legendary', description: 'Wielded by the king himself' },
        { id: 'spartan-spear', name: 'Spartan Spear', tier: 6, strength: 92, value: 850, rarity: 'legendary', description: 'Symbol of Spartan might' },
        { id: 'dory-spear', name: 'Dory Spear', tier: 6, strength: 88, value: 780, rarity: 'legendary', description: 'Hoplite primary weapon' },
        { id: 'spartan-kopis', name: 'Spartan Kopis', tier: 6, strength: 93, value: 870, rarity: 'legendary', description: 'Elite warrior\'s blade' },
        
        // Tier 7: Mythical
        { id: 'blade-of-ares', name: 'Blade of Ares', tier: 7, strength: 120, value: 1500, rarity: 'mythical', description: 'Blessed by the God of War' },
        { id: 'spear-of-athena', name: 'Spear of Athena', tier: 7, strength: 125, value: 1600, rarity: 'mythical', description: 'Divine wisdom in battle' },
        { id: 'thunder-axe', name: 'Thunder Axe', tier: 7, strength: 130, value: 1700, rarity: 'mythical', description: 'Echoes Zeus\' power' },
        { id: 'hades-scythe', name: 'Hades\' Scythe', tier: 7, strength: 135, value: 1800, rarity: 'mythical', description: 'Reaps souls like grain' },
        { id: 'poseidon-trident', name: 'Poseidon\'s Trident', tier: 7, strength: 140, value: 2000, rarity: 'mythical', description: 'Command the seas' },
        { id: 'hermes-blade', name: 'Hermes\' Blade', tier: 7, strength: 115, value: 1400, rarity: 'mythical', description: 'Swift as the messenger god', agility: 20 },
        { id: 'hephaestus-hammer', name: 'Hephaestus\' Hammer', tier: 7, strength: 150, value: 2200, rarity: 'mythical', description: 'Forged in divine fire' },
        { id: 'apollo-bow', name: 'Apollo\'s Bow', tier: 7, strength: 110, value: 1350, rarity: 'mythical', description: 'Never misses its mark', agility: 15 },
        
        // Special Weapons
        { id: 'net-and-trident', name: 'Net and Trident', tier: 5, strength: 70, value: 550, rarity: 'epic', description: 'Retiarius gladiator style', agility: 10 },
        { id: 'dual-xiphos', name: 'Dual Xiphos', tier: 5, strength: 85, value: 700, rarity: 'epic', description: 'Twin Greek blades', agility: 15 },
        { id: 'assassin-blade', name: 'Assassin\'s Blade', tier: 4, strength: 50, value: 400, rarity: 'rare', description: 'Silent and deadly', agility: 20 },
        { id: 'executioner-axe', name: 'Executioner\'s Axe', tier: 5, strength: 95, value: 750, rarity: 'epic', description: 'One swing, one kill' },
        { id: 'ceremonial-dagger', name: 'Ceremonial Dagger', tier: 3, strength: 30, value: 200, rarity: 'uncommon', description: 'For ritual combat' },
    ],
    
    // ========== SHIELDS (20+) ==========
    shields: [
        // Basic Shields
        { id: 'wooden-shield', name: 'Wooden Shield', tier: 1, defense: 5, value: 20, rarity: 'common', description: 'Simple wooden protection' },
        { id: 'leather-shield', name: 'Leather Shield', tier: 1, defense: 8, value: 30, rarity: 'common', description: 'Reinforced leather' },
        
        // Bronze Shields
        { id: 'bronze-buckler', name: 'Bronze Buckler', tier: 2, defense: 12, value: 50, rarity: 'common', description: 'Small round shield' },
        { id: 'bronze-shield', name: 'Bronze Shield', tier: 2, defense: 15, value: 70, rarity: 'common', description: 'Standard bronze defense' },
        { id: 'pelta', name: 'Pelta', tier: 2, defense: 13, value: 60, rarity: 'common', description: 'Light crescent shield' },
        
        // Iron Shields
        { id: 'iron-buckler', name: 'Iron Buckler', tier: 3, defense: 18, value: 120, rarity: 'uncommon', description: 'Quick parry shield' },
        { id: 'iron-shield', name: 'Iron Shield', tier: 3, defense: 22, value: 150, rarity: 'uncommon', description: 'Solid iron protection' },
        { id: 'aspis', name: 'Aspis', tier: 3, defense: 25, value: 180, rarity: 'uncommon', description: 'Greek round shield' },
        { id: 'thureos', name: 'Thureos', tier: 3, defense: 23, value: 160, rarity: 'uncommon', description: 'Oval shield' },
        
        // Advanced Shields
        { id: 'hoplon-shield', name: 'Hoplon Shield', tier: 4, defense: 30, value: 300, rarity: 'rare', description: 'Heavy hoplite shield' },
        { id: 'tower-shield', name: 'Tower Shield', tier: 4, defense: 35, value: 350, rarity: 'rare', description: 'Full body protection' },
        { id: 'kite-shield', name: 'Kite Shield', tier: 4, defense: 32, value: 320, rarity: 'rare', description: 'Teardrop shaped' },
        { id: 'reinforced-shield', name: 'Reinforced Shield', tier: 4, defense: 33, value: 330, rarity: 'rare', description: 'Metal banded' },
        
        // Elite Shields
        { id: 'spartan-shield', name: 'Spartan Shield', tier: 5, defense: 40, value: 500, rarity: 'epic', description: 'Lambda emblem' },
        { id: 'commanders-shield', name: 'Commander\'s Shield', tier: 5, defense: 42, value: 520, rarity: 'epic', description: 'For leaders' },
        { id: 'bronze-hoplon', name: 'Bronze Hoplon', tier: 5, defense: 45, value: 550, rarity: 'epic', description: 'Perfectly balanced' },
        
        // Legendary
        { id: 'aegis', name: 'Aegis', tier: 6, defense: 55, value: 800, rarity: 'legendary', description: 'Athena\'s protection' },
        { id: 'medusa-shield', name: 'Medusa Shield', tier: 6, defense: 50, value: 750, rarity: 'legendary', description: 'Gorgon face terrifies' },
        { id: 'achilles-shield', name: 'Achilles\' Shield', tier: 7, defense: 70, value: 1500, rarity: 'mythical', description: 'Crafted by Hephaestus' },
        { id: 'atlas-bulwark', name: 'Atlas Bulwark', tier: 7, defense: 75, value: 1600, rarity: 'mythical', description: 'Holds the world' },
    ],
    
    // ========== HELMETS (15+) ==========
    helmets: [
        { id: 'leather-cap', name: 'Leather Cap', tier: 1, defense: 3, value: 15, rarity: 'common', description: 'Basic head protection' },
        { id: 'bronze-cap', name: 'Bronze Cap', tier: 2, defense: 6, value: 40, rarity: 'common', description: 'Simple bronze helmet' },
        { id: 'bronze-helmet', name: 'Bronze Helmet', tier: 2, defense: 8, value: 60, rarity: 'common', description: 'Full bronze helm' },
        { id: 'iron-helmet', name: 'Iron Helmet', tier: 3, defense: 12, value: 120, rarity: 'uncommon', description: 'Iron head gear' },
        { id: 'corinthian-helmet', name: 'Corinthian Helmet', tier: 3, defense: 15, value: 150, rarity: 'uncommon', description: 'Classic Greek style' },
        { id: 'chalcidian-helmet', name: 'Chalcidian Helmet', tier: 3, defense: 14, value: 140, rarity: 'uncommon', description: 'Open face design' },
        { id: 'illyrian-helmet', name: 'Illyrian Helmet', tier: 3, defense: 13, value: 130, rarity: 'uncommon', description: 'Northern style' },
        { id: 'phrygian-helmet', name: 'Phrygian Helmet', tier: 4, defense: 18, value: 250, rarity: 'rare', description: 'Eastern influence' },
        { id: 'attic-helmet', name: 'Attic Helmet', tier: 4, defense: 20, value: 280, rarity: 'rare', description: 'Athenian craftsmanship' },
        { id: 'pilos-helmet', name: 'Pilos Helmet', tier: 4, defense: 17, value: 240, rarity: 'rare', description: 'Conical shape' },
        { id: 'spartan-helmet', name: 'Spartan Helmet', tier: 5, defense: 25, value: 450, rarity: 'epic', description: 'Red-crested glory' },
        { id: 'leonidas-helm', name: 'Leonidas\' Helm', tier: 6, defense: 35, value: 750, rarity: 'legendary', description: 'The king\'s crown' },
        { id: 'ares-helm', name: 'Helm of Ares', tier: 7, defense: 50, value: 1400, rarity: 'mythical', description: 'War god\'s protection' },
        { id: 'perseus-helm', name: 'Perseus\' Helm', tier: 7, defense: 45, value: 1300, rarity: 'mythical', description: 'Grants invisibility', agility: 10 },
        { id: 'olympian-crown', name: 'Olympian Crown', tier: 7, defense: 55, value: 1600, rarity: 'mythical', description: 'Divine authority' },
    ],
    
    // ========== ARMOR (15+) ==========
    armor: [
        { id: 'cloth-tunic', name: 'Cloth Tunic', tier: 1, defense: 2, value: 10, rarity: 'common', description: 'Simple clothing' },
        { id: 'leather-vest', name: 'Leather Vest', tier: 1, defense: 5, value: 25, rarity: 'common', description: 'Light leather armor' },
        { id: 'hardened-leather', name: 'Hardened Leather', tier: 2, defense: 8, value: 50, rarity: 'common', description: 'Boiled leather' },
        { id: 'linen-cuirass', name: 'Linen Cuirass', tier: 2, defense: 10, value: 70, rarity: 'common', description: 'Layered linen armor' },
        { id: 'bronze-cuirass', name: 'Bronze Cuirass', tier: 3, defense: 15, value: 150, rarity: 'uncommon', description: 'Muscle cuirass' },
        { id: 'scale-armor', name: 'Scale Armor', tier: 3, defense: 17, value: 170, rarity: 'uncommon', description: 'Overlapping scales' },
        { id: 'chainmail', name: 'Chainmail', tier: 3, defense: 18, value: 180, rarity: 'uncommon', description: 'Interlocked rings' },
        { id: 'iron-cuirass', name: 'Iron Cuirass', tier: 4, defense: 22, value: 300, rarity: 'rare', description: 'Solid iron plate' },
        { id: 'hoplite-armor', name: 'Hoplite Armor', tier: 4, defense: 25, value: 350, rarity: 'rare', description: 'Full panoply' },
        { id: 'lamellar-armor', name: 'Lamellar Armor', tier: 4, defense: 23, value: 320, rarity: 'rare', description: 'Small plates' },
        { id: 'spartan-cuirass', name: 'Spartan Cuirass', tier: 5, defense: 30, value: 500, rarity: 'epic', description: 'Crimson armor' },
        { id: 'commanders-plate', name: 'Commander\'s Plate', tier: 5, defense: 32, value: 550, rarity: 'epic', description: 'Leader\'s armor' },
        { id: 'golden-cuirass', name: 'Golden Cuirass', tier: 6, defense: 40, value: 800, rarity: 'legendary', description: 'Shining glory' },
        { id: 'aegis-armor', name: 'Aegis Armor', tier: 7, defense: 55, value: 1500, rarity: 'mythical', description: 'Divine protection' },
        { id: 'titans-plate', name: 'Titan\'s Plate', tier: 7, defense: 60, value: 1700, rarity: 'mythical', description: 'Strength of titans' },
    ],
    
    // ========== LEG ARMOR (10+) ==========
    legs: [
        { id: 'cloth-sandals', name: 'Cloth Sandals', tier: 1, defense: 1, value: 5, rarity: 'common', description: 'Basic footwear', agility: 2 },
        { id: 'leather-boots', name: 'Leather Boots', tier: 1, defense: 3, value: 20, rarity: 'common', description: 'Sturdy boots', agility: 3 },
        { id: 'bronze-greaves', name: 'Bronze Greaves', tier: 2, defense: 6, value: 50, rarity: 'common', description: 'Shin guards' },
        { id: 'iron-greaves', name: 'Iron Greaves', tier: 3, defense: 10, value: 120, rarity: 'uncommon', description: 'Iron leg plates' },
        { id: 'hoplite-greaves', name: 'Hoplite Greaves', tier: 4, defense: 15, value: 250, rarity: 'rare', description: 'Full leg protection' },
        { id: 'spartan-greaves', name: 'Spartan Greaves', tier: 5, defense: 20, value: 450, rarity: 'epic', description: 'Crimson leg armor' },
        { id: 'winged-sandals', name: 'Winged Sandals', tier: 6, defense: 12, value: 700, rarity: 'legendary', description: 'Hermes\' gift', agility: 30 },
        { id: 'mercury-boots', name: 'Mercury Boots', tier: 7, defense: 18, value: 1200, rarity: 'mythical', description: 'Swift as wind', agility: 40 },
        { id: 'olympian-greaves', name: 'Olympian Greaves', tier: 7, defense: 35, value: 1500, rarity: 'mythical', description: 'Divine leg armor' },
        { id: 'achilles-greaves', name: 'Achilles\' Greaves', tier: 7, defense: 30, value: 1400, rarity: 'mythical', description: 'Legendary speed', agility: 35 },
    ]
};

// CSS class mapping for visual representation
const EQUIPMENT_SPRITES = {
    // Weapon types get different CSS backgrounds
    'dagger': 'sprite-dagger',
    'sword': 'sprite-sword',
    'spear': 'sprite-spear',
    'axe': 'sprite-axe',
    'mace': 'sprite-mace',
    'bow': 'sprite-bow',
    'hammer': 'sprite-hammer',
    
    // Shield types
    'buckler': 'sprite-buckler',
    'shield': 'sprite-shield',
    'tower': 'sprite-tower-shield',
    
    // Helmet types
    'cap': 'sprite-cap',
    'helmet': 'sprite-helmet',
    'helm': 'sprite-helm',
    
    // Armor types
    'tunic': 'sprite-tunic',
    'vest': 'sprite-vest',
    'cuirass': 'sprite-cuirass',
    'armor': 'sprite-armor',
    'plate': 'sprite-plate',
    
    // Leg armor
    'sandals': 'sprite-sandals',
    'boots': 'sprite-boots',
    'greaves': 'sprite-greaves'
};

// Rarity colors
const RARITY_COLORS = {
    'common': '#B0B0B0',
    'uncommon': '#5EFF5E',
    'rare': '#4A9EFF',
    'epic': '#B15EFF',
    'legendary': '#FFB35E',
    'mythical': '#FF5E5E'
};

// Get equipment by ID
function getEquipmentById(id) {
    for (const category in EQUIPMENT_DATABASE) {
        const item = EQUIPMENT_DATABASE[category].find(eq => eq.id === id);
        if (item) {
            return { ...item, category };
        }
    }
    return null;
}

// Get equipment by tier
function getEquipmentByTier(tier, category = null) {
    if (category) {
        return EQUIPMENT_DATABASE[category].filter(eq => eq.tier === tier);
    }
    
    const results = [];
    for (const cat in EQUIPMENT_DATABASE) {
        results.push(...EQUIPMENT_DATABASE[cat].filter(eq => eq.tier === tier));
    }
    return results;
}

// Get equipment by rarity
function getEquipmentByRarity(rarity, category = null) {
    if (category) {
        return EQUIPMENT_DATABASE[category].filter(eq => eq.rarity === rarity);
    }
    
    const results = [];
    for (const cat in EQUIPMENT_DATABASE) {
        results.push(...EQUIPMENT_DATABASE[cat].filter(eq => eq.rarity === rarity));
    }
    return results;
}

// Get sprite class for equipment
function getEquipmentSpriteClass(item) {
    for (const keyword in EQUIPMENT_SPRITES) {
        if (item.id.includes(keyword)) {
            return EQUIPMENT_SPRITES[keyword];
        }
    }
    return 'sprite-default';
}

// Get all equipment for shop (filtered by player level)
function getShopItems(playerLevel) {
    const maxTier = Math.min(Math.floor(playerLevel / 10) + 2, 7);
    const items = [];
    
    for (const category in EQUIPMENT_DATABASE) {
        items.push(...EQUIPMENT_DATABASE[category].filter(eq => eq.tier <= maxTier));
    }
    
    return items.sort((a, b) => a.value - b.value);
}

// Total count
console.log('📦 Equipment Database Loaded:');
console.log(`  Weapons: ${EQUIPMENT_DATABASE.weapons.length}`);
console.log(`  Shields: ${EQUIPMENT_DATABASE.shields.length}`);
console.log(`  Helmets: ${EQUIPMENT_DATABASE.helmets.length}`);
console.log(`  Armor: ${EQUIPMENT_DATABASE.armor.length}`);
console.log(`  Leg Armor: ${EQUIPMENT_DATABASE.legs.length}`);
console.log(`  TOTAL: ${Object.values(EQUIPMENT_DATABASE).reduce((sum, arr) => sum + arr.length, 0)} items`);
