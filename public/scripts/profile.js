// Profile Manager - Avatar Selection and Profile Editing

let selectedAvatarId = DEFAULT_AVATAR;

// Initialize profile system
function initializeProfile() {
    // Set default avatar if not set
    if (!playerCharacter.avatar) {
        playerCharacter.avatar = DEFAULT_AVATAR;
        saveCharacter();
    }
    
    // Update character display with avatar
    updateCharacterAvatar();
    
    console.log('✅ Profile system initialized');
}

// Open profile editor modal
function openProfileEditor() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'profile-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
    `;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <h2>⚔️ Edit Your Profile ⚔️</h2>
        
        <div class="profile-section">
            <h3>Current Profile</h3>
            <div class="current-profile">
                <div class="current-avatar">
                    <div class="avatar-preview ${getAvatarById(playerCharacter.avatar || DEFAULT_AVATAR).cssClass}"></div>
                </div>
                <div class="profile-info">
                    <h4>${playerCharacter.name}</h4>
                    <p>Level ${playerCharacter.level} Warrior</p>
                    <p>XP: ${playerCharacter.xp} / ${playerCharacter.level * 100}</p>
                    <p>Gold: ${playerCharacter.gold}</p>
                </div>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>Choose Your Avatar</h3>
            <div class="avatar-category-tabs" id="category-tabs"></div>
            <div class="avatar-grid" id="avatar-grid"></div>
        </div>
        
        <div class="profile-buttons">
            <button class="profile-btn" onclick="closeProfileEditor()">Cancel</button>
            <button class="profile-btn primary" onclick="saveProfileChanges()">Save Changes</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Set selected avatar
    selectedAvatarId = playerCharacter.avatar || DEFAULT_AVATAR;
    
    // Load categories
    loadAvatarCategories();
    
    // Load avatars (default to Spartan category)
    loadAvatarGrid('Spartan');
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeProfileEditor();
        }
    });
}

// Load avatar categories tabs
function loadAvatarCategories() {
    const tabsContainer = document.getElementById('category-tabs');
    const categories = getAvatarCategories();
    
    categories.forEach((category, index) => {
        const tab = document.createElement('div');
        tab.className = `category-tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = category;
        tab.onclick = () => {
            // Update active tab
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Load avatars for this category
            loadAvatarGrid(category);
        };
        tabsContainer.appendChild(tab);
    });
}

// Load avatar grid for category
function loadAvatarGrid(category) {
    const grid = document.getElementById('avatar-grid');
    const avatars = category === 'All' 
        ? Object.values(AVATARS)
        : getAvatarsByCategory(category);
    
    grid.innerHTML = '';
    
    avatars.forEach(avatar => {
        const option = document.createElement('div');
        option.className = `avatar-option ${avatar.id === selectedAvatarId ? 'selected' : ''}`;
        option.innerHTML = `
            <div class="avatar-preview ${avatar.cssClass}"></div>
            <div class="avatar-option-name">${avatar.name}</div>
            <div class="avatar-option-desc">${avatar.description}</div>
        `;
        
        option.onclick = () => {
            // Update selection
            selectedAvatarId = avatar.id;
            
            // Update UI
            document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            // Update preview
            const currentAvatar = document.querySelector('.current-avatar .avatar-preview');
            if (currentAvatar) {
                currentAvatar.className = `avatar-preview ${avatar.cssClass}`;
            }
        };
        
        grid.appendChild(option);
    });
}

// Save profile changes
function saveProfileChanges() {
    // Update character avatar
    playerCharacter.avatar = selectedAvatarId;
    
    // Save to storage
    saveCharacter();
    
    // Update display
    updateCharacterAvatar();
    
    // Show success message
    showNotification(`✅ Profile updated! You are now ${getAvatarById(selectedAvatarId).name}`, 'success');
    
    // Close modal
    closeProfileEditor();
}

// Close profile editor
function closeProfileEditor() {
    const overlay = document.getElementById('profile-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Update character avatar display
function updateCharacterAvatar() {
    const avatar = getAvatarById(playerCharacter.avatar || DEFAULT_AVATAR);
    
    // Update character info section
    const characterInfo = document.querySelector('.character-info');
    if (characterInfo) {
        // Check if avatar already exists
        let avatarDiv = characterInfo.querySelector('.character-avatar');
        
        if (!avatarDiv) {
            // Create new avatar div
            avatarDiv = document.createElement('div');
            avatarDiv.className = 'character-avatar';
            
            // Insert before character name
            const nameElement = characterInfo.querySelector('h2');
            characterInfo.insertBefore(avatarDiv, nameElement);
        }
        
        // Update avatar class
        avatarDiv.innerHTML = `<div class="avatar-preview ${avatar.cssClass}"></div>`;
    }
    
    // Update any other avatar displays in the UI
    document.querySelectorAll('[data-avatar-display]').forEach(element => {
        element.innerHTML = `<div class="avatar-preview ${avatar.cssClass}"></div>`;
    });
}

// Add Edit Profile button to character panel
function addEditProfileButton() {
    const characterInfo = document.querySelector('.character-info');
    if (characterInfo && !document.querySelector('.edit-profile-btn')) {
        const button = document.createElement('button');
        button.className = 'edit-profile-btn';
        button.textContent = '✏️ Edit Profile';
        button.onclick = openProfileEditor;
        characterInfo.appendChild(button);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#ffd700'};
        color: ${type === 'success' ? '#fff' : '#1a1a2e'};
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10001;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Wait for character to load
    setTimeout(() => {
        initializeProfile();
        addEditProfileButton();
    }, 1000);
});

console.log('✅ Profile manager loaded');
