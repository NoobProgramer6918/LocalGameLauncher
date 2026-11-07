# AGENTS.md

## Repository context

This repository is a small Electron desktop app built with React and bundled with Webpack. The app entry is the Electron main process in `src/js/main.mjs`, which opens a window and loads `src/html/index.html`. The UI is rendered from `src/js/pages/index.jsx` and uses a simple page-state switcher to choose between the `Home`, `Library`, and `Settings` views.

## Commands

Run from the repository root:

```bash
npm install
npm run build       # webpack: bundles JSX and compiles SCSS into src/dist/
npm run start       # launches the Electron app
npm run start-build # builds first, then starts the app
npm test            # placeholder; no test suite yet
```

Notes:

- `npm run build` is webpack only. SCSS is compiled in the same pass by `sass-loader` (see `webpack.config.js`), producing `src/dist/renderer.css`, which `src/html/index.html` links.
- There is no watch/dev script; if you need one, add it rather than assuming it exists.
- `npm test` is not configured and currently exits with a placeholder message.

## Architecture conventions

- Keep Electron main-process code in `src/js/main.mjs` and helper modules it imports (`src/js/*.mjs`). These are ESM files: use `import`/`import.meta`, not `require()`/`__dirname`, in them.
- Keep renderer logic in `src/js/*.jsx`.
- `webpack.config.js` is CommonJS (`.js` with `require` and `__dirname`) and is loaded by Node, not Electron — that is intentional and matches its extension.
- Prefer small React components and keep page state simple unless a feature truly needs shared state.
- Follow the existing layout: `src/js` for UI logic, `src/scss` for source styles, `src/html` for the HTML shell, and `src/dist` for build output.
- Do not hand-edit generated bundle files or `src/dist` output.
- If adding a new page, wire it into the `page` state switch in `src/js/pages/index.jsx` and match the minimal SPA pattern already used by the app.

## Styling

- Edit the `.scss` source files under `src/scss` (partials are `_*.scss`; page/component styles live in nested folders like `src/scss/library/`).
- Components import their styles directly, e.g. `import '../scss/base.scss'`. Do not import `.css` artifacts or hand-edit generated CSS.
- The bundle output CSS is `src/dist/renderer.css`; never commit it or compiled CSS elsewhere.

## When making changes

- Keep changes small and consistent with the current project structure
- Favor the existing patterns over introducing new frameworks or heavier tooling for this app
- Validate with the smallest relevant command, usually `npm run build` for UI or build-related changes
