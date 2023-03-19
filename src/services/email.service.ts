import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { configs } from "../configs";
import { emailTemplates } from "../constants";
import { EEmailActions } from "../enums";

class EmailService {
  private transporter: Transporter;
  public templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.EMAIL_USER,
        pass: configs.EMAIL_PASS,
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "statics", "views"),
        options: {
          extension: "hbs",
        },
      },

      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "statics", "css"),
        },
      },
    });
  }

  public async sendMail(
    email: string,
    emailAction: EEmailActions,
    locals: Record<string, string> = {}
  ) {
    try {
      const templateInfo = emailTemplates[emailAction];

      locals.frontend_url = configs.FRONTEND_URL;

      const html = await this.templateParser.render(
        templateInfo.template,
        locals
      );

      return this.transporter.sendMail({
        from: "No reply",
        to: email,
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      console.error(e.message);
    }
  }
}

export const emailService = new EmailService();
