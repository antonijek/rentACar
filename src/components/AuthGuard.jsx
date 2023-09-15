import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../context/UserContext";
import { Page404 } from "./page404/Page404";

const AuthGuard = (Component) => {
  console.log("ovo je guard");

  const { user } = userData();
  const navigate = useNavigate();
  return (props) => {
    return user.role_id === 1 ? <Component {...props} /> : <Page404 />;
  };
};

export default AuthGuard;
