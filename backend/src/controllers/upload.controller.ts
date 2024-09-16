import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { jwtVerification } from '../services/jwt_services'
import { JwtPayload } from 'jsonwebtoken';
import { VerifiedUserProps, ImageDataProps, ServiceReturnResultProps } from '../../@types/express/index';
import { uploadDatabaseOperation } from '../services/upload_database_operation';
import sharp from 'sharp';

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

// Multer
const upload = multer({ storage: storage })
const router = Router();

router.post('/', upload.single('imageFile'), async (req: Request, res: Response) => {

  const verifiedUser: undefined | string | JwtPayload | VerifiedUserProps = await jwtVerification(req.cookies.authenticationToken);

  if (verifiedUser === undefined || typeof verifiedUser !== 'object' || !('email' in verifiedUser)) {
    return res.status(401).send({ success: false, messages: 'Unable to verify user'})
  }

  try {
    if (!req.file != true) {
      sharp(req.file.path).resize(500, 500).toFile('src/image_storage/thumbnails/' + 'tn-' + fullFileName, (err, resizeImage) => {
        if (err) {
            console.error(err);
        } 
      })
    }
  }
  catch (error: unknown) {
    console.error("Thumbnail generation failed");

    return res.status(500).send({ success: false, messages: ['Server error: Unable to generate thumbnail']})
    
  }

  // For user identifier in user table
  const { email } = verifiedUser as VerifiedUserProps;

  const imageData: ImageDataProps = req.body;
  const uploaded = await uploadDatabaseOperation({ email, fullFileName, imageData })

  if (uploaded.success === true) 
    return res.status(200).send(uploaded);
  else
    return res.status(500).send({ success: false, messages: ['Server error: Unable to perform database operation']});
  })

export default router;
