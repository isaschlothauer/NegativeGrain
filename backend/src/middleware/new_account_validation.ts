import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { NewAccountRegistrationProps } from '../../@types/express/index'

export const newAccountValidation = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("This is from a middleware:", req.body);
  const schema = Joi.object<NewAccountRegistrationProps>({
    username: Joi.string()
    .max(50)
    .required()
    .messages({
      "string.max": "Username must be less than 50 characters"
    }),
    firstname: Joi.string()
    .max(50)
    .allow('')
    .optional()
    .messages({
      "string.max": "Firstname must be less than 50 characters"
    })
    .optional(),
    lastname: Joi.string()
    .max(50)
    .allow('')
    .optional()
    .messages({
      "string.max": "Lastname must be less than 50 characters"
    }),
    email: Joi.string().required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'jp', 'de', 'gov', 'edu']} 
    }),
    password: Joi.string()
      .min(5)
      .max(32)
      .required()
      .messages({
        "string.min": "Password must be minimum 5 characters",
        "string.max": "Password must be less than 32 characters",
        "string.ref": "Password do not match"
      }),
  
      cPassword: Joi.ref('password')
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false });

    // Lower case first and last name
    req.body['firstname'] = req.body['firstname'].toLowerCase();
    req.body['lastname'] = req.body['lastname'].toLowerCase();

    // Removing passwordConfirm
    delete req.body['cPassword'];
    
    next();
  } catch (err: any) {
    const errorDetails = await err.details.map((detail: {message: string})  => detail.message)

    console.log(errorDetails);

    // console.log(errorDetails)
    return res.status(400).json({success: false, errors: errorDetails});
  }
}