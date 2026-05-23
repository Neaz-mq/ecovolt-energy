# EcoVolt — Clean Energy Landing Page Template

A modern, high-performance HTML landing page template built for clean energy, solar, and sustainability businesses. Built with Vite, SCSS (BEM), and vanilla JavaScript — no frameworks, no bloat.

---

## 📁 File Structure

```
ecovolt/
├── dist/                        → Production-ready files (open this)
│   └── index.html               → Main HTML file
├── src/                         → Source files (for development)
│   ├── scss/
│   │   ├── abstracts/           → Variables & mixins
│   │   │   ├── _variables.scss
│   │   │   └── _mixins.scss
│   │   ├── base/                → Reset, fonts, typography
│   │   │   ├── _fonts.scss
│   │   │   ├── _reset.scss
│   │   │   └── _typography.scss
│   │   ├── layout/              → Navbar, footer
│   │   │   └── _navbar.scss
│   │   ├── components/          → Buttons, cards, badges
│   │   │   └── _buttons.scss
│   │   ├── sections/            → Hero, mission, solutions…
│   │   └── main.scss            → SCSS entry point
│   ├── js/
│   │   ├── modules/             → navbar.js, hero.js…
│   │   └── main.js              → JS entry point
│   └── assets/
│       ├── fonts/               → Inter font (self-hosted)
│       ├── icons/               → SVG icons
│       └── images/              → Section images
├── public/                      → Static assets (favicon, manifest)
│   ├── logo.svg                 → Navbar logo
│   ├── favicon-icon.svg         → Browser tab icon
│   ├── favicon.ico              → Legacy favicon
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png     → iOS home screen icon
│   └── site.webmanifest         → PWA manifest
├── documentation/               → Full HTML documentation
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Quick Start (No Build Required)

Open the pre-built file directly in your browser — no installation needed:

```
dist/index.html
```

---

## 🛠 Development Setup

Requires **Node.js 18+**

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server (http://localhost:5173)
npm run dev

# 3. Build for production (outputs to /dist)
npm run build
```

---

## 🎨 Customization

### Colors
All colors are defined in one file — `src/scss/abstracts/_variables.scss`:

```scss
$clr-primary:  #b8f53d;              // Accent green — buttons, highlights
$clr-bg:       #050f0a;              // Page background
$clr-white:    #ffffff;              // Headings
$clr-muted:    #7a9e8a;              // Body / secondary text
$clr-border:   rgba(255,255,255,0.08); // Subtle borders
```

Change `$clr-primary` to match your brand color — it updates everywhere automatically.

### Typography
Uses **Inter** — self-hosted, no Google Fonts dependency required.
Font files are located in `src/assets/fonts/inter/`.

To use a different font, update `src/scss/base/_fonts.scss` and replace the `.woff2` files.

### Logo & Favicon
Replace these files in the `/public` folder:

| File | Used for |
|---|---|
| `logo.svg` | Navbar logo |
| `favicon-icon.svg` | Browser tab (SVG, modern browsers) |
| `favicon.ico` | Legacy browser fallback |
| `favicon-32x32.png` | Standard favicon |
| `favicon-16x16.png` | Small favicon |
| `apple-touch-icon.png` | iOS home screen icon |

> **Tip:** Use [realfavicongenerator.net](https://realfavicongenerator.net) to generate all favicon sizes from a single image automatically.

### Navigation Links
Edit the `<ul class="navbar__links">` in `src/index.html` to update menu items.

---

## 📄 Template Sections

| # | Section | SCSS File |
|---|---|---|
| 1 | Navbar | `src/scss/layout/_navbar.scss` |
| 2 | Hero | `src/scss/sections/_hero.scss` |
| 3 | Mission | `src/scss/sections/_mission.scss` |
| 4 | Solutions | `src/scss/sections/_solutions.scss` |
| 5 | Impact | `src/scss/sections/_impact.scss` |
| 6 | About | `src/scss/sections/_about.scss` |
| 7 | Contact | `src/scss/sections/_contact.scss` |

---

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |
| Opera 76+ | ✅ |
| IE 11 | ❌ Not supported |

---

## 📦 Dependencies & Credits

| Library | Version | License | Link |
|---|---|---|---|
| Inter Font | 4.0 | SIL OFL | https://rsms.me/inter |
| GSAP | 3.x | GSAP Standard | https://gsap.com |
| Vite | 6.x | MIT | https://vitejs.dev |

> **Note on GSAP:** The free GSAP Standard License covers use in free and commercial projects. For use with premium GSAP plugins (ScrollTrigger, SplitText, etc.) in a distributed product, please review the [GSAP licensing page](https://gsap.com/licensing/).

---

## 💬 Support

Have a question or found an issue? Use the **Comments section** on the ThemeForest item page.

- 📬 Response time: **24–48 hours** on business days
- 🐛 Bug reports: include your browser version and a screenshot
- ✉️ For customization requests beyond the template scope, check my profile for freelance availability

---

## 📝 Changelog

### v1.0.0 — Initial Release
- Full landing page with 7 sections
- Fully responsive — mobile, tablet, desktop
- GSAP scroll animations
- SCSS source files with BEM methodology
- Vite-powered build system
- Self-hosted Inter font (no external requests)
- Accessible markup (ARIA labels, keyboard navigation)
- Cross-browser tested