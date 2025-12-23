import { Inter, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/SoundManager";
import { ThemeProvider } from "@/components/ThemeToggle";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

// ============================================
// SEO CONFIGURATION - Update these values
// ============================================
const SITE_URL = "https://hackgear2.vercel.app"; // Change to your actual domain
const SITE_NAME = "HackGear 2.0";
const SITE_DESCRIPTION = "HackGear 2.0 - Aligarh's premier 8-hour offline hackathon for beginners at Vision Institute of Technology. Join the coding revolution with prizes, expert mentorship & networking opportunities.";
const SITE_KEYWORDS = "hackathon Aligarh, HackGear 2.0, coding competition, tech hackathon Aligarh, programming competition, VIT Aligarh hackathon, beginner hackathon, 8 hour hackathon, NovaCoders, tech event UP";
const OG_IMAGE = "/og-image.png"; // Add this image to /public folder (1200x630px recommended)
const TWITTER_HANDLE = "@hackgear"; // Your Twitter handle
const GOOGLE_VERIFICATION = ""; // Add your Google Search Console verification code
// ============================================

export const metadata = {
  // Basic Meta
  title: {
    default: "HackGear 2.0 | Aligarh's Premier 8-Hour Hackathon | VIT Aligarh",
    template: "%s | HackGear 2.0",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "HackGear 2.0 Team", url: SITE_URL }],
  creator: "NovaCoders",
  publisher: "HackGear 2.0",
  
  // Favicon & Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
    ],
  },

  // Canonical URL
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "HackGear 2.0 - Aligarh's Premier 8-Hour Hackathon",
    description: "Join Aligarh's premier hackathon at Vision Institute of Technology. 8 hours of coding, innovation, expert mentorship and exciting prizes!",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "HackGear 2.0 - 8 Hour Hackathon",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "HackGear 2.0 | Aligarh's Premier 8-Hour Hackathon",
    description: "Join Aligarh's premier hackathon at VIT. 8 hours of coding, innovation and prizes!",
    images: [OG_IMAGE],
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: GOOGLE_VERIFICATION,
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },

  // App specific
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  category: "technology",
};

// JSON-LD Structured Data for Event
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "HackGear 2.0",
  description: SITE_DESCRIPTION,
  startDate: "2025-02-15T09:00:00+05:30", // Update with actual date
  endDate: "2025-02-15T17:00:00+05:30", // Update with actual date (8 hours later)
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Vision Institute of Technology",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shahpur Madrak", // Update address
      addressLocality: "Aligarh",
      addressRegion: "Uttar Pradesh",
      postalCode: "202001",
      addressCountry: "IN",
    },
  },
  image: `${SITE_URL}${OG_IMAGE}`,
  offers: {
    "@type": "Offer",
    url: SITE_URL,
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: "2025-01-01",
  },
  organizer: {
    "@type": "Organization",
    name: "NovaCoders - HackGear 2.0 Team",
    url: SITE_URL,
  },
  performer: {
    "@type": "Organization",
    name: "NovaCoders",
  },
};

// Additional JSON-LD for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HackGear 2.0",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    "https://twitter.com/hackgear", // Update with actual social links
    "https://linkedin.com/company/hackgear",
    "https://instagram.com/hackgear",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@hackgear.com", // Update email
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#050505" />
        <meta name="msapplication-TileColor" content="#00E0FF" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${inter.variable} matrix-bg circuit-lines bg-cyber-black text-white overflow-x-hidden max-w-[100vw]`}
      >
        <ThemeProvider>
          <SoundProvider>
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
