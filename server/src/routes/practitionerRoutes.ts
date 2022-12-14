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

/**
 * @openapi
 * /practitioner:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Get all the practitioners details
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Bad Request
 */
practitionerRouter.get("/", auth, getPractitioners);

/**
 * @openapi
 * /practitioner/form/{practitioner_id}:
 *  get:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Get a single practitioner detail
 *    parameters:
 *      - name: practitioner_id
 *        in: path
 *        description: The id of the practitioner
 *        required: true
 *    responses:
 *      202:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Bad Request
 */
practitionerRouter.get("/form/:practitioner_id", auth, getPractitioner);

/**
 * @openapi
 * /practitioner:
 *  post:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Add a practitioner
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PractitionerInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PractitionerResponse'
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Bad Request
 */
practitionerRouter.post("/", auth, addPractitioner);

/**
 * @openapi
 * /practitioner/{practitioner_id}:
 *  delete:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Delete a practitioner
 *    parameters:
 *      - name: practitioner_id
 *        in: path
 *        description: The id of the practitioner to be deleted
 *        required: true
 *    responses:
 *      202:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Bad Request
 */
practitionerRouter.delete("/:practitioner_id", auth, deletePractitioner);

/**
 * @openapi
 * /practitioner/{practitioner_id}:
 *  put:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - Practitioner
 *    summary: Update a practitioner detail
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PractitionerInput'
 *    parameters:
 *      - name: practitioner_id
 *        in: path
 *        description: The id of the practitioner to be updated
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized User
 *      500:
 *        description: Bad Request
 */
practitionerRouter.put("/:practitioner_id", auth, updatePractitioner);

module.exports = practitionerRouter;
