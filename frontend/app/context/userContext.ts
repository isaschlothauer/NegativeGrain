import { createContext, Dispatch, SetStateAction } from "react"

export const UserDataContext = createContext<{
  isUserLoggedIn: boolean;
  setIsUserLoggedOn: Dispatch<SetStateAction<string | undefined>>;
}>({
  isUserLoggedIn: false,
  setIsUserLoggedOn: (value) => undefined,
});