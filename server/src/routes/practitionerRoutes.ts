import express from "express";

const {
  getPractitioners,
  addPractitioner,
  deletePractitioner,
  updatePractitioner,
} = require("../controllers/practitionerController");

const auth = require("../middlewares/auth");

const practitionerRouter = express.Router();

practitionerRouter.get("/", auth, getPractitioners);

practitionerRouter.post("/", auth, addPractitioner);

practitionerRouter.delete("/:practitioner_id", auth, deletePractitioner);

practitionerRouter.put("/:practitioner_id", auth, updatePractitioner);

module.exports = practitionerRouter;
