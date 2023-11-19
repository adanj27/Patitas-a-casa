/* eslint-disable class-methods-use-this */

import { FilterQuery, QueryWithHelpers } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../interface";
import { BaseRepository } from "../../repositories/BaseRepository";
import { UserModel } from "../mongoose/user.model";

export class UserRepository extends BaseRepository<IUser, string> {
  constructor() {
    super({
      getAll: async (): Promise<IUser[]> => {
        return UserModel.find({});
      },
      create: async (input: Partial<IUser>) => {
        return UserModel.create(input);
      },
      update: async (id: string, input: Partial<IUser>) => {
        return UserModel.findByIdAndUpdate(id, input, { new: true });
      },
      delete: async (id: string) => {
        return UserModel.findByIdAndDelete(id);
      },
      getById: async (id: string) => {
        return UserModel.findById(id);
      },
    });
  }

  async getByOne(
    conditions: FilterQuery<IUser>,
  ): Promise<QueryWithHelpers<IUser, IUser>> {
    return UserModel.findOne(conditions);
  }

  async ValidatePassword(password: string, recivePassword: string) {
    const comparePassword = await bcrypt.compare(password, recivePassword);
    return comparePassword;
  }
}
