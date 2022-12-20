require("dotenv").config();

import mongoose from "mongoose";
import swaggerDocs from "./utils/swagger";
import express, { Express } from "express";
import { DB_USERNAME, DB_PASSWORD, PORT } from "./constant";

const cors = require("cors");
const userRouter = require("./routes/user.route");
const practitionerRouter = require("./routes/practitioner.route");

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
