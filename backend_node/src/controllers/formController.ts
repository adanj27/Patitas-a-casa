import { Request, Response } from "express";
import {
  FormRepository,
  ImageRepository,
  UserRepository,
} from "../models/repositorie";
import { ApiResponse, Errors, IForm, IImage } from "../interface";
import { FormCreateType } from "../schema";
import { AuthRequest } from "../middlware/authorization";
import { BREVO_CONFIG, IAuth } from "../helpers";
import { ServiceSMTP } from "../services/sendinblue/service";

const User = new UserRepository();
const Form = new FormRepository();
const Image = new ImageRepository();
const ServiceEmail = new ServiceSMTP(BREVO_CONFIG.APIKEY);

export class FormController {
  static async getAll(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IForm[]>>> {
    try {
      const forms = await Form.getAll();

      const response: ApiResponse<IForm[]> = {
        status: true,
        total: forms.length,
        data: forms,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }

  static async getById(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IForm>>> {
    const { id } = req.params;
    try {
      const form = await Form.getById(id);

      if (!form) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      const response: ApiResponse<IForm> = {
        status: true,
        data: form,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }

  static async createLost(
    req: Request<unknown, unknown, FormCreateType> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IForm>>> {
    const { image_url, ...input } = req.body;
    let newImage: IImage;
    try {
      const newForm = await Form.create({ ...input });

      // genera url cloudinary
      if (newForm) {
        newImage = await Image.createWithCloudinary({
          url: image_url,
          folder: "FORM",
        });

        newImage.model_id = newForm._id;
        await newImage.save();
      }

      newForm.image_url = newImage._id;
      const result = await newForm.save();

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
      }

      const response: ApiResponse<IForm> = {
        status: true,
        data: result,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async createFound(
    req: Request<unknown, unknown, FormCreateType> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IForm>>> {
    const { image_url, ...input } = req.body;
    let newImage: IImage;
    try {
      const newForm = await Form.create({ ...input });

      // genera url cloudinary
      if (newForm) {
        newImage = await Image.createWithCloudinary({
          url: image_url,
          folder: "FORM",
        });

        newImage.model_id = newForm._id;
        await newImage.save();
      }

      newForm.image_url = newImage._id;
      const result = await newForm.save();

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
        await ServiceEmail.SendEmail({
          type: "pets",
          items: {
            name: "test",
            message: "testing",
            items: {
              alias: "aliastest",
              description: "description",
            },
          },
          email: user.email,
        });
      }

      const response: ApiResponse<IForm> = {
        status: true,
        data: result,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async update(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IForm>>> {
    const { id } = req.params;
    const { image_url, ...input } = req.body;

    try {
      const exist = await Form.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      const result: IForm = await Form.update(id, input);

      if (image_url) {
        const img = await Image.getByOne({ model_id: id });

        // modificar con las clases de cloudinary o de image
        if (img) {
          const newurl = await Image.updateWithCloudinary({
            image_url,
            public_id: img.public_id,
            folder: "FORM",
          });

          img.url = newurl.secure_url;
          img.public_id = newurl.public_id;
          await img.save();
        }
      }

      const response: ApiResponse<IForm> = {
        status: true,
        data: result,
      };

      return res.status(202).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }

  static async delete(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<string>>> {
    const { id } = req.params;
    try {
      const exist = await Form.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await Form.delete(id);
      await Image.deleteWithCloudinary(exist._id);

      const response: ApiResponse<string> = {
        status: true,
        data: `${exist.name} deleted!`,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }
}
