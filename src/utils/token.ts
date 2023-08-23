import jwt from "jsonwebtoken"

type tokenData = {
  user_id: number
}

export const generateToken = (data: tokenData, secret: string, maxAge: string) => {
  const token = jwt.sign(data, secret, { expiresIn: maxAge });
  return token
}

export const verifyToken = (token: string, secret: string): tokenData | null => {
  try {
    const verifiedToken = jwt.verify(token, secret)
    return verifiedToken as tokenData
  } catch (err) {
    return null
  }
}

