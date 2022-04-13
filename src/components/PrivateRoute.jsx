import React from "react";
import { Navigate, Route } from "react-router-dom";

export default function PrivateRoute(props) {
	const isLoggedIn = Boolean(localStorage.getItem("access_token"));

	if (!isLoggedIn) return <Navigate to='/auth/login' replace />;

	return <Route {...props} />;
}
