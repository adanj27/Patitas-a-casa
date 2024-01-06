/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
import {
  Transporter,
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";

export interface MailInterface {
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text?: string;
  html?: string;
}

export class MailService {
  private static instance: MailService;

  private transporter: Transporter | null = null;

  private constructor() {}

  static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  async createConnection(local: false): Promise<void> {
    if (this.transporter) return;

    try {
      let options;

      if (local) {
        const account = await createTestAccount();
        options = {
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        };
      } else {
        options = {
          host: process.env.SMTP_HOST || "",
          port: process.env.SMTP_PORT || "0",
          secure: process.env.SMTP_TLS,
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
          },
        };
      }

      this.transporter = createTransport(options);
    } catch (error) {
      throw new Error(`Failed to create connection email: ${error}`);
    }
  }

  async sendMail(
    requestId: string | number,
    options: MailInterface,
  ): Promise<unknown> {
    if (!this.transporter) {
      throw new Error("No transporter created. Call createConnection() first.");
    }

    try {
      const info = await this.transporter.sendMail({
        from: `${process.env.SMTP_SENDER || options.from}`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      /* console.log(`${requestId} - Mail sent successfully!!`);
      console.log(
        `${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`,
      ); */

      if (process.env.NODE_ENV === "local") {
        console.log(
          `${requestId} - Nodemailer ethereal URL: ${getTestMessageUrl(info)}`,
        );
      }

      return info;
    } catch (error) {
      throw new Error(`Failed to send mail: ${error}`);
    }
  }

  async verifyConnection() {
    return this.transporter.verify();
  }
}
