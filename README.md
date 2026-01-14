# Glitchess Frontend

React-based frontend for the Glitchess multiplayer chess platform.

> 🎮 **Main Repository:** [glitchess](https://github.com/govindpvenu/glitchess)
> 🔧 **Backend Repository:** [glitchess-backend](https://github.com/govindpvenu/glitchess-backend)

## Tech Stack

-   **React 18** with TypeScript
-   **Vite** — Build tool
-   **TanStack Router** — File-based routing
-   **Redux Toolkit + RTK Query** — State management & API caching
-   **Tailwind CSS + shadcn/ui** — Styling & components
-   **chess.js + react-chessboard** — Chess logic & board
-   **Socket.io Client** — Real-time multiplayer

## Project Structure

```
src/
├── components/
│   ├── Game/              # Game components (PlayGame, Timer, History)
│   │   └── GameComponents/
│   ├── Ranking/           # Leaderboard with data tables
│   └── ui/                # shadcn/ui components
├── routes/
│   ├── _auth/             # Auth pages (login, register, forgot-password)
│   ├── _private/          # Protected routes (game, profile, ranking)
│   └── _public/           # Public routes (home, vs-computer, vs-human)
├── slices/                # Redux slices & RTK Query endpoints
├── hooks/                 # Custom hooks (useAuth)
├── lib/                   # Utilities
├── socket.ts              # Socket.io client instance
└── store.ts               # Redux store configuration
```

## Getting Started

### Prerequisites

-   Node.js 18+
-   Backend server running ([glitchess-backend](https://github.com/govindpvenu/glitchess-backend))

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app runs on `http://localhost:3000`

## Available Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm start`       | Start development server  |
| `npm run build`   | Build for production      |
| `npm run preview` | Preview production build  |
| `npm run lint`    | Run ESLint                |
| `npm run format`  | Format code with Prettier |
| `npm run check`   | Check formatting          |

## Deployment

The frontend is configured for Vercel deployment. See `vercel.json` for configuration.

```bash
npm run build
```

Build output is in the `dist/` directory.
