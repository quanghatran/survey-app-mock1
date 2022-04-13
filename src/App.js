import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./features/admin";
import Auth from "./features/auth";
import User from "./features/user";

function App() {
	const role = localStorage.getItem("role");

	return (
		<div>
			<BrowserRouter>
				<Routes>
					{/* {role === "user" && (
						<Route path='/admin/*' element={<Navigate to='/' />} />
					)}

					{role === "admin" && (
						<Route path='/*' element={<Navigate to='/admin/info' />} />
					)} */}

					<Route
						path='/admin/*'
						element={
							<PrivateRoute>
								<Admin />
							</PrivateRoute>
						}
					/>

					<Route
						path='/*'
						element={
							<PrivateRoute>
								<User />
							</PrivateRoute>
						}
					/>

					<Route path='/auth/*' element={<Auth />} />

					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
