export interface NewAccountRegistrationProps {
  username: string,
  firstname?: string | undefined,
  lastname?: string | undefined,
  email: string;
  password: string;
  cPassword: string
}