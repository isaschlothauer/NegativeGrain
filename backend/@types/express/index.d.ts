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