# dummy-store

A React 19 single-page app built with [Vite](https://vite.dev/).

> **Current status:** the project is at the starter stage. Despite the name, there is no store functionality yet (no products, cart, or API calls). Running it shows a landing page with:
>
> - a hero section with the React and Vite logos
> - a **"Count is N"** button that increments a counter (React `useState`)
> - links to the Vite and React docs and to the Vite community (GitHub, Discord, X, Bluesky)

## Tech stack

| Tool | Version | Purpose |
| --- | --- | --- |
| React / React DOM | 19 | UI library |
| Vite | 8 | Dev server and bundler |
| @vitejs/plugin-react | 6 | JSX transform and Fast Refresh (HMR) |
| ESLint | 10 | Linting, with `react-hooks` and `react-refresh` plugins |

Plain JavaScript (`.jsx`), no TypeScript. No backend, environment variables, or database are needed.

## Prerequisites

- **Node.js 24.21+** (required by Vite 8).
- **npm** (comes with Node.js).

## Getting started

```bash
# 1. Clone the repository and enter the folder
git clone <repository-url>
cd dummy-store

# 2. Install dependencies (uses the versions locked in package-lock.json)
npm install

# 3. Start the development server
npm run dev
```

Open the URL printed in the terminal (by default **http://localhost:5173**). Edits to files in `src/` show up in the browser immediately thanks to hot module replacement.

To make the dev server reachable from other devices on your network, run `npm run dev -- --host`.

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with HMR at http://localhost:5173 |
| `npm run build` | Builds an optimized production bundle into `dist/` |
| `npm run preview` | Serves the `dist/` build locally at http://localhost:4173 (run `npm run build` first) |
| `npm run lint` | Runs ESLint over the project |

## Production build

```bash
npm run build     # outputs static files to dist/
npm run preview   # check the build locally
```

The `dist/` folder contains static HTML, CSS, JS and assets, so it can be deployed to any static host (Netlify, Vercel, GitHub Pages, S3, Nginx, etc.). If you deploy under a sub-path (e.g. GitHub Pages at `/dummy-store/`), set the [`base`](https://vite.dev/config/shared-options.html#base) option in `vite.config.js`.

## Project structure

```
dummy-store/
├── index.html          # HTML entry point; loads src/main.jsx
├── vite.config.js      # Vite config (React plugin)
├── eslint.config.js    # ESLint flat config
├── package.json        # Scripts and dependencies
├── public/             # Served as-is from the site root
│   ├── favicon.svg
│   └── icons.svg       # SVG sprite for the doc/social icons
└── src/
    ├── main.jsx        # Mounts <App /> into #root in StrictMode
    ├── App.jsx         # Landing page and counter
    ├── App.css         # Component styles
    ├── index.css       # Global styles
    └── assets/         # hero.png, react.svg, vite.svg (imported by App.jsx)
```
