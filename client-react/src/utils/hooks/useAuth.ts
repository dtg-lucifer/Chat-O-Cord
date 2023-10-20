import { useEffect, useState } from "react";
import { getStatus } from "../../lib/api";
import { User } from "../../types/conversation";

export const useAuth = () => {
  const [user, setUser] = useState<Omit<Omit<User, "password">, "confPassword"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const controller = new AbortController();

  useEffect(() => {
    getStatus()
      .then((res) => {
        setUser(res.data);
        console.log("Use Auth Success:", res.data)
      })
      .catch((err) => {
        console.log("Use Auth Error:", err)
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { user, isLoading, error };
};
