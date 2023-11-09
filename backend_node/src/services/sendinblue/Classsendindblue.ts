/* export class ServiceSendinBlue {
  static async addSuscriptiontoList({ email }) {
    try {
      return "here";
    } catch (error) {}
  }

  // se agrega un tag de a los contactos de tal forma que se dispare un evento automatizado
  static async sendPostNewInfo({ type, info }) {
    try {
      const campaignId = await createCampaign({ type, info });
      if (campaignId) {
        await EmailCampaignsApi.sendEmailCampaignNow(campaignId);
        console.log("API called successfully.");
      } else {
        console.error("Campaign ID is missing or invalid");
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async createCampaign({ type, info }) {
    let params;
    if (type == "event") {
      params = {
        event: info.title,
        event_image: info.frontpage,
      };
    } else if (type == "blog") {
      params = {
        title: info.title,
        description: info.description,
        blog_image: info.image,
      };
    }

    try {
      const templateId = await getTemplate({ type });
      const emailCampaigns = await newCampaign({
        title: info.title,
        params,
        listId,
        templateId,
      });
      const campaign =
        await EmailCampaignsApi.createEmailCampaign(emailCampaigns);
      return campaign.id;
    } catch (error) {
      handlerHttpError(res, `Origen: Campaign ${error}`);
    }
  }

  static async getTemplate({ type }) {
    const apiInstance = await TransactionalEmailsApi;
    const templates = await apiInstance.getSmtpTemplates();
    const template = templates.templates.find((t) =>
      t.name.toLowerCase().includes(type.toLowerCase()),
    );
    const { id } = template;
    return id;
  }
}
 */
