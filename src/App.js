import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import NotFound from "./components/NotFound";
import AuthComponent from "./features/auth";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					{/* if user logged in -> navigate to home page, else -> navigate to login page */}
					<Route path='/' element={<Navigate to='/auth/login' />} />
					<Route path='/auth/*' element={<AuthComponent />} />

					{/* <PrivateRoute path='/' element={<User />} /> */}
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
