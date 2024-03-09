import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../public/swagger.json';

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || "3000");
app.use(express.json());
app.use(Router);

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }
  )
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
