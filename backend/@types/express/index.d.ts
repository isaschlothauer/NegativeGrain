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

export interface UserDuplicateCheckUsername extends RowDataPacket {
  username: string;
}

export interface UserDuplicateCheckEmail extends RowDataPacket {
  username: string;
}

export type NewUserDataPasswordHash = Omit<NewAccountRegistrationProps, "password" | "cPassword"> & {
  password_hash: string;
};