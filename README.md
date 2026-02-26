# ✈ FlightLog — 我的空中日記
### EVA Air Edition · Private Flight Crew Companion

A mobile-first progressive web app (PWA) for EVA Air pilots to privately log flight experiences, track colleagues in the cockpit, and build a personal crew reference over time. Built with React 18, Firebase Firestore, and Vite. Deployable to Vercel in minutes.

---

## Features

**Pilot Directory** — shared across all users, always up to date. Search by employee ID, Chinese name, or callsign. Each pilot has a status light (🟢🟡🔴), tags, and shared notes.

**Private Flight Logs** — fully private per user, never visible to others. Log flight number, route, aircraft type, pilot position, PF/PM role, block time, simulator flag, date, and a personal memo for every sector.

**Block Hour Tracking** — log `blockTime` per flight (e.g. `2:45`). Statistics view totals your hours and breaks down LINE vs SIM sessions.

**Simulator Toggle** — mark any log as a SIM session. Shown as a badge in your logbook and counted separately in statistics.

**PF / PM Role** — record your role per sector: Pilot Flying, Pilot Monitoring, or Observer.

**Fleet Management (Admin)** — admin can toggle individual aircraft types on/off app-wide. A350 and A321neo are disabled by default until they enter the EVA fleet.

**5 Themes × 2 Modes = 10 Looks** — switch between themes in Settings at any time.

**Two-Layer Auth** — shared passcode gate + personal username/password. No Firebase Auth required. Admin can add/remove accounts, toggle open registration, and view usage stats.

**Password Reset via OTP** — forgot-password flow sends a one-time code to the user's registered email via EmailJS.

**PWA / Add to Home Screen** — works offline-first, installable on iOS and Android like a native app.

**Backup & Restore** — export all data as a JSON file, re-import on any device.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18 (hooks, no class components) |
| Database | Firebase Firestore (real-time sync) |
| Auth | Custom passcode + Firestore accounts doc |
| Email | EmailJS (password reset OTP) |
| Build | Vite 5 |
| Hosting | Vercel |
| PWA | Web App Manifest + meta tags |

---

## Project Structure

```
/
├── src/
│   ├── App.jsx          # All views, state, and logic (single-file architecture)
│   ├── main.jsx         # React DOM entry point
│   ├── firebase.js      # Firebase project config + Firestore export
│   └── crewData.js      # Initial pilot seed data (loaded once on first boot)
├── index.html           # HTML shell with PWA meta tags
├── manifest.json        # PWA manifest (name, icons, theme colour)
├── vite.config.js       # Vite build config
├── vercel.json          # SPA rewrite rules for Vercel deployment
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Firestore enabled
- A Vercel account (free tier is fine)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/flightlog.git
cd flightlog
npm install
```

### 2. Configure Firebase

Open `src/firebase.js` and replace the config object with your own Firebase project credentials:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};
```

### 3. Set up Firestore

In the Firebase Console:
1. Go to **Firestore Database → Create database**
2. Start in **production mode**
3. Add the following security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /crewlog/{docId} {
      allow read, write: if true;
    }
  }
}
```

### 4. Configure EmailJS (optional — for password reset)

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an Email Service (e.g. Gmail)
3. Create a template with variables: `{{to_email}}`, `{{username}}`, `{{otp_code}}`
4. In `src/App.jsx`, update the three constants near the top:

```js
const EMAILJS_SERVICE_ID  = "service_xxxxxx";
const EMAILJS_TEMPLATE_ID = "template_xxxxxx";
const EMAILJS_PUBLIC_KEY  = "your_public_key";
```

### 5. Run locally

```bash
npm run dev
```

### 6. Deploy to Vercel

```bash
npm run build
# push to GitHub and import the repo in Vercel
```

---

## First Boot & Admin Setup

On the very first login ever (empty Firestore):

1. Open the app and enter the shared passcode: `crew2026`
2. On the personal login screen, enter username `adminsetup` and choose any password
3. This seeds the accounts document and creates your admin account
4. Log in normally — the admin account can add other users in Settings

**To add users:** Settings → scroll to Admin section → fill in username, password, email → Add.

---

## Themes

