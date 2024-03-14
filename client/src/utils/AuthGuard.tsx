import { Navigate } from "react-router-dom";
import { newSessionStorage, useLocalStorage } from "./commonFunctions";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isLoggedIn = useLocalStorage("userInfo");

  if (!isLoggedIn) {
    const redirect: Record<string, boolean> = { redirected: true };
    newSessionStorage("auth", redirect);
    return <Navigate to="/user/form" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
