# Hollow-v7.2 Free
Personal Testing Project 
---
## Identity
**mY IdentitY UI Design — Only F!XA??**
| Field | Value |
| --- | --- |
| Owner Name | OnlyF!XA?? |
| Owner Number | 923448170040 |
| Region | Pakistan |
| Province | Khyber_Pakhtoon_Khwa |
| WhatsApp Channel | https://whatsapp.com/channel/0029Vb8MSy7KLaHp4Xkmmw1T |
| Telegram Updates Channel | https://t.me/fixaupdates |
---
## About
Hollow-v7.2 is a WhatsApp automation bot built on the Baileys library
(X-Bails, Baileys 6.7.4). It is a Node.js project (CommonJS) whose entry point
is `index.js`. Configuration lives in `settings/config.js`.
---
## Requirements
- **Node.js** — recommended 18 or newer (tested with v22.x).
- **npm** — used to install dependencies.
- **RAM** — the figures below are *practical guidance*, not guaranteed limits.
  Actual usage depends on the number of chats, media processed, and enabled
  features:
  - ~512 MB is a common minimum for a small, low-traffic instance.
  - 1 GB or more is generally more comfortable for normal usage.
---
## Installation
```bash
npm install --legacy-peer-deps
```
> The `--legacy-peer-deps` flag is required because the project's Baileys
> dependency has a peer-dependency conflict with `jimp`. This matches the
> existing dependency setup.
---
## Startup
```bash
npm start
```
`npm start` runs the defined script (`node index.js`). You can also run the
entry point directly:
```bash
node index.js
```
On first run the bot walks through an interactive startup flow in the console:
1. Enter the password (see `Password.txt`).
2. Enter the WhatsApp number to pair.
---
## Authentication & Session Storage
- Sessions are stored persistently in the `sessions/` directory, which is
  created automatically on first pairing.
- `creds.json` and the signal key files live inside that directory and are
  kept across restarts so the bot re-authenticates without re-scanning.
- The `sessions/` directory is git-ignored — do not commit it.
- To re-pair the account, delete the session files inside `sessions/`
  (keeping `creds.json`), or use the `clearsession` / `csesi` command from
  within the bot.
---
## Deployment Verification Checklist
- [x] **Correct startup command** — `npm start` (runs `node index.js`).
- [x] **Persistent authentication/session storage** — stored in `sessions/`.
- [ ] **WhatsApp authentication completed** — requires a real WhatsApp number;
      not yet performed in this environment.
- [x] **Console checked** — startup prompts and pairing flow observed.
- [ ] **Bot running successfully** — pending a live WhatsApp pairing.
---
## Notes
- Owner/contact details are configured in `settings/config.js`.
- The startup password is stored in `Password.txt`.
