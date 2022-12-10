import * as React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by admin users
function AdminGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  console.log("Admin Guard", user);
  // console.log("admin guard", user.isSemaAdmin);

  console.log("Admin Guard: Authenticated?", isAuthenticated);
  console.log("Admin Guard: Inititalized?", isInitialized);

  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (user !== null) {
    if (user.role === "admin") {
      return <React.Fragment>{children}</React.Fragment>;
    }
  }

  return <Navigate to="/sign-in" />;
}

export default AdminGuard;
