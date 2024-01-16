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
 *      get:
 *          summary: Retrieve a list of all blogs available in the Web Server
 *          tags:
 *              - Blog
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/AuthResponse'
 *              404:
 *                  description: Not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/ErrorResponse'
 *              500:
 *                  description: Internal server error
 */
router.get("/", BlogController.getAll);

/**
 * @swagger
 * /api/v1/blog:
 *      post:
 *          summary: Use credentials to login to the Web Server
 *          tags:
 *              - Blog
 *          description: Provide email and password credentials for the purpose of being authenticated and accessing
 *                       advanced features of the Web Server, depending on user's privileges.
 *          requestBody:
 *              required: true
 *              description: Email and Password to provide for authentication
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                            - email
 *                            - password
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: default@example.com
 *                              password:
 *                                  type: string
 *                                  example: default_pwd
 *          responses:
 *              200:
 *                  description: Success  - Successfully authenticated.  The session ID is returned in a cookie
 *                               named `mytoken`. You need to include this cookie in subsequent requests.
 *                  headers:
 *                    Set-Cookie:
 *                      schema:
 *                        type: string
 *                        example: mytoken=fd4698c940c6d1da602a70ac34f0b147
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/AuthResponse'
 *              404:
 *                  description: Not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/ErrorResponse'
 *              500:
 *                  description: Internal server error
 */
router.post(
  "/",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(BlogcreateSchema),
  BlogController.create
);

/**
 * @swagger
 * /api/v1/blog/{id}:
 *      patch:
 *          summary: Use credentials to login to the Web Server
 *          tags:
 *              - Blog
 *          description: Provide email and password credentials for the purpose of being authenticated and accessing
 *                       advanced features of the Web Server, depending on user's privileges.
 *          requestBody:
 *              required: true
 *              description: Email and Password to provide for authentication
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                            - email
 *                            - password
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: default@example.com
 *                              password:
 *                                  type: string
 *                                  example: default_pwd
 *          responses:
 *              200:
 *                  description: Success  - Successfully authenticated.  The session ID is returned in a cookie
 *                               named `mytoken`. You need to include this cookie in subsequent requests.
 *                  headers:
 *                    Set-Cookie:
 *                      schema:
 *                        type: string
 *                        example: mytoken=fd4698c940c6d1da602a70ac34f0b147
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/AuthResponse'
 *              404:
 *                  description: Not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/ErrorResponse'
 *              500:
 *                  description: Internal server error
 */
router.get("/:id", SchemaValidate(validateIdSchema), BlogController.getById);

router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(BlogupdateSchema),
  BlogController.update
);

/**
 * @swagger
 * /api/v1/blog/{id}:
 *      delete:
 *          summary: Use credentials to login to the Web Server
 *          tags:
 *              - Blog
 *          description: Provide email and password credentials for the purpose of being authenticated and accessing
 *                       advanced features of the Web Server, depending on user's privileges.
 *          requestBody:
 *              required: true
 *              description: Email and Password to provide for authentication
 *          responses:
 *              200:
 *                  description: Success  - Successfully authenticated.  The session ID is returned in a cookie
 *                               named `mytoken`. You need to include this cookie in subsequent requests.
 *                  headers:
 *                    Set-Cookie:
 *                      schema:
 *                        type: string
 *                        example: mytoken=fd4698c940c6d1da602a70ac34f0b147
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/AuthResponse'
 *              404:
 *                  description: Not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/ErrorResponse'
 *              500:
 *                  description: Internal server error
 */
router.delete(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  BlogController.delete
);

export { router };
