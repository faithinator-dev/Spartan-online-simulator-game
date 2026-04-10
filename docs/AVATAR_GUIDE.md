# 🎭 Avatar System Guide

## Overview
The avatar system allows players to customize their character profile with 20 different warrior avatars across 6 categories.

## Features

### 20 Unique Avatars
Players can choose from:
- **Spartan Warriors** (4 avatars)
  - Spartan Warrior - Classic red-cloaked hoplite
  - Spartan King - Royal warrior with golden armor
  - Elite Hoplite - Veteran with battle scars
  - Spartan General - Commander with horsehair crest

- **Greek Warriors** (3 avatars)
  - Athenian Soldier - Blue-armored warrior
  - Theban Champion - Sacred Band member
  - Macedonian Warrior - Phalanx sarissa bearer

- **Legendary Heroes** (4 avatars)
  - Achilles - Greatest Greek warrior
  - Leonidas - King of Sparta
  - Perseus - Slayer of Medusa
  - Hercules - Son of Zeus

- **Female Warriors** (3 avatars)
  - Amazon Warrior - Fierce female fighter
  - Spartan Woman - Trained Spartan female
  - Athena's Priestess - Divine wisdom warrior

- **Special Classes** (3 avatars)
  - Gladiator - Arena champion
  - Assassin - Silent shadow warrior
  - Mercenary - Sword for hire

- **Mythical** (3 avatars)
  - Demigod - Half-mortal, half-divine (animated glow)
  - Olympian Champion - Blessed by gods (animated glow)
  - Titan Warrior - Ancient power (animated glow)

## How to Use

### Editing Profile
1. Click **"✏️ Edit Profile"** button in the character panel
2. Browse avatars by category using tabs
3. Click on any avatar to preview it
4. Click **"Save Changes"** to confirm

### Avatar Display
- Avatar appears at the top of the character info panel
- 80x80px circular avatar with gold border
- CSS-based graphics with emoji icons
- Smooth animations for mythical avatars

## Technical Details

### Files Created
1. **avatars.js** - Avatar database with 20 avatars
2. **avatars.css** - Styling for avatars and profile modal
3. **profile.js** - Profile editing logic and UI

### Avatar Data Structure
```javascript
{
    id: 'spartan_warrior',
    name: 'Spartan Warrior',
    category: 'Spartan',
    cssClass: 'avatar-spartan-warrior',
    description: 'Classic red-cloaked Spartan hoplite'
}
```

### Storage
- Avatar selection saved in `playerCharacter.avatar`
- Syncs to Firebase or localStorage (demo mode)
- Default avatar: `spartan_warrior`

## CSS Styling

### Avatar Classes
Each avatar has unique gradient background and emoji:
- Spartan Warriors: Red gradients with weapon/shield emojis
- Greek Warriors: Blue/purple gradients with cultural emojis
- Legendary Heroes: Gold/bright gradients with heroic emojis
- Female Warriors: Purple/pink gradients with feminine emojis
- Special Classes: Dark/gray gradients with role emojis
- Mythical: Multi-color gradients with animated glow

### Profile Modal
- Centered modal with dark background
- Category tabs for easy navigation
- Responsive grid layout (auto-fill)
- Scrollable avatar list
- Selected avatar highlighted with gold border

## Adding Custom Avatars

Want to add real character images? Replace CSS avatars with PNG files:

1. **Add images to** `/public/assets/images/avatars/`
   - Format: `avatar-{id}.png` (e.g., `avatar-spartan-warrior.png`)
   - Size: 80x80px recommended
   - Format: PNG with transparency

2. **Update CSS** in `avatars.css`:
   ```css
   .avatar-spartan-warrior {
       background-image: url('/assets/images/avatars/avatar-spartan-warrior.png');
       background-size: cover;
       background-position: center;
   }
   ```

3. **Remove emoji** ::before pseudo-element from CSS

### Free Avatar Resources
- **OpenGameArt.org**: Free pixel art character portraits
- **Itch.io**: Tiny RPG Character packs, 32rogues
- **Kenney.nl**: Free game assets with character faces
- **Freepik**: Medieval warrior portraits (check license)

## Customization

### Change Categories
Edit `AVATARS` object in `avatars.js`:
```javascript
category: 'YourCategory' // Will automatically appear in tabs
```

### Add New Avatars
1. Add to `AVATARS` object in `avatars.js`
2. Create CSS class in `avatars.css`
3. Avatar will automatically appear in profile editor

### Modify Grid Layout
Edit in `avatars.css`:
```css
.avatar-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 15px;
}
```

## Integration Points

### Character Display
- Avatar shown in character info panel
- Auto-initializes on game load
- Updates when profile saved

### Save System
- Saves with character data
- Firebase: `/users/{userId}/character/avatar`
- LocalStorage: `spartanCharacter` object

### Future Enhancements
- Unlock avatars by achievements
- Premium avatars for high-level players
- Custom avatar upload (future feature)
- Avatar frames/borders
- Animated avatars

## Troubleshooting

### Avatar Not Showing
- Check browser console for errors
- Verify `profile.js` loaded after `character.js`
- Ensure `playerCharacter.avatar` exists

### Profile Modal Won't Open
- Check if "Edit Profile" button exists
- Verify `avatars.css` is loaded
- Check for JavaScript errors

### Avatar Not Saving
- Verify `saveCharacter()` function works
- Check Firebase/localStorage connection
- Ensure `playerCharacter.avatar` is set

## Admin Integration

Admins can see player avatars in the admin panel (future feature):
- Add avatar column to player table
- Display player's chosen avatar
- Track avatar popularity

## Performance

- CSS-based avatars = lightweight
- No image loading delays
- Instant avatar switching
- Minimal memory footprint

## Accessibility

- High contrast avatars
- Clear category labels
- Keyboard navigation support (future)
- Screen reader friendly descriptions

---

**Enjoy customizing your warrior profile!** ⚔️

Created as part of Spartan Conquest - Rise of Legends
