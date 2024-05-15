import { Navigate } from "react-router-dom";
import { newSessionStorage, useSessionStorage } from "./commonFunctions";
import { Variables } from "./Constants";
import PageNotFound from "../components/PageNotFound/PageNotFound";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isLoggedIn = useSessionStorage("userInfo");

  if (!isLoggedIn) {
    const redirect: Record<string, boolean> = { redirected: true };
    newSessionStorage("auth", redirect);
    return <Navigate to="/user/form" />;
  }

  return <>{children}</>;
};

export default AuthGuard;

export const HRAuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isHr = useSessionStorage("client-id") == Variables.HR_ROLE;

  if (!isHr) {
    const redirect: Record<string, boolean> = { redirected: true };
    newSessionStorage("auth", redirect);
    return <PageNotFound />;
  }

  return <>{children}</>;
};
