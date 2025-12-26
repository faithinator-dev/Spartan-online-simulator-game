// Inventory and Equipment System

const SHOP_ITEMS = {
    // Weapons
    bronze_sword: {
        id: 'bronze_sword',
        name: 'Bronze Sword',
        type: 'weapon',
        slot: 'weapon',
        damage: 15,
        level: 5,
        price: 100,
        icon: '⚔️',
        description: 'A sturdy bronze blade'
    },
    iron_spear: {
        id: 'iron_spear',
        name: 'Iron Spear',
        type: 'weapon',
        slot: 'weapon',
        damage: 25,
        level: 10,
        price: 250,
        icon: '🗡️',
        description: 'The iconic Spartan weapon'
    },
    steel_sword: {
        id: 'steel_sword',
        name: 'Steel Sword',
        type: 'weapon',
        slot: 'weapon',
        damage: 40,
        level: 20,
        price: 500,
        icon: '⚔️',
        description: 'A masterwork steel blade'
    },
    
    // Shields
    wooden_shield: {
        id: 'wooden_shield',
        name: 'Wooden Shield',
        type: 'armor',
        slot: 'shield',
        armor: 5,
        level: 5,
        price: 80,
        icon: '🛡️',
        description: 'Basic wooden protection'
    },
    bronze_shield: {
        id: 'bronze_shield',
        name: 'Bronze Aspis',
        type: 'armor',
        slot: 'shield',
        armor: 12,
        level: 10,
        price: 200,
        icon: '🛡️',
        description: 'The classic Spartan shield'
    },
    
    // Head Armor
    bronze_helmet: {
        id: 'bronze_helmet',
        name: 'Bronze Helmet',
        type: 'armor',
        slot: 'head',
        armor: 8,
        level: 5,
        price: 120,
        icon: '🪖',
        description: 'Protects your head in battle'
    },
    corinthian_helmet: {
        id: 'corinthian_helmet',
        name: 'Corinthian Helmet',
        type: 'armor',
        slot: 'head',
        armor: 15,
        level: 15,
        price: 300,
        icon: '🪖',
        description: 'The iconic Greek helmet'
    },
    
    // Body Armor
    leather_cuirass: {
        id: 'leather_cuirass',
        name: 'Leather Cuirass',
        type: 'armor',
        slot: 'body',
        armor: 10,
        level: 5,
        price: 150,
        icon: '🦺',
        description: 'Hardened leather armor'
    },
    bronze_cuirass: {
        id: 'bronze_cuirass',
        name: 'Bronze Cuirass',
        type: 'armor',
        slot: 'body',
        armor: 20,
        level: 10,
        price: 350,
        icon: '🦺',
        description: 'Full bronze chest armor'
    },
    
    // Leg Armor
    leather_greaves: {
        id: 'leather_greaves',
        name: 'Leather Greaves',
        type: 'armor',
        slot: 'legs',
        armor: 5,
        level: 5,
        price: 80,
        icon: '👢',
        description: 'Basic leg protection'
    },
    bronze_greaves: {
        id: 'bronze_greaves',
        name: 'Bronze Greaves',
        type: 'armor',
        slot: 'legs',
        armor: 12,
        level: 10,
        price: 180,
        icon: '👢',
        description: 'Solid bronze leg guards'
    }
};

// Load shop
function loadShop() {
    const shopGrid = document.getElementById('shop-items');
    if (!shopGrid) return;
    
    shopGrid.innerHTML = '';
    
    Object.values(SHOP_ITEMS).forEach(item => {
        const canAfford = playerCharacter.gold >= item.price;
        const meetsLevel = playerCharacter.level >= item.level;
        
        const itemCard = document.createElement('div');
        itemCard.className = 'shop-item';
        
        if (!canAfford || !meetsLevel) {
            itemCard.style.opacity = '0.5';
        }
        
        const stats = item.damage ? `+${item.damage} DMG` : `+${item.armor} ARM`;
        
        itemCard.innerHTML = `
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-stats">${stats}</div>
            <div class="shop-item-stats">Lvl ${item.level}+</div>
            <div class="shop-item-price">${item.price} 💰</div>
        `;
        
        if (canAfford && meetsLevel) {
            itemCard.style.cursor = 'pointer';
            itemCard.addEventListener('click', () => buyItem(item));
        } else {
            itemCard.style.cursor = 'not-allowed';
            if (!meetsLevel) {
                itemCard.title = `Requires level ${item.level}`;
            } else {
                itemCard.title = 'Not enough gold';
            }
        }
        
        shopGrid.appendChild(itemCard);
    });
}

// Buy item
async function buyItem(item) {
    if (playerCharacter.gold < item.price) {
        showNotification('Not enough gold!');
        return;
    }
    
    if (playerCharacter.level < item.level) {
        showNotification(`Requires level ${item.level}!`);
        return;
    }
    
    const confirmed = await showConfirm(`Buy ${item.name} for ${item.price} gold?`);
    if (!confirmed) return;
    
    // Deduct gold
    playerCharacter.gold -= item.price;
    
    // Equip item
    const equipped = {
        name: item.name,
        damage: item.damage,
        armor: item.armor
    };
    
    playerCharacter.equipment[item.slot] = equipped;
    
    showNotification(`✅ Purchased and equipped ${item.name}!`);
    playSound('purchase');
    
    updateCharacterUI();
    loadShop();
    
    await saveCharacter();
}

// Unequip item
async function unequipItem(slot) {
    if (!playerCharacter.equipment[slot]) {
        showNotification('Nothing equipped in this slot!');
        return;
    }
    
    const confirmed = await showConfirm(`Unequip ${playerCharacter.equipment[slot].name}?`);
    if (!confirmed) return;
    
    playerCharacter.equipment[slot] = null;
    
    showNotification('Item unequipped');
    updateCharacterUI();
    await saveCharacter();
}

console.log("✅ Inventory system loaded");
