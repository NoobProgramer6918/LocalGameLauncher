/*
This file should initialize the configuration of this app.
Which includes:
- Reading the JSON.
- If there is no JSON, or it's invalid:
- Create it
- Store the configuration and make it available to other scripts.
 */
import * as get_config from "./get.mjs";

export default async function InitConfig() {
  console.log("Initializing config...");
  await get_config.GetConfig();
}