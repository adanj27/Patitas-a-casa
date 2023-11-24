/* eslint-disable class-methods-use-this */
import { FilterQuery, QueryWithHelpers } from "mongoose";
import { IRol } from "../../interface/props/RolInterface";
import { BaseRepository } from "../../repositories/BaseRepository";
import { RolModel } from "../mongoose/rol.model";

export class RolRepository extends BaseRepository<IRol, string> {
  constructor() {
    super({
      getAll: async (): Promise<IRol[]> => {
        return RolModel.find({});
      },
      create: async (input: Partial<IRol>) => {
        return RolModel.create(input);
      },
      update: async (id: string, input: Partial<IRol>) => {
        return RolModel.findByIdAndUpdate(id, input, { new: true });
      },
      delete: async (id: string) => {
        return RolModel.findByIdAndDelete(id);
      },
      getById: async (id: string) => {
        return RolModel.findById(id);
      },
    });
  }

  async count() {
    return RolModel.estimatedDocumentCount();
  }

  async getByOne(
    conditions: FilterQuery<IRol>,
  ): Promise<QueryWithHelpers<IRol, IRol>> {
    return RolModel.findOne(conditions);
  }
}