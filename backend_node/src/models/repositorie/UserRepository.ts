/* eslint-disable class-methods-use-this */

import mongoose, { FilterQuery, QueryWithHelpers } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, listNameArray } from "../../interface";
import { BaseRepository } from "../../repositories/BaseRepository";
import { UserModel } from "../mongoose/user.model";
import { IAuth } from "../../helpers";

interface listUser {
  auth: IAuth;
  documentId: mongoose.Types.ObjectId;
  modelName: keyof listNameArray;
}
export class UserRepository extends BaseRepository<IUser, string> {
  constructor() {
    super({
      getAll: async (): Promise<IUser[]> => {
        const query = { status: true };
        return UserModel.find(query);
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
    return UserModel.findOne(conditions).populate({
      path: "rol",
      select: "name",
    });
  }

  async addToListUser({ auth, documentId, modelName }: listUser) {
    const { id } = auth;
    const findUser = await UserModel.findById(id);

    const fieldOpts = {
      blogs: () => findUser.blogs.push(documentId),
      forms: () => findUser.forms.push(documentId),
    };

    if (fieldOpts[modelName]) {
      fieldOpts[modelName]();
    }
    const result = await findUser.save();
    return result;
  }

  async ResetPass({ password }) {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    return hashPass;
  }

  async ValidatePassword(password: string, recivePassword: string) {
    const comparePassword = await bcrypt.compare(password, recivePassword);
    return comparePassword;
  }

  async count() {
    return UserModel.estimatedDocumentCount();
  }
}
