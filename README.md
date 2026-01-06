# Minimal Week Planner

A minimalist personal planning app focused on **weekly flow**, not task management overhead.

No accounts.  
No backend.  
No priorities, tags, or analytics.  
This is not a productivity system (no GTD, no Kanban, no analytics, no teams).
Just writing things down and moving them around.

## Features

- Inbox for quick capture
- Weekly view (Mon–Sun) with inline editing
- Monthly view with draggable day lists
- Todos and notes (completed items stay visible)
- Drag & drop:
  - reorder within a day
  - move between days
  - move across weeks/months
- Week-level notes
- Fully localStorage-based (your data stays in your browser)

## ⚠️ Early prototype

This project is an early experimental prototype.

Important notes:
- Data is stored **locally in your browser** (localStorage)
- Clearing browser data will reset everything
- There is **no sync** between devices
- The data model and UX may change
- Backward compatibility is **not guaranteed**

This version exists to explore workflows and collect feedback.

## Why this exists

Most task tools optimize for:
- tracking
- prioritizing
- measuring

This tool optimizes for:
- **thinking**
- **weekly planning**
- **lightweight structure**

It’s closer to a paper planner than a task manager.

## Who this is for

- People who plan their week manually
- People who like writing things down before organizing
- People tired of over-featured task managers

## Who this is not for

- If you need reminders or notifications
- If you want priorities, tags, or analytics
- If you expect cloud sync or collaboration

## Tech

- React + TypeScript
- Vite
- @dnd-kit
- No backend
- No auth

## Live demo

https://minimal-week-planner.vercel.app/

No signup. Data is stored locally in your browser.

## Running locally

```bash
npm install
npm run dev

## Feedback

If you try this and have thoughts — good or bad — feedback is very welcome.

Questions I’m especially interested in:
- What feels natural?
- What feels awkward or slow?
- Would you use this weekly?

If you’re interested in collaborating, feel free to open an issue or reach out.
