import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { configs } from "../configs";
import { EEmailActions } from "../enums";
import { emailTemplates } from "../statics";

class EmailService {
  private transporter: Transporter;
  public templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
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
          map: {
            layoutsDir: path.join(process.cwd(), "src", "statics", "layouts"),
            partialsDir: path.join(process.cwd(), "src", "statics", "partials"),
          },
          extension: "hbs",
          engineSource: {
            layoutsDir: path.join(process.cwd(), "src", "statics", "layouts"),
            partialsDir: path.join(process.cwd(), "src", "statics", "partials"),
          },
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
    name: string
  ) {
    const templateInfo = emailTemplates[emailAction];

    const html = await this.templateParser.render(templateInfo.template);

    return this.transporter.sendMail({
      from: "No reply",
      to: email,
      subject: templateInfo.subject,
      html,
      text: name,
    });
  }
}

export const emailService = new EmailService();
