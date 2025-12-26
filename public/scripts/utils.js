// Utility Functions

// Show notification toast
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate XP required for next level
function getXPRequired(level) {
    return level * 100 + Math.pow(level, 2) * 10;
}

// Get random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get random element from array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Calculate damage
function calculateDamage(attacker, defender) {
    const baseDamage = attacker.strength + (attacker.weapon?.damage || 0);
    const defense = defender.defense + (defender.armor || 0);
    const damage = Math.max(1, baseDamage - defense);
    
    // 5% critical hit chance
    const isCritical = Math.random() < 0.05;
    return {
        damage: isCritical ? damage * 2 : damage,
        isCritical
    };
}

// Format time ago
function timeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

// Save to localStorage
function saveToLocal(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

// Load from localStorage
function loadFromLocal(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Failed to load from localStorage:', e);
        return null;
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show loading state
function showLoading(element, isLoading = true) {
    if (isLoading) {
        element.disabled = true;
        element.dataset.originalText = element.textContent;
        element.textContent = 'Loading...';
    } else {
        element.disabled = false;
        element.textContent = element.dataset.originalText;
    }
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Clamp number between min and max
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Get rank info based on level
function getRankInfo(level) {
    const ranks = [
        { name: "Trainee", level: 1, squadSize: 0 },
        { name: "Young Warrior", level: 5, squadSize: 3 },
        { name: "Hoplite", level: 10, squadSize: 10 },
        { name: "Squad Leader", level: 15, squadSize: 20 },
        { name: "Commander", level: 25, squadSize: 50 },
        { name: "General", level: 40, squadSize: 100 },
        { name: "War Master", level: 60, squadSize: 200 },
        { name: "Legendary Spartan", level: 100, squadSize: 500 }
    ];
    
    for (let i = ranks.length - 1; i >= 0; i--) {
        if (level >= ranks[i].level) {
            return {
                current: ranks[i],
                next: ranks[i + 1] || null
            };
        }
    }
    
    return {
        current: ranks[0],
        next: ranks[1]
    };
}

// Play sound effect (placeholder)
function playSound(soundName) {
    // TODO: Implement sound effects
    console.log(`🔊 Playing sound: ${soundName}`);
}

// Animate element
function animateElement(element, animationClass, duration = 1000) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// Show confirm dialog
function showConfirm(message) {
    return new Promise((resolve) => {
        const result = confirm(message);
        resolve(result);
    });
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Calculate percentage
function calculatePercentage(current, max) {
    return Math.min(100, Math.max(0, (current / max) * 100));
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

let mobileMenuOpen = false;

function initializeMobileMenu() {
    // Only initialize on mobile devices
    if (window.innerWidth > 768) return;
    
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    // Create mobile menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle Menu');
    document.body.appendChild(menuToggle);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    // Create close button in sidebar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'sidebar-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close Menu');
    sidebar.insertBefore(closeBtn, sidebar.firstChild);
    
    // Toggle menu function
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        sidebar.classList.toggle('mobile-open', mobileMenuOpen);
        overlay.classList.toggle('active', mobileMenuOpen);
        menuToggle.innerHTML = mobileMenuOpen ? '×' : '☰';
    }
    
    // Close menu function
    function closeMobileMenu() {
        mobileMenuOpen = false;
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        menuToggle.innerHTML = '☰';
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMobileMenu);
    closeBtn.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when navigating
    const navButtons = sidebar.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 300);
        });
    });
    
    // Close menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
}

// Detect if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth <= 768;
}

// Offline detection
function initializeOfflineDetection() {
    const indicator = document.createElement('div');
    indicator.className = 'offline-indicator';
    indicator.textContent = '⚠️ No Internet Connection';
    document.body.appendChild(indicator);
    
    function updateOnlineStatus() {
        if (!navigator.onLine) {
            indicator.classList.add('show');
        } else {
            indicator.classList.remove('show');
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
}

// Initialize mobile features when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (isMobileDevice()) {
            setTimeout(initializeMobileMenu, 1000);
            initializeOfflineDetection();
        }
    });
} else {
    if (isMobileDevice()) {
        setTimeout(initializeMobileMenu, 1000);
        initializeOfflineDetection();
    }
}

console.log("✅ Utility functions loaded");
