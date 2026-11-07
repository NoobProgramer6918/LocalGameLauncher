# Copilot Instructions

All agent guidance for this repository lives in [`AGENTS.md`](../AGENTS.md). Read and follow it before making any changes — it covers:

- Project overview and entry points (`src/js/main.mjs`, `../src/js/pages/index.jsx`)
- Build and run commands (`npm run build`, `npm run start`, `npm run start-build`)
- Architecture conventions (ESM main process, `.jsx` renderer, CommonJS `webpack.config.js`)
- Styling rules (edit `.scss` sources; webpack compiles them via sass-loader)

If `AGENTS.md` changes, keep your behavior consistent with it — this file is only a pointer and must not duplicate its content.
