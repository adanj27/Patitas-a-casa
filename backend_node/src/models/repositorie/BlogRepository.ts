/* eslint-disable class-methods-use-this */
import { BlogModel } from "../mongoose/blog.model";
import { IBlog } from "../../interface";
import { BaseRepository } from "../../repositories/BaseRepository";

export class BlogRepository extends BaseRepository<IBlog, string> {
  constructor() {
    super({
      getAll: async (): Promise<IBlog[]> => {
        return BlogModel.find({}).populate({
          path: "image_url",
          select: "-_id, url",
        });
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

  async incrementViewCount(id: string): Promise<IBlog> {
    const blog = await BlogModel.findByIdAndUpdate(id, {
      $inc: { count_view: 1 },
    });
    return blog;
  }
}
