import { createContext } from "react"
import { AuthContextType } from "../../types/Utils/Context/AuthContext";

export const AuthContext = createContext<AuthContextType>({
    updateUser: () => {},
});