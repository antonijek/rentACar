import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userData } from "../context/UserContext";
import { get } from "../services/storageServices";

const AuthGuard = ({ allowedRoles, children }) => {
  const { user } = userData();
  const navigate = useNavigate();

  useEffect(() => {
    if (get("access_token")) {
      if (!user) {
        return;
      }
      if (!allowedRoles.includes(user.role_id)) {
        navigate("/restricted-area");
      }
    }
  }, [user, allowedRoles, navigate]);

  return children;
};

export default AuthGuard;
