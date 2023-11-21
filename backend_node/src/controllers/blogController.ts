import { Request, Response } from "express";
import { ApiResponse, Errors, IBlog, IImage } from "../interface";
import { generateSlug } from "../helpers";
import { BlogRepository, ImageRepository } from "../models/repositorie";

const Blog = new BlogRepository();
const Image = new ImageRepository();

export class BlogController {
  static async getAll(
    req: Request,
    res: Response,
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
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }

  static async create(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog>>> {
    const validInput = req.body;
    const { image_url, ...allimput } = validInput;
    let newImg: IImage;
    try {
      const newBlog = await Blog.create({
        ...allimput,
      });

      if (newBlog) {
        newImg = await Image.createWithCloudinary({
          url: image_url,
        });

        newImg.model_id = newBlog._id;

        await newImg.save();
      }

      newBlog.image_url = newImg._id;

      await newBlog.save();

      const response: ApiResponse<IBlog> = {
        status: true,
        data: newBlog,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }

  static async getById(
    req: Request,
    res: Response,
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
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }

  static async update(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog>>> {
    const { id } = req.params;
    const { image_url, ...input } = req.body;

    try {
      const exist = await Blog.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      let result: IBlog;
      if (input.title) {
        const updatedFields = {
          ...input,
          slug: generateSlug(input.title),
        };
        result = await Blog.update(id, updatedFields);
      } else {
        result = await Blog.update(id, input);
      }

      if (image_url) {
        const img = await Image.getByOne({ model_id: id });

        // modificar con las clases de cloudinary o de image
        if (img) {
          const newurl = await Image.updateWithCloudinary({
            image_url,
            public_id: img.public_id,
            folder: "BLOG",
          });

          img.url = newurl.secure_url;
          img.public_id = newurl.public_id;
          await img.save();
        }
      }

      const response: ApiResponse<IBlog> = {
        status: true,
        data: result,
      };

      return res.status(202).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }

  static async delete(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<string>>> {
    const { id } = req.params;
    try {
      const exist = await Blog.getById(id);

      if (!exist) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await Blog.delete(id);
      await Image.deleteWithCloudinary(exist._id);

      const response: ApiResponse<string> = {
        status: true,
        data: `${exist.title} deleted!`,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }
}
