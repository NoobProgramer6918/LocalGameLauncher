import InitConfig from "./config/init.mjs";
import * as check_os from './check_os.mjs';

export default async function InitApp() {
  await InitConfig();
}