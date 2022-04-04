import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function PrivateRoute(props) {
	// check if user is logged in
	// if yes -> show route
	// otherwise, redirect to logging page
	const isLoggedIn = Boolean(localStorage.getItem("access_token"));

	if (isLoggedIn) return <Navigate to='/sign-in' replace />;

	return <Route {...props} />;
}
