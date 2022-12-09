import { useLocation, Navigate } from "react-router-dom";
import Loading from "../../pages/_Loading";
import { useAuth } from "../../utils/hooks/useAuth";

const AuthenticatedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user) return <>{children}</>;
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AuthenticatedRoute;
