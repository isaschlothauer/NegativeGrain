import { Router, Request, Response } from 'express';
import { jwtVerification } from '../services/jwt_services';
import { favoriteImageOperation } from '../services/favorite_image_operations'
import { VerifiedUserProps } from '../../@types/express/index'
import { JwtPayload } from 'jsonwebtoken';

const router = Router();

router.put('/', async (req: Request, res: Response) => {

  console.log("req body: ", req.body.favorite);

  // file name for the favorite image update
  const fileName: string = req.body.imageFileName;  // File name
  const userData: string | JwtPayload | undefined = await jwtVerification(req.cookies['authenticationToken']);  // User data from jwt token
  const userFavoriteMode: boolean = req.body.favorite;  // Is the favorite button on or off? 
  console.log("test: ", userFavoriteMode);


  // username for the favorite image update
  if (typeof userData === 'object' && userData !== null && 'username' in userData) {
    const { username } = userData as JwtPayload; 

    try {
      const result = await favoriteImageOperation(fileName, username, userFavoriteMode);

      console.log(result);
    }
    catch (error: unknown) {
      console.error('update_favorite: ', error);
    } 
    // try {
    //   const result = favoriteImageOperation(fileName, username, userFavoriteMode);

      // console.log(result);
  
    }
    // catch (err: unknown) {
    //   console.error("update fav controller error", err);
    //   return res.status(500).send({ success: false, errors: ['Server error. Unable to update user favorites']})
    // }



  // }
  
  
  // if (userData && userData.username != true) {
  //   return res.status(400).send({ success: false, errors: ['No username provided']})
  // }

  // const username: string = userData.username? userData.username : 


  return res.status(200).send("All ok");
})

export default router;