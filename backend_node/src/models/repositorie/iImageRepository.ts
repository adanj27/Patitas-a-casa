/* eslint-disable prettier/prettier */
/* eslint-disable class-methods-use-this */
import mongoose, { FilterQuery, QueryWithHelpers } from "mongoose";
import { BaseRepository } from "../../repositories/BaseRepository";
import { ImageModel } from "../mongoose/image.model";
import { IImage } from "../../interface";
import { ServiceImage } from "../../services/Image/cloudinary";

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

  async setConvertId(id: string): Promise<mongoose.Types.ObjectId> {
    return new mongoose.Types.ObjectId(id);
  }

  async getByOne(
    conditions: FilterQuery<IImage>
  ): Promise<QueryWithHelpers<IImage, IImage>> {
    return ImageModel.findOne(conditions);
  }

  async deleteByOne(conditions: FilterQuery<IImage>) {
    return ImageModel.deleteOne(conditions);
  }

  async createWithCloudinary({ url, folder }): Promise<IImage> {
    try {
      const { secure_url, public_id } = await ServiceImage.create({
        path: url,
        folder,
      });

      const newImg = await this.create({
        url: secure_url,
        public_id,
        model_type: folder,
      });

      return newImg;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateWithCloudinary({ image_url, public_id, folder }) {
    let result;
    try {
      const deletedImage = await ServiceImage.delete({ publicId: public_id });

      if (deletedImage) {
        result = await ServiceImage.create({
          path: image_url,
          folder,
        });
      }
      return result;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteWithCloudinary(id: string) {
    try {
      const image = await this.getByOne({ model_id: id });

      if (image) {
        await ServiceImage.delete({ publicId: image.public_id });
        await this.delete(image._id);
      }
    } catch (error) {
      throw Error(error);
    }
  }
}
