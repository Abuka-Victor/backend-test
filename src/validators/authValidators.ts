import Joi from "joi"
import passwordComplexity from "joi-password-complexity"


/**
 * {
  min: 8,
  max: 26,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
}
Password validation schema
 */

type signUpBodyType = {
  email: string,
  password: string,
  fullname: string,
}

type loginBodyType = {
  email: string,
  password: string,
}

export const signUpBodyValidator = (body: signUpBodyType) => {

  const validationSchema = Joi.object({
    fullname: Joi.string().required().min(1),
    email: Joi.string().email({ minDomainSegments: 2 }).required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    repeat_password: Joi.ref('password'),
  })
  return validationSchema.validate(body)
}

export const loginBodyValidator = (body: loginBodyType) => {
  const validationSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  })

  return validationSchema.validate(body)
}