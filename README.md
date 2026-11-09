# Local Game Launcher

A simple Electron desktop app for organizing and launching locally installed games. Built with React and bundled with Webpack.

> **Note:** This project is in an early stage of development. Current features are minimal, and the UI contains placeholder content.

## Features

- **Home page** — landing view of the app.
- **Library** — a sidebar with game entries and a per-game page with a *Play* button (currently populated with test data).
- **Settings** — configure the game directory used to locate games.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node.js)

### Installation

```bash
git clone <repository-url>
cd localgamelauncher
npm install
```

### Running the app

```bash
npm run start-build   # builds, then launches the app
```

or step by step:

```bash
npm run build         # build the renderer bundle and CSS
npm run start         # launch the Electron app
```

> There is currently no watch/dev script; rebuild manually after making changes.

## Available Scripts

| Script                | Description                                        |
| --------------------- | -------------------------------------------------- |
| `npm run start-build` | Builds first, then launches the app.               |
| `npm run build`       | Builds the React bundle and SCSS into `src/dist/`. |
| `npm run start`       | Launches the Electron app.                         |
| `npm run build-win`   | Builds, then packages the app for Windows.         |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and technical details. AI/LLM-assisted contributions are welcome as long as they meet the LLM usage guidelines provided in CONTRIBUTING.md

## License

This project is licensed under the [MIT License](LICENSE).
