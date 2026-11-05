# AGENTS.md

## Repository context

This repository is a small Electron desktop app built with React and bundled with Webpack. The app entry is the Electron main process in `src/js/main.js`, which opens a window and loads `src/html/index.html`. The UI is rendered from `src/js/index.jsx` and uses a simple page-state switcher to choose between the `Home` and `Library` views.

## Commands

Run from the repository root:

```bash
npm install
npm run build
npm run dev
npm run start
npm run start-build
```

Notes:

- `npm run build` runs webpack and Sass compilation
- `npm run dev` runs webpack in watch mode
- `npm run start` launches the Electron app
- `npm run start-build` builds first, then starts the app
- `npm test` is not configured and currently exits with a placeholder message

## Architecture conventions

- Keep Electron main-process code in `src/js/main.js` and renderer logic in `src/js/*.jsx`
- Prefer small React components and keep page state simple unless a feature truly needs shared state
- Follow the existing layout: `src/js` for UI logic, `src/scss` for source styles, `src/html` for the HTML shell, and `src/dist` for build output
- Do not hand-edit generated bundle files or compiled CSS unless intentionally bypassing the normal build step
- If adding a new page, wire it into the `page` state switch in `src/js/index.jsx` and match the minimal SPA pattern already used by the app

## Styling

- Edit the `.scss` source files rather than generated CSS artifacts
- Rebuild after style changes so the generated CSS and bundle stay aligned with the source

## When making changes

- Keep changes small and consistent with the current project structure
- Favor the existing patterns over introducing new frameworks or heavier tooling for this app
- Validate with the smallest relevant command, usually `npm run build` for UI or build-related changes
