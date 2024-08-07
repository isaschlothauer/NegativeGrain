import { createContext, Dispatch, SetStateAction } from "react"

interface UserData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  created_at: string;
  exp: number | null;
  iat: number | null;
}

interface UserDataContextProps {
  isLoggedIn: {
    isUserLoggedIn: boolean | undefined;
    setIsUserLoggedIn: Dispatch<SetStateAction<boolean | undefined>>;
  },
  userData: {
    user: UserData;
    setUser: Dispatch<SetStateAction<UserData>>;
  }
}

const defaultUserData: UserData = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  created_at: "",
  exp: null,
  iat: null,
};

export const UserDataContext = createContext<UserDataContextProps>({
    isLoggedIn: {
      isUserLoggedIn: undefined,
      setIsUserLoggedIn: (value) => undefined,
    },
    userData: {
      user: defaultUserData,
      setUser: () => undefined,

  }
});