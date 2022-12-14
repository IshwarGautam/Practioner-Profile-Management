import express from "express";

const { signin, signup } = require("../controllers/userController");

const userRouter = express.Router();

/**
 * @openapi
 * /users/signup:
 *  post:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - User
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignUpInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      401:
 *        description: Unauthorized User
 *      409:
 *        description: User already exist
 *      500:
 *        description: Bad Request
 */
userRouter.post("/signup", signup);

/**
 * @openapi
 * /users/signin:
 *  post:
 *    security:
 *      - BearerAuth: []
 *    tags:
 *    - User
 *    summary: Login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignInInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      400:
 *        description: Invalid credentials
 *      401:
 *        description: Unauthorized User
 *      404:
 *        description: User not found
 *      500:
 *        description: Bad Request
 */
userRouter.post("/signin", signin);

module.exports = userRouter;
