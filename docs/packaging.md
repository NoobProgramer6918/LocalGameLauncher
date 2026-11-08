# Packaging

The app is packaged with [electron-builder](https://www.electron.build/), configured in [`electron-builder.yml`](../electron-builder.yml).

## Local builds

```bash
npm run build-win   # builds, then packages for Windows
```

Output is written to `release/`. The Windows targets are an NSIS installer (non one-click — the installer lets the user pick the installation directory) and a portable `.exe`.

## Release builds

The release workflow (`.github/workflows/release.yml`) runs on `v*` tags and attaches artifacts to the GitHub release for that tag:

- **Windows** (`windows-latest`): `npm ci`, `npm run build`, then `npx electron-builder --win --publish always` — NSIS installer + portable `.exe`.
- **Linux** (`ubuntu-latest`): same steps with `--linux` — AppImage (built on a Linux runner so symlinks don't need special permissions).

Authentication uses `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.

## What gets packaged

`electron-builder.yml` includes only what the app loads at runtime: `src/js/**/*` (the main process and its `.mjs` helpers), `src/html/**/*`, and `src/dist/**/*` (the webpack-built renderer bundle and CSS — note the main process loads these from disk, they are not inlined).

`node_modules` is excluded: `react`/`react-dom` are bundled into `renderer.js`, and the main process only imports Node builtins and Electron.
