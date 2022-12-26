import express from "express";
import { signin, signup, refresh } from "../controllers/user.controller";

const userRouter = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    UserSignInInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: martin@example1.com
 *        password:
 *          type: string
 *          default: your-password
 *    UserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        token:
 *          type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UserSignUpInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: Martin Luthar
 *        email:
 *          type: string
 *          default: martin@example1.com
 *        password:
 *          type: string
 *          default: your-password
 */

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
 *      409:
 *        description: User already exist
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Internal Server Error
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
 *      404:
 *        description: User not found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Internal Server Error
 */
userRouter.post("/signin", signin);

userRouter.post("/refresh", refresh);

export default userRouter;