| # | Theme | Inspiration | Light | Dark |
|---|---|---|---|---|
| 🛫 1 | **Boarding Look** | EVA Air brand identity | White + EVA green | Deep pine + Persimmon orange |
| 🌿 2 | **Shiatzy Chen** | Tourmaline green uniform | Mist green-grey + Chief Purser red | Classic dark + Vibrant tourmaline |
| ✨ 3 | **Royal Laurel** | 787 Dreamliner business class | Champagne cream + Soft gold | Stone black + Metallic gold |
| 🌈 4 | **Sky Scarf** | Crew geometric scarves | White + Sunrise orange | Midnight blue + Electric sky blue |
| 🖥 5 | **Tech Log** | Flight deck instrumentation | Silver cloud + Industrial green | OLED black + Phosphor green |

---

## Aircraft & Positions

### Aircraft (fleet-managed by admin)
| Type | Status |
|---|---|
| B777 | ✅ Active |
| B787 | ✅ Active |
| A321 | ✅ Active |
| A330 | ✅ Active |
| A350 | 🔒 Disabled (not in fleet yet) |
| A321neo | 🔒 Disabled (not in fleet yet) |

Admin can toggle any type on/off in Settings → Fleet Management.

### Pilot Positions
| Code | Role | 中文 |
|---|---|---|
| Capt | Captain | 機長 |
| SFO | Senior First Officer (Cruise Pilot) | 資深副機長 (巡航機長) |
| FO | First Officer | 副機長 |
| CP | Chief Pilot | 總機長 |
| IP | Instructed Pilot | 教師機師 |
| Check | Check Pilot | 考核機長 |

### Pilot Roles (per sector)
`PF` · `PM` · `Observer`

---

## Flight Log Fields

Each private flight log stores:

```js
{
  id:        "auto",        // Unique log ID
  crewId:    "P10001",      // Links to the shared pilot entry
  date:      "2025-03-15",  // YYYY-MM-DD
  flightNum: "BR089",       // e.g. BR089
  route:     "TPE→NRT",     // Free text
  aircraft:  "B777",        // One of the enabled fleet types
  position:  "Capt",        // Pilot position code
  role:      "PF",          // PF | PM | Observer
  blockTime: "2:45",        // Block hours HH:MM
  isSim:     false,         // true = simulator session
  memo:      "...",         // Private personal notes
}
```

---

## Data Privacy Model

| Data | Who can see it |
|---|---|
| Pilot names, seniority, employee ID | All users (shared) |
| Status lights (🟢🟡🔴) | All users (shared) |
| Pilot tags | All users (shared) |
| Pilot notes | All users (shared) |
| **Flight logs, memos, block hours** | **You only (private)** |
| Registered email address | Admin only |
| Password | Nobody (stored as plaintext — recommend hashing for production) |

---

## crewData.js — Seeding Your Pilot List

`crewData.js` exports `INITIAL_CREW`, loaded into Firestore only when the database is empty on first boot.

Each pilot object shape:

```js
{
  id:        "P10001",          // Employee ID — unique primary key
  nickname:  "Alex",            // Callsign / English name
  name:      "陳建明",           // Full Chinese name
  seniority: "BR-P088",         // Training batch / seniority number
  status:    "green",           // "green" | "yellow" | "red" | null
  tags:      ["#Standard & SOP"],
  notes:     "...",             // Shared long-form notes
}
```

---

## Customisation Checklist

Before going live, review these in `App.jsx`:

- [ ] `APP_PASSCODE` — change from `"crew2026"` to something private
- [ ] `EMAILJS_SERVICE_ID` / `EMAILJS_TEMPLATE_ID` / `EMAILJS_PUBLIC_KEY`
- [ ] `DEFAULT_ENABLED_AIRCRAFT` — adjust once A350/A321neo enter the fleet
- [ ] `PRESET_TAGS` — add cockpit-specific tags as needed
- [ ] `index.html` — `<title>` and `theme-color`
- [ ] `manifest.json` — `name`, `short_name`
- [ ] Replace `/logo.png` with your own app icon (512×512 recommended)

---

## Scripts

```bash
npm run dev      # Start local dev server at http://localhost:5173
npm run build    # Production build into /dist
npm run preview  # Preview the production build locally
```

---

## License

Private / internal use. Not for redistribution.

---

*Built with ✈ & ❤ — Your logs are safe & private.*
