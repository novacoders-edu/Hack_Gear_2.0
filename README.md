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
- **4 Theme System** - Cyan, Green, Red, and Gold color themes
- **Sound System** - Background music and UI sound effects with mute toggle
- **QR Attendance System** - Encrypted QR code generation and real-time scanning

### Backend Features
- **MongoDB Database** - Mongoose ODM for data management
- **API Token System** - Secure authentication for admin routes
- **QR Attendance** - Encrypted attendance tracking with duplicate prevention
- **Admin Dashboard** - Token management, QR generation, and attendance tracking
- **RESTful APIs** - Full CRUD operations for all resources

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
const hackathonDate = '2026-04-11T09:00:00';
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


## QR Attendance System

A complete attendance management system with encrypted QR codes and real-time scanning.

### Features
- 🔐 AES-256-CBC encryption (compatible with Python implementation)
- 📱 Real-time webcam QR scanning
- ✅ Duplicate attendance prevention
- 📊 Admin dashboard with statistics
- 🎫 QR code generation and download
- 📈 Attendance tracking and reporting

### Quick Start

1. **Access Admin Dashboard**
   ```
   /hg/admin/attendance?token=YOUR_API_TOKEN
   ```

2. **Public Scanner** (no auth required)
   ```
   /scan
   ```

3. **Generate QR Code**
   - Go to admin dashboard → Generate QR tab
   - Fill in team member details
   - Download QR code image

4. **Scan Attendance**
   - Go to scanner page or admin dashboard
   - Click "Start Scanning"
   - Point camera at QR code
   - Attendance marked automatically

### API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/attendance/generate-qr` | POST | ✓ | Generate encrypted QR code |
| `/api/attendance/scan` | POST | ✗ | Scan QR and mark attendance |
| `/api/attendance/manual` | POST | ✓ | Manual attendance entry (admin) |
| `/api/attendance/manual-public` | POST | ✗ | Manual attendance entry (public) |
| `/api/attendance` | GET | ✓ | List all attendance records |
| `/api/attendance?id=<id>` | DELETE | ✓ | Delete attendance record |

### Encryption Details

- **Algorithm**: AES-256-CBC
- **Password**: `hackgear2.0`
- **Format**: Base64(IV + Encrypted Data)
- **Compatible**: Python Fernet encryption

See [ATTENDANCE_SYSTEM.md](./ATTENDANCE_SYSTEM.md) for complete documentation.

## Admin Routes

All admin routes require authentication via API token in URL query parameter.

| Route | Description |
|-------|-------------|
| `/hg/admin?token=<token>` | Main admin dashboard |
| `/hg/admin/tokens?token=<token>` | API token management |
| `/hg/admin/stats?token=<token>` | Event statistics |
| `/hg/admin/attendance?token=<token>` | QR attendance system |

## Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
```

### MongoDB Setup

**Quick Setup (5 minutes):**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) (free tier available)
2. Create a free cluster
3. Create database user (username + password)
4. Whitelist IP: `0.0.0.0/0` (for development)
5. Get connection string
6. Update `.env.local` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hackgear?retryWrites=true&w=majority
   ```

See `MONGODB_SETUP.md` for detailed instructions.

## Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000`

## Required NPM Packages

```json
{
  "dependencies": {
    "next": "^16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "framer-motion": "^12.29.2",
    "mongoose": "^9.1.5",
    "react-icons": "^5.5.0",
    "qrcode": "^1.5.4",
    "jsqr": "^1.4.0"
  }
}
```


