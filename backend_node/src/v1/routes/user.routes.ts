import { Router } from "express";
import { UserController } from "../../controllers";
import { ROL_TYPE } from "../../interface";
import { validateIdSchema, UserupdateSchema } from "../../schema";
import { SchemaValidate, hasRole, isAuth } from "../../middlware";

const router = Router();

/**
 * @swagger
 * /api/v1/user:
 *    get:
 *      tags:
 *        - User
 *      summary: show all users
 *      description: The endpoint will return a list of users the total number of elements and the pagination within the nextPage field.
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
 *                               $ref: '#/components/schemas/user'
 *        500:
 *          description: Internal server error
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serverError'
 *      security:
 *            - bearerAuth: []
 */
router.get(
  "/",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  UserController.getAll,
);

/**
 * @swagger
 * /api/v1/user/{id}:
 *    get:
 *      tags:
 *        - User
 *      summary: Get user by id
 *      description: This point helps to see the detail of the entity user
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: insert the id of the user to search
 *              schema:
 *               type: string
 *               format: objectId
 *      responses:
 *        200:
 *          description: If the user exists, it will return an object with the status and the corresponding data.
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
 *                              $ref: '#/components/schemas/user'
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
 *      security:
 *            - bearerAuth: []
 */
router.get(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  UserController.getById,
);

/**
 * @swagger
 * /api/v1/user/{id}:
 *    patch:
 *      tags:
 *        - User
 *      summary: Get user by id
 *      description: This point helps to see the detail of the entity user
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: insert the id of the user to search
 *              schema:
 *               type: string
 *               format: objectId
 *      requestBody:
 *          required: true
 *          description: check the schema blog to see the required fields *
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/user'
 *      responses:
 *        200:
 *          description: If the user exists, it will return an object with the status and the corresponding data.
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
 *                              $ref: '#/components/schemas/user'
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
 *      security:
 *            - bearerAuth: []
 */
router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor, ROL_TYPE.user]),
  SchemaValidate(UserupdateSchema),
  UserController.update,
);

/**
 * @swagger
 * /api/v1/user/{id}:
 *      delete:
 *          summary: Delete logic user from list.
 *          tags:
 *              - User
 *          description: Delete the user from the records. - check if you added the token in Authorize
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: The ID of the user for user.
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
  "/:id/logic",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  UserController.delete,
);

/**
 * @swagger
 * /api/v1/user/{id}:
 *      delete:
 *          summary: Delete force user from list.
 *          tags:
 *              - User
 *          description: Delete the user from the records. - check if you added the token in Authorize
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: The ID of the user for user.
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
  "/:id/destroy",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  UserController.erased,
);
export { router };
