import React, { createContext } from 'react';
import { SafeUser } from '../../types/conversation';

interface AuthContextType {
	user: SafeUser | null;
	setUser: React.Dispatch<React.SetStateAction<SafeUser | null>>;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
});

export default AuthContext;
