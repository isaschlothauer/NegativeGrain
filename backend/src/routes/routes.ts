import { Router } from 'express';
import { newAccountValidation } from '../middleware/new_account_validation';
import AccountCreationController from '../controllers/account_creation.controller'

const api = Router()
// .use('/accountRegister', newAccountValidation)
.use('/accountRegister', newAccountValidation, AccountCreationController)


export default Router().use('/api', api);