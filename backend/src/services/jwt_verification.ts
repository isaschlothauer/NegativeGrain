// JWToken verification
// export const jwtVerification = async (token: string) => {
  
//   try {
//     if (jwtSecret && token) {
//         const verifiedUser = jwt.verify(token, jwtSecret);
//         const { email }  = verifiedUser as TokenPayloadProps;
        
//         return { success: true, message: "Token verified", user: email }
//     }
//   }
//   catch (err) {
//     console.error(err);
//     return { success: false, error: "Token could not be verified"}
//   }
// }