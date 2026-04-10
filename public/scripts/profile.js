// Profile & Global Chat System

// Initialize chat
function initializeChat() {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer || !db) return;

    // Listen for new messages
    db.collection('global_chat')
        .orderBy('timestamp', 'desc')
        .limit(50)
        .onSnapshot(snapshot => {
            const messages = [];
            snapshot.forEach(doc => messages.push(doc.data()));
            renderChat(messages.reverse());
        });
}

function renderChat(messages) {
    const chatContainer = document.getElementById('chat-messages');
    chatContainer.innerHTML = messages.map(msg => `
        <div class="chat-msg" style="margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px;">
            <strong style="color: var(--gold);">${msg.username}:</strong> 
            <span style="color: #eee;">${msg.text}</span>
            <div style="font-size: 0.7rem; color: #666;">${new Date(msg.timestamp).toLocaleTimeString()}</div>
        </div>
    `).join('');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    
    if (!text || !playerCharacter) return;
    
    try {
        await db.collection('global_chat').add({
            username: playerCharacter.username,
            text: text,
            timestamp: Date.now(),
            uid: playerCharacter.uid
        });
        input.value = '';
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Profile Settings
function loadProfileSettings() {
    if (!playerCharacter) return;
    document.getElementById('settings-bio').value = playerCharacter.bio || '';
    document.getElementById('settings-status').value = playerCharacter.status || '';
}

async function saveProfileSettings() {
    const bio = document.getElementById('settings-bio').value;
    const status = document.getElementById('settings-status').value;
    
    playerCharacter.bio = bio;
    playerCharacter.status = status;
    
    await saveCharacter();
    showNotification("✅ Profile updated for the Hall of Heroes!");
}

// Global hook for chat input 'Enter' key
document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
});

console.log("✅ Profile & Chat system loaded");
