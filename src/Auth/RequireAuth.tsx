import { Navigate, useLocation } from "react-router-dom";
import { AuthConsumer as useAuth } from "./AuthContext";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { authed } = useAuth();
  const location = useLocation();

  return (
    <>
      {authed === true ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
      )}
    </>
  );
};
