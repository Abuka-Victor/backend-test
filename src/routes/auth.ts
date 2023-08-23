import { Router } from "express";

import { loginHandler, registerHandler, logOutHandler } from "../controllers/auth";

const authRouter = Router()

authRouter.post('/login', loginHandler)
authRouter.post('/register', registerHandler)
authRouter.post('/logout', logOutHandler)

export default authRouter