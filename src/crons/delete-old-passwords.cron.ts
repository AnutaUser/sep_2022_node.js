import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { OldPassword } from "../models/Old-password.model";

dayjs.extend(utc);

const oldPassRemover = async (): Promise<void> => {
  const prevYear = await dayjs().utc().subtract(1, "month");

  await OldPassword.deleteMany({ createdAt: { $lte: prevYear } });
};

export const oldPassRemove = new CronJob("0 0 * * * *", oldPassRemover);
