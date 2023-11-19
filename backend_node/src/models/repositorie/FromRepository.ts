/* eslint-disable class-methods-use-this */
import { FilterQuery, QueryWithHelpers } from "mongoose";
import { FormModel } from "../mongoose/form.model";
import { BaseRepository } from "../../repositories/BaseRepository";
import { IForm, IMAGE_TYPE } from "../../interface";
import { ServiceImage } from "../../helpers";

export class FormRepository extends BaseRepository<IForm, string> {
  constructor() {
    super({
      getAll: async (): Promise<IForm[]> => {
        return FormModel.find({});
      },
      create: async (input: Partial<IForm>): Promise<IForm> => {
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

  async getByOne(
    conditions: FilterQuery<IForm>
  ): Promise<QueryWithHelpers<IForm, IForm>> {
    return FormModel.findOne(conditions);
  }

  async deleteByOne(conditions: FilterQuery<IForm>) {
    return FormModel.deleteOne(conditions);
  }
}
