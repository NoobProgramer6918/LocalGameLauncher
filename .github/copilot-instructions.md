# Copilot instructions for Local Game Launcher

This repository keeps a small amount of project-specific guidance in `AGENTS.md` and mirrors the same high-level expectations here.

## Project overview

This repository is a small Electron desktop app that renders a React-based interface. The application entry point is `src/js/main.js`, which creates the Electron `BrowserWindow` and loads `src/html/index.html`. The renderer is mounted from `src/js/index.jsx`, and page navigation is handled by a simple `page` state that swaps between the `Home` and `Library` views.

The project structure is intentionally small:

- `src/js/main.js`: Electron main-process bootstrap
- `src/js/index.jsx`: app root and page switcher
- `src/js/home.jsx`: Home page component
- `src/js/library.jsx`: Library page component
- `src/js/elements/navbar.jsx`: navigation bar component
- `src/scss/*.scss`: source styles
- `src/html/index.html`: app shell
- `src/dist/renderer.js`: generated webpack bundle

## Build and run commands

Use these commands from the repository root:

```bash
npm install
npm run build
npm run dev
npm run start
npm run start-build
```

What they do:

- `npm run build`: runs webpack and Sass compilation (`webpack && sass src/scss`)
- `npm run dev`: runs webpack in watch mode
- `npm run start`: launches the Electron app
- `npm run start-build`: builds first, then starts the app

There is no active lint configuration and no real automated test suite in this repo. `npm test` currently exits with a placeholder error (`"Error: no test specified"`), so treat it as unavailable until the project adds a real test runner.

## Architecture and conventions

- Electron main process and React renderer are split intentionally:
  - main-process code in `src/js/main.js` uses CommonJS (`require`, `__dirname`)
  - renderer code in `src/js/*.jsx` uses React and JSX
- The app is a single-page interface controlled by `useState('home')` in `src/js/index.jsx`.
- `Navbar` sets the page via `navigate`, and the app renders the corresponding component (`Home` or `Library`).
- Webpack is configured with `target: 'electron-renderer'` in `webpack.config.js`, so code should remain browser-like and Electron-safe.
- The HTML shell loads CSS from `src/scss/*.css` and the bundled renderer script from `src/dist/renderer.js`.
- Keep any additional agent-facing guidance aligned with `AGENTS.md` when project-specific workflows change.

## Styling conventions

- Source styles live in `src/scss/*.scss`.
- The repo also contains generated CSS files in the same directory (for example `base.css`, `navbar.css`), but they are build artifacts.
- Prefer editing the `.scss` source and then running `npm run build` so the generated CSS stays in sync.
- Do not manually edit `src/dist/renderer.js` or the generated CSS in `src/scss` unless you intentionally want to bypass the normal build step.

## Editing guidance for future changes

- Add new app pages as React components and wire them into the `page` switch logic in `src/js/index.jsx`.
- Keep new UI state local to the component unless it needs to be shared across multiple pages.
- Follow the existing file layout: render logic in `src/js`, styles in `src/scss`, shell markup in `src/html`, and build outputs in `src/dist`.
- If a feature needs a new page, keep it consistent with the current minimal one-page pattern rather than introducing a larger routing framework.
