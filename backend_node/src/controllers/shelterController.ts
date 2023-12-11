import { Request, Response } from "express";
import { ApiResponse, Errors, IImage, IShelter } from "../interface";
import { IAuth } from "../helpers";
import {
  ImageRepository,
  ShelterRepository,
  UserRepository,
} from "../models/repositorie";
import { ShelterCreateType, ShelterUpdateTypeB } from "../schema";
import { AuthRequest } from "../middlware/authorization";
import { ValidateIdType } from "../schema/validateIdSchema";

const User = new UserRepository();
const Shelter = new ShelterRepository();
const Image = new ImageRepository();

export class ShelterController {
  static async getAll(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IShelter[]>>> {
    try {
      const data = await Shelter.getAll();

      const response: ApiResponse<IShelter[]> = {
        status: true,
        total: data.length,
        data,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error.message));
    }
  }

  static async create(
    req: Request<unknown, unknown, ShelterCreateType> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IShelter>>> {
    const { image_url, ...allimput } = req.body;
    let newImg: IImage;
    try {
      const newShelter = await Shelter.create({
        ...allimput,
      });

      if (newShelter) {
        newImg = await Image.createWithCloudinary({
          url: image_url,
          folder: "SHELTER",
        });

        newImg.model_id = newShelter._id;

        await newImg.save();
      }

      newShelter.image_url = newImg._id;

      const result = await newShelter.save();

      if (result) {
        const user = await User.addToListUser({
          auth: req.user,
          documentId: newShelter._id,
          modelName: "shelters",
        });

        if (!user) {
          throw Error("no se agrego la lista");
        }
      }

      const response: ApiResponse<IShelter> = {
        status: true,
        data: result,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error.message));
    }
  }

  static async getById(
    req: Request<ValidateIdType, unknown, unknown>,
    res: Response,
  ): Promise<Response<ApiResponse<IShelter>>> {
    const { id } = req.params;
    try {
      const exist = await Shelter.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await Shelter.incrementViewCount(id);

      const response: ApiResponse<IShelter> = {
        status: true,
        data: exist,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error.message));
    }
  }

  static async update(
    req: Request<ValidateIdType, unknown, ShelterUpdateTypeB> &
      AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IShelter>>> {
    const { id } = req.params;
    const { image_url, ...input } = req.body;

    try {
      const exist = await Shelter.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      const result: IShelter = await Shelter.update(id, input);

      if (image_url) {
        const img = await Image.getByOne({ model_id: id });

        // modificar con las clases de cloudinary o de image
        if (img) {
          const newurl = await Image.updateWithCloudinary({
            image_url,
            public_id: img.public_id,
            folder: "Shelter",
          });

          img.url = newurl.secure_url;
          img.public_id = newurl.public_id;
          await img.save();
        }
      }

      const response: ApiResponse<IShelter> = {
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
      const exist = await Shelter.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await Shelter.delete(id);
      await Image.deleteWithCloudinary(exist._id);

      const response: ApiResponse<string> = {
        status: true,
        data: `${exist.title} deleted!`,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error.message));
    }
  }
}
