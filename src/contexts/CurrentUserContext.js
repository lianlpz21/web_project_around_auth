import { createContext } from "react";

const CurrentUserContext = createContext({
  avatar: "",
  name: "",
  about: "",
});

export default CurrentUserContext;
