import { Request, Response } from "express";
import { FormModel as Form } from "../models/mongoose/form.model";

export const getForms = async (req: Request, res: Response) => {
  const forms = await Form.findAll();

  res.json({ forms });
};

export const getForm = async (req: Request, res: Response) => {
  const { id } = req.params;

  const form = await Form.findByPk(id);

  if (!form) {
    res.status(404).json({
      msg: `No exist form ${id}`,
    });
  } else {
    res.json({ form });
  }
};

export const postForm = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existname = await Form.findOne({
      where: {
        name: body.name,
      },
    });

    if (existname) {
      return res.status(400).json({
        msg: `Exist form ${body.email}`,
      });
    }

    const newform = Form.build(body);

    await newform.save();

    res.status(201).json(newform);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el admin",
    });
  }

  return res.status(500).json({
    msg: "Ha ocurrido un error inesperado. Por favor, contacta al administrador.",
  });
};

// export const putForm = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;

//   try {
//     const form = await Form.findByPk(id);
//     if (!form) {
//       return res.status(404).json({
//         msg: `No exist form id ${id}`,
//       });
//     }

//     await form.update(body);

//     res.json(form);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Hable con el admin",
//     });
//   }

//   return res.status(500).json({
//     msg: "Ha ocurrido un error inesperado. Por favor, contacta al administrador.",
//   });
// };

// export const deleteForm = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const form = await Form.findByPk(id);
//     if (!form) {
//       return res.status(404).json({
//         msg: `No exist form id ${id}`,
//       });
//     }

//     await form.update({ estado: false });

//     res.json(form);
//     // await user.destroy();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Hable con el admin",
//     });
//   }

//   return res.status(500).json({
//     msg: "Ha ocurrido un error inesperado. Por favor, contacta al administrador.",
//   });
// };
