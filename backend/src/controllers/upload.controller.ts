import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

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

router.post('/', upload.single('imageFile'), (req: Request, res: Response) => {


  // if (req.body.imageFile)
    // console.log("req.file: ", req.file);
    // console.log("req.body:", req.body);
  console.log(req.cookies);
  


  

    res.status(200); 
})

export default router;