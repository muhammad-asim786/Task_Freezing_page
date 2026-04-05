# User Directory — Performance Fix & Design Overhaul

A full-stack user directory application built with **Next.js** (frontend) and **Nest.js** (backend) that displays a paginated, searchable list of 5,000 users.

---

## About the Project

The User Directory is a web application where you can browse, search, and paginate through a large list of users. Each user has a name, role (Admin or Member), status (Active or Offline), and a last-seen date.

The frontend displays users as clean, modern cards in a responsive grid layout. A search bar at the top lets you filter users by name or role, and numbered pagination at the bottom lets you navigate through pages.

---

## The Problem (Before)

The original version of this app had several critical issues:

1. **Browser freezing** — The page tried to load and render all 5,000 users at once, which completely froze the browser every time someone opened the app.
2. **No pagination** — There was no way to browse users page by page. Everything was dumped on a single page.
3. **No search** — There was no way to find a specific user. You had to scroll through the entire list manually.
4. **Messy code** — All the logic (data fetching, business rules, and visual layout) was crammed into two large files, making it nearly impossible to maintain or extend.
5. **Hardcoded connections** — The frontend had a hardcoded URL to talk to the backend, which would break in different environments.

---

## The Goal (After)

1. **No more freezing** — Load only 20 users at a time instead of all 5,000.
2. **Pagination** — Let users browse page by page with numbered controls (1, 2, 3, ... 250).
3. **Search** — Let users search by name or role, with the filtering done on the server for speed.
4. **Clean architecture** — Separate the code into small, focused, reusable pieces.
5. **Proper configuration** — Use environment variables for API URLs and CORS settings.
6. **Modern design** — A polished, responsive UI with user avatars, status indicators, and smooth interactions.

---

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend  | Nest.js 11, TypeScript      |
| Styling  | Tailwind CSS                |
| Package Manager | npm                  |

---

## Project Structure

```
task/
├── backend/                    # Nest.js API server
│   └── src/
│       ├── main.ts             # App entry point + CORS config
│       ├── app.module.ts       # Root module
│       └── users/
│           ├── types.ts        # User & PaginatedResponse interfaces
│           ├── mock-data.ts    # Generates 5,000 mock users
│           ├── users.service.ts    # Business logic (filter, paginate)
│           ├── users.controller.ts # API endpoint (GET /api/users)
│           └── users.module.ts     # Users module
│
├── frontend/                   # Next.js web app
│   └── app/
│       ├── page.tsx            # Main page (composes all components)
│       ├── types/
│       │   └── user.ts         # Shared TypeScript types
│       ├── lib/
│       │   └── api.ts          # API client (fetch users from backend)
│       ├── hooks/
│       │   └── useUsers.ts     # Custom hook (state + data fetching)
│       └── components/
│           ├── SearchInput.tsx  # Debounced search bar with icon
│           ├── UserCard.tsx     # Individual user card
│           ├── UserList.tsx     # User list with loading/error/empty states
│           └── Pagination.tsx   # Numbered pagination controls
│
├── .gitignore
└── README.md                   # This file
```

---

## Prerequisites

Before you start, make sure you have the following installed on your computer:

### 1. Node.js (version 18 or higher)

Node.js is the runtime that powers both the frontend and backend.

**Check if you already have it:**
```bash
node --version
```

If you see a version number like `v18.x.x` or higher, you're good. If not, download it from: https://nodejs.org/

Pick the **LTS** (Long Term Support) version and follow the installer.

### 2. npm (comes with Node.js)

npm is the package manager used to install project dependencies. It comes automatically with Node.js.

**Check if you have it:**
```bash
npm --version
```

### 3. Git (optional, for cloning)

If you want to clone the repository from GitHub:
```bash
git --version
```

If not installed, download from: https://git-scm.com/

---

## How to Run the Project

Follow these steps in order. You need **two terminal windows** — one for the backend and one for the frontend.

### Step 1: Clone the Repository

```bash
git clone https://github.com/muhammad-asim786/Task_Freezing_page.git
cd Task_Freezing_page
```

