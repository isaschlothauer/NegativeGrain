import { Router, Request, Response } from 'express';

const router = Router();

router.delete('/', (req: Request, res: Response) => {
  
  console.log("cookie delete test")
  res.clearCookie('authenticationToken');
  res.end();
})

export default router; 