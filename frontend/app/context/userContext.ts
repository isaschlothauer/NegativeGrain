import { createContext, Dispatch, SetStateAction } from "react"

export const UserDataContext = createContext<{
  isUserLoggedIn: boolean | undefined;
  setIsUserLoggedIn: Dispatch<SetStateAction<boolean | undefined>>;
}>({
  isUserLoggedIn: undefined,
  setIsUserLoggedIn: (value) => undefined,
});