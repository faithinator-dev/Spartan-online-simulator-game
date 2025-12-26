// Inventory and Equipment System
// Uses equipment-database.js for 120+ items

// Load shop with items from database
function loadShop() {
    const shopGrid = document.getElementById('shop-items');
    if (!shopGrid) return;
    
    shopGrid.innerHTML = '';
    
    // Get items from equipment database based on player level
    const shopItems = getShopItems(playerCharacter.level);
    
    shopItems.forEach(item => {
        const canAfford = playerCharacter.gold >= item.value;
        const meetsLevel = playerCharacter.tier >= item.tier || playerCharacter.level >= (item.tier * 5);
        
        const itemCard = document.createElement('div');
        itemCard.className = `shop-item ${item.rarity}`;
        
        if (!canAfford || !meetsLevel) {
            itemCard.style.opacity = '0.5';
        }
        
        // Create equipment icon
        const iconDiv = document.createElement('div');
        iconDiv.className = `equipment-icon ${item.rarity} ${getEquipmentSpriteClass(item)}`;
        
        // Get stats display
        let stats = '';
        if (item.strength) stats += `⚔️ +${item.strength} `;
        if (item.defense) stats += `🛡️ +${item.defense} `;
        if (item.agility) stats += `⚡ +${item.agility} `;
        
        const tierBadge = `<span class="equipment-tier tier-${item.tier}">T${item.tier}</span>`;
        
        itemCard.appendChild(iconDiv);
        itemCard.innerHTML += `
            <div class="shop-item-name" style="color: ${RARITY_COLORS[item.rarity]}">${item.name}</div>
            <div class="shop-item-stats">${stats}</div>
            ${tierBadge}
            <div class="shop-item-description">${item.description}</div>
            <div class="shop-item-price">💰 ${item.value}g</div>
        `;
        
        if (canAfford && meetsLevel) {
            itemCard.style.cursor = 'pointer';
            itemCard.addEventListener('click', () => buyItem(item));
        } else {
            itemCard.style.cursor = 'not-allowed';
            if (!meetsLevel) {
                itemCard.title = `Requires tier ${item.tier} (Level ${item.tier * 5})`;
            } else {
                itemCard.title = 'Not enough gold';
            }
        }
        
        shopGrid.appendChild(itemCard);
    });
    
    if (shopItems.length === 0) {
        shopGrid.innerHTML = '<p style="text-align: center; color: #999;">No items available at your level</p>';
    }
}

// Buy item
async function buyItem(item) {
    if (playerCharacter.gold < item.value) {
        showNotification('Not enough gold!');
        return;
    }
    
    const minLevel = item.tier * 5;
    if (playerCharacter.level < minLevel) {
        showNotification(`Requires level ${minLevel}!`);
        return;
    }
    
    // Determine slot based on category
    let slot = item.category;
    if (slot === 'weapons') slot = 'weapon';
    if (slot === 'shields') slot = 'shield';
    if (slot === 'helmets') slot = 'head';
    if (slot === 'armor') slot = 'body';
    if (slot === 'legs') slot = 'legs';
    
    // Deduct gold
    playerCharacter.gold -= item.value;
    
    // Equip item
    const equipped = {
        id: item.id,
        name: item.name,
        tier: item.tier,
        rarity: item.rarity,
        strength: item.strength || 0,
        defense: item.defense || 0,
        agility: item.agility || 0
    };
    
    if (!playerCharacter.equipment) {
        playerCharacter.equipment = {};
    }
    
    playerCharacter.equipment[slot] = equipped;
    
    // Apply stat bonuses
    if (item.strength) playerCharacter.strength += item.strength;
    if (item.defense) playerCharacter.defense += item.defense;
    if (item.agility) playerCharacter.agility += item.agility;
    
    showNotification(`✅ Purchased and equipped ${item.name}!`);
    
    updateCharacterUI();
    loadShop();
    
    await saveCharacter();
}

// Unequip item
async function unequipItem(slot) {
    if (!playerCharacter.equipment || !playerCharacter.equipment[slot]) {
        showNotification('Nothing equipped in this slot!');
        return;
    }
    
    const item = playerCharacter.equipment[slot];
    
    // Remove stat bonuses
    if (item.strength) playerCharacter.strength -= item.strength;
    if (item.defense) playerCharacter.defense -= item.defense;
    if (item.agility) playerCharacter.agility -= item.agility;
    
    playerCharacter.equipment[slot] = null;
    
    showNotification(`Unequipped ${item.name}`);
    updateCharacterUI();
    await saveCharacter();
}

// Load equipped items on UI
function loadEquippedItems() {
    if (!playerCharacter.equipment) return;
    
    const slots = ['head', 'body', 'legs', 'weapon', 'shield'];
    
    slots.forEach(slot => {
        const slotEl = document.getElementById(`equipped-${slot}`);
        if (!slotEl) return;
        
        if (playerCharacter.equipment[slot]) {
            const item = playerCharacter.equipment[slot];
            slotEl.textContent = item.name;
            slotEl.style.color = RARITY_COLORS[item.rarity] || '#FFD700';
            slotEl.style.cursor = 'pointer';
            slotEl.onclick = () => unequipItem(slot);
        } else {
            slotEl.textContent = '-';
            slotEl.style.color = '#999';
            slotEl.style.cursor = 'default';
            slotEl.onclick = null;
        }
    });
}

console.log("✅ Inventory system loaded with 120+ items");
