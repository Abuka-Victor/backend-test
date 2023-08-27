import { Express, Request, Response } from 'express';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version,
      contact: {
        name: "Abuka Victor",
        url: "https://victorabuka.netlify.app",
        email: "abukavictoro@gmail.com",
      },
    }
  },
  apis: [`./src/app.ts`, `./src/routes/*.ts`]
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Swagger documentation in JSON format
  app.get('/docs/swagger.json', (req: Request, res: Response) => {
    res.json(swaggerSpec)
  })
}

export default swaggerDocs