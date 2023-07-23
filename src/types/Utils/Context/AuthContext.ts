import { User } from "../Authentication";

export interface AuthContextType {
    user?: User
    updateUser: (data: User) => void
}