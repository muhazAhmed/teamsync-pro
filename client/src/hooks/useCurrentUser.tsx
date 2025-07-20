import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        toast.error("Failed to load user.");
      }
    } else {
      toast.error("User not found.");
    }
    setLoading(false);
  }, []);

  return { user, loading };
};
