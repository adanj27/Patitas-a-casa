import { cloudinary } from "../config/cloudinary";

export const uploadImage = async (
  path: string,
  folder: string = "test"
): Promise<{ secure_url: string; public_id: string }> => {
  try {
    // Check if folder exists, if not, create it
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
};

export const detroyImage = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    return true;
  } catch (error) {
    throw Error("Error cloudinary dont delete image.!");
  }
};

interface uploadParams {
  path: string;
  folder?: string;
  publicId: string;
}

export class ServiceImage {
  static async create({ path, folder = "test" }: uploadParams) {
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

  static async update({ path, folder = "test" }: uploadParams) {
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

  static async delete({ publicId }: Pick<uploadParams, "publicId">) {
    try {
      await cloudinary.uploader.destroy(publicId);
      return true;
    } catch (error) {
      throw Error("Error cloudinary dont delete image.!");
    }
  }
}
