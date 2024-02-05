import { Router } from "express";
import { AuthController } from "../../controllers/authController";
import { AuthResetPassSchema, AuthSchema, UsercreateChema } from "../../schema";
import { SchemaValidate, isAuth } from "../../middlware";

const router = Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *      post:
 *          summary: Use credentials to login to the Web Server
 *          tags:
 *              - Authentification
 *          description: Provide email and password credentials for the purpose of being authenticated and accessing
 *                       advanced features of the Web Server, depending on user's privileges. added the token in Authorize
 *          requestBody:
 *              required: true
 *              description: Email and Password
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
 *                                  example: test1@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: password1A@
 *          responses:
 *              200:
 *                  description: Success  - Successfully authenticated.
 *                               named `mytoken`. You need to include this cookie in subsequent requests.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  mytoken:
 *                                     type: string
 *                                     description: the authentification token
 *                                     example: token_generate
 *                                  response:
 *                                     type: object
 *                                     properties:
 *                                        status:
 *                                          type: boolean
 *                                          example: true
 *                                        message:
 *                                          type: string
 *                                          example: any message from backend
 *              400:
 *                  description: Bad Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                     type: string
 *                                     example: false
 *                                  message:
 *                                     tpye: sting
 *                                     example: invalid credentials.
 *              404:
 *                  description: Not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/messageError'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                    application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/serverError'
 *
 */
router.post("/login", SchemaValidate(AuthSchema), AuthController.login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *      post:
 *          summary: Logout user from Web Server
 *          tags:
 *              - Authentification
 *          description: The assigned cookie will be deleted
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *          security:
 *            - bearerAuth: []
 */
router.post("/logout", isAuth, AuthController.logout);

/**
 * @swagger
 * /api/v1/auth/register:
 *      post:
 *          summary: The registration new user to access web server
 *          tags:
 *              - Authentification
 *          description: Provide the necessary data to provide access to the web server
 *          requestBody:
 *              required: true
 *              description: These fields are required for functionality.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                            - first_name
 *                            - last_name
 *                            - phone
 *                            - email
 *                            - password
 *                            - alias
 *                          properties:
 *                              first_name:
 *                                  type: string
 *                                  example: Ipsum sint
 *                              last_name:
 *                                  type: string
 *                                  example: accusamus
 *                              phone:
 *                                  type: string
 *                                  example: 537-445-8443
 *                              email:
 *                                  type: string
 *                                  example: email@example.com
 *                              password:
 *                                  type: string
 *                                  example: defaultpwd1@A
 *                              alias:
 *                                  type: string
 *                                  example: eligend
 *          responses:
 *              201:
 *                  description: Success - Successfully created. Returns an object with the state true and a confirmation message
 *                  content:
 *                      application/json:
 *                          schema:
 *                               type: object
 *                               properties:
 *                                  status:
 *                                     type: boolean
 *                                     example: true
 *                                  message:
 *                                      type: string
 *                                      example: User created
 *              400:
 *                  description: Bad Request - Errors fields | Duplicate on the database
 *                  content:
 *                      application/json:
 *                          schema:
 *                               type: object
 *                               properties:
 *                                  message:
 *                                      type: array
 *                                      items:
 *                                        type: object
 *                                        properties:
 *                                            code:
 *                                              type: stirng
 *                                              example: code error
 *                                            message:
 *                                              type: string
 *                                              example: message error
 *              500:
 *                  description: Internal server error
 *                  content:
 *                    application/json:
 *                          schema:
 *                             $ref: '#/components/schemas/serverError'
 */
router.post(
  "/register",
  SchemaValidate(UsercreateChema),
  AuthController.Register,
);

/**
 * @swagger
 * /api/v1/auth/{id}/reset-password:
 *      post:
 *          summary: Reset password for user
 *          tags:
 *              - Authentification
 *          description: Users will only be able to reset passwords only when they are connected to the web server.
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: The ID of the user for whom the password is being reset.
 *              schema:
 *               type: string
 *               format: objectId
 *          requestBody:
 *              required: true
 *              description: These fields are required for functionality.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                            - oldpassword
 *                            - newpassword
 *                          properties:
 *                              oldpassword:
 *                                  type: string
 *                                  example: default_pass_pwd
 *                              newpassword:
 *                                  type: string
 *                                  example: default_pass_new
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/messageResponse'
 *              404:
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
router.post(
  "/:id/reset-password",
  isAuth,
  SchemaValidate(AuthResetPassSchema),
  AuthController.resetPassword,
);

export { router };
