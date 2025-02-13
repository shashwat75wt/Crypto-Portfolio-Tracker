import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
          title: "My API",
          version: "1.0.0",
          description: "API Documentation with Swagger and Bearer Authentication",
        },
        servers: [
          {
            url: "http://localhost:5000/api",
          }
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
  apis: [path.join(__dirname, "../user/user.route.ts"),path.join(__dirname, "../portfolio/portfolio.route.ts"),path.join(__dirname, "../transaction/transaction.route.ts"),path.join(__dirname, "../cryptoPrice/cryptoPrice.route.ts"),path.join(__dirname, "../priceAlert/priceAlert.routes.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
