import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { ESmsActions } from "../enums";
import { Token, User } from "../models";
import { smsService } from "../services/sms.service";

dayjs.extend(utc);

const reminder = async (): Promise<void> => {
  const monthAgo = await dayjs().utc().subtract(1, "month");

  const oldTokens = await Token.find({ createdAt: { $lte: monthAgo } });

  const ids = oldTokens.map((token) => token._user_id);

  const users = await User.find({ _id: { $in: ids } });

  const phones = users.map((user) => user.phone);
  const names = users.map((user) => user.name);

  phones.map(async (phone) => {
    names.map(async (userName) => {
      await smsService.sendSms(phone, ESmsActions.REMINDER, userName);
    });
  });
};

export const remindSMS = new CronJob("* * * * * *", reminder);
