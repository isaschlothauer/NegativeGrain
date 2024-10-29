import { database } from '../config/database'
import { UserProfileForAuthentication, UserLoginProps, CookieOptionProps } from '../../@types/express/index'
import argon2 from 'argon2';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import jwt, { JwtPayload } from 'jsonwebtoken';
import express from 'express';

const jwtSecret: string | undefined = process.env.JWT_SECRET
let token: any;

export const JWTGenerate = async (username: string) => {

    // Cookie options (with notes for myself)
    const cookieOptions: CookieOptionProps = {
      maxAge: Math.floor(Date.now() / 1000) + (60 * 60), // Expire after 1 hour. Session or persisitent login status. 
      httpOnly: true, // Cookie will not be exposed to client side code
      sameSite: "none", // If client and server origins are different
      secure: true, // use with HTTPS only
      signed: false,
    }

  try {
    const [rows] = await database.promise().query<RowDataPacket[]>(
      "SELECT username, firstname, lastname, email, created_at FROM users WHERE username = ?;",
      [username]
    );

    if (rows.length == 0) 
      return false

    const tokenData = rows[0] as UserLoginProps;
    
    if (!jwtSecret) {
      return false;
    }

    token = jwt.sign(tokenData, jwtSecret, { expiresIn: '3h' });
    
    if (!token) {
      return false
    }

    try {
      const tokenOptions: { authToken: string; options: CookieOptionProps } = { authToken: token, options: cookieOptions };

      return tokenOptions;
    }
    catch (error) {
      console.log("Token generation unsuccessful");
      console.error(error);
      return false;
    }      
  }
  catch (error) {
    console.log("JWT error")
    console.error(error)
    return undefined;
  }
}


export const jwtVerification = async (token: string) => {
  
  try {
    if (jwtSecret && token) {
      const verifiedUser = jwt.verify(token, jwtSecret);
              
      if (verifiedUser) {
        return verifiedUser;
      } else {
        return undefined;
      }
    }
  }
  catch (err) {
    console.error(err);
    return undefined
  }
}