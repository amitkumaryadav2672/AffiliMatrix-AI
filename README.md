# AffiliMatrix AI — Autonomous Multi-Platform Affiliate Marketing Platform

> **Human-Supervised Marketing Automation Platform** that researches affiliate products, synthesizes multi-platform promotional content with AI, validates FTC commercial compliance, gates posts through a human approval console, and schedules/dispatches posts across all major social networks.

---

## 🌟 Key Architecture & Capabilities

1. **Multi-Platform Adapters Architecture (No Universal autoPost)**:
   - **X (Twitter)**: Enforces 280-char limits, `#ad` / `#affiliate` tags, and thread support.
   - **YouTube Shorts**: Validates 9:16 vertical video ratio, enforces `#Shorts` tagging, and attaches native `containsPaidPromotion: true` API parameter.
   - **TikTok**: Adheres to TikTok Content Posting API requirements with native `commercial_content_type` parameter and mandatory human creator consent.
   - **Instagram / Facebook**: Meta Graph API schema for Reels containers with Paid Partnership tags.
   - **LinkedIn**: Professional UGC API integration with human review policy compliance.
   - **Pinterest**: Rich Pin generation with 2:3 vertical aspect ratios and destination affiliate redirect URLs.

2. **FTC Compliance Guardian & Deceptive Claim Scanner**:
   - Enforces US FTC 16 CFR Part 255 Endorsement Guides.
   - Rejects unverified or deceptive claims (e.g., "miracle cure", "guaranteed overnight fortune").
   - Requires conspicuous disclosures: *"Affiliate disclosure: I may earn a commission if you purchase through links in this post, at no additional cost to you."*
   - Includes a 1-click **Auto-Fix** engine to attach compliant disclosures.

3. **Human-in-the-Loop Governance & Approval Queue**:
   - AI drafts scripts, captions, and visual assets, but posts **cannot** be published without human review.
   - Interactive preview simulator: inspect posts in a realistic vertical smartphone mockup (TikTok/Shorts/Reels) or desktop feed card (X/LinkedIn).

4. **Safety Circuit Breakers & Emergency Kill Switch**:
   - **Emergency Pause Switch**: Instantly pauses all active queues across all accounts with 1 click.
   - **Circuit Breakers**: If an account encounters 3 consecutive API or rate-limit errors, the platform automatically pauses that account and logs a warning in the audit stream.
   - **Audit Log**: Immutable ledger of every generation, approval, schedule, and publication.

---

## 🚀 Getting Started

### 1. Install & Run
From the root directory:
```bash
# Start both Backend API and React Frontend concurrently
npm run dev
```

Or start them individually:
```bash
# Start the Backend Server (Port 5000)
npm run dev:server

# Start the React Vite Client (Port 5173)
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
├── client/                     # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Status, kill switch, alerts
│   │   │   ├── Sidebar.jsx             # Navigation tabs
│   │   │   ├── DashboardTab.jsx        # Mission Control KPIs & channel attribution
│   │   │   ├── ProductsTab.jsx         # Product catalog & compliance claims
│   │   │   ├── ContentStudioTab.jsx    # Hook-Story-Offer script & caption studio
│   │   │   ├── ApprovalQueueTab.jsx    # Human approval gate with phone mockups
│   │   │   ├── PublishingQueueTab.jsx  # Multi-platform scheduler & queue table
│   │   │   ├── PlatformAdaptersTab.jsx # Account connections, quotas & limits
│   │   │   └── ComplianceTab.jsx       # FTC text scanner & official rulebook
│   │   ├── App.jsx                     # Central state & API sync
│   │   └── index.css                   # Modern dark mode design system
│   └── package.json
│
├── server/                     # Node.js + Express Backend API
│   ├── adapters/
│   │   ├── baseAdapter.js              # Base platform adapter contract
│   │   ├── xAdapter.js                 # X (Twitter) adapter
│   │   ├── youtubeShortsAdapter.js     # YouTube Shorts adapter
│   │   ├── tiktokAdapter.js            # TikTok Content Posting adapter
│   │   ├── instagramAdapter.js         # Meta Instagram Reels adapter
│   │   ├── facebookAdapter.js          # Facebook Page adapter
│   │   ├── linkedinAdapter.js          # LinkedIn UGC adapter
│   │   ├── pinterestAdapter.js         # Pinterest Rich Pins adapter
│   │   └── index.js                    # Adapter registry and dispatcher
│   ├── services/
│   │   ├── aiEngine.js                 # AI script & multi-caption generation
│   │   ├── complianceEngine.js         # FTC validator & claim checker
│   │   └── scheduler.js                # Queue, circuit breakers & kill switch
│   ├── data/
│   │   └── store.js                    # Hybrid data store with seed affiliate offers
│   ├── routes/
│   │   └── api.js                      # REST API endpoints
│   ├── server.js                       # Express entry point (Port 5000)
│   └── package.json
│
├── docker-compose.yml          # Optional MongoDB & Redis containers
└── package.json                # Root orchestration scripts
```

---

## 🔒 Safety & Platform Policies

- **FTC Notice**: All generated promotional content automatically receives appropriate affiliate disclosure tags (`#ad`, `#affiliate`, or explicit paragraph disclosures).
- **Simulated Sandbox Mode**: Enabled by default (`simulationMode: true`) so you can test end-to-end publishing, view simulated URLs, and observe metrics without burning social API rate limits or incurring costs.
