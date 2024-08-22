import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { jwtVerification } from '../services/jwt_services'
import { JwtPayload } from 'jsonwebtoken';
import { VerifiedUserProps, ImageDataProps, ServiceReturnResultProps } from '../../@types/express/index';
import { uploadDatabaseOperation } from '../services/upload_database_operation';

// File name
let fullFileName: string | undefined = '';

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/image_storage/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    fullFileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    cb(null, fullFileName);
  }
});

const upload = multer({ storage: storage })

const router = Router();

router.post('/', upload.single('imageFile'), async (req: Request, res: Response) => {

  const verifiedUser: undefined | string | JwtPayload | VerifiedUserProps = await jwtVerification(req.cookies.authenticationToken);

  if (verifiedUser === undefined || typeof verifiedUser !== 'object' || !('email' in verifiedUser)) {
    return res.status(401).send({ success: false, messages: 'Unable to verify user'})
  }

  // For user identifier in user table
  const { email } = verifiedUser as VerifiedUserProps;

  const imageData: ImageDataProps = req.body;
  const uploaded: Promise<boolean | undefined | ServiceReturnResultProps> = uploadDatabaseOperation({ email, fullFileName, imageData })
  

  console.log("uploaded: ", uploaded);


  res.status(200); 
})

export default router;
