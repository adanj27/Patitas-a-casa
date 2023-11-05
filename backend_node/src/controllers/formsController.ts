import { Request, Response } from "express";
import { FormModel as Form, FormModel } from "../models/mongoose/form.model";
import { Errors } from "../interface";
import { uploadImage } from "../helpers";
import { ImageModel } from "../models/mongoose/image.model";

export class FormController {
  static async getAll(req: Request, res: Response) {
    try {
      const { limit = 5, from = 0 } = req.query;
      const query = { status: true };

      const [total, forms] = await Promise.all([
        Form.countDocuments(query),
        Form.find(query).skip(Number(from)).limit(Number(limit)),
      ]);

      const response = {
        status: true,
        total,
        forms,
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const form = await Form.findById(id);

      if (!form) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      const response = {
        status: true,
        data: form,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { image_url, ...all } = req.body;
      // genera url cloudinary
      const linkImg = await uploadImage(image_url);

      // id-image
      const newImg = await ImageModel.create({
        url: linkImg,
        model_type: "FORM",
      });

      const newForm = await FormModel.create({
        ...all,
        image_url: newImg.id, // asigna id-image
      });
      newImg.model_id = newForm._id;

      await newForm.save();

      const response = {
        status: true,
        data: newForm,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }
}
