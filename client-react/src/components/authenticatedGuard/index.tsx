import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";

const AuthenticatedGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>
  if (user) return <>{children}</>
  return <Navigate to="/auth/login" state={{ from: location }} />
}

export default AuthenticatedGuard;