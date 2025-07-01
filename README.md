# Join Up - Event Management Platform

This project is a submission for the Programming Hero Web Instructor Trainee task. It is a full-stack event management platform built with Next.js, React, Redux Toolkit, and TypeScript. The app allows users to create, join, and manage events with authentication and private route protection.

## Requirements & Features

### 1. Navbar
- Logo + website name
- Navigation: Home, Events, Add Event, My Event
- Sign In button (when not logged in)
- If logged in: profile picture appears
- Profile dropdown: User name (not clickable), Logout button

### 2. Homepage
- Custom design (free to design your own)

### 3. Events (Private Route)
- Displays all events added through the Add Event page
- Events sorted by date and time (most recent first)
- Card format for each event:
  - Event Title
  - Name (who posted)
  - Date and Time
  - Location
  - Description
  - Attendee Count
  - Join Event button (user can join only once; increases count)
- Search events by title
- Filter events by:
  - Today
  - Date range: Current week, Last week, Current month, Last month

### 4. Add Event (Private Route)
- Form to add new events:
  - Event Title
  - Name (auto-filled from user)
  - Date and Time
  - Location
  - Description
  - Attendee Count (default 0)
- On submit, event is stored in the database

### 5. My Event (Private Route)
- Shows events created by the logged-in user
- Card format with:
  - Event Title
  - Name
  - Date and Time
  - Location
  - Description
  - Attendee Count
  - Update button (opens modal or new route)
  - Delete button (with confirmation)

### 6. Authentication System
- Custom-built (no third-party auth packages)
- Registration: Name, Email, Password, PhotoURL
- Login: Email, Password
- Error handling: Clear messages for invalid credentials, missing fields, etc.

### 7. Private Route Protection
- Uses Next.js middleware to protect /events, /add-event, and /my-events routes
- Checks for `join-up-refreshToken` cookie
- Redirects unauthenticated users to /login

## Extra Features
- Responsive design
- Animated transitions (Framer Motion)
- Internationalization (i18n) support
- Theme toggle (light/dark)
- Persisted Redux state (redux-persist)
- Toast notifications for actions

## Technology Stack
- Next.js 15 (App Router)
- React 19
- Redux Toolkit & RTK Query
- TypeScript
- Tailwind CSS
- Framer Motion
- redux-persist
- axios
- zod (form validation)
- jwt-decode

## File Structure (Key Parts)
```
join-up/
├── src/
│   ├── app/
│   │   ├── (auth)/         # Auth pages (login, sign-up)
│   │   ├── (main)/         # Main app pages (events, add-event, my-events)
│   │   ├── layout.tsx      # App layout
│   │   └── globals.css     # Global styles
│   ├── components/         # UI and shared components
│   ├── helpers/            # Axios and API helpers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, types, i18n, theme
│   ├── provider/           # App providers (Redux, main)
│   └── redux/              # Redux slices, store, API logic
├── public/                 # Static assets
├── middleware.ts           # Next.js middleware for private routes
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and set the required environment variables (e.g., `NEXT_PUBLIC_API_URL`)
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Notes
- This project is for demonstration and educational purposes as part of the Programming Hero Web Instructor Trainee selection process.
- The authentication system is custom and does not use third-party providers.
- For any questions or issues, please contact the project maintainer.
