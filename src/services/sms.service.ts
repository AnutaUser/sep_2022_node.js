import { Twilio } from "twilio";

import { configs } from "../configs";
import { smsTemplates } from "../constants";
import { ESmsActions } from "../enums";
import { ApiError } from "../errors";

class SmsService {
  constructor(
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    )
  ) {}
  public async sendSms(phone: string, smsAction: ESmsActions) {
    const message = smsTemplates[smsAction];

    try {
      await this.client.messages.create({
        body: message,
        messagingServiceSid: configs.TWILIO_SERVICE_SID,
        to: phone,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const smsService = new SmsService();
