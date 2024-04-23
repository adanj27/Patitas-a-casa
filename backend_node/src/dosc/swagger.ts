import path from "node:path";
import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: `REST API ${process.env.APP_NAME} for Swagger Documentation`,
    version: "1.0.0",
    description: `This code will be helpful for documentation for future developers who support project, both for frontend and backend!.`,
  },
  // this line generate error path
  /*  servers: [
    {
      url: `${process.env.APP_NAME}:${process.env.APP_PORT}`,
      description: "Development server",
    },
  ], */
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      user: {
        type: "object",
        required: [
          "first_name",
          "last_name",
          "email",
          "phone",
          "alias",
          "password",
        ],
        properties: {
          _id: {
            type: "ObjectId",
          },
          first_name: {
            type: "string",
          },
          last_name: {
            type: "string",
          },

          email: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          alias: {
            type: "string",
          },
          status: {
            type: "boolean",
          },
          password: {
            type: "string",
          },
          rol: {
            type: "ObjectId",
          },
          forms: {
            type: "[ObjectId]",
          },
          blogs: {
            type: "[ObjectId]",
          },
          shelters: {
            type: "[ObjectId]",
          },
          createdAt: {
            type: "timestamp",
          },
          updateAt: {
            type: "timestamp",
          },
        },
      },
      blog: {
        type: "object",
        required: ["title", "sub_title", "description", "image_url"],
        properties: {
          _id: {
            type: "ObjectId",
          },
          title: {
            type: "string",
          },
          sub_title: {
            type: "string",
          },

          description: {
            type: "string",
          },
          image_url: {
            type: "string",
          },
          short_description: {
            type: "string",
          },
          status: {
            type: "boolean",
          },
          count_view: {
            type: "number",
          },
          createdAt: {
            type: "timestamp",
          },
          updateAt: {
            type: "timestamp",
          },
        },
      },
      form: {
        type: "object",
        required: [
          "color",
          "size",
          "city",
          "address",
          "contact",
          "image_url",
          "description",
          "type",
          "type_search",
        ],
        properties: {
          name: {
            type: "string",
          },
          color: {
            type: "string",
          },

          size: {
            type: "string",
            enum: ["SMALL", "MEDIUM", "LARGE"],
          },
          city: {
            type: "string",
          },
          address: {
            type: "string",
          },
          reward: {
            type: "number",
          },
          contact: {
            type: "string",
            example: "(504) 641-2564",
          },
          loos_date: {
            type: "Date",
            example: "2023-11-09T12:34:56.789Z",
          },
          image_url: {
            type: "string",
            example: "https://loremflickr.com/320/240/dog",
          },
          description: {
            type: "string",
          },
          status: {
            type: "boolean",
          },
          type: {
            type: "string",
            enum: ["CAT", "DOG"],
          },
          type_search: {
            type: "string",
            enum: ["FOUND", "LOST"],
          },
        },
      },
      rol: {
        type: "object",
        required: ["name"],
        properties: {
          _id: {
            type: "ObjectId",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          createdAt: {
            type: "timestamp",
          },
          updateAt: {
            type: "timestamp",
          },
        },
      },
      Shelter: {
        type: "object",
        required: ["title", "description", "image_url"],
        properties: {
          _id: {
            type: "ObjectId",
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          image_url: {
            type: "string",
          },
          status: {
            type: "boolean",
          },
          count_view: {
            type: "number",
          },
          createdAt: {
            type: "timestamp",
          },
          updateAt: {
            type: "timestamp",
          },
        },
      },
      messageError: {
        type: "object",
        properties: {
          message: {
            type: "array",
            items: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  example: "invalid_parameter",
                },
                message: {
                  type: "string",
                  example: "message error",
                },
              },
            },
          },
        },
      },
      serverError: {
        type: "object",
        properties: {
          status: {
            type: "string",
            example: "false",
          },
          error: {
            type: "string",
            example: `something unexpected has happened + error`,
          },
        },
      },
    },
  },
};

const swaggeroptions: OAS3Options = {
  swaggerDefinition,
  apis: [path.join(`${__dirname}`, "../v1/routes/*.ts")],
};

export const swaggerSetup = swaggerJSDoc(swaggeroptions);
