import { useState, useContext, useEffect } from "react";
import { GetAuthDetails } from "../api";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    setLoading(true);
    GetAuthDetails()
      .then(({ data }) => {
        console.log("UseAuth", data);
        updateUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, []);

  return { user, loading };
}
