import { Router } from "express";
import { FormController } from "../../controllers";
import { ROL_TYPE } from "../../interface";
import {
  validateIdSchema,
  FormFoundPetSchema,
  FormLostPetSchema,
  FormUpdateSchema,
} from "../../schema";
import { SchemaValidate, hasRole, isAuth } from "../../middlware";

const router = Router();

/**
 * @swagger
 * /api/v1/form:
 *    get:
 *      tags:
 *        - Form
 *      summary: show all forms
 *      description: The endpoint will return a list of forms the total number of elements and the pagination within the nextPage field.
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
 *                               $ref: '#/components/schemas/form'
 *        500:
 *          description: Internal server error
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serverError'
 */
router.get("/", FormController.getAll);

/**
 * @swagger
 * /api/v1/form/{id}:
 *    get:
 *      tags:
 *        - Form
 *      summary: Get from by id
 *      description: This point helps to see the detail of the entity from
 *      parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: insert the id of the form to search
 *              schema:
 *               type: string
 *               format: objectId
 *      responses:
 *        200:
 *          description: If the form exists, it will return an object with the status and the corresponding data.
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
 *                              $ref: '#/components/schemas/form'
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
router.get("/:id", FormController.getById);

/**
 * @swagger
 * /api/v1/form/found:
 *    post:
 *      tags:
 *        - Form
 *      summary: create a form for a found pet
 *      description:  You must be registered in order to create a form - check if you added the token in Authorize
 *      requestBody:
 *          required: true
 *          description: check the schema form to see the required fields *
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/form'
 *      responses:
 *        200:
 *          description: It will return a message with the status, the created form. additional email sending message is added.
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
 *                              $ref: '#/components/schemas/form'
 *                           message:
 *                              type: object
 *                              example: send message to email - OPTIONAL TO VALIDATE
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
  "/found",
  isAuth,
  hasRole([ROL_TYPE.user, ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(FormFoundPetSchema),
  FormController.createFound
);

/**
 * @swagger
 * /api/v1/form/lost:
 *    post:
 *      tags:
 *        - Form
 *      summary: create a form for a lost pet
 *      description:  You must be registered in order to create a form - check if you added the token in Authorize
 *      requestBody:
 *          required: true
 *          description: check the schema form to see the required fields *
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/form'
 *      responses:
 *        200:
 *          description: It will return a message with the status, the created form. additional email sending message is added.
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
 *                              $ref: '#/components/schemas/form'
 *                           message:
 *                              type: object
 *                              example: send message to email - OPTIONAL TO VALIDATE
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
  "/lost",
  isAuth,
  hasRole([ROL_TYPE.user, ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(FormLostPetSchema),
  FormController.createLost
);

/**
 * @swagger
 * /api/v1/form/{id}:
 *    patch:
 *      tags:
 *        - Form
 *      summary: update a form pet
 *      description:  
The enpoint will help users update the created forms - check if you added the token in Authorize
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: The ID of the user for form.
 *              schema:
 *               type: string
 *               format: objectId
 *      requestBody:
 *          required: true
 *          description: check the schema form to see the required fields *
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/form'
 *      responses:
 *        200:
 *          description: It will return a message with the status, the created form. additional email sending message is added.
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
 *                              $ref: '#/components/schemas/form'
 *                           message:
 *                              type: object
 *                              example: send message to email - OPTIONAL TO VALIDATE
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
  hasRole([ROL_TYPE.admin, ROL_TYPE.editor, ROL_TYPE.user]),
  SchemaValidate(FormUpdateSchema),
  FormController.update
);

/**
 * @swagger
 * /api/v1/form/{id}:
 *      delete:
 *          summary: Delete form from list.
 *          tags:
 *              - Form
 *          description: Delete the form from the records. - check if you added the token in Authorize
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: The ID of the user for form.
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
  FormController.delete
);

export { router };
