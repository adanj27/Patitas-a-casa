import { Router } from "express";
import { BlogController } from "../../controllers/blogController";
import {
  BlogcreateSchema,
  BlogupdateSchema,
  validateIdSchema,
} from "../../schema";
import { ROL_TYPE } from "../../interface/props/RolInterface";
import { SchemaValidate, hasRole, isAuth } from "../../middlware";

const router = Router();

/**
 * @swagger
 * /api/v1/blog:
 *    get:
 *      tags:
 *        - Blog
 *      summary: show all blogs
 *      description: The endpoint will return a list of blogs the total number of elements and the pagination within the nextPage field.
 *      responses:
 *        200:
 *          description: Success  -
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                             type: boolean
 *                             example: true
 *                          total:
 *                             type: number
 *                             example: 0
 *                          nextPage:
 *                             type: boolean
 *                             example: true
 *                          data:
 *                             type: array
 *                             items:
 *                               type: object
 *                               $ref: '#/components/schemas/blog'
 *        500:
 *          description: Internal server error
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serverError'
 */
router.get("/", BlogController.getAll);

/**
 * @swagger
 * /api/v1/blog:
 *    post:
 *      tags:
 *        - Blog
 *      summary: create a blog on the server web
 *      description:  You must be registered in order to create a blog - check if you added the token in Authorize
 *      requestBody:
 *          required: true
 *          description: check the schema blog to see the required fields *
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/blog'
 *      responses:
 *        200:
 *          description: It will return a message with the status, the created blog.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                           status:
 *                              type: string
 *                              example: true
 *                           data:
 *                              type: object
 *                              $ref: '#/components/schemas/blog'
 *        404:
 *          description: invalid fields error
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/messageError'
 *        500:
 *          description: Internal server error
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serverError'
 *      security:
 *            - bearerAuth: []
 */
router.post(
  "/",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(BlogcreateSchema),
  BlogController.create,
);

/**
 * @swagger
 * /api/v1/blog/{id}:
 *    get:
 *      tags:
 *        - Blog
 *      summary: Get blog by id
 *      description: This point helps to see the detail of the entity blog
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: insert the id of the blog to search
 *              schema:
 *               type: string
 *               format: objectId
 *      responses:
 *        200:
 *          description: If the blog exists, it will return an object with the status and the corresponding data.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                           status:
 *                              type: string
 *                              example: true
 *                           data:
 *                              type: object
 *                              $ref: '#/components/schemas/blog'
 *
 *        404:
 *          description: Not found
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serverError'
 *        500:
 *          description: Internal server error
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serverError'
 */
router.get("/:id", SchemaValidate(validateIdSchema), BlogController.getById);

/**
 * @swagger
 * /api/v1/blog/{id}:
 *    post:
 *      tags:
 *        - Blog
 *      summary: update a blog on the server web
 *      description:  You must be registered in order to create a blog - check if you added the token in Authorize
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: insert the id of the blog to search
 *              schema:
 *               type: string
 *               format: objectId
 *      requestBody:
 *          required: true
 *          description: check the schema blog to see the required fields *
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/blog'
 *      responses:
 *        200:
 *          description: It will return a message with the status, the created blog.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                           status:
 *                              type: string
 *                              example: true
 *                           data:
 *                              type: object
 *                              $ref: '#/components/schemas/blog'
 *        404:
 *          description: invalid fields error
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/messageError'
 *        500:
 *          description: Internal server error
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serverError'
 *      security:
 *            - bearerAuth: []
 */
router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(BlogupdateSchema),
  BlogController.update,
);

/**
 * @swagger
 * /api/v1/blog/{id}:
 *      delete:
 *          summary: Delete blog from list.
 *          tags:
 *              - Blog
 *          description: Delete the blog from the records. - check if you added the token in Authorize
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: The ID of the user for blog.
 *              schema:
 *               type: string
 *               format: objectId
 *              202:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/messageResponse'
 *              400:
 *                  description: Not found - return array with fields errors
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/schemas/messageError'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/schemas/serverError'
 *          security:
 *            - bearerAuth: []
 */
router.delete(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  BlogController.delete,
);

export { router };
