import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Books API', // Title of the API
      version: '1.0.0',    // API version
      description: 'API documentation for managing books', // Description of the API
      contact: {
        name: 'Gontang Ragil Prakasa', // Your name
        url: '-', // Your website
        email: 'gontangprakasa02@example.com', // Your email
      },
    },
    servers: [
      {
        url: process.env.APP_URL, 
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          name: 'x-api-key', // The name of the header
          in: 'header',      // Where the API key is sent
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ['./**/*.ts']
};

// Generate Swagger specs
const swaggerSpecs = swaggerJsDoc(options);
export default swaggerSpecs;