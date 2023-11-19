import { cloudinary } from "../../config/cloudinary";

interface uploadParams {
  path: string;
  folder?: string;
  publicId: string;
}

export class ServiceImage {
  static async create({
    path,
    folder = "test",
  }: Omit<uploadParams, "publicId">) {
    try {
      const folderExists = await cloudinary.api.search_folders(folder);

      if (!folderExists) {
        await cloudinary.api.create_folder(folder);
      }

      const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
        folder: `/papitas-a-casa/${folder}`,
      });

      return { secure_url, public_id };
    } catch (error) {
      throw Error("Error cloudinary dont upload image.!");
    }
  }

  static async update({ publicId, path }: uploadParams) {
    try {
      const update = await cloudinary.uploader.explicit(path, {
        public_id: publicId,
        type: "upload",
        overwrite: true,
        tags: "actualizacion_imagen",
      });
      return update;
    } catch (error) {
      throw Error("Error cloudinary dont upload image.!");
    }
  }

  static async delete({ publicId }: Pick<uploadParams, "publicId">) {
    try {
      await cloudinary.uploader.destroy(publicId);
      return true;
    } catch (error) {
      throw Error("Error cloudinary dont delete image.!");
    }
  }
}
