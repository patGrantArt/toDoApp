---
name: project-progress
description: What has been completed and what is still to do across the three main goals
metadata:
  type: project
---

## Completed

**Goal 1: Deploy to Netlify — DONE**
- Created 3 Netlify serverless functions replacing `app.js` routes:
  - `netlify/functions/appData.js` — fetches todos from MongoDB
  - `netlify/functions/toDo.js` — saves todos to MongoDB
  - `netlify/functions/bgImages.js` — returns background image list
- Created `netlify.toml` — redirects `/appData`, `/toDo`, `/bgImages` to the functions, so frontend code was unchanged
- Added `mongodb` npm dependency
- Created `.gitignore`
- Migrated todos from `appData.json` into MongoDB Atlas (173 items, database: `todoapp`, collection: `todos`)
- Set `MONGODB_URI` as a Netlify environment variable
- Fixed MongoDB Atlas IP allowlist (set to 0.0.0.0/0)
- App is live and working on Netlify

## Still To Do

**Sync bug fix — polling (in progress)**
- Added `pollForUpdates()` to `init.js` — fetches from MongoDB every 30 seconds, animates refresh if data has changed
- Animations on poll refresh are still a bit buggy — needs investigation next session

**Goal 2: Mobile touch support**
- Touch screen functionality for drag-and-drop on mobile (current drag/drop uses mouse events only)
- One more item to add (user to clarify next session)

**Goal 3: Authentication**
- Add a login/security layer so only the owner can access the app
- Likely approach: Netlify Identity or a simple password gate

## Housekeeping (do when convenient)
- Clean up redundant Node.js clutter — `app.js`, `appTools.js` no longer used in production; `scripts/importTodos.js` also done

## Key Details
- GitHub repo: https://github.com/patGrantArt/toDoApp
- MongoDB cluster: dotoitems.iv4micu.mongodb.net
- MongoDB user: patgrantart_db_user
- Database: todoapp, Collection: todos
