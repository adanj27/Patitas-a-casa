import { Request, Response } from "express";
import { FormModel as Form } from "../models/mongoose/form.model";

export const formsGet = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const [total, forms] = await Promise.all([
    Form.countDocuments(query),
    Form.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, forms });
};

// eslint-disable-next-line consistent-return
export const formGet = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({
        msg: `No exist form ${id}`,
      });
    }
    res.json({
      form,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Ha ocurrido un error inesperado. Por favor, contacta al administrador.",
    });
  }
};

// eslint-disable-next-line consistent-return
export const formPost = async (req: Request, res: Response) => {
  try {
    const { name, contact_number, slug } = req.body;
    const existname = await Form.findOne({
      where: {
        name,
      },
    });

    if (existname) {
      return res.status(400).json({
        msg: `Exist form - ${name}`,
      });
    }
    const form = new Form({ name, contact_number, slug });
    await form.save();
    res.json({
      form,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el admin",
    });
  }
};
