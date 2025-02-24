import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Exchange Rate API',
      version: '1.0.0',
      description: 'Exchange Rate API',
    },
  },
  apis: ['./src/swaggerDocs.ts'],
};

const openapiSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

  app.get('/openapi.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(openapiSpec, null, 2));
  });
}
