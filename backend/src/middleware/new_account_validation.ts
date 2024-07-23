import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { NewAccountRegistrationProps } from '../../@types/express/index'

export const newAccountValidation = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("This is from a middleware:", req.body);
  const schema = Joi.object<NewAccountRegistrationProps>({
    username: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .max(50)
    .required()
    .messages({
      "string.max": "Username must be less than 50 characters"
    }),
    firstname: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]'))
    .max(50)
    .messages({
      "string.max": "Firstname must be less than 50 characters"
    }),
    lastname: Joi.string()
    .pattern(new RegExp('^[a-zA-Z]'))
    .max(50)
    .messages({
      "string.max": "Lastname must be less than 50 characters"
    }),
    email: Joi.string().required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'jp', 'de', 'gov', 'edu']} 
    }),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(5)
      .max(32)
      .required()
      .messages({
        "string.min": "Password must be minimum 5 characters",
        "string.max": "Password must be less than 32 characters"
      }),
  
      cPassword: Joi.ref('password')
      
  })

  try {
    const value = await schema.validateAsync(req.body, { abortEarly: false });

    // Removing passwordConfirm
    delete req.body['passwordConfirm'];
    
    res.status(200).send({ success: true, message: "validation passed"});
    // next();
  } catch (err: any) {
    const errorDetails = await err.details.map((detail: {message: string})  => detail.message)

    // console.log(errorDetails)
    return res.status(400).json({success: false, errors: errorDetails});
  }
}