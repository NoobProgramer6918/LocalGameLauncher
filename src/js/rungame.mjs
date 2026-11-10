import {spawn} from 'node:child_process';
import * as path from "path";

export function RunGame(game_path) {
  const child_process = spawn(game_path, [], {
    cwd: path.dirname(game_path),
  });

  child_process.unref();
}