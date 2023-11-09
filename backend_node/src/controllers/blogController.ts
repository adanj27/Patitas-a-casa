import { Request, Response } from "express";
import { BlogModel } from "../models/mongoose/blog.model";
import { uploadImage } from "../helpers/linkedCloudinary";
import { ImageModel } from "../models/mongoose/image.model";
import { ApiResponse, Errors, IBlog } from "../interface";
import { IMAGE_TYPE, generateSlug } from "../helpers";

export class BlogController {
  static async getAll(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog[]>>> {
    try {
      const data = await BlogModel.find({}).populate({
        path: "image_url",
        select: "-_id, url",
      });

      const response: ApiResponse<IBlog[]> = {
        status: true,
        total: data.length,
        data,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async create(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog>>> {
    const validInput = req.body;
    const { image_url, ...allimput } = validInput;

    try {
      // genera url cloudinary
      const linkImg = await uploadImage(image_url);

      // id-image
      const newImg = await ImageModel.create({
        url: linkImg,
        model_type: IMAGE_TYPE.BLOG,
      });

      // id-blog
      const newBlog = await BlogModel.create({
        ...allimput,
        image_url: newImg.id, // asigna id-image
      });

      newImg.model_id = newBlog._id; // asigna id-blog

      newImg.save();

      const response: ApiResponse<IBlog> = {
        status: true,
        data: newBlog,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async getById(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog>>> {
    const { id } = req.params;
    try {
      const exist = await BlogModel.findById(id).populate({
        path: "image_url",
        select: "-_id, url",
      });

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await BlogModel.updateOne({ _id: id }, { $inc: { count_view: 1 } });

      const response: ApiResponse<IBlog> = {
        status: true,
        data: exist,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async update(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog>>> {
    const { id } = req.params;
    const { image_url, ...input } = req.body;

    try {
      const exist = await BlogModel.findById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      if (image_url) {
        const img = await ImageModel.findOne({ model_id: id });

        if (img) {
          const newurl = await uploadImage(image_url);
          console.log(newurl);
          img.url = newurl;
          await img.save();
        }
      }

      const result = await BlogModel.findByIdAndUpdate(
        id,
        { ...input, slug: generateSlug(input.title) },
        {
          new: true,
        },
      );

      const response: ApiResponse<IBlog> = {
        status: true,
        data: result,
      };

      return res.status(202).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async delete(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<string>>> {
    const { id } = req.params;
    try {
      const exist = await BlogModel.findById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await BlogModel.findByIdAndDelete(id);
      await ImageModel.findByIdAndDelete(exist.image_url);

      const response: ApiResponse<string> = {
        status: true,
        data: `${exist.title} deleted!`,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }
}
