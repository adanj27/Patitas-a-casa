import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY } from "../helpers/constanst";

cloudinary.config({
  cloud_name: CLOUDINARY.NAME,
  api_key: CLOUDINARY.KEY,
  api_secret: CLOUDINARY.API,
});

export { cloudinary };
