import { Request, Response } from "express";
import { FormRepository, UserRepository } from "../models/repositorie";
import { ApiResponse, Errors, IForm } from "../interface";
import {
  FormCreateLostType,
  FormCreateFoundType,
  FormUpdateType,
  PaginationType,
  ValidateIdType,
} from "../schema";
import { AuthRequest, handlerHttpError } from "../middlware";
import { MailInterface, MailService } from "../services/mailService";
import { IAuth } from "../helpers";
import { emailTemplate } from "../services/sendinblue/pet.template";

const User = new UserRepository();
const Form = new FormRepository();
const Email = MailService.getInstance();

export class FormController {
  static async getAll(
    req: Request<unknown, unknown, PaginationType>,
    res: Response,
  ): Promise<Response<ApiResponse<IForm[]>>> {
    try {
      const skip = parseInt(req.query.skip as string, 10);
      const limit = parseInt(req.query.limit as string, 10);

      const forms = await Form.getAllPagination({ skip, limit });
      const totalDoc = await Form.count();
      const hasNexPage = skip + limit < totalDoc;

      const response: ApiResponse<IForm[]> = {
        status: true,
        total: forms.length,
        nextPage: hasNexPage,
        data: forms,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error.message));
    }
  }

  static async getById(
    req: Request<ValidateIdType, unknown, unknown>,
    res: Response,
  ): Promise<Response<ApiResponse<IForm>>> {
    const { id } = req.params;
    try {
      const form = await Form.getById(id);

      if (!form) {
        return handlerHttpError(res, Errors.NOT_FOUND.message, 404);
      }

      const response: ApiResponse<IForm> = {
        status: true,
        data: form,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error.message));
    }
  }

  static async createLost(
    req: Request<unknown, unknown, FormCreateLostType> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IForm>>> {
    try {
      const newForm = await Form.create(req.body);
      const result = await newForm.save();
      let send;

      // agregar al usuario
      if (result) {
        const user = await User.addToListUser({
          auth: req.user,
          documentId: newForm._id,
          modelName: "forms",
        });

        if (!user) {
          throw Error("no se agrego la lista");
        }

        try {
          // no local
          await Email.createConnection(false);

          /**
           *  TODO:  extraer en un archivo diferente para mejor mantenimiento
           *  !tener template estructurados por defecto
           *  !controlarlo dentro de un patron de diseño
           *  @params email
           *  @params htmlcontent
           *  @params subject ?
           *  @params text?
           */

          const mailOptionsForm: MailInterface = {
            from: process.env.SMTP_SENDER,
            to: req.user.email,
            subject: "Ayudame a Encontrarlo!",
            text: "Este es el cuerpo del mensaje en formato texto",
            html: emailTemplate(
              req.body.name,
              req.body.size,
              req.body.description,
              req.body.loos_date,
              req.body.image_url,
              req.body.contact,
              req.body.city,
            ),
          };

          send = await Email.sendMail("ID_de_la_solicitud", mailOptionsForm);
        } catch (error) {
          return res
            .status(404)
            .json({ message: `Error al enviar el correo ${error} ` });
        }
      }

      const response: ApiResponse<IForm> = {
        status: true,
        data: result,
        message: send.response,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error));
    }
  }

  static async createFound(
    req: Request<unknown, unknown, FormCreateFoundType> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IForm>>> {
    try {
      const newForm = await Form.create(req.body);
      const result = await newForm.save();
      let send;

      // agregar al usuario
      if (result) {
        const user = await User.addToListUser({
          auth: req.user,
          documentId: newForm._id,
          modelName: "forms",
        });

        if (!user) {
          throw Error("no se agrego la lista");
        }

        // enviar a correo

        try {
          // no local
          await Email.createConnection(false);

          /**
           *  TODO:  extraer en un archivo diferente para mejor mantenimiento
           *  !tener template estructurados por defecto
           *  !controlarlo dentro de un patron de diseño
           *  @params email
           *  @params htmlcontent
           *  @params subject ?
           *  @params text?
           */
          const mailOptionsForm: MailInterface = {
            from: process.env.SMTP_SENDER,
            to: req.user.email,
            subject: "Ayudame a Encontrarlo!",
            text: "Este es el cuerpo del mensaje en formato texto",
            html: emailTemplate(
              req.body.name,
              req.body.size,
              req.body.description,
              req.body.loos_date,
              req.body.image_url,
              req.body.contact,
              req.body.city,
            ),
          };

          send = await Email.sendMail("ID_de_la_solicitud", mailOptionsForm);
        } catch (error) {
          return res
            .status(404)
            .json({ message: `Error al enviar el correo ${error} ` });
        }
      }

      const response: ApiResponse<IForm> = {
        status: true,
        data: result,
        message: send,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error));
    }
  }

  static async update(
    req: Request<ValidateIdType, unknown, FormUpdateType> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IForm>>> {
    const { id } = req.params;

    try {
      const exist = await Form.getById(id);

      if (!exist) {
        return handlerHttpError(res, Errors.NOT_FOUND.message, 404);
      }

      const result = await Form.update(exist.id, req.body);

      const response: ApiResponse<IForm> = {
        status: true,
        data: result,
      };

      return res.status(202).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error.message));
    }
  }

  static async delete(
    req: Request<ValidateIdType, unknown, unknown> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<string>>> {
    const { id } = req.params;
    try {
      const exist = await Form.getById(id);

      if (!exist) {
        return handlerHttpError(res, Errors.NOT_FOUND.message, 400);
      }

      await Form.delete(id);

      const response: ApiResponse<string> = {
        status: true,
        data: `${exist.name} deleted!`,
      };

      return res.status(202).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error.message));
    }
  }
}
