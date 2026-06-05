# BharatBhraman – Uttarakhand Family Travel OS

A premium, mobile-first, offline-friendly family travel app for the 8-member Uttarakhand route: Mumbai → Delhi → Dehradun → Chakrata → Hanol → Mussoorie → Haridwar → Mumbai.

## Product vision

BharatBhraman is a private family trip operating system that feels like Splitwise + Google Maps + Airbnb + Instagram Travel Diary, without paid SaaS complexity. It is intentionally lightweight for only 8 people and can run on free static hosting.

## Architecture

```text
Static PWA frontend
  ├─ browser localStorage now
  ├─ IndexedDB-ready upload/storage model
  ├─ optional Supabase free tier later
  ├─ OpenStreetMap/Leaflet-ready map plan
  └─ free deployment to GitHub Pages, Netlify, Vercel or Replit
```

No paid APIs or keys are required for the current prototype.

## Mobile UX flow

- Home: trip hero, route, progress, actual expense, pending settlements, analytics and assistant.
- Itinerary: day-wise cards with stays, senior suitability, food notes, photo spots and actions.
- Expenses: expense entry, split type, transfer entry, balances and simplified settlement.
- Map: route board with map pins marked as coordinates to be confirmed.
- Memories: story-style day albums and local media gallery.
- Documents: local upload vault for bills, tickets, receipts, IDs, photos and videos.

## React/PWA prototype structure

The current build is a dependency-free static PWA because the container registry blocked package installation. The source is structured like a React app with data, logic, styles and app shell separated so it can be migrated to React/Vite later by replacing `src/main.js` with React components.

```text
src/
  data/trip.js              Trip members, families, itinerary, hotels, map pins
  lib/expenseEngine.js      Split, transfer, balance and settlement logic
  main.js                   Mobile-first app shell and UI rendering
  styles/app.css            Premium dark glassmorphism UI
public/
  manifest.webmanifest      PWA manifest
  sw.js                     Offline app-shell service worker
scripts/build.mjs           Static build script
```

## Data schema

The app models:

- Users/members/families
- Itinerary days
- Locations/map pins
- Hotels/stays
- Vehicles
- Expenses
- Expense participants
- Transfers
- Settlements
- Uploaded files/photos/videos
- Notes
- Offline sync queue

## Expense and settlement logic

Implemented split modes include equal, selected people, family-wise, couple/room/bed/vehicle equal grouping, weighted, exact amount and percentage split. Multiple payers are represented by the `paidBy` array. Refunds are supported with `isRefund`. Transfers are recorded separately and adjust net balances without becoming expenses.

Net balance formula:

```text
net = paid + transfersOut - owed - transfersIn
```

Positive net members should receive money. Negative net members should pay. The simplify-debt algorithm pairs largest debtors with largest creditors to produce minimum practical settlement rows.

## Free API plan

- Maps: OpenStreetMap + Leaflet.js
- Routing: OSRM or OpenRouteService free tier
- Weather: Open-Meteo, no key required
- Storage/backend later: Supabase free tier
- Export upgrades: SheetJS, jsPDF, html2canvas if dependency installation is available

## Upload/storage plan

The prototype stores files locally as browser data URLs and keeps metadata for name, MIME type, size, tags and timestamps. For production family use, migrate file blobs to IndexedDB first; add Supabase Storage only if cloud sync is needed.

## Offline-first plan

- PWA manifest for installability
- Service worker caches the app shell and fetched static assets
- Local browser state for expenses, transfers, uploads and sync queue
- Sync-ready queue entries for optional future Supabase writes

## Export plan

- Current prototype exports settlement CSV and uses browser print for PDF-style output.
- If package installation is available, add SheetJS for `.xlsx`, jsPDF for PDF and html2canvas for rich visual PDF snapshots.

## Free deployment guide

1. Run `npm run build`.
2. Publish `dist/` to GitHub Pages, Netlify, Vercel, Replit static hosting or any free static server.
3. Keep the app private by sharing the URL only with the 8 family members.
4. Export or back up browser data before switching devices because the first version is local-first.

## Development commands

```bash
npm test
npm run build
npm run preview
```
