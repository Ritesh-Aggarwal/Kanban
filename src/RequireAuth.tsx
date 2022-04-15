import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated] = useState(true);
  const location = useLocation();

  return (
    <>
      {isAuthenticated === true ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
      )}
    </>
  );
};
