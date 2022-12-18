import * as React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by unauthenticated users
function GuestGuard({ children }) {
  // const { isAuthenticated, isInitialized, user } = useAuth();
  const voterId = useSelector((state) => state.voters.userId);
  // console.log("guest", user);
  if (voterId === null || voterId === undefined) {
    return <Navigate to="/starting" />;
  }
  // if (isInitialized && isAuthenticated && !user.isSemaAdmin) {
  //   return <Navigate to="/" />;
  // }

  return <React.Fragment>{children}</React.Fragment>;
}

export default GuestGuard;
