import { cloudinary } from "../config/cloudinary";

export const uploadImage = async (path: string): Promise<string> => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(path);

    return secure_url;
  } catch (error) {
    console.error(error);
    throw Error("Error cloudinary dont upload image.!");
  }
};
