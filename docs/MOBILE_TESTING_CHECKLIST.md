# 📱 Mobile Testing Checklist

## Quick Mobile Test Guide
This checklist helps you quickly verify that all mobile optimizations are working correctly.

---

## ✅ Pre-Test Setup

### 1. Clear Cache
- [ ] Clear browser cache
- [ ] Hard reload (Ctrl+Shift+R or Cmd+Shift+R)
- [ ] Test in private/incognito mode

### 2. Test Devices
Test on at least 3 different screen sizes:
- [ ] Small phone (360-375px) - iPhone SE, Galaxy S8
- [ ] Medium phone (390-414px) - iPhone 12/13, Pixel
- [ ] Tablet (768-1024px) - iPad, Android tablets

### 3. Test Browsers
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Firefox
- [ ] Samsung Internet (optional)

---

## 🎮 Game Functionality Tests

### Loading Screen
- [ ] Title displays correctly
- [ ] Text is readable
- [ ] Spinner animation works
- [ ] No horizontal scroll
- [ ] Transitions smoothly to auth

### Authentication
- [ ] Login form fits on screen
- [ ] Input fields don't zoom on focus (iOS)
- [ ] Buttons are easily tappable (44px+)
- [ ] Tab buttons work (Login/Register)
- [ ] No layout shift when keyboard appears
- [ ] Can scroll form if keyboard covers inputs

### Main Menu / Sidebar
- [ ] Hamburger menu button visible (top-right)
- [ ] Tapping hamburger opens sidebar
- [ ] Sidebar slides in smoothly
- [ ] Overlay appears behind sidebar
- [ ] Tapping overlay closes sidebar
- [ ] Close button (×) works in sidebar
- [ ] Character info displays correctly
- [ ] Stats are readable and well-spaced
- [ ] Navigation buttons stack nicely
- [ ] All nav buttons are tappable
- [ ] Menu closes after navigation

### Profile Editor
- [ ] ✏️ Edit Profile button works
- [ ] Modal fits on screen
- [ ] Avatar grid displays in columns
- [ ] Category tabs wrap properly
- [ ] Avatar icons are visible
- [ ] Selection highlights work
- [ ] Save button is accessible
- [ ] Can scroll through avatars
- [ ] Modal closes properly

### Battle System
- [ ] Battle screen fits without scroll
- [ ] Enemy and player info visible
- [ ] Health bars display correctly
- [ ] Action buttons are large enough
- [ ] Battle log is readable
- [ ] Can scroll battle log
- [ ] Damage numbers visible
- [ ] Victory/defeat screens fit

### Shop & Inventory
- [ ] Shop items grid properly
- [ ] Item cards are readable
- [ ] Buy buttons work
- [ ] Prices visible
- [ ] Equipment slots display
- [ ] Can equip/unequip items
- [ ] Inventory scrolls smoothly
- [ ] Item details visible

### Map / Territories
- [ ] Territory grid displays
- [ ] Territory cards fit screen
- [ ] Can scroll territory list
- [ ] Territory info readable
- [ ] Attack buttons work
- [ ] Progress bars visible
- [ ] Territory details accessible

### Skills
- [ ] Skills list displays
- [ ] Progress bars visible
- [ ] Train buttons accessible
- [ ] Skill levels readable
- [ ] XP costs visible

### Squad
- [ ] Squad members display
- [ ] Member cards readable
- [ ] Recruit button accessible
- [ ] Can scroll squad list
- [ ] Member stats visible

### Leaderboard
- [ ] Leaderboard fits screen
- [ ] Player rankings visible
- [ ] Can scroll leaderboard
- [ ] Stats columns readable
- [ ] Avatar images load

### Quests
- [ ] Quest list displays
- [ ] Quest cards readable
- [ ] Can scroll quests
- [ ] Accept/abandon buttons work
- [ ] Quest progress visible

---

## 🛡️ Admin Portal Tests

