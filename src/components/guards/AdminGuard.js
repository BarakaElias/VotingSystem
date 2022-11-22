import * as React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by admin users
function AdminGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  // console.log("admin guard", user.isSemaAdmin);

  // console.log("Admin Guard", isAuthenticated);

  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  if (user !== null) {
    if (user.isSemaAdmin) {
      return <React.Fragment>{children}</React.Fragment>;
    }
  }

  return <Navigate to="/auth/sign-in" />;
}

export default AdminGuard;
