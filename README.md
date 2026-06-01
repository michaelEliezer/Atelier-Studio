# Atelier Studio

A premium architecture and interior design studio portfolio website demo.

## Overview

Atelier Studio is a fictional architecture and interior direction practice based in Copenhagen. The site showcases a curated selection of residential, hospitality, and interior projects through a clean editorial layout with warm paper/cream palette, copper accents, and a dark mode toggle.

- **Live preview:** https://michaeleliezer.github.io/Atelier-Studio/
- **No build step required** — vanilla HTML/CSS/JS only

## Tech Stack

- HTML5 semantic markup
- CSS3 with custom properties, Grid, Flexbox, `clamp()` responsive sizing
- Vanilla JavaScript (no frameworks)
- GSAP 3.12 + ScrollTrigger for entrance animations (loaded via CDN)
- Google Fonts: Playfair Display (display), Inter (body)

## Palette

### Light mode (default)

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#f6efe4` | Page background |
| `--paper-deep` | `#e8d9c5` | Section backgrounds |
| `--ink` | `#12100d` | Primary text |
| `--ink-soft` | `#4d453b` | Secondary text |
| `--muted` | `#716456` | Labels, captions |
| `--copper` | `#8e5933` | Accent, links, buttons |
| `--copper-dark` | `#6f4324` | Hover states |

### Dark mode (toggle via ◐ button in header)

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#13110e` | Page background |
| `--paper-deep` | `#1c1915` | Section backgrounds |
| `--ink` | `#ede6dd` | Primary text |
| `--ink-soft` | `#9e9589` | Secondary text |
| `--copper` | `#c4904a` | Accent (warmer gold) |

Dark mode preference is saved to `localStorage` and persists across reloads. Logos auto-invert for visibility.

## Structure

```
Atelier-Studio/
├── index.html          # Main markup (392 lines)
├── css/
│   └── styles.css      # Full stylesheet (1,508 lines)
├── js/
│   └── main.js         # Interactions & animations (395 lines)
└── assets/
    ├── Logo/
    │   └── Atelier-logo.png    # Site logo (header, footer, preloader)
    ├── images/
    │   ├── hygge-house-hero.png
    │   ├── northline-loft.png
    │   ├── oak-bedroom.png
    │   └── stone-courtyard.png
    └── icons/
        ├── icons8-instagram-logo-50.png
        ├── icons8-linkedin-50.png
        └── icons8-behance-30.png
```

## Sections

1. **Preloader** — 2s cinematic entrance with logo and progress bar
2. **Hero** — Editorial layout with featured residence image, headline, and studio note
3. **Selected Work** — Filterable project grid (All / Residential / Hospitality / Interior) with 4 case studies
4. **Stats** — Honest demo values (04 studies, 03 disciplines, 01 process, 00 templates)
5. **Method** — 4-step process with 3-column grid layout on desktop
6. **Philosophy** — Studio quote: "Every project begins with atmosphere before it becomes architecture."
7. **Contact** — Studio details + inquiry form with inline validation
8. **Footer** — 4-column layout with brand logo, navigation, reach, and social icons

## Features

- **Dark mode** — Toggle in header, persisted via localStorage, logo auto-inverts
- **Project filtering** — Category buttons show/hide project cards
- **Project modal** — Click any card for a 2-column case study with details grid, prev/next navigation
- **Active nav tracking** — Highlights current section in navbar on scroll
- **Skip link** — Accessibility link to skip to main content
- **Scroll progress** — Thin copper progress bar at top of viewport
- **GSAP animations** — Staggered hero entrance, scroll-triggered section reveals
- **Smooth scroll** — Respects `prefers-reduced-motion`
- **Mobile menu** — Hamburger toggle with animated X transition
- **Responsive** — Breakpoints at 1024px, 768px, and 480px
- **No custom cursor or mouse parallax** — intentionally excluded for a quiet, architectural feel

## Stats

All content, projects, and stats are fictional. This is a portfolio demo, not a real business.

## Credits

- Design direction inspired by editorial luxury brand websites and Scandinavian architecture firms
- Images: architectural photography
- Build: OWL (Hermes Agent)
