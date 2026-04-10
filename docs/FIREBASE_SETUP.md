# 🔥 Firebase Login Troubleshooting Guide

## Issue: Firebase Login Not Working

### Step 1: Have you configured Firebase yet?

The firebase-config.js file currently has **placeholder values** that need to be replaced with your actual Firebase credentials.

#### ⚠️ Current Status:
Your `firebase-config.js` has:
```javascript
apiKey: "YOUR_API_KEY_HERE",  // ❌ This is a placeholder!
```

### Step 2: Get Your Real Firebase Config

1. **Go to Firebase Console**: https://console.firebase.google.com/

2. **Create a Project** (if you haven't):
   - Click "Add project"
   - Name it (e.g., "spartan-conquest")
   - Continue through the setup

3. **Enable Authentication**:
   - Left sidebar → **Build** → **Authentication**
   - Click "Get started"
   - Select **Email/Password** provider
   - Toggle **Enable** switch to ON
   - Click **Save**

4. **Enable Firestore**:
   - Left sidebar → **Build** → **Firestore Database**
   - Click "Create database"
   - Choose **Production mode**
   - Select a location
   - Click **Enable**

5. **Get Your Config**:
   - Click the ⚙️ gear icon (Project Settings)
   - Scroll to "Your apps" section
   - Click the **</>** (Web) icon
   - Register app with a nickname
   - **COPY** the firebaseConfig object

### Step 3: Update firebase-config.js

Open: `public/scripts/firebase-config.js`

Replace with your REAL config:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyABCDEFGHIJKLMNOPQRSTUVWXYZ",  // Your real key!
    authDomain: "spartan-conquest-12345.firebaseapp.com",
    projectId: "spartan-conquest-12345",
    storageBucket: "spartan-conquest-12345.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456",
    databaseURL: "https://spartan-conquest-12345-default-rtdb.firebaseio.com"
};
```

### Step 4: Deploy Firestore Rules

After updating config, deploy security rules:

```bash
firebase login
firebase init
firebase deploy --only firestore:rules
```

### Step 5: Test

1. **Refresh your browser** (Ctrl + F5)
2. Try to **register** a new account
3. Check browser console (F12) for any errors

## Common Errors & Fixes

### Error: "Firebase not defined"
**Fix**: Make sure you updated firebase-config.js with real credentials

### Error: "auth/invalid-api-key"
**Fix**: Double-check your apiKey is correct (no spaces, complete key)

### Error: "auth/configuration-not-found"
**Fix**: Enable Email/Password authentication in Firebase Console

### Error: "Missing or insufficient permissions"
**Fix**: Deploy Firestore rules: `firebase deploy --only firestore:rules`

### Error: Nothing happens when clicking login
**Fix**: Open browser console (F12) to see the actual error

## Quick Test Checklist

- [ ] Created Firebase project
- [ ] Enabled Authentication (Email/Password provider)
- [ ] Enabled Firestore Database
- [ ] Copied REAL config values
- [ ] Updated firebase-config.js (no "YOUR_" placeholders)
- [ ] Refreshed browser (Ctrl + F5)
- [ ] Opened browser console (F12) to check errors

## Still Not Working?

1. **Open Browser Console** (F12 or Right-click → Inspect → Console)
2. **Copy the error message** you see
3. Send me the error message so I can help fix it!

---

**Most likely issue**: You need to replace the placeholder values in firebase-config.js with your actual Firebase project credentials! 🔥
