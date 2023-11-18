import { Request, Response } from "express";
import { detroyImage, uploadImage } from "../helpers/linkedCloudinary";
import { ImageModel } from "../models/mongoose/image.model";
import { ApiResponse, Errors, IBlog } from "../interface";
import { generateSlug } from "../helpers";
import { BlogRepository, ImageRepository } from "../models/repositorie";

const Blog = new BlogRepository();
const Image = new ImageRepository();

export class BlogController {
  static async getAll(
    req: Request,
    res: Response
  ): Promise<Response<ApiResponse<IBlog[]>>> {
    try {
      const data = await Blog.getAll();

      const response: ApiResponse<IBlog[]> = {
        status: true,
        total: data.length,
        data,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async create(
    req: Request,
    res: Response
  ): Promise<Response<ApiResponse<IBlog>>> {
    const validInput = req.body;
    const { image_url, ...allimput } = validInput;
    let newImg;
    try {
      const newBlog = await Blog.create({
        ...allimput,
      });

      if (newBlog) {
        newImg = await Image.createWithCloudinary({
          url: image_url,
        });

        newImg.model_id = newBlog._id;
        // asigna id-blog
        await newImg.save();
      }
      // asign image
      newBlog.image_url = newImg._id;

      await newBlog.save();

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
    res: Response
  ): Promise<Response<ApiResponse<IBlog>>> {
    const { id } = req.params;
    try {
      const exist = await Blog.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await Blog.incrementViewCount(id);

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
    res: Response
  ): Promise<Response<ApiResponse<IBlog>>> {
    const { id } = req.params;
    const { image_url, ...input } = req.body;

    try {
      const exist = await Blog.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      const result = await Blog.update(id, {
        ...input,
        slug: generateSlug(input.title),
      });

      if (image_url) {
        const img = await Image.getByOne({ model_id: id });

        // modificar con las clases de cloudinary o de image
        if (img) {
          const newurl = await uploadImage(image_url, "blogs");

          img.url = newurl.secure_url;
          await img.save();
        }
      }

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
    res: Response
  ): Promise<Response<ApiResponse<string>>> {
    const { id } = req.params;
    try {
      const exist = await Blog.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await Blog.delete(id);

      const { public_id } = await ImageModel.findByIdAndDelete(exist.image_url);

      await detroyImage(public_id);

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
