const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Priyarani Software Solution API',
      version: '1.0.0',
      description: 'API documentation for Priyarani Software Solution',
    },
    servers: [
      {
        url: 'https://priyarani-software-solution.onrender.com',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
