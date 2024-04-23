/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-promise-reject-errors */
import * as Brevo from "@getbrevo/brevo";
import { exec } from "child_process";
import { APP_CONFIG, SMS } from "../../helpers";

const list = 2;

/**
  |--------------------------------------------------------------------------
  | Service sendinblue - Brevo
  |--------------------------------------------------------------------------
  | Here you can specify the methods used to automate emails using Brevo.
  | To use the current configuration or add new functionality here the reference 
  | https://github.com/getbrevo/brevo-node/blob/main/README.md  
  | 
 */

interface IBrevoConsult {
  email: string;
  name: string;
  type: string;
}

// List name Brevo
const NameTypes = {
  PETS: "pets",
} as const;

type TypesNAme = keyof typeof NameTypes;

export class ServiceSMTP {
  private apikey: string;

  constructor(apikey: string) {
    this.apikey = apikey;
    this.configApiClient();
  }

  private configApiClient() {
    const client = Brevo.ApiClient.instance;
    const apiKeyAuth = client.authentications["api-key"];
    apiKeyAuth.apiKey = this.apikey;
  }

  /**
   * * This method calls all the templates created directly in the Brevo management panel
   * @param type :name template
   * @returns  Id template found
   */
  public async getTemplate({ type }: { type: TypesNAme }) {
    this.configApiClient();

    const apiInstance = new Brevo.TransactionalEmailsApi();
    const templates = await apiInstance.getSmtpTemplates();

    const template = templates.templates.find((t) =>
      t.name.toLowerCase().includes(type.toLowerCase()),
    );
    return template.id;
  }

  /**
   * * this metod extract info account.
   * @returns  void
   */
  private async getInfo() {
    this.configApiClient();
    try {
      const api = new Brevo.AccountApi();
      const data = await api.getAccount();

      return {
        status: true,
        data: {
          email: data.email,
          name: data.companyName,
        },
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return {
          status: false,
          code: 404,
          message: error.response.body.message,
        };
      }
      throw error;
    }
  }

