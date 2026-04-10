# 🛡️ Admin Panel Guide

## Access the Admin Panel

**URL:** Open `admin.html` in your browser
**Default Login:**
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Change the default password in `admin-panel.js` before deploying!

---

## 🔒 Change Admin Password

1. Open `admin-panel.js`
2. Find this section (around line 3):
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // CHANGE THIS!
};
```
3. Change the password to something secure
4. Save the file

---

## 📊 Admin Dashboard Features

### 1. **Statistics Overview**
- **Total Players:** See how many users have registered
- **Online Now:** Players active in the last 5 minutes
- **Total Territories:** All territories conquered by players
- **Battles Today:** Number of battles fought today

### 2. **Player Management**

#### View All Players
- See complete list of all registered players
- Columns: Username, Email, Level, Rank, Gold, Last Seen
- Real-time data from Firebase or localStorage

#### Search Players
- Search by username or email
- Instant filtering

#### Player Actions

**🎁 Gift Button** - Send free items to players:
- **Gold:** Give 1-10,000 gold
- **Experience Points:** Give 1-10,000 XP
- **Equipment:** Choose from 13 different items:
  - Weapons: Bronze Sword, Iron Sword, Steel Sword, Spartan Blade
  - Shields: Bronze Shield, Hoplon Shield, Spartan Shield
  - Helmets: Bronze Helmet, Corinthian Helmet, Spartan Helmet
  - Armor: Leather Armor, Bronze Cuirass, Spartan Cuirass

**👁️ View Button** - See detailed player stats:
- All character stats
- Inventory
- Progress details
- Last login time

---

## 🎁 How to Gift Items

### Gift Gold:
1. Click "🎁 Gift" button next to player name
2. Select "Gold" from dropdown
3. Enter amount (1-10,000)
4. Click "Send Gift"

### Gift Experience:
1. Click "🎁 Gift" button
2. Select "Experience Points"
3. Enter XP amount
4. Click "Send Gift"

### Gift Equipment:
1. Click "🎁 Gift" button
2. Select "Equipment"
3. Click on the item you want to gift
4. Click "Send Gift"

---

## 🔧 Technical Details

### Works with Both Modes:
- ✅ Firebase Mode (real-time database)
- ✅ Demo Mode (localStorage)

### Data Sources:
- **Firebase:** Reads from `users` collection
- **Demo Mode:** Reads from `localStorage` keys starting with `demo_users_`

### Security:
- Simple username/password authentication
- No database connection for admin credentials (client-side only)
- For production, implement proper Firebase admin authentication

---

## 🚀 Deployment

### For Firebase Hosting:
1. Make sure `admin.html` and `admin-panel.js` are in your project root
2. Update `firebase.json` to include admin files:
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```
3. Deploy: `firebase deploy`

### Access Online:
- `https://your-project-id.web.app/admin.html`

---

## 🔐 Security Best Practices

### For Production:

1. **Change Default Password** (MUST DO!)
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'YourSecurePasswordHere123!'
};
```

2. **Use Firebase Admin SDK** (Recommended):
- Create separate Firebase admin authentication
- Use Firebase Security Rules to restrict admin access
- Implement server-side admin functions

3. **Add IP Restrictions:**
- Use Firebase Hosting rewrites
- Restrict admin panel to specific IPs

4. **Enable HTTPS:**
- Always use HTTPS in production
- Firebase Hosting provides this automatically

---

## 📱 Admin Panel Features Breakdown

### Current Features:
✅ View all players
✅ Search players
✅ Gift gold to players
✅ Gift XP to players
✅ Gift equipment to players
✅ View player details
✅ Real-time statistics
✅ Works with Demo Mode
✅ Works with Firebase

### Future Features (Coming Soon):
⏳ Ban/Unban players
⏳ Edit player stats directly
⏳ View player activity logs
⏳ Send in-game messages
⏳ Create custom events
⏳ Generate reports
⏳ Backup player data

---

## 🆘 Troubleshooting

### "No players found"
- Make sure players have registered in the game
- Check if Firebase is properly configured
- In demo mode, at least one player must register first

### "Error loading dashboard"
- Check browser console (F12) for errors
- Verify Firebase configuration
- Check internet connection

### Gift not appearing for player
- Player needs to refresh their game
- Check browser console for errors
- Verify player UID is correct

### Can't login to admin panel
- Verify username and password in `admin-panel.js`
- Check browser console for JavaScript errors
- Clear browser cache

---

## 🎮 Usage Example

1. **Open admin panel:** `admin.html`
2. **Login:** Use admin credentials
3. **Find player:** Search for username
4. **Click Gift:** Select the player
5. **Choose gift type:** Gold, XP, or Equipment
6. **Send:** Click "Send Gift"
7. **Confirmation:** Player receives gift immediately

---

## 📝 Notes

- Players must refresh their game to see gifted items
- Gifts are added instantly to player data
- All actions are logged in browser console
- Admin panel works offline in demo mode
- For multiple admins, implement Firebase Authentication

---

## 🔗 Related Files

- `admin.html` - Admin panel interface
- `admin-panel.js` - Admin panel logic
- `public/scripts/firebase-config.js` - Database configuration
- `public/index.html` - Main game (where players see gifts)

---

**Made with ❤️ for Game Masters**

*Remember to change the default password!* 🔒
