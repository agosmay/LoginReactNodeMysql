import React , { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../auth/context/AuthContext'

export const PublicRoute = ({ children, url }) => {
	
	

	const { isAuth, setIsAuth } = useContext(AuthContext);

  if (isAuth) {
    return <Navigate to={url} />;
  }
  return children;
};