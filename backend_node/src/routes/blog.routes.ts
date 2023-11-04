import { Request, Response, Router } from "express";
import { ZodError } from "zod";
import { BlogModel } from "../models/mongoose/blog.model";
import { ValidateBlog } from "../schema/blog.schema";
import { ImageModel } from "../models/mongoose/image.model";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // sin relaciones
    const data = await BlogModel.find({}).populate({
      path: "image_url",
      select: "-_id, url",
    });

    res.status(200).json({ status: true, data });
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const validInput = ValidateBlog(req.body);
    const { image_url, ...allimput } = validInput;

    const newImg = await ImageModel.create({
      url: image_url,
      model_type: "IMAGE",
    });
    console.log(validInput);
    const newBlog = await BlogModel.create({
      ...allimput,
      image_url: newImg.id,
    });

    newImg.model_id = newBlog.id;
    newImg.save();

    return res.status(200).json({ status: true, data: newBlog });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(404).json({ message: error.issues });
    }

    return res
      .status(500)
      .json({ status: false, message: `INTERNAL SERVER: ${error}` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const exist = await BlogModel.findById(id).populate({
      path: "image_url",
      select: "-_id, url",
    });

    if (!exist) {
      res.status(404).json({ status: false, message: "This Blog dont exist" });
    }

    return res.status(200).json({ status: true, data: exist });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: `INTERNAL SERVER: ${error}` });
  }
});

export { router };
