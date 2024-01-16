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
 *        - form
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/form"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", FormController.getAll);

/**
 * @swagger
 * /api/v1/form/{id}:
 *    get:
 *      tags:
 *        - form
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/form"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", FormController.getById);

/**
 * @swagger
 * /api/v1/form/found:
 *    post:
 *      tags:
 *        - form
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/form"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
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
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/form"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
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
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/form"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
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
 *    delete:
 *      tags:
 *        - Form
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/form"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 */
router.delete(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  FormController.delete
);

export { router };
