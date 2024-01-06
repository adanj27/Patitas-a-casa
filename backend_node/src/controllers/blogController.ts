import { Request, Response } from "express";
import { ApiResponse, Errors, IBlog } from "../interface";
import { IAuth, generateSlug } from "../helpers";
import {
  BlogRepository,
  ImageRepository,
  UserRepository,
} from "../models/repositorie";
import {
  BlogCreateType,
  BlogUpdateTypeB,
  PaginationType,
  ValidateIdType,
} from "../schema";
import { AuthRequest } from "../middlware/authorization";
import { handlerHttpError } from "../middlware/handlerHttpError";

const User = new UserRepository();
const Blog = new BlogRepository();
const Image = new ImageRepository();

export class BlogController {
  static async getAll(
    req: Request<unknown, unknown, PaginationType>,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog[]>>> {
    try {
      const skip = parseInt(req.query.skip as string, 10);
      const limit = parseInt(req.query.limit as string, 10);

      const data = await Blog.getAllPagination({ skip, limit });
      const totalDoc = await Blog.count();
      const hasNexPage = skip + limit < totalDoc;

      const response: ApiResponse<IBlog[]> = {
        status: true,
        total: totalDoc,
        nextPage: hasNexPage,
        data,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error));
    }
  }

  static async create(
    req: Request<unknown, unknown, BlogCreateType> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog>>> {
    const { title } = req.body;
    try {
      const existBlog = await Blog.getByOne({ title });

      if (existBlog) {
        return handlerHttpError(res, Errors.ALREADY_EXIST.message, 404);
      }

      const newBlog = await Blog.create(req.body);
      const result = await newBlog.save();

      if (result) {
        try {
          await User.addToListUser({
            auth: req.user,
            documentId: newBlog._id,
            modelName: "blogs",
          });
        } catch (error) {
          console.error(error);
        }
      }

      const response: ApiResponse<IBlog> = {
        status: true,
        data: result,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error));
    }
  }

  static async getById(
    req: Request<ValidateIdType, unknown, unknown>,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog>>> {
    const { id } = req.params;
    try {
      const existBlog = await Blog.getById(id);

      if (!existBlog) {
        return handlerHttpError(res, Errors.NOT_FOUND.message, 404);
      }

      await Blog.incrementViewCount(id);

      const response: ApiResponse<IBlog> = {
        status: true,
        data: existBlog,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error));
    }
  }

  static async update(
    req: Request<ValidateIdType, unknown, BlogUpdateTypeB> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IBlog>>> {
    const { id } = req.params;
    const { image_url, ...input } = req.body;

    try {
      const existBlog = await Blog.getById(id);

      if (!existBlog) {
        return handlerHttpError(res, Errors.NOT_FOUND.message, 404);
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
      return res.status(500).json(Errors.ERROR(error));
    }
  }

  static async delete(
    req: Request<ValidateIdType, unknown, unknown> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<string>>> {
    const { id } = req.params;
    try {
      const existBlog = await Blog.getById(id);

      if (!existBlog) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      await Blog.deletedLogic({ id });

      const response: ApiResponse<string> = {
        status: true,
        data: `${existBlog.title} deleted!`,
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR(error));
    }
  }
}
