# Theme Update Prompt for Claude Code

Copy everything below this line and paste it into Claude Code in VS Code:

---

I need you to update The Beauty Edit app from the current soft pink theme to a "Dark Chocolate" theme — rich, warm, and premium feeling. This targets a woman in her 30s who wants something mature and sophisticated, not cutesy or girly.

## Files to modify

There are 4 files that need changes. Here's exactly what to do in each:

---

### 1. `src/App.jsx` — Color palette + font + emoji refinements

**Replace the `colors` object** (around line 96) from:

```js
const colors = {
  cream: "#FFF8F3", rose: "#E8A0BF", roseDark: "#C5739B", roseLight: "#F5D5E0",
  rosePale: "#FFF0F5", blush: "#F9E4EC", text: "#3D2C2C", textLight: "#8B7272",
  white: "#FFFFFF", border: "#F0E0E0", shadow: "0 2px 12px rgba(200,150,170,0.12)",
  shadowMd: "0 4px 20px rgba(200,150,170,0.15)",
};
```

To:

```js
const colors = {
  cream: "#F9F5F0", rose: "#6B4C3B", roseDark: "#4A3228", roseLight: "#D4C4B8",
  rosePale: "#F0E8E0", blush: "#E8DDD4", text: "#2D1F16", textLight: "#8A756A",
  white: "#FFFFFF", border: "#E0D4C8", shadow: "0 2px 12px rgba(74,50,40,0.08)",
  shadowMd: "0 4px 20px rgba(74,50,40,0.12)",
};
```

**Replace the `CATEGORY_EMOJIS` object** (around line 31) from:

```js
const CATEGORY_EMOJIS = { Skincare: "✨", Makeup: "💄", Haircare: "💇‍♀️", "Body Care": "🧴", Fragrance: "🌸", "Tools & Accessories": "🪞", Other: "📦" };
```

To more refined, minimal emojis:

```js
const CATEGORY_EMOJIS = { Skincare: "◆", Makeup: "●", Haircare: "◇", "Body Care": "○", Fragrance: "❖", "Tools & Accessories": "□", Other: "▪" };
```

**Replace ALL fontFamily references** in the App.jsx file. There are two places where the full font stack is defined (around lines 984 and 1015). Find both occurrences of:

```
fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
```

And replace with:

```
fontFamily: "'Libre Baskerville', 'Georgia', serif"
```

**Update the onboarding emoji** in the OnboardingScreen component. Find the splash logo:

```jsx
<div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
```

Replace with:

```jsx
<div style={{ fontSize: 48, marginBottom: 12 }}>◆</div>
```

**Update the onboarding slide emojis.** Find the slides array in OnboardingScreen:

```js
{ emoji: "✨", title: "Track your beauty journey", ...
{ emoji: "💕", title: "Build your wishlist", ...
{ emoji: "📊", title: "See your spending insights", ...
```

Replace the emojis:

```js
{ emoji: "◆", title: "Track your beauty journey", ...
{ emoji: "♡", title: "Build your wishlist", ...
{ emoji: "▤", title: "See your spending insights", ...
```

**Update the "Get Started" button text.** Find:

```
Get Started 🌸
```

Replace with:

```
Get Started
```

**Update the status pill labels** in the StatusSelector component. Find:

```js
{s === "new" ? "✨ New" : s === "in-use" ? "💫 In Use" : "✅ Finished"}
```

Replace with:

```js
{s === "new" ? "New" : s === "in-use" ? "In Use" : "Finished"}
```

**Update repurchase labels** in RepurchaseSelector. Find:

```js
{v === "yes" ? "💕 Yes" : v === "no" ? "👎 No" : "🤔 Maybe"}
```

Replace with:

```js
{v === "yes" ? "Yes" : v === "no" ? "No" : v === "maybe" ? "Maybe" : v}
```

**Update thought type badges** — there are multiple places where thought type labels appear. Search for all occurrences of these patterns and replace:

```
"💭 First Impression"  →  "First Impression"
"💫 During Use"        →  "During Use"
"✅ Final Verdict"     →  "Final Verdict"
```

**Update priority labels** in AddEditWishlistScreen. Find:

```js
{p === "high" ? "🔥 High" : p === "medium" ? "💫 Medium" : "🌿 Low"}
```

Replace with:

```js
{p === "high" ? "High" : p === "medium" ? "Medium" : "Low"}
```

**Update the wishlist "Promote to Journal" button text.** Find:

```
Promote to Journal ✨
```

Replace with:

```
Promote to Journal →
```

**Update save button texts.** Find these two patterns:

```
"Save Changes" : "Save Product"} 🌸
```

Replace with:

