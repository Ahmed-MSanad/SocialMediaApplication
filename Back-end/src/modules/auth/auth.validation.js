import joi from "joi";
import { genders } from "../../utils/index.js";


export const register= joi.object({
      fullName: joi.string().min(2).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().min(3).required(),
      cPassword: joi.string().valid(joi.ref("password")).required(),
      phone: joi.string().required(),
      gender: joi.string().valid(...Object.values(genders)),
      profilePicture: joi.string()
    })
    .required()


export const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})
.required()

export const refreshToken = joi
  .object({
    refreshToken: joi.string().required(),
  })
  .required();