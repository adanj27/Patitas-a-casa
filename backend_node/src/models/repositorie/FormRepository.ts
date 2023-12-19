/* eslint-disable class-methods-use-this */
import mongoose, { FilterQuery, QueryWithHelpers } from "mongoose";
import { FormModel } from "../mongoose/form.model";
import { BaseRepository } from "../../repositories/BaseRepository";
import { IForm } from "../../interface";

export class FormRepository extends BaseRepository<IForm, string> {
  constructor() {
    super({
      getAll: async (): Promise<IForm[]> => {
        return FormModel.find({});
      },
      create: async (input: Partial<IForm>) => {
        return FormModel.create(input);
      },
      update: async (id: string, input: Partial<IForm>) => {
        return FormModel.findByIdAndUpdate(id, input, { new: true });
      },
      delete: async (id: string) => {
        return FormModel.findByIdAndDelete(id);
      },
      getById: async (id: string) => {
        return FormModel.findById(id);
      },
    });
  }

  async getAllPagination({ skip = 0, limit = 0 }) {
    return FormModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async setConvertId(id: string): Promise<mongoose.Types.ObjectId> {
    return new mongoose.Types.ObjectId(id);
  }

  async getByOne(
    // eslint-disable-next-line prettier/prettier
    conditions: FilterQuery<IForm>
  ): Promise<QueryWithHelpers<IForm, IForm>> {
    return FormModel.findOne(conditions);
  }

  async deleteByOne(conditions: FilterQuery<IForm>) {
    return FormModel.deleteOne(conditions);
  }

  async count() {
    return FormModel.countDocuments();
  }
}
