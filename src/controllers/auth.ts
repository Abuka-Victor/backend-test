import { Request, Response } from "express"
import bcrypt from "bcrypt"

import { signUpBodyValidator, loginBodyValidator } from "../validators/authValidators"
import { generateToken } from "../utils/token"
import { User } from "../models"
import { REFRESH_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_PRIVATE_KEY, NODE_ENV } from "../config/keys"

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill in all fields', detail: 'This route requires an email and a password' })
  }

  const user = await User.findOne({ where: { email: email } })
  if (!user) {
    return res.status(400).json({ error: "User does not exist" })
  }

  const { error } = loginBodyValidator(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const result = await bcrypt.compare(password, user.passwordHash)

  if (!result) {
    return res.status(400).json({ error: "Incorrect password" })
  }

  const accessToken = generateToken({ user_id: user.id }, ACCESS_TOKEN_PRIVATE_KEY as string, '180000')
  const refreshToken = generateToken({ user_id: user.id }, REFRESH_TOKEN_PRIVATE_KEY as string, '3 days')

  res.cookie("accessToken", accessToken, {
    secure: NODE_ENV !== "development",
    httpOnly: true,
    maxAge: 180000,
  });

  res.cookie("refreshToken", refreshToken, {
    secure: NODE_ENV !== "development",
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  })
  // Add the refresh token to redis whitelist

  return res.status(200).json({ accessToken, refreshToken, user: { id: user.id, email: user.email, fullname: user.fullname, createdAt: user.createdAt, updatedAt: user.updatedAt } });
}

export const registerHandler = async (req: Request, res: Response) => {
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  const { fullname, email, password } = req.body
  if (!fullname || !email || !password) {
    return res.status(400).json({ error: 'Please fill in all fields', detail: 'This route requires an email, a password and fullname' })
  }

  const user = await User.findOne({ where: { email: email } })
  if (user) {
    return res.status(400).json({ error: 'User already exists' })
  }
  const { error } = signUpBodyValidator(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({ fullname: fullname, email: email, passwordHash: hashedPassword })

  return res.status(201).json({ user: { id: newUser.id, email: newUser.email, fullname: newUser.fullname, createdAt: newUser.createdAt, updatedAt: newUser.updatedAt } })
}

export const logOutHandler = (req: Request, res: Response) => {
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  // remove the refresh token from redis
}