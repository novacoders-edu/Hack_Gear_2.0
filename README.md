# HACKGEAR 2.0

A cyberpunk-themed landing page for an 8-hour offline hackathon event, built with Next.js 16 and a futuristic neon aesthetic.

## Tech Stack

- **Framework:** Next.js 16.1.0 (App Router)
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4 with custom cyberpunk theme
- **Animations:** Framer Motion
- **Fonts:** Orbitron, Rajdhani, Inter (Google Fonts)

## Features

### Visual Effects
- **Matrix Rain Background** - Canvas-based animated matrix rain effect
- **Custom Cursor** - Neon cursor with trail effect (desktop only)
- **3D Tilt Cards** - Interactive cards with perspective transforms
- **Glitch Text** - Random glitch animations on headings
- **RGB Split Effect** - Image distortion on hover
- **Parallax Elements** - Floating orbs and animated backgrounds

### Interactive Elements
- **Live Countdown Timer** - Real-time countdown to hackathon start
- **Expandable Timeline** - Click to reveal phase details
- **Prize Reveal Animation** - Dramatic card flip reveals
- **Theme Toggle** - Switch between Cyan and Matrix Green themes
- **Sound Effects** - Optional UI sounds with mute toggle

### Accessibility
- Keyboard navigation support
- Focus indicators
- Reduced motion support
- High contrast mode support
- ARIA labels on interactive elements
- Skip to content link

### Performance
- Lazy loading components
- Skeleton loaders
- Optimized animations
- CSS containment

## Sections

| Section | Description |
|---------|-------------|
| Hero | Main banner with countdown timer and registration CTA |
| About | Event overview with animated stats and terminal effect |
| Tracks | Problem statement categories with 3D cards |
| Timeline | Interactive event schedule with expandable phases |
| Prizes | Reward tiers with dramatic reveal animations |
| Sponsors | Sponsor showcase (placeholder) |
| Team | Judges panel with RGB split effect on images |
| Past Winners | Testimonial carousel from previous events |
| Rules & FAQ | Eligibility rules and FAQ accordion |

## Getting Started

```bash
# Install dependencies
bun install
# or
npm install

# Run development server
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── layout.js        # Root layout with providers
│   ├── page.js          # Main page with all sections
│   └── globals.css      # Tailwind + custom styles
├── components/
│   ├── common/          # Navbar, Footer
│   ├── Hero.js          # Landing with countdown
│   ├── About.js         # Event info with stats
│   ├── Tracks.js        # Problem statements
│   ├── Timeline.js      # Interactive schedule
│   ├── Prizes.js        # Rewards with animations
│   ├── Sponsors.js      # Sponsor logos
│   ├── Team.js          # Judges with RGB effect
│   ├── RulesFAQ.js      # Rules and FAQ
│   ├── PastWinners.js   # Testimonial carousel
│   ├── Modal.js         # Reusable modal
│   ├── MatrixRain.js    # Canvas background effect
│   ├── CursorEffect.js  # Custom cursor
│   ├── Countdown.js     # Live countdown timer
│   ├── TiltCard.js      # 3D tilt effect wrapper
│   ├── GlitchText.js    # Glitch text effect
│   ├── SoundManager.js  # Audio context provider
│   ├── ThemeToggle.js   # Theme switcher
│   └── SkeletonLoader.js # Loading placeholders
└── public/
    └── user.jpg         # Placeholder avatar
```

## Custom Theme Colors

- `cyan-neon`: #00E0FF
- `purple-electric`: #4D00FF
- `matrix-green`: #00FF41
- `cyber-black`: #050505

## Configuration

### Countdown Timer
Update the target date in `components/Hero.js`:
```js
const hackathonDate = '2025-02-15T09:00:00';
```

### Theme Toggle
Users can switch between Cyan and Matrix Green themes using the floating button.

### Sound Effects
Sound is muted by default. Users can enable it via the floating sound toggle button.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT
