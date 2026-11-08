# Security policy

## Supported versions

The project is a small desktop app without release channels — security fixes land on `main` only. Always use the latest revision.

| Version                | Supported |
| ---------------------- | --------- |
| latest version/main - `v.0.1.0`, and `v1` config format | ✅ |
| older revisions        | ❌        |

## Reporting a vulnerability

Do **not** open a public issue for anything you believe is exploitable before it can be patched.

Instead, use GitHub's private vulnerability reporting (**Security** tab → *Report a vulnerability*) on this repository, or contact the maintainer directly if that's unavailable. Please include:

- a description of the issue and its impact,
- steps or a config/setup to reproduce it,
- affected commit(s) or version(s), if known.

You can expect an initial response within a few days. Once a fix is ready, credit is given in the release notes if you'd like (public disclosure coordinated with you).

## Scope notes

For context on what matters in this codebase:

- The app is an Electron desktop application with full Node.js access in the main process (`src/js/main.mjs` + `src/js/*.mjs` helpers). The renderer runs with Electron's Node/Electron APIs available (`target: 'electron-renderer'`), which is why its bundle is considered app code, not untrusted web content.
- **Game execution is the main trust boundary.** The launcher runs executables defined in `config.json` (or discovered by scanning `game_dir`). The config's paths are relative to the user's home/games directory (see [docs/config.md](docs/config.md)) — a malicious or naive config can point anywhere, including outside those roots. Treat "arbitrary config → arbitrary executable" as expected behavior of the app itself, not a vulnerability, but any way for *untrusted external input* to alter the config or inject executables would be.
- Issues in upstream dependencies (Electron, webpack, npm packages) should be reported upstream once confirmed; if it affects this app's setup, let us know too.