```
"Save Changes" : "Save Product"}
```

And find:

```
"Save Changes" : "Add to Wishlist"} 💕
```

Replace with:

```
"Save Changes" : "Add to Wishlist"}
```

**Update empty state in HomeScreen.** Find:

```jsx
<div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
```

Replace with:

```jsx
<div style={{ fontSize: 32, marginBottom: 8 }}>◇</div>
```

**Update dashboard stat emojis.** In the HomeScreen stats section, find:

```js
{ label: "Products", value: totalProducts, emoji: "📦" },
{ label: "Avg Rating", value: avgRating, emoji: "⭐" },
{ label: "Total Spent", value: fmtCurrency(totalSpent), emoji: "💰" },
```

Replace with:

```js
{ label: "Products", value: totalProducts, emoji: "◆" },
{ label: "Avg Rating", value: avgRating, emoji: "★" },
{ label: "Total Spent", value: fmtCurrency(totalSpent), emoji: "$" },
```

**Update the StatsScreen stat emojis.** Find:

```js
{ label: "Products Reviewed", value: totalProducts, emoji: "📦" },
{ label: "Average Rating", value: avgRating, emoji: "⭐" },
{ label: "Total Spent", value: fmtCurrency(totalSpent), emoji: "💰" },
{ label: "Total Saved", value: fmtCurrency(totalSaved > 0 ? totalSaved : 0), emoji: "🎉" },
```

Replace with:

```js
{ label: "Products Reviewed", value: totalProducts, emoji: "◆" },
{ label: "Average Rating", value: avgRating, emoji: "★" },
{ label: "Total Spent", value: fmtCurrency(totalSpent), emoji: "$" },
{ label: "Total Saved", value: fmtCurrency(totalSaved > 0 ? totalSaved : 0), emoji: "↓" },
```

**Update the product detail diary empty state.** Find:

```jsx
<div style={{ fontSize: 24, marginBottom: 8 }}>📝</div>
```

Replace with:

```jsx
<div style={{ fontSize: 24, marginBottom: 8 }}>◇</div>
```

---

### 2. `src/index.css` — Font + colors

Replace the `body` font-family (line 15):

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

With:

```css
font-family: 'Libre Baskerville', 'Georgia', serif;
```

Replace the background-color (line 16):

```css
background-color: #FFF8F3;
```

With:

```css
background-color: #F9F5F0;
```

Replace the color (line 17):

```css
color: #3D2C2C;
```

With:

```css
color: #2D1F16;
```

Replace the selection color (lines 55-58):

```css
::selection {
  background-color: #F5D5E0;
  color: #3D2C2C;
}
```

With:

```css
::selection {
  background-color: #D4C4B8;
  color: #2D1F16;
}
```

---

### 3. `index.html` — Font import + theme color

Replace the Google Fonts link (line 30):

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

With:

```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
```

Also update the comment above it from "Google Fonts: Inter" to "Google Fonts: Libre Baskerville".

Replace the theme-color meta tag (line 8):

```html
<meta name="theme-color" content="#E8A0BF" />
```

With:

```html
<meta name="theme-color" content="#6B4C3B" />
```

Replace the background-color meta tag (line 9):

```html
<meta name="background-color" content="#FFF8F3" />
```

With:

```html
<meta name="background-color" content="#F9F5F0" />
```

---

### 4. `public/manifest.json` — Theme colors

Replace:

```json
"background_color": "#FFF8F3",
"theme_color": "#E8A0BF",
```

With:

```json
"background_color": "#F9F5F0",
"theme_color": "#6B4C3B",
```

---

## Design rationale

Here's the complete color mapping for reference:

| Role | Old (Pink) | New (Dark Chocolate) |
|------|-----------|---------------------|
| Background | `#FFF8F3` | `#F9F5F0` |
| Accent | `#E8A0BF` | `#6B4C3B` |
| Accent Dark | `#C5739B` | `#4A3228` |
| Accent Light | `#F5D5E0` | `#D4C4B8` |
| Accent Pale | `#FFF0F5` | `#F0E8E0` |
| Blush | `#F9E4EC` | `#E8DDD4` |
| Text | `#3D2C2C` | `#2D1F16` |
| Text Light | `#8B7272` | `#8A756A` |
| Border | `#F0E0E0` | `#E0D4C8` |
| Font | Inter (sans-serif) | Libre Baskerville (serif) |

The emoji-to-geometric-symbol change makes it feel more editorial and magazine-like. The serif font (Libre Baskerville) adds sophistication. The warm brown palette feels premium without being cold.

## After making changes

Run `npm run dev` to preview locally, then `npx vercel --prod` to deploy the update.
