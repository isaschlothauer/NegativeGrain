import { createContext, Dispatch, SetStateAction } from "react"

export const UserDataContext = createContext<{
  isUserLoggedIn: boolean | undefined;
  setIsUserLoggedOn: Dispatch<SetStateAction<string | undefined>>;
}>({
  isUserLoggedIn: false,
  setIsUserLoggedOn: (value) => undefined,
});