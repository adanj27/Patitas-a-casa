import * as Brevo from "@getbrevo/brevo";
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
  private async getTemplate({ type }) {
    this.configApiClient();

    const apiInstance = new Brevo.TransactionalEmailsApi();
    const templates = await apiInstance.getSmtpTemplates();
    const template = templates.templates.find((t) =>
      t.name.toLowerCase().includes(type.toLowerCase()),
    );
    return template.id;
  }

  /**
   * * This method answer test
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
   * * Add the contact to the list created in your Brevo administrative panel
   * !TODO: look for the option to accept dynamic list
   * @param email
   * @return response : { status: boolean, message: string}
   */
  public async AddContact({ email }) {
    this.configApiClient();

    try {
      const apiContact = new Brevo.ContasctsApi();
      const newContact = new Brevo.CreateContact();

      newContact.email = email;
      newContact.listId = [list];

      await apiContact.createContact(newContact);

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
  public async DeleteContact({ email }) {
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

  public async SendEmail() {
    this.configApiClient();
    const { data } = await this.getInfo();
    const templateId = await this.getTemplate({ type: "pets" });

    try {
      const api = new Brevo.TransactionalEmailsApi();
      const sendEmail = new Brevo.SendSmtpEmail();
      sendEmail.sender = { name: data.name, email: data.email };
      sendEmail.to = [{ email: "phew_misame@hotmail.com" }];
      sendEmail.subject = "prueba!";
      sendEmail.templateId = templateId;
      sendEmail.params = {
        parameter: "My param value",
        subject: "common subject",
      };
      const result = await api.sendTransacEmail(sendEmail);

      return {
        status: true,
        data: result,
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

  public async getList() {
    this.configApiClient();

    const api = new Brevo.ContactsApi();
    const opts = {
      limit: 10, // Number | Number of documents per page
      offset: 0, // Number | Index of the first document of the page
    };
    const result = await api.getLists(opts);

    return result.lists;
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
