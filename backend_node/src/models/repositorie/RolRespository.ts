/* eslint-disable prettier/prettier */
/* eslint-disable class-methods-use-this */
import mongoose, { FilterQuery, QueryWithHelpers } from "mongoose";
import { IRol } from "../../interface/props/RolInterface";
import { BaseRepository } from "../../repositories/BaseRepository";
import { RolModel } from "../mongoose/rol.model";
import { USERADMIN } from "../../helpers";

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
        // const validID = await this.setConvertId(id);
        return RolModel.findById(id);
      },
    });
  }

  async setConvertId(id: string): Promise<mongoose.Types.ObjectId> {
    return new mongoose.Types.ObjectId(id);
  }

  async getSuperAdmin(): Promise<IRol> {
    return this.getByOne({ name: USERADMIN.ROL });
  }

  async count() {
    return RolModel.estimatedDocumentCount();
  }

  async getByOne(
    conditions: FilterQuery<IRol>
  ): Promise<QueryWithHelpers<IRol, IRol>> {
    return RolModel.findOne(conditions);
  }
}