### Admin Login
- [ ] Login form fits screen
- [ ] Shield icon visible
- [ ] Input fields accessible
- [ ] Login button works
- [ ] No zoom on input focus

### Admin Dashboard
- [ ] Header displays properly
- [ ] Tabs wrap on mobile
- [ ] All 6 tabs visible
- [ ] Tab switching works
- [ ] Content scrolls smoothly

### Overview Tab
- [ ] Stats cards display
- [ ] Stats are readable
- [ ] Grid stacks on mobile
- [ ] Recent activity visible

### Players Tab
- [ ] Player table displays
- [ ] Table scrolls horizontally
- [ ] Search box accessible
- [ ] Avatar images visible
- [ ] Action buttons work
- [ ] Gift modal fits screen

### Content Tab
- [ ] Form fields display
- [ ] Text inputs accessible
- [ ] Textareas expandable
- [ ] Save button visible
- [ ] Success message shows

### Storyline Tab
- [ ] Intro textarea accessible
- [ ] Milestone list displays
- [ ] Add milestone button works
- [ ] Milestone cards readable
- [ ] Edit/delete buttons accessible
- [ ] Quest templates visible

### Visual Theme Tab
- [ ] Color pickers display
- [ ] Color inputs work
- [ ] Background options visible
- [ ] Live preview displays
- [ ] Preview box readable
- [ ] Save button accessible

### Game Settings Tab
- [ ] Settings form displays
- [ ] Number inputs accessible
- [ ] Range sliders work
- [ ] Checkboxes tappable
- [ ] Save button visible

### Import/Export
- [ ] Export button works
- [ ] JSON downloads properly
- [ ] Import input accessible
- [ ] Import button works
- [ ] Confirmation messages show

---

## 📏 Layout & Design Tests

### Portrait Mode
- [ ] No horizontal scroll anywhere
- [ ] All content fits width
- [ ] Sidebar hidden by default
- [ ] Menu button visible
- [ ] Text is readable
- [ ] Images scale properly
- [ ] Buttons don't overlap
- [ ] Forms fit screen

### Landscape Mode
- [ ] Layout adapts properly
- [ ] Sidebar behavior correct
- [ ] Content readable
- [ ] Tabs display nicely
- [ ] No awkward spacing
- [ ] Everything accessible

### Font Sizes
- [ ] Headers readable (not too big/small)
- [ ] Body text comfortable to read
- [ ] Input text doesn't cause zoom (16px+)
- [ ] Button text visible
- [ ] Small text still legible

### Touch Targets
- [ ] All buttons minimum 44x44px
- [ ] Enough space between buttons
- [ ] Links have padding
- [ ] No accidental taps
- [ ] Checkboxes/radios large enough

### Spacing
- [ ] Content not cramped
- [ ] Sections separated clearly
- [ ] Padding feels right
- [ ] Margins appropriate
- [ ] No overlapping elements

### Colors & Contrast
- [ ] Text readable on backgrounds
- [ ] Links visually distinct
- [ ] Active states visible
- [ ] Focus indicators clear
- [ ] Theme colors consistent

---

## 🚀 Performance Tests

### Load Time
- [ ] First paint < 2s
- [ ] Interactive < 3s
- [ ] Full load < 5s
- [ ] No blocking resources

### Animations
- [ ] Smooth 60 FPS
- [ ] No janky scrolling
- [ ] Transitions fluid
- [ ] No lag on interactions

### Scrolling
- [ ] Smooth vertical scroll
- [ ] Smooth horizontal scroll (tables)
- [ ] No bounce issues
- [ ] Momentum scrolling works

### Network
- [ ] Works on WiFi
- [ ] Works on 4G/5G
- [ ] Works on slow 3G
- [ ] Offline indicator appears when offline
- [ ] Reconnects when back online

---

## 🔧 Special Feature Tests

### iOS Specific
- [ ] No zoom on input focus
- [ ] Safe area respected (notch)
- [ ] Status bar color correct
- [ ] Add to home screen works
- [ ] Standalone mode works
- [ ] Keyboard doesn't cover inputs
- [ ] Back swipe doesn't break UI

