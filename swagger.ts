import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "./package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant Listing API",
      version,
      description: "API documentation for Restaurant Listing Application",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update this with your actual server URL
        description: "Development server",
      },
    ],
    schemes: ["http"],
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
  apis: [
    "index.ts",
    "./routes/*.ts",
    "./routes/auth/*.ts",
    "./routes/listing/*.ts",
    "./routes/review/*.ts",
    "./schema/*.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express, port: string | number) => {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Swagger API UI available at http://localhost:${port}/docs`);
  console.log(
    `Swagger API Docs in JSON available at http://localhost:${port}/docs.json`
  );
};

export default swaggerDocs;
