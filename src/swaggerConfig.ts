import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API - Documentação Swagger',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger com Express e TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};  

export const swaggerSpec = swaggerJSDoc(options);