  /**
   * *This method helps to find the contact list with the specific name
   * @param name
   * @returns The list with the assigned name
   */
  public async getList({ name }: Pick<IBrevoConsult, "name">) {
    this.configApiClient();
    let result: [];
    const api = new Brevo.ContactsApi();
    /*  const opts = {
      limit: 10, // Number | Number of documents per page
      offset: 0, // Number | Index of the first document of the page
    }; */

    const { lists } = await api.getLists();

    if (lists.length) {
      result = lists.findIndex((item) =>
        item.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    return lists[result];
  }

  /**
   * * Add the contact to the list created in your Brevo administrative panel
   * !TODO: look for the option to accept dynamic list
   * @param email
   * @return response : { status: boolean, message: string}
   */
  public async AddContact({ email }: Pick<IBrevoConsult, "email">) {
    this.configApiClient();

    try {
      const api = new Brevo.ContactsApi();
      const newContact = new Brevo.CreateContact();
      const listcontact = await this.getList({ name: "web" });

      newContact.email = email;
      newContact.listId = listcontact.id;

      await api.createContact(newContact);

      return {
        status: true,
        message: "Contact add",
      };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return {
          status: false,
          code: error.response.status,
          message: error.response.body.message,
        };
      }
      throw error;
    }
  }

  /**
   * * Delete the contact to the list  in your Brevo administrative panel
   * @param email
   * @return response : { status: boolean, message: string}
   */
  public async DeleteContact({ email }: Pick<IBrevoConsult, "email">) {
    this.configApiClient();
    try {
      const apiContact = new Brevo.ContactsApi();

      await apiContact.deleteContact(email);

      return {
        status: true,
        message: `This ${email} delete the list`,
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return {
          status: false,
          code: error.response.status,
          message: error.response.body.message,
        };
      }
      throw error;
    }
  }

  /**
   * !sendEmail.to recibe el array de los correos, toca ver
   * @param param0
   * @returns
   */
  public async SendEmail({ type, items, email }) {
    this.configApiClient();
    const { data } = await this.getInfo();
    // verificar el template
    const templateId = await this.getTemplate({ type });
    const subject = `Ayudanos a encontrar a ${items.items[0].alias}!`;

    try {
      const api = new Brevo.TransactionalEmailsApi();
      const sendEmail = new Brevo.SendSmtpEmail();

      sendEmail.sender = { name: data.name, email: data.email };
      sendEmail.subject = subject;
      sendEmail.to = [{ email }];
      sendEmail.templateId = templateId;
      sendEmail.params = {
        name: "Papitas A Casa",
        url: "https://papitas-a-casa.com",
        email: "patitasacasaorg@gmail.com",
        message: "Somos una organización ........ ...... .. .",
        items: items.items,
      };
      const result = await api.sendTransacEmail(sendEmail);

      return {
        status: true,
        data: result,
      };
    } catch (error) {
      // If Brevo email sending fails, attempt to send via Python script
      try {
        const template = "template.html";
        const pythonResult = await this.sendEmailViaPython({
          email,
          subject,
          template,
        });
        return pythonResult;
      } catch (pythonError) {
        return {
          status: false,
          code: 500,
          message: "Failed to send email via Python",
        };
      }

      /* if (error.response && error.response.status === 400) {
        return {
          status: false,
          code: error.response.status,
          message: error.response.body.message,
        };
      }
      throw error; */
    }
  }

  /**
   * Executes a Python script to send an email, handling success and failure scenarios.
   * @param email {string} - Email address of the recipient.
   * @param data {any} - Additional data or information for the email.
   * @param items {any[]} - List of items to be included in the email.
   * @returns {Promise<{status: boolean, data: string}>} - A promise resolving to an object indicating the status and response data.
   */
  public async sendEmailViaPython({ email, subject, template }) {
    return new Promise((resolve, reject) => {
      const pythonScriptPath = "./send_email.py"; // Path to the Python script
      const receiver_email = Buffer.from(email, "utf-8").toString("ascii"); // User email
      const pythonCommand = `python3 ${pythonScriptPath} ${receiver_email} "${subject}" ${template}`; // Python command
      const successMessage = "Email sent successfully"; // Successful message

      // Execute Python script
      exec(pythonCommand, (error, stdout, stderr) => {
        // Handle error if script execution fails
        if (error) {
          reject(`Failed to send email via Python script ${error.message}`);
          return;
        }
        // Handle standard error output from Python script
        if (stderr) {
          reject(`Error in Python script execution ${stderr}`);
          return;
        }

        // Check for success message in the script output
        if (stdout.includes(successMessage)) {
          // Resolve with a status and response data on successful email sending
          resolve({
            status: true,
            data: stdout,
          });
        }
      });
    });
  }

  /**
   * * Worked!
   * !TODO: look for the option to accept dynamic list
   * @param name: Name of the campaign
   * @param replyTo: Email on which the campaign recipients will be able to reply to
   * @param recipients :optianl ?
   * @param header: Header of the email campaign
   * @param footer: Footer of the email campaign
   * @param templateId : id templat from transaci onal
   * @returns
   */

  /* eslint-disable class-methods-use-this */
  public async createCampaign({ templateId }) {
    let api = new Brevo.CreateEmailCampaign();
    api = {
      sender: { name: APP_CONFIG.NAME, email: SMS.EMAIL },
      name: "Ayudame a Encontrarlos", // recibirlo por parametro
      subject: "Lista de mascotas perdidas en esta semana!", // mensaje predeterminado
      replyTo: "phew_misame@hotmail.com", // recibirlo por parameto
      recipients: { listIds: [list] }, // la lista de  los contactos.
      mirrorActive: false,
      recurring: false,
      type: "classic",
      header: "If you are not able to see this mail, click {here}",
      footer: "If you wish to unsubscribe from our newsletter, click {here}",
      templateId,
    };
    return api;
  }
}
