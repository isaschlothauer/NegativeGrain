import { Router } from 'express';
import { newAccountValidation } from '../middleware/new_account_validation';


const api = Router()
// .use('/accountRegister', newAccountValidation)
.post('/accountRegister', newAccountValidation)


export default Router().use('/api', api);