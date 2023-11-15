import { Request, Response } from "express";
import { FormModel as Form } from "../models/mongoose/form.model";
import { ApiResponse, Errors, IForm } from "../interface";
import { IMAGE_TYPE, detroyImage, uploadImage } from "../helpers";
import { ImageModel } from "../models/mongoose/image.model";

export class FormController {
  static async getAll(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IForm[]>>> {
    try {
      const { limit = 5, from = 0 } = req.query;

      const forms = await Form.find({}).skip(Number(from)).limit(Number(limit));

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
      const form = await Form.findById(id);

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
    const { image_url, ...all } = req.body;
    let url_img: string;
    try {
      // genera url cloudinary
      const linkImg = await uploadImage(image_url, "forms");
      url_img = linkImg;
      // id-image
      const newImg = await ImageModel.create({
        url: linkImg,
        model_type: IMAGE_TYPE.FORM,
      });

      const newForm = await Form.create({
        ...all,
        image_url: newImg.id,
      });
      // asigna id-image
      newImg.model_id = newForm._id;

      await newForm.save();

      // asigna form al user
      // const user = await User.findById(userId);
      // user.forms.push(newForm._id);
      // await user.save()

      const response: ApiResponse<IForm> = {
        status: true,
        data: newForm,
      };
      return res.status(201).json(response);
    } catch (error) {
      await detroyImage(url_img); // se eliminara img de cloudnary
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }
}