### Android Specific
- [ ] Theme color applied
- [ ] Back button behaves correctly
- [ ] Menu closes with back button
- [ ] Chrome address bar color matches
- [ ] Pull-to-refresh disabled
- [ ] Install prompt works (PWA)

### Touch Gestures
- [ ] Tap works everywhere
- [ ] Long press works (where applicable)
- [ ] Swipe to close menu works
- [ ] Pinch zoom disabled where needed
- [ ] Double tap zoom disabled

### Offline Mode
- [ ] Offline indicator appears
- [ ] Can still navigate (if cached)
- [ ] Error messages appropriate
- [ ] Reconnect detected
- [ ] Indicator disappears when online

---

## 🐛 Common Issues to Check

### Layout Issues
- [ ] No horizontal scroll (except tables)
- [ ] No content cut off
- [ ] No overlapping elements
- [ ] No text overflow
- [ ] No broken grid layouts

### Input Issues
- [ ] No zoom on input focus
- [ ] Keyboard doesn't cover submit button
- [ ] Can scroll to see covered fields
- [ ] Input values save correctly
- [ ] Autocomplete works

### Button Issues
- [ ] All buttons tappable
- [ ] No buttons too small
- [ ] No accidental double-taps
- [ ] Active state visible
- [ ] Loading state clear

### Image Issues
- [ ] Avatar images load
- [ ] Images don't overflow
- [ ] Images scale properly
- [ ] Placeholder if image fails
- [ ] No broken image icons

### Modal Issues
- [ ] Modals fit on screen
- [ ] Can scroll modal content
- [ ] Close button accessible
- [ ] Overlay darkens background
- [ ] Modal centered

---

## 📊 Test Results Template

### Device: ____________________
### Browser: ___________________
### Screen Size: _______________
### Date: ______________________

#### Issues Found:
1. ________________________________
2. ________________________________
3. ________________________________

#### Screenshots Attached:
- [ ] Issue 1
- [ ] Issue 2
- [ ] Issue 3

#### Overall Rating:
- [ ] ⭐ Poor (unusable)
- [ ] ⭐⭐ Fair (major issues)
- [ ] ⭐⭐⭐ Good (minor issues)
- [ ] ⭐⭐⭐⭐ Very Good (small tweaks needed)
- [ ] ⭐⭐⭐⭐⭐ Excellent (perfect)

---

## 🎯 Priority Issues

### Critical (Must Fix Immediately)
- Blocks core gameplay
- Causes crashes
- Makes features unusable
- Data loss

### High (Fix Soon)
- Significant usability issues
- Layout problems
- Performance issues
- Missing functionality

### Medium (Fix When Possible)
- Minor layout issues
- Small UX improvements
- Non-critical bugs
- Polish items

### Low (Nice to Have)
- Visual refinements
- Optional features
- Edge case issues
- Minor improvements

---

## 📞 Reporting Issues

When reporting mobile issues, include:

1. **Device Info**
   - Device model (e.g., iPhone 13)
   - OS version (e.g., iOS 17.1)
   - Screen size (e.g., 390x844px)

2. **Browser Info**
   - Browser name (e.g., Safari)
   - Browser version
   - Rendering engine

3. **Issue Details**
   - What you expected
   - What actually happened
   - Steps to reproduce
   - Screenshots/video

4. **Additional Context**
   - Network condition (WiFi/4G/3G)
   - Orientation (portrait/landscape)
   - Other apps running
   - Recent actions before issue

---

## ✅ Sign-Off

### Tested By: ____________________
### Date: _________________________
### All Critical Tests Passed: [ ] Yes [ ] No
### Ready for Production: [ ] Yes [ ] No

### Notes:
_________________________________
_________________________________
_________________________________

---

**Remember**: Real device testing is essential! Emulators can't catch everything.

Test on actual phones and tablets whenever possible! 📱✨
