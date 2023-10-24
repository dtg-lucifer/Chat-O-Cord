import { useContext, useEffect, useState } from "react";
import { getStatus } from "../../lib/api";
import AuthContext from "../context/authContext";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  const controller = new AbortController();

  useEffect(() => {
    getStatus()
      .then(({ data }) => {
        console.log("Use Auth Success:", data);
        setUser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Use Auth Error:", err.message);
        setIsLoading(false);
      })

    return () => controller.abort();
    // eslint-disable-next-line 
  }, []);

  return { user, isLoading };
};
