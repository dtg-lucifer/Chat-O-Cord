import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";

const AuthenticatedGuard: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;
  if (user) {
    if (location.pathname.split("/").includes("auth")) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AuthenticatedGuard;
