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
	// const userLoggedIn = useSelector((state) => {
	// 	return state.user;
	// });

	// console.log(userLoggedIn);
	return (
		<div>
			<BrowserRouter>
				<Routes>
					{!role && <Route path='/' element={<Navigate to='/auth/login' />} />}
					{role === "admin" && (
						<Route path='/' element={<Navigate to='/admin' />} />
					)}
					{/* {role === 'user' && <Route path='/' element={<Navigate to='/admin/*' />} />} */}

					<Route path='/auth/*' element={<Auth />} />

					{role === "admin" && <Route path='/admin/*' element={<Admin />} />}

					{role === "user" && <Route path='/' element={<User />} />}

					{/* <PrivateRoute path='/' element={<User />} /> */}

					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
