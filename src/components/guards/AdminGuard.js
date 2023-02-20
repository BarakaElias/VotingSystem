import * as React from "react";
import { Navigate } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";
import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by admin users
function AdminGuard({ children }) {
  const isInitializing = useAppSelector(
    (state) => state.authSlice.isInitializing
  );
  console.log("Is inititaliizng: ", isInitializing);
  console.log("Running admin guard first");
  const { isAuthenticated, isInitialized, user } = useAuth();
  console.log("Admin Guard", user);

  // if (isInitializing === false) {
  if (user === null) {
    return <Navigate to="/sign-in" />;
  }
  // console.log("admin guard", user.isSemaAdmin);

  console.log("Admin Guard: Authenticated?", isAuthenticated);
  console.log("Admin Guard: Inititalized?", isInitialized);
  console.log("Admin Guard: User: ", user);

  if (user !== null) {
    // if (user.role === "admin") {
    return <React.Fragment>{children}</React.Fragment>;
    // }
  }

  return <Navigate to="/sign-in" />;
  // } else {
  console.log("Still initializing");
  // }
}

export default AdminGuard;
