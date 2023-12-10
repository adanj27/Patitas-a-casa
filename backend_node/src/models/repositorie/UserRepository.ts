/* eslint-disable class-methods-use-this */
import mongoose, { FilterQuery, QueryWithHelpers } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, listNameArray } from "../../interface";
import { BaseRepository } from "../../repositories/BaseRepository";
import { UserModel } from "../mongoose/user.model";
import { IAuth } from "../../helpers";
import { RolRepository } from "./RolRespository";

interface listUser {
  auth: IAuth;
  documentId: mongoose.Types.ObjectId;
  modelName: keyof listNameArray;
}

const Rol = new RolRepository();

export class UserRepository extends BaseRepository<IUser, string> {
  constructor() {
    super({
      getAll: async (): Promise<IUser[]> => {
        const isSuperAdmin = await Rol.getSuperAdmin();
        const users = await UserModel.find({ status: true });

        const filterUser = users.find((user) =>
          user.rol.equals(isSuperAdmin._id),
        );

        const result = users.filter((index) => index !== filterUser);

        return result;
      },
      create: async (input: Partial<IUser>) => {
        return new UserModel(input);
      },
      update: async (id: string, input: Partial<IUser>) => {
        return UserModel.findByIdAndUpdate(id, input, { new: true });
      },
      delete: async (id: string) => {
        const validID = await this.setConvertId(id);
        const isSuperAdmin = await Rol.getSuperAdmin();

        const findUser = await UserModel.findById(validID);

        if (findUser.rol.equals(isSuperAdmin._id)) {
          return Promise.resolve(null);
        }

        return UserModel.findByIdAndDelete(validID);
      },
      getById: async (id: string) => {
        const validID = await this.setConvertId(id);
        return UserModel.findById(validID);
      },
    });
  }

  async setConvertId(id: string): Promise<mongoose.Types.ObjectId> {
    return new mongoose.Types.ObjectId(id);
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
    const validID = await this.setConvertId(id);
    const findUser = await UserModel.findById(validID);

    const fieldOpts = {
      blogs: () => findUser.blogs.push(documentId),
      forms: () => findUser.forms.push(documentId),
      shelters: () => findUser.shelters.push(documentId),
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

  async ValidatePassword(oldpassword: string, newPassword: string) {
    const comparePassword = await bcrypt.compare(oldpassword, newPassword);
    return comparePassword;
  }

  async count() {
    return UserModel.estimatedDocumentCount();
  }
}
