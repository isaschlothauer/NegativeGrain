import { RowDataPacket } from 'mysql2';
export interface NewAccountRegistrationProps {
  username: string,
  firstname?: string | undefined,
  lastname?: string | undefined,
  email: string;
  password: string;
  cPassword: string
}

export type NewAccountDatabaseType = Omit<NewAccountRegistrationProps, "firstname" |  "lastname" | "password" | "cPassword">

export interface UsernameDB extends RowDataPacket {
  username: string;
}

export interface emailDB extends RowDataPacket {
  email: string;
}

export interface passwordDB extends RowDataPacket {
  password: string;
}

export type NewUserDataPasswordHash = Omit<NewAccountRegistrationProps, "password" | "cPassword"> & {
  password_hash: string;
};

export interface LoginInputDataProps {
  username: string,
  password: string
}

export type UserLoginProps = Omit<NewAccountRegistrationProps, "cPassword" | "password"> & {
  created_at: string
}

export interface CookieOptionProps {
  maxAge?: number,  
  httpOnly: boolean,  
  sameSite?: boolean | "lax" | "strict" | "none",
  secure: boolean,
  signed: boolean,
}

export type UserProfileForAuthentication = Omit<NewAccountRegistrationProps, "cPassword"> & {
  created_at: string,
  iat: number,
  exp: number,
}

export interface VerifiedUserProps {
  username: string,
  firstname: string | undefined,
  lastname: string | undefined,
  email: string;
  created_at: string;
  iat: number;
  exp: number;
}

export interface ImageDataProps {
  imageTitle: string,
  brand: string | undefined,
  camera: string | undefined,
  lens: string | undefined,
  flength: string | undefined,
  aperture: string | undefined,
  filmStock: string | undefined,
  caption: string | undefined,
}

export interface UserID extends RowDataPacket {
  userID: number;
}

export interface ServiceReturnResultProps { 
  success: boolean,
  messages: Array;
}