import { cloudinary } from "../config/cloudinary";

export const uploadImage = async (
  path: string,
  folder: string = "test",
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
    console.error(error);
    throw Error("Error cloudinary dont upload image.!");
  }
};

export const detroyImage = async (public_id: string) => {
  try {
    // const partes = url.split("/");
    // const [ultimoSegmento] = partes.slice(-1);
    // const [nombreSinExtension] = ultimoSegmento.split(".");
    // const public_id = `${partes.slice(-3, -1).join("/")}/${nombreSinExtension}`;
    // console.log(public_id);
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw Error("Error cloudinary dont delete image.!");
  }
};
