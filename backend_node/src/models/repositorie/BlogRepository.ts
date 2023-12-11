/* eslint-disable class-methods-use-this */
import mongoose from "mongoose";
import { BlogModel } from "../mongoose/blog.model";
import { IBlog } from "../../interface";
import { BaseRepository } from "../../repositories/BaseRepository";

export class BlogRepository extends BaseRepository<IBlog, string> {
  constructor() {
    super({
      getAll: async (): Promise<IBlog[]> => {
        return BlogModel.find({})
          .populate({
            path: "image_url",
            select: "-_id, url",
          })
          .sort({ createdAt: -1 })
          .exec();
      },
      create: async (input: Partial<IBlog>) => {
        return BlogModel.create(input);
      },
      update: async (id: string, input: Partial<IBlog>) => {
        return BlogModel.findByIdAndUpdate(id, input, { new: true });
      },
      delete: async (id: string) => {
        return BlogModel.findByIdAndDelete(id);
      },
      getById: async (id: string) => {
        return BlogModel.findById(id).populate({
          path: "image_url",
          select: "-_id, url",
        });
      },
    });
  }

  async getAllPagination({ skip = 0, limit = 0 }) {
    return BlogModel.find({ isdeleted: false })
      .populate({
        path: "image_url",
        select: "-_id, url",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async deletedLogic({ id }) {
    return BlogModel.findOneAndUpdate({ _id: id }, { isdeleted: true });
  }

  async getByOne({ title }) {
    return BlogModel.findOne({ title });
  }

  async setConvertId(id: string): Promise<mongoose.Types.ObjectId> {
    return new mongoose.Types.ObjectId(id);
  }

  async incrementViewCount(id: string): Promise<IBlog> {
    const blog = await BlogModel.findByIdAndUpdate(id, {
      $inc: { count_view: 1 },
    });
    return blog;
  }

  async count() {
    return BlogModel.countDocuments({});
  }
}
