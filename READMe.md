Oratrics Internal Dashboard

A minimal internal dashboard built for Oratrics to manage demo leads, schedule demo classes, track outcomes, and view basic conversion metrics.

This project focuses on clean APIs, correct data flow, and simple UI, as required in the assignment scope.

🚀 Features
1. Lead Management

Create new demo leads

Capture:

Parent Name

Child Grade

Program Interest (Math / Personality)

Default lead status: NEW

2. Demo Scheduling

Assign demos to teachers

Schedule demo date & time

Each demo is linked to a lead

3. Demo Outcome Tracking

Update demo outcome:

COMPLETED

NO_SHOW

CONVERTED

Automatically updates lead status:

CONVERTED → Lead marked as converted

Others → Demo completed

4. Dashboard Metrics

Total Demos

Converted Demos

No-Shows

5. Real-time UI Updates

Demo outcome updates reflect instantly on the UI

No page reload required

🧱 Tech Stack
Backend

Node.js

Express.js

Prisma ORM

SQLite (local development database)

Frontend

React (Vite)

Axios

Dark UI theme inspired by Oratrics branding