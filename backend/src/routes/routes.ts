import { Router } from 'express';
import { newAccountValidation } from '../middleware/new_account_validation';
import { loginInputValidation } from '../middleware/login_inut_validation'
import AccountCreationController from '../controllers/account_creation.controller'
import LoginController from '../controllers/login.controller'

const api = Router()
// .use('/accountRegister', newAccountValidation)
.use('/accountRegister', newAccountValidation, AccountCreationController)
.use('/login', loginInputValidation, LoginController)


export default Router().use('/api', api);