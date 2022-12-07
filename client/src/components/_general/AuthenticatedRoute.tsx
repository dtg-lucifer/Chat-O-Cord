import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Loading from "../../pages/_Loading";
import { UseAuthProps, User } from "../../types/Utils/Authentication";
import { GetAuthDetails } from "../../utils/api";

const AuthenticatedRoute: React.FC<UseAuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const controller = new AbortController();

  useEffect(() => {
    setLoading(true);
    GetAuthDetails()
      .then(({ data }) => {
        console.log("UseAuth", data);
        setUser(data);
        setTimeout(() => setLoading(false), 1000)
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => setLoading(false), 1000)
      });
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;
  if (user) return <>{children}</>;
  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AuthenticatedRoute