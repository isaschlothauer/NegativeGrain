import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { LoginInputDataProps } from '../../@types/express/index'

export const loginInputValidation = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("This is from a middleware:", req.body);
  const schema = Joi.object<LoginInputDataProps>({
    username: Joi.string()
    .required(),
    password: Joi.string()
    .required(),
  })

  try {
    const value = await schema.validateAsync(req.body, { abortEarly: false });

    // res.status(200).send({ success: true, message: "validation passed"});
    next();
  } catch (err: any) {
    const errorDetails = await err.details.map((detail: {message: string})  => detail.message)

    // console.log(errorDetails)
    return res.status(400).json({success: false, errors: errorDetails});
  }
}