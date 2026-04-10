# 🎨 Avatar Visual Reference

## Avatar Preview Guide

Below is a reference for all 20 avatars with their visual characteristics:

### 🛡️ Spartan Warriors

| Avatar | Icon | Color Scheme | Description |
|--------|------|--------------|-------------|
| **Spartan Warrior** | ⚔️ | Dark Red → Blood Red | Classic hoplite warrior |
| **Spartan King** | 👑 | Gold → Bronze | Royal golden armor |
| **Elite Hoplite** | 🛡️ | Crimson → Dark Red | Battle-scarred veteran |
| **Spartan General** | ⚡ | Dark Red → Black | Commander's authority |

### 🏛️ Greek Warriors

| Avatar | Icon | Color Scheme | Description |
|--------|------|--------------|-------------|
| **Athenian Soldier** | 🏛️ | Royal Blue → Navy | Democratic warrior |
| **Theban Champion** | 💪 | Dark Slate → Purple | Sacred Band strength |
| **Macedonian Warrior** | 🏹 | Teal → Cyan | Phalanx formation |

### ⭐ Legendary Heroes

| Avatar | Icon | Color Scheme | Description |
|--------|------|--------------|-------------|
| **Achilles** | ✨ | Gold → Tomato Red | Greatest warrior sparkle |
| **Leonidas** | 🦁 | Dark Red → Gold | Lion of Sparta |
| **Perseus** | ⚔️ | Steel Blue → Navy | Gorgon slayer |
| **Hercules** | 🦾 | Orange Red → Brown | Demigod strength |

### 👸 Female Warriors

| Avatar | Icon | Color Scheme | Description |
|--------|------|--------------|-------------|
| **Amazon Warrior** | 🏹 | Medium Purple → Indigo | Fierce archer |
| **Spartan Woman** | 🌸 | Crimson → Burgundy | Trained fighter |
| **Athena's Priestess** | 🦉 | Gold → Bronze | Wisdom warrior |

### ⚡ Special Classes

| Avatar | Icon | Color Scheme | Description |
|--------|------|--------------|-------------|
| **Gladiator** | ⚔️ | Saddle Brown → Dark Brown | Arena champion |
| **Assassin** | 🗡️ | Dark Slate → Black | Shadow operative |
| **Mercenary** | 💰 | Gray → Charcoal | Gold-driven warrior |

### 🌟 Mythical (Animated Glow)

| Avatar | Icon | Color Scheme | Animation |
|--------|------|--------------|-----------|
| **Demigod** | ⚡ | Gold → Pink → Blue | Pulsing glow effect |
| **Olympian Champion** | ☀️ | White → Gold → Sky Blue | Divine radiance |
| **Titan Warrior** | 🔱 | Indigo → Red → Black | Dark power pulse |

## Color Legend

### Rarity-Style Color Schemes
- **Common Warriors**: Single gradient (red, blue)
- **Legendary**: Dual-tone gradients (gold/red)
- **Mythical**: Triple gradient with animation

## CSS Implementation

### Standard Avatar Structure
```css
.avatar-{name} {
    background: radial-gradient(circle at 30% 30%, {color1}, {color2});
    position: relative;
}
.avatar-{name}::before {
    content: '{emoji}';
    font-size: 40px;
    /* centered positioning */
}
```

### Mythical Avatar (Animated)
```css
.avatar-demigod {
    background: radial-gradient(circle at 30% 30%, #ffd700, #ff69b4, #4169e1);
    animation: mythical-glow 2s ease-in-out infinite;
}
```

## Emoji Reference

### Weapons & Combat
- ⚔️ Sword (Warriors, Heroes)
- 🛡️ Shield (Defenders)
- 🏹 Bow (Archers, Amazons)
- 🗡️ Dagger (Assassins)

### Status & Power
- 👑 Crown (Kings, Royalty)
- ⚡ Lightning (Power, Speed)
- ✨ Sparkle (Legendary Status)
- 🔱 Trident (Divine Power)

### Creatures & Symbols
- 🦁 Lion (Leonidas - Bravery)
- 🦉 Owl (Athena - Wisdom)
- 🦾 Muscle (Hercules - Strength)
- 🌸 Flower (Femininity)

### Misc
- 🏛️ Temple (Athens - Culture)
- 💪 Flexed Arm (Strength)
- 💰 Money Bag (Mercenary)
- ☀️ Sun (Divine Light)

## Visual Hierarchy

### Size & Spacing
- Avatar Container: **80x80px**
- Border: **3px gold**
- Icon Size: **40px**
- Border Radius: **50%** (circle)

### Shadow & Effects
```css
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
image-rendering: pixelated;
```

## Category Theming

### Spartan (Red Theme)
Primary color: Crimson (#DC143C)
Secondary: Dark Red (#8B0000)
Theme: Discipline, Strength

### Greek (Blue Theme)
Primary color: Royal Blue (#4169E1)
Secondary: Navy (#191970)
Theme: Democracy, Wisdom

### Legendary (Gold Theme)
Primary color: Gold (#FFD700)
Secondary: Various (unique per hero)
Theme: Fame, Glory

### Female (Purple/Pink Theme)
Primary color: Purple (#9370DB)
Secondary: Indigo (#4B0082)
Theme: Grace, Ferocity

### Special (Dark Theme)
Primary color: Gray/Brown
Secondary: Black/Charcoal
Theme: Mystery, Pragmatism

### Mythical (Rainbow Theme)
Multi-color gradients
Animated glow effect
Theme: Divine Power

## Customization Tips

### Change Avatar Colors
1. Find avatar class in `avatars.css`
2. Modify `radial-gradient` colors
3. Use hex codes for precision

### Change Avatar Icon
1. Find `::before` pseudo-element
2. Change `content: '{emoji}'`
3. Or use Unicode: `content: '\u2694'`

### Add Real Images
1. Replace gradient with `background-image`
2. Use PNG files (80x80px)
3. Path: `/assets/images/avatars/`

### Animation Speed
```css
animation: mythical-glow 2s ease-in-out infinite;
/* Change 2s to adjust speed */
```

## Accessibility Notes

### Color Contrast
All avatars have high contrast between:
- Background gradient
- Gold border
- Emoji icon

### Visual Indicators
- **Selected**: Gold glow shadow
- **Hover**: Scale transform (1.05)
- **Category Active**: Gold background tab

## Performance

### CSS-Only Benefits
- ✅ No HTTP requests
- ✅ Instant rendering
- ✅ Zero loading time
- ✅ Scalable vectors (emoji)

### Memory Usage
- Each avatar: ~1KB CSS
- Total system: ~20KB
- No image bandwidth

## Future Enhancements

### Possible Additions
1. **Animated Avatars**: Keyframe sequences
2. **Particle Effects**: CSS particles around mythical
3. **Hover Tooltips**: Show stats/lore
4. **Avatar Frames**: Unlockable borders
5. **Seasonal Variants**: Holiday themes

### Real Image Integration
When ready to add PNG images:
1. Download from Itch.io or OpenGameArt
2. Resize to 80x80px
3. Save in `/assets/images/avatars/`
4. Update CSS to use `background-image`

---

**All avatars use CSS gradients + emoji for lightweight, fast loading!** 🚀
