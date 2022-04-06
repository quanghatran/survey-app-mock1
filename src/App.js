import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import NotFound from "./components/NotFound";
import Admin from "./features/admin";
import Auth from "./features/auth";
import User from "./features/user";

function App() {
	const role = localStorage.getItem("role");

	return (
		<div>
			<BrowserRouter>
				<Routes>
					{!role && <Route path='/' element={<Navigate to='/auth/login' />} />}
					{role === "admin" && (
						<Route path='/' element={<Navigate to='/admin/user' />} />
					)}

					<Route path='/auth/*' element={<Auth />} />

					<Route path='/admin/*' element={<Admin />} />

					<Route path='/' element={<User />} />

					{/* <PrivateRoute path='/' element={<User />} /> */}

					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
