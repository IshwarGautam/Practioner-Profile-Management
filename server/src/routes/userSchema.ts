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
