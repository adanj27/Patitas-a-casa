/* eslint-disable class-methods-use-this */
import mongoose from "mongoose";
import { BaseRepository } from "../../repositories/BaseRepository";
import { IShelter } from "../../interface/props/ShelterInterface";
import { ShelterModel } from "../mongoose/shelters.model";

export class ShelterRepository extends BaseRepository<IShelter, string> {
  constructor() {
    super({
      getAll: async (): Promise<IShelter[]> => {
        return ShelterModel.find({}).populate({
          path: "image_url",
          select: "-_id, url",
        });
      },
      create: async (input: Partial<IShelter>) => {
        return ShelterModel.create(input);
      },
      update: async (id: string, input: Partial<IShelter>) => {
        return ShelterModel.findByIdAndUpdate(id, input, { new: true });
      },
      delete: async (id: string) => {
        return ShelterModel.findByIdAndDelete(id);
      },
      getById: async (id: string) => {
        return ShelterModel.findById(id).populate({
          path: "image_url",
          select: "-_id, url",
        });
      },
    });
  }

  async setConvertId(id: string): Promise<mongoose.Types.ObjectId> {
    return new mongoose.Types.ObjectId(id);
  }

  async incrementViewCount(id: string): Promise<IShelter> {
    const shelter = await ShelterModel.findByIdAndUpdate(id, {
      $inc: { count_view: 1 },
    });
    return shelter;
  }
}
