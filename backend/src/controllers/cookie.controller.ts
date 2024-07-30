import { Router, Request, Response } from 'express';

const router = Router();

router.delete('/', (req: Request, res: Response) => {
  res.clearCookie('authenticationToken');
  res.end();
})

export default router; 