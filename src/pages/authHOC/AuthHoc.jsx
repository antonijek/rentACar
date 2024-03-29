import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { exists } from "../../services/storageServices";

const AuthHoc = (Component) => {
  return (props) => {
    return exists("access_token") ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" replace={true} />
    );
  };
};

export default AuthHoc;
