import * as React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  console.log("is auth:", user);
  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
