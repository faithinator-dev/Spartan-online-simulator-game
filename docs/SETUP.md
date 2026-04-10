# 🚀 Quick Setup Guide - Spartan Conquest

## Step 1: Firebase Setup (5 minutes)

### Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Name it "spartan-conquest"
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Enable Authentication
1. In Firebase Console, go to **Build → Authentication**
2. Click "Get Started"
3. Click "Email/Password" under Sign-in providers
4. Toggle "Enable" to ON
5. Click "Save"

### Enable Firestore Database
1. Go to **Build → Firestore Database**
2. Click "Create database"
3. Select "Start in production mode"
4. Choose your location (closest to you)
5. Click "Enable"

### Get Your Config
1. Go to Project Settings (⚙️ gear icon)
2. Scroll down to "Your apps"
3. Click the Web icon `</>`
4. Register app with nickname "spartan-game"
5. Copy the `firebaseConfig` object

## Step 2: Update Your Config

Open: `public/scripts/firebase-config.js`

Replace the placeholder values:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXX",  // Replace with yours
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:xxxxx",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com"
};
```

## Step 3: Test Locally

### Option A: Simple HTTP Server (Easiest)
```bash
# If you have Python installed:
cd "c:\Users\HomePC\Desktop\code\Spartan text based game\public"
python -m http.server 8000

# Then open: http://localhost:8000
```

### Option B: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option C: Firebase Hosting (Best)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize
cd "c:\Users\HomePC\Desktop\code\Spartan text based game"
firebase init

# Select: Hosting, Firestore
# Public directory: public
# Single-page app: Yes
# Overwrite index.html: No

# Serve locally
firebase serve
# Open: http://localhost:5000
```

## Step 4: Deploy to Production

```bash
# Deploy everything
firebase deploy

# Or deploy specific parts:
firebase deploy --only firestore:rules
firebase deploy --only hosting
```

Your game will be live at: `https://your-project-id.web.app`

## 🎮 Test Your Game

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Play**: 
   - Check your character stats
   - Go to Battle → Start Training
   - Visit the Shop → Buy equipment
   - Try a quest
   - Train skills

## 🐛 Troubleshooting

### "Firebase not defined" error
- Check that firebase-config.js has your real credentials
- Make sure all Firebase SDK scripts load in index.html

### Can't login/register
- Verify Email/Password auth is enabled in Firebase Console
- Check browser console for specific errors

### Data not saving
- Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Check internet connection

### Page is blank
- Open browser console (F12) to see errors
- Make sure you're serving from `public` folder
- Clear browser cache

## ✅ Checklist

- [ ] Created Firebase project
- [ ] Enabled Authentication (Email/Password)
- [ ] Enabled Firestore Database
- [ ] Copied Firebase config
- [ ] Updated firebase-config.js
- [ ] Tested locally
- [ ] Can register/login
- [ ] Can play battles
- [ ] Data saves correctly
- [ ] Ready to deploy!

## 🎯 Next Steps

Once everything works:
1. Customize the game content (quests, enemies, territories)
2. Add more features from the roadmap
3. Share with friends to test
4. Gather feedback
5. Iterate and improve!

---

**Need help? Check the main README.md for detailed documentation!**

**⚔️ Good luck, Spartan! ⚔️**
