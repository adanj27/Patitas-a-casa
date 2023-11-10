import { Request, Response } from "express";
import { PetModel as Pet } from "../models/mongoose/pet.model";
import { ApiResponse, Errors, IPet } from "../interface";
import { IMAGE_TYPE, uploadImage } from "../helpers";
import { ImageModel } from "../models/mongoose/image.model";

export class PetController {
  static async getAll(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IPet[]>>> {
    try {
      const { limit = 5, from = 0 } = req.query;

      const pets = await Pet.find({}).skip(Number(from)).limit(Number(limit));

      const response: ApiResponse<IPet[]> = {
        status: true,
        total: pets.length,
        data: pets,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async getById(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IPet>>> {
    const { id } = req.params;
    try {
      const pet = await Pet.findById(id);

      if (!pet) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      const response: ApiResponse<IPet> = {
        status: true,
        data: pet,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async create(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IPet>>> {
    try {
      const { image_url, ...all } = req.body;
      // genera url cloudinary
      const linkImg = await uploadImage(image_url);

      // id-image
      const newImg = await ImageModel.create({
        url: linkImg,
        model_type: IMAGE_TYPE.FORM,
      });

      const newPet = await Pet.create({
        ...all,
        image_url: newImg.id,
      });

      // asigna id-image
      newImg.model_id = newPet._id;

      await newPet.save();

      // asigna pet al user
      // const user = await User.findById(userId);
      // user.pets.push(newPet._id);
      // await user.save()

      const response: ApiResponse<IPet> = {
        status: true,
        data: newPet,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }
}
