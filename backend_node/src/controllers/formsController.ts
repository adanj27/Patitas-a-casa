import { Request, Response } from "express";
import { FormModel as Form } from "../models/mongoose/form.model";
import { Errors } from "../interface";

export class FormController {
  static async getAll(req: Request, res: Response) {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

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
  }

  // eslint-disable-next-line consistent-return
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

  // eslint-disable-next-line consistent-return
  static async create(req: Request, res: Response) {
    try {
      const { name, contact_number, slug } = req.body;
      const existname = await Form.findOne({
        where: {
          name,
        },
      });

      if (existname) {
        return res.status(404).json(Errors.ALREADY_EXIST);
      }
      const form = new Form({ name, contact_number, slug });
      await form.save();

      const response = {
        status: true,
        data: name,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }
}
