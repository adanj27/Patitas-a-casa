/* eslint-disable class-methods-use-this */
import { FilterQuery, QueryWithHelpers } from "mongoose";
import { ImageModel } from "../mongoose/image.model";
import { IImage } from "../../interface";
import { BaseRepository } from "../../repositories/Baserepository";
import { IMAGE_TYPE, uploadImage } from "../../helpers";
import { cloudinary } from "../../config/cloudinary";

export class ImageRepository extends BaseRepository<IImage, string> {
  constructor() {
    super({
      getAll: async (): Promise<IImage[]> => {
        return ImageModel.find({});
      },
      create: async (input: Partial<IImage>) => {
        return ImageModel.create(input);
      },
      update: async (id: string, input: Partial<IImage>) => {
        return ImageModel.findByIdAndUpdate(id, input, { new: true });
      },
      delete: async (id: string) => {
        return ImageModel.findByIdAndDelete(id);
      },
      getById: async (id: string) => {
        return ImageModel.findById(id);
      },
    });
  }

  async getByOne(
    conditions: FilterQuery<IImage>,
  ): Promise<QueryWithHelpers<IImage | null, IImage>> {
    return ImageModel.findOne(conditions);
  }

  async createWithCloudinary({ url }): Promise<IImage> {
    try {
      const { secure_url, public_id } = await uploadImage(url, IMAGE_TYPE.BLOG);

      const newImg = await this.create({
        url: secure_url,
        public_id,
        model_type: "BLOG",
      });

      return newImg;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateWithCloudinary(
    image_url: string,
    public_id: string,
    folder: string,
  ) {
    try {
      await cloudinary.uploader.destroy(public_id); // elimina la img

      const update = await uploadImage(image_url, folder); // crea la nueva img

      // explicit aunq actuliza los tags, este no actualiza la imagen
      // const update = await cloudinary.uploader.explicit(image_url //newUrl, {
      //   type: "upload",
      //   public_id //UrlCloudinary,
      // });

      // console.log(update);

      return update;
    } catch (error) {
      throw Error(error);
    }
  }
}
