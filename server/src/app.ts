import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import mongoose from "mongoose";
import swaggerDocs from "./utils/swagger";
import express, { Express } from "express";
import userRouter from "./routes/user.route";
import practitionerRouter from "./routes/practitioner.route";
import { DB_USERNAME, DB_PASSWORD, PORT } from "./apiConfig";

const app: Express = express();
const port: number = (PORT && parseInt(PORT)) || 8000;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/practitioner", practitionerRouter);

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.s4zjjod.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      swaggerDocs(app, port);
      console.log(`Connected successfully on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
