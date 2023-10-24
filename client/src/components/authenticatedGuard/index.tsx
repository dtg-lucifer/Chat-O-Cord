import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";
import Loading from "../_loader";

const AuthenticatedGuard: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loading />;

  if (!user) {
    if (
      location.pathname.split("/").includes("login") ||
      location.pathname.split("/").includes("register")
    ) {
      return <>{children}</>;
    }
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (location.pathname.split("/").includes("auth")) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default AuthenticatedGuard;
