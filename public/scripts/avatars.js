// Avatar System - 20 Different Warrior Avatars

const AVATARS = {
    // Spartan Warriors
    spartan_warrior: {
        id: 'spartan_warrior',
        name: 'Spartan Warrior',
        category: 'Spartan',
        cssClass: 'avatar-spartan-warrior',
        description: 'Classic red-cloaked Spartan hoplite'
    },
    spartan_king: {
        id: 'spartan_king',
        name: 'Spartan King',
        category: 'Spartan',
        cssClass: 'avatar-spartan-king',
        description: 'Royal Spartan with golden armor'
    },
    spartan_elite: {
        id: 'spartan_elite',
        name: 'Elite Hoplite',
        category: 'Spartan',
        cssClass: 'avatar-spartan-elite',
        description: 'Veteran warrior with battle scars'
    },
    spartan_general: {
        id: 'spartan_general',
        name: 'Spartan General',
        category: 'Spartan',
        cssClass: 'avatar-spartan-general',
        description: 'Commander with horsehair crest'
    },
    
    // Greek Warriors
    athenian_soldier: {
        id: 'athenian_soldier',
        name: 'Athenian Soldier',
        category: 'Greek',
        cssClass: 'avatar-athenian',
        description: 'Blue-armored Athenian warrior'
    },
    theban_champion: {
        id: 'theban_champion',
        name: 'Theban Champion',
        category: 'Greek',
        cssClass: 'avatar-theban',
        description: 'Sacred Band member'
    },
    macedonian_warrior: {
        id: 'macedonian_warrior',
        name: 'Macedonian Warrior',
        category: 'Greek',
        cssClass: 'avatar-macedonian',
        description: 'Phalanx sarissa bearer'
    },
    
    // Legendary Heroes
    hero_achilles: {
        id: 'hero_achilles',
        name: 'Achilles',
        category: 'Legendary',
        cssClass: 'avatar-achilles',
        description: 'Greatest Greek warrior'
    },
    hero_leonidas: {
        id: 'hero_leonidas',
        name: 'Leonidas',
        category: 'Legendary',
        cssClass: 'avatar-leonidas',
        description: 'King of Sparta, defender of Thermopylae'
    },
    hero_perseus: {
        id: 'hero_perseus',
        name: 'Perseus',
        category: 'Legendary',
        cssClass: 'avatar-perseus',
        description: 'Slayer of Medusa'
    },
    hero_hercules: {
        id: 'hero_hercules',
        name: 'Hercules',
        category: 'Legendary',
        cssClass: 'avatar-hercules',
        description: 'Son of Zeus, demigod'
    },
    
    // Female Warriors
    amazon_warrior: {
        id: 'amazon_warrior',
        name: 'Amazon Warrior',
        category: 'Female',
        cssClass: 'avatar-amazon',
        description: 'Fierce female warrior'
    },
    spartan_woman: {
        id: 'spartan_woman',
        name: 'Spartan Woman',
        category: 'Female',
        cssClass: 'avatar-spartan-woman',
        description: 'Trained Spartan female'
    },
    athena_priestess: {
        id: 'athena_priestess',
        name: 'Athena\'s Priestess',
        category: 'Female',
        cssClass: 'avatar-priestess',
        description: 'Divine wisdom warrior'
    },
    
    // Special Classes
    gladiator: {
        id: 'gladiator',
        name: 'Gladiator',
        category: 'Special',
        cssClass: 'avatar-gladiator',
        description: 'Arena champion'
    },
    assassin: {
        id: 'assassin',
        name: 'Assassin',
        category: 'Special',
        cssClass: 'avatar-assassin',
        description: 'Silent shadow warrior'
    },
    mercenary: {
        id: 'mercenary',
        name: 'Mercenary',
        category: 'Special',
        cssClass: 'avatar-mercenary',
        description: 'Sword for hire'
    },
    
    // Mythical
    demigod: {
        id: 'demigod',
        name: 'Demigod',
        category: 'Mythical',
        cssClass: 'avatar-demigod',
        description: 'Half-mortal, half-divine'
    },
    olympian_champion: {
        id: 'olympian_champion',
        name: 'Olympian Champion',
        category: 'Mythical',
        cssClass: 'avatar-olympian',
        description: 'Blessed by the gods'
    },
    titan_warrior: {
        id: 'titan_warrior',
        name: 'Titan Warrior',
        category: 'Mythical',
        cssClass: 'avatar-titan',
        description: 'Ancient power incarnate'
    }
};

// Get avatar by ID
function getAvatarById(id) {
    return AVATARS[id] || AVATARS.spartan_warrior;
}

// Get avatars by category
function getAvatarsByCategory(category) {
    return Object.values(AVATARS).filter(avatar => avatar.category === category);
}

// Get all categories
function getAvatarCategories() {
    const categories = new Set();
    Object.values(AVATARS).forEach(avatar => categories.add(avatar.category));
    return Array.from(categories);
}

// Default avatar
const DEFAULT_AVATAR = 'spartan_warrior';

console.log(`✅ Avatar system loaded with ${Object.keys(AVATARS).length} avatars`);