### Step 2: Install Backend Dependencies

Open your first terminal window:

```bash
cd backend
npm install
```

This will download all the packages the backend needs. It may take a minute or two.

### Step 3: Start the Backend Server

In the same terminal:

```bash
npm run start:dev
```

You should see output ending with something like:
```
Nest application successfully started
```

The backend is now running at **http://localhost:3000**

**Leave this terminal open and running.**

### Step 4: Install Frontend Dependencies

Open a **second** terminal window:

```bash
cd frontend
npm install
```

This will download all the packages the frontend needs.

### Step 5: Start the Frontend App

In the same second terminal:

```bash
npm run dev
```

You should see output like:
```
▲ Next.js 16.x.x
- Local: http://localhost:3001
```

### Step 6: Open the App in Your Browser

Open your web browser and go to:

**http://localhost:3001**

You should see the User Directory page with:
- A header that says "User Directory"
- A search bar
- User cards in a grid
- Numbered pagination at the bottom

---

## How to Use the App

### Browsing Users
- The page shows 20 users at a time
- Use the numbered buttons at the bottom to go to different pages (1, 2, 3, ... 250)
- Use the Prev / Next arrows to go back and forward

### Searching
- Type a name (e.g., "User 42") or a role (e.g., "Admin") in the search bar
- Results update automatically after you stop typing
- The page resets to page 1 when you search
- Clear the search bar to see all users again

---

## API Reference

The backend exposes one endpoint:

### `GET /api/users`

| Parameter | Type   | Default | Description                          |
|-----------|--------|---------|--------------------------------------|
| `page`    | number | 1       | Which page of results to return      |
| `limit`   | number | 20      | How many users per page (max 100)    |
| `search`  | string | —       | Filter by name or role (case-insensitive) |

**Example requests:**

```bash
# Get first page (20 users)
curl http://localhost:3000/api/users

# Get page 5 with 10 users per page
curl "http://localhost:3000/api/users?page=5&limit=10"

# Search for admins
curl "http://localhost:3000/api/users?search=admin"
```

**Example response:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "User 1",
      "role": "Member",
      "status": "Offline",
      "lastLogin": "2025-11-22T08:30:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 5000,
    "totalPages": 250
  }
}
```

---

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable                  | Default                 | Description                    |
|---------------------------|-------------------------|--------------------------------|
| `NEXT_PUBLIC_API_BASE_URL`| `http://localhost:3000`  | Backend API URL               |

### Backend (environment)

| Variable      | Default                 | Description                     |
|---------------|-------------------------|---------------------------------|
| `PORT`        | `3000`                  | Port the backend runs on        |
| `CORS_ORIGIN` | `http://localhost:3001`  | Allowed frontend origin for CORS |

---

## Troubleshooting

### "command not found: node"
Node.js is not installed. Download it from https://nodejs.org/

### "command not found: npm"
npm comes with Node.js. Install Node.js first.

### Frontend shows "Failed to load users"
Make sure the backend is running in the other terminal (`npm run start:dev` in the `backend/` folder).

### Port already in use
If port 3000 or 3001 is already taken, you can change them:

```bash
# Backend: use port 3333
PORT=3333 npm run start:dev

# Frontend: use port 3002
npm run dev -- --port 3002
```

If you change the backend port, update `frontend/.env.local` to match:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333
```

### Nothing shows up in the browser
- Make sure both terminals are running (backend + frontend)
- Check that you're visiting http://localhost:3001 (not 3000)
- Open the browser's developer console (F12) to see any error messages

---

## Quick Reference

| Action              | Command                                      |
|---------------------|----------------------------------------------|
| Install backend     | `cd backend && npm install`                  |
| Start backend       | `cd backend && npm run start:dev`            |
| Install frontend    | `cd frontend && npm install`                 |
| Start frontend      | `cd frontend && npm run dev`                 |
| Open app            | http://localhost:3001                         |
| Test API            | `curl http://localhost:3000/api/users`        |
