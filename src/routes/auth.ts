import { Router } from "express";

import { loginHandler, registerHandler, logOutHandler } from "../controllers/auth";

const authRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - fullname
 *        - email
 *        - password
 *      properties:
 *        fullname:
 *          type: string
 *          default: Victor Abuka
 *        email:
 *          type: string
 *          default: abuka@example.com
 *        password:
 *          type: string
 *          default: strongPassword123*@
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        user: 
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            email:
 *              type: string
 *            fullname:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *    LoginUserInput:
 *      type: object
 *      required: 
 *        - email
 *        - password
 *      properties:
 *        email: 
 *          type: string
 *          default: abuka@example.com
 *        password: 
 *          type: string
 *          default: strongPassword123*@
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        accessToken: 
 *          type: string
 *        refreshToken: 
 *          type: string 
 *        user: 
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            email:
 *              type: string
 *            fullname:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 */

/**
   * @openapi
   * /auth/login:
   *  post:
   *     tags:
   *     - Authentication
   *     description: Allows user to login
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/LoginUserInput'
   *     responses:
   *       200:
   *         description: login successful
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoginUserResponse'
   *       400:
   *        description: login failed bad request
   */
authRouter.post('/login', loginHandler)
/**
   * @openapi
   * /auth/register:
   *  post:
   *     tags:
   *     - Authentication
   *     description: Allows user to register
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      201:
   *        description: Success User Created Successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
authRouter.post('/register', registerHandler)
/**
   * @openapi
   * /auth/logout:
   *  post:
   *     tags:
   *     - Authentication
   *     description: Allows user to logout
   *     responses:
   *       200:
   *         description: logout successful
   *       401:
   *         description: unauthorized attempt to logout
   */
authRouter.post('/logout', logOutHandler)

export default authRouter