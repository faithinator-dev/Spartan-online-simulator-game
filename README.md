# ⚔️ SPARTAN CONQUEST - Rise of Legends

A web-based text RPG where you rise from a young Spartan trainee to a legendary commander, conquering the ancient world!

![Game Version](https://img.shields.io/badge/version-1.0.0-gold)
![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎮 Game Features

### Character System
- **Dynamic Age System**: Start as a child (8-16 years old) and grow into a legend
- **Progressive Ranks**: Rise from Trainee → Young Warrior → Hoplite → Squad Leader → Commander → General → War Master → Legendary Spartan
- **6 Trainable Skills**: Combat, Tactics, Leadership, Survival, Hunting, Stealth
- **Equipment System**: Head, Body, Legs, Weapon, Shield slots with various tiers

### Combat & Battles
- **Turn-based Combat**: Strategic solo battles against various enemies
- **Multiple Enemy Types**: Training dummies, wild boars, bandits, warriors, champions
- **Critical Hits**: 5% chance for double damage
- **Battle Log**: Real-time combat feedback

### World Conquest
- **50+ Territories**: Conquer cities across Greece, Persia, Egypt, Rome, and Asia Minor
- **Territory Management**: Defend and fortify your conquered lands
- **Resource System**: Gain gold and resources from territories
- **Strategic Map**: Visual representation of your empire

### Progression
- **Level System**: Gain XP to level up and increase stats
- **Quest System**: Complete various quests for rewards
- **Squad Management**: Recruit and command warriors (unlocks at level 5)
- **Equipment Shop**: Purchase better weapons and armor

### Social Features
- **Leaderboards**: Compete for top rankings
- **Multiple Categories**: Level, Territories, Reputation
- **Player Ratings**: Rate and comment on other players (coming soon)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Firebase account ([Create one here](https://firebase.google.com/))
- Node.js and npm (for Firebase CLI)

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Name it "spartan-conquest" (or your choice)
   - Follow the setup wizard

2. **Enable Firebase Services**
   
   **Authentication:**
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"
   
   **Firestore Database:**
   - Go to Firestore Database
   - Click "Create Database"
   - Start in production mode
   - Choose your location
   
   **Realtime Database (Optional):**
   - Go to Realtime Database
   - Click "Create Database"
   - Start in locked mode

3. **Get Your Firebase Config**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click the web icon (</>)
   - Register your app
   - Copy the firebaseConfig object

4. **Update Firebase Configuration**
   - Open `public/scripts/firebase-config.js`
   - Replace the placeholder values with your actual Firebase config:
   
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_ACTUAL_API_KEY",
       authDomain: "your-project-id.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project-id.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID",
       databaseURL: "https://your-project-id-default-rtdb.firebaseio.com"
   };
   ```

### Local Development

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase in Project**
   ```bash
   cd "c:\Users\HomePC\Desktop\code\Spartan text based game"
   firebase init
   ```
   - Select: Hosting, Firestore
   - Use existing project
   - Select your Firebase project
   - Use `public` as public directory
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Deploy Firestore Rules**
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only firestore:indexes
   ```

5. **Run Locally**
   ```bash
   firebase serve
   ```
   - Open http://localhost:5000

### Deploy to Production

```bash
firebase deploy
```

Your game will be live at: `https://your-project-id.web.app`

## 📁 Project Structure

```
spartan-conquest/
├── public/
│   ├── index.html              # Main HTML file
│   ├── styles/
│   │   ├── main.css           # Core styles
│   │   ├── components.css     # Component styles
│   │   └── animations.css     # Animations
│   ├── scripts/
│   │   ├── app.js             # Main entry point
│   │   ├── firebase-config.js # Firebase setup
│   │   ├── auth.js            # Authentication
│   │   ├── character.js       # Character management
│   │   ├── combat.js          # Battle system
│   │   ├── map.js             # Territory system
│   │   ├── inventory.js       # Equipment & shop
│   │   ├── quests.js          # Quest system
│   │   ├── squad.js           # Squad management
│   │   ├── ui.js              # UI management
│   │   └── utils.js           # Utility functions
│   └── assets/
│       ├── images/            # Game images
│       └── sounds/            # Sound effects
├── firebase.json              # Firebase config
├── firestore.rules           # Database security
├── firestore.indexes.json    # Database indexes
└── README.md                 # This file
```

## 🎯 Gameplay Guide

### Starting Your Journey

1. **Create Account**: Register with email and password
2. **Choose Name**: Pick your warrior name (min 3 characters)
3. **Starting Stats**: You begin as a child trainee with basic stats

### Early Game (Level 1-10)

- **Train Daily**: Complete training quests for XP
- **Hunt Wildlife**: Fight boars for gold and experience
- **Buy Equipment**: Upgrade from wooden to bronze gear
- **Level Skills**: Focus on Combat and Survival skills

### Mid Game (Level 10-25)

- **Form Squad**: Recruit warriors at level 5+
- **Take Quests**: Complete harder missions
- **First Conquest**: Conquer your first territory at level 15+
- **Upgrade Gear**: Purchase iron and steel equipment

### Late Game (Level 25+)

- **Command Armies**: Lead large squads into battle
- **Expand Empire**: Conquer multiple territories
- **Climb Leaderboards**: Compete for top rankings
- **Master Skills**: Max out all skill trees

## ⚔️ Combat Tips

- **Defend**: Use defend action to reduce incoming damage by 50%
- **Level Match**: Fight enemies near your level for better rewards
- **Equipment**: Always keep your gear updated
- **Health**: Restore HP between battles or after defeat
- **Critical Hits**: Lucky strikes deal double damage!

## 🏛️ Territory Conquest

- **Requirements**: Level 15+ and active squad
- **Cost**: 100 gold per attack
- **Success**: Based on your power vs territory defense
- **Rewards**: XP, gold, resources
- **Defense**: Fortify territories to prevent loss

## 🎖️ Ranks & Squad Sizes

| Rank | Level | Max Squad Size |
|------|-------|----------------|
| Trainee | 1 | 0 |
| Young Warrior | 5 | 3 |
| Hoplite | 10 | 10 |
| Squad Leader | 15 | 20 |
| Commander | 25 | 50 |
| General | 40 | 100 |
| War Master | 60 | 200 |
| Legendary Spartan | 100 | 500 |

## 🛠️ Troubleshooting

### Firebase Connection Issues
- Check that you've replaced the config values
- Verify Firebase services are enabled
- Check browser console for errors

### Can't Login/Register
- Verify Email/Password authentication is enabled
- Check firestore rules are deployed
- Clear browser cache and cookies

### Data Not Saving
- Check internet connection
- Verify Firestore rules allow writes
- Check browser console for errors

### Performance Issues
- Clear browser cache
- Disable browser extensions
- Use a modern browser

## 🔮 Upcoming Features

- [ ] Real-time PvP battles
- [ ] Player alliances
- [ ] Guild system
- [ ] More territories (expand to 50+)
- [ ] Advanced equipment crafting
- [ ] Story campaigns
- [ ] Mobile responsive design
- [ ] Sound effects and music
- [ ] Battle animations
- [ ] Achievement system

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:
- Report bugs
- Suggest features
- Share gameplay feedback

## 📝 License

This project is licensed under the MIT License - feel free to use and modify for your own projects!

## 🙏 Credits

- **Developer**: Your Name
- **Inspired by**: Ancient Spartan history and warrior culture
- **Built with**: Firebase, Vanilla JavaScript, HTML5, CSS3

## 📞 Support

Having issues? Check:
1. This README file
2. Firebase documentation
3. Browser console for errors

---

## 🎮 Quick Start Commands

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Serve locally
firebase serve

# Deploy to production
firebase deploy
```

---

**⚔️ Rise, Spartan! Your legend awaits! ⚔️**

Made with ❤️ for lovers of ancient warfare and strategic RPGs
