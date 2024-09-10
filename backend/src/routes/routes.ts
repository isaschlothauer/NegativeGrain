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
import { imageData } from '../../../frontend/app/contents/contentUpload/uploadInputItem';

const api = Router()
.use('/accountRegister', newAccountValidation, AccountCreationController)
.use('/login', loginInputValidation, LoginController)
.use('/onlineAuthentication', authVerification, credentialVerificationController)
.use('/destroyCookie', cookieController)
.use('/upload', authVerification, uploadController)
.use('/imageFeed', ImageFeedController)

export default Router().use('/api', api);
