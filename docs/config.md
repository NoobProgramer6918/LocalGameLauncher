# Configuration Format

The launcher reads a JSON config file (`config.json` in the app's data directory). A default config is created automatically if none exists — see [Example](#example) below for a filled-in example.

## Example

```json
{
  "version": 1,
  "game_list_or_dir": "list",

  "game_dir": "games",
  "exclude": [],

  "list": [
    {
      "name": "example game",
      "directory": "example-game",
      "executable": "game.exe"
    }
  ]
}
```

## Fields

| Field              | Type    | Description                                                                                              |
|--------------------|---------|----------------------------------------------------------------------------------------------------------|
| `version`          | integer | Config format version. Currently `1`.                                                                    |
| `game_list_or_dir` | string  | How games are discovered. `"list"` uses the manual `list` below; `"dir"` scans `game_dir` automatically. |
| `game_dir`         | string  | Path to the games directory, relative to the user's home directory.                                      |
| `exclude`          | array   | Directory names to skip when scanning `game_dir` in `"dir"` mode.                                        |
| `list`             | array   | Manually defined games, used when `game_list_or_dir` is `"list"`.                                        |

## Game entries (`list`)

Each entry in `list` describes one game:

| Field        | Type   | Description                                                      |
|--------------|--------|------------------------------------------------------------------|
| `name`       | string | Display name of the game.                                        |
| `directory`  | string | The game's folder, relative to the games directory (`game_dir`). |
| `executable` | string | The game's executable, relative to the game's `directory`.       |

## Path resolution

All paths in the config are relative — nothing is absolute:

- `game_dir` is resolved relative to the **user's home directory**
  (`games` → `~/games`, e.g. `C:\Users\you\games` on Windows).
- A game's `directory` is resolved relative to `game_dir`
  (`example-game` → `~/games/example-game`).
- A game's `executable` is resolved relative to that game's `directory`
  (`game.exe` → `~/games/example-game/game.exe`).

With the example config above, the launcher would run
`~/games/example-game/game.exe` (e.g. `C:\Users\you\games\example-game\game.exe`).
