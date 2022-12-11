import mongoose from "mongoose";
import express, { Application } from "express";

require("dotenv").config();

const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const practitionerRouter = require("./routes/practitionerRoutes");

const app: Application = express();
const port: number = (process.env.PORT && parseInt(process.env.PORT)) || 8000;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/practitioner", practitionerRouter);

mongoose
  .connect(
    "mongodb+srv://ishwar:ishwar@cluster0.s4zjjod.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected successfully on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
