import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress, Box } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();


  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    sessionStorage.setItem("redirectAfterLogin", location.pathname); // Save intended path
    // Redirect to login and preserve the current location in state
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
