# Contributing to Local Game Launcher

Thanks for considering a contribution! This document covers the technical details you need to work on the project.

> LLM/AI-assisted contributions are welcome. AI-authored code is subject to the same review standard as human-authored code: if the quality is sufficient — correct, idiomatic for this codebase, and consistent with the conventions below — it will be accepted, regardless of whether a human or a model wrote it. (Yes, that includes small models. Just make sure the code actually works.)

## Setup

Requirements:

- Node.js (LTS recommended)
- npm

```bash
npm install
npm run build       # webpack build: bundles JSX + compiles SCSS into src/dist/
npm run start       # launch the Electron app against the built output
npm run start-build # build, then start
```

There is no watch/dev script yet — rebuild and relaunch after changes. `npm test` is a placeholder; there is no test suite, so validate changes manually with a build and by running the app.

## Architecture

**Process roles:**

| Part         | Runs in                   | Location                                                   |
| ------------ | ------------------------- | ---------------------------------------------------------- |
| Main process | Electron (Node.js)        | `src/js/main.mjs` + `src/js/*.mjs` helpers                 |
| Renderer     | Chromium window           | `src/js/pages/*.jsx`, bundled by webpack                   |
| HTML shell   | Loaded by main process    | `src/html/index.html`                                      |
| Styles       | Injected via the renderer | `src/scss/` source, compiled to `src/dist/renderer.css`    |

**Startup flow:**

1. `main.mjs` creates a `BrowserWindow` and loads `src/html/index.html` via `win.loadFile(...)` (resolved with `import.meta.dirname`).
2. On `app.whenReady()`, `InitApp()` from `init_app.mjs` runs, which initializes app configuration (`config/init.mjs` → `config/get.mjs`): it reads the app's JSON config and creates it from `config/baseconfig.json` if missing or invalid. The config holds the game directory/mode (`game_list_or_dir`, `game_dir`, optional `list`).
3. The HTML shell loads `src/dist/renderer.js`, webpack's build of the React app.

**Renderer app (`src/js/pages/index.jsx`):** a minimal SPA with `page` state and a switch that renders `Home`, `Library`, or `Settings` (plus a `Navbar` that switches pages via a `navigate` prop). There are no routing libraries and no state manager — pages are plain React components, shared state is passed as props.

**Adding a page:**

1. Create `src/js/pages/<name>.jsx`, default-export a function component.
2. Import its SCSS directly in the component file (e.g. `import '../../scss/<name>.scss'`).
3. Add a `case` to the `page` switch in `src/js/pages/index.jsx` and wire a button for it in `elements/navbar.jsx` if it should be reachable.

**Build tooling (`webpack.config.js`):**

- CommonJS (`.js` with `require`/`__dirname`) — it is loaded by Node, never bundled, and that is intentional; don't convert it to ESM.
- Entry: `src/js/pages/index.jsx` → output `src/dist/renderer.js`, with source maps, `mode: 'development'`.
- `target: 'electron-renderer'` — keep this; it's what makes Node/Electron APIs available to the bundle context where needed.
- Babel with `@babel/preset-react` on `.js`/`.jsx` (node_modules excluded).
- SCSS is handled in the same pass by `sass-loader` with `type: 'css'`, emitting `src/dist/renderer.css`, which `index.html` links.

**ESM vs CommonJS:**

- Files executed by Electron (`src/js/*.mjs`, e.g. `main.mjs`, `init_app.mjs`, `config/*.mjs`) are ESM: use `import`/`export` and `import.meta` (e.g. `import.meta.dirname`), never `require()` or `__dirname`.
- `webpack.config.js` stays CommonJS.
- Renderer JSX files target the webpack bundle and only need webpack-compatible imports.

## Style and conventions

- Follow the existing layout: `src/js` for logic (`.mjs` for main process, `.jsx` for renderer), `src/scss` for styles (partial files are `_*.scss`; page/component styles live in nested folders like `src/scss/library/`), `src/html` for the HTML shell.
- Components import their styles directly (e.g. `import '../scss/base.scss'`). Never import compiled `.css` artifacts.
- Do not hand-edit anything under `src/dist/` — it's generated build output.
- Prefer small components and the existing minimal patterns over introducing new frameworks, state managers, or heavier tooling. Propose a dependency bump or new tooling via an issue first.
- Keep changes small and focused; one feature or fix per PR.

## Documentation

- [`docs/`](docs/) contains project documentation for contributors, e.g. [`docs/config.md`](docs/config.md) explaining the app's JSON configuration format and its relative path resolution, and [`docs/packaging.md`](docs/packaging.md) on building distribution packages. If you add or change a feature, update `docs/` alongside the code where appropriate.

## Submitting changes

1. Validate with the smallest relevant command — usually `npm run build` (and a quick `npm run start` smoke test) for UI or build-related changes.
2. Check the built bundle actually updates (beware edits that don't reach webpack's entry graph).
3. PRs should describe what changed, how to test it, and note main-process vs renderer impact where relevant.

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). In short: be civil — reviews judge the code, not the author.
