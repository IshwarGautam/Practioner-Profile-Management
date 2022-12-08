import express from "express";

const {
  getPractitioner,
  getPractitioners,
  addPractitioner,
  deletePractitioner,
  updatePractitioner,
} = require("../controllers/practitionerController");

const auth = require("../middlewares/auth");

const practitionerRouter = express.Router();

practitionerRouter.get("/", getPractitioners);

practitionerRouter.get("/form/:practitioner_id", getPractitioner);

practitionerRouter.post("/", addPractitioner);

practitionerRouter.delete("/:practitioner_id", deletePractitioner);

practitionerRouter.put("/:practitioner_id", updatePractitioner);

module.exports = practitionerRouter;
