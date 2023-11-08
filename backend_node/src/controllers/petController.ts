import { Request, Response } from "express";
import { PetModel as Pet } from "../models/mongoose/pet.model";
import { Errors } from "../interface";
import { uploadImage } from "../helpers";
import { ImageModel } from "../models/mongoose/image.model";

export class PetController {
  static async getAll(req: Request, res: Response) {
    try {
      const { limit = 5, from = 0 } = req.query;
      const query = { status: true };

      const [total, pets] = await Promise.all([
        Pet.countDocuments(query),
        Pet.find(query).skip(Number(from)).limit(Number(limit)),
      ]);

      const response = {
        status: true,
        total,
        pets,
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const pet = await Pet.findById(id);

      if (!pet) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      const response = {
        status: true,
        data: pet,
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
        model_type: "Pet",
      });

      const newPet = await Pet.create({
        ...all,
        image_url: newImg.id, // asigna id-image
      });
      newImg.model_id = newPet._id;

      await newPet.save();

      const response = {
        status: true,
        data: newPet,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }
}
