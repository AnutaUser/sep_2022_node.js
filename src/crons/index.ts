import { oldPassRemove } from "./delete-old-passwords.cron";
import { removeOldTokens } from "./delete-old-tokens.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  oldPassRemove.start();
};