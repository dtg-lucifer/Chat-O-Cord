import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    profilePic: string;
    joinedOn: Date;
    joinedConversationId: string;
    createdConversationId: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
	const fetchUser = async () => {
	  try {
		const res = await fetch("/api/auth/me", {
		  credentials: "include",
		});
		const data = await res.json();
		if (res.ok) {
		  setUser(data);
		}
	  } catch (err) {
		console.log(err);
	  } finally {
		setIsLoading(false);
	  }
	};
	fetchUser();
  }, []);

  return { user, isLoading };
};
