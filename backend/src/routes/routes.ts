import express from 'express';
import path from 'path';

import { Router } from 'express';
import { newAccountValidation } from '../middleware/new_account_validation';
import { loginInputValidation } from '../middleware/login_input_validation';
import { authVerification } from '../middleware/auth_verification';
import uploadController from '../controllers/upload.controller';
import AccountCreationController from '../controllers/account_creation.controller'
import LoginController from '../controllers/login.controller'
import credentialVerificationController from '../controllers/credential.controller'
import cookieController from '../controllers/cookie.controller'
import ImageFeedController from '../controllers/image_feed.controller'


const api = Router()
.use('/accountRegister', newAccountValidation, AccountCreationController)
.use('/login', loginInputValidation, LoginController)
.use('/onlineAuthentication', authVerification, credentialVerificationController)
.use('/destroyCookie', cookieController)
.use('/upload', authVerification, uploadController)
.use('/imageFeed', ImageFeedController)
.use('/image_storage', express.static(path.join(__dirname, '../../src/image_storage')))
.use('/favoriteTrigger', authVerification, (req, res)=> {
  console.log("routes: ", req.body);
})
;
export default Router().use('/api', api);
