import { Request, Response } from "express";
import { FormRepository, ImageRepository } from "../models/repositorie";
import { ApiResponse, Errors, IForm, IImage } from "../interface";

const Form = new FormRepository();
const Image = new ImageRepository();
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
      return res.status(500).json(Errors.ERROR_DATABASE(error));
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
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async create(
    req: Request,
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
        });

        newImage.model_id = newForm._id;
        await newImage.save();
      }

      newForm.image_url = newImage._id;
      await newForm.save();

      const response: ApiResponse<IForm> = {
        status: true,
        data: newForm,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }
}
