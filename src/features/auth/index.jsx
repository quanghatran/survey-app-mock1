import { Typography } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../components/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./auth.scss";
import ForgotPassword from "./pages/ForgotPassword";
import { useDispatch } from "react-redux";
import { login } from "../../app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function AuthComponent() {
	const { Title } = Typography;
	const dispatch = useDispatch();

	const handleLogin = async (values) => {
		if (!values) return;

		try {
			const payload = {
				username: values.username,
				password: values.password,
			};

			const loginResult = await dispatch(login(payload));
			unwrapResult(loginResult);

			console.log(loginResult);

			//  // Usually, we have a getMe() endpoint to fully fetch all information needed for current logged in user
			//  const getMeResult = await dispatch(getMe());
			//  const loggedInUser = unwrapResult(resultAction); // MUST HAVE THIS LINE TO CATCH ERROR
			//  console.log({loggedInUser});

			// history.push('/success-url-after-sign-in');
		} catch (error) {
			console.log("Failed to sign in : ", error);
		}
	};

	const handleRegister = (value) => {
		console.log(value);
	};

	return (
		<div className='wrapperForm'>
			<Title>Welcome To Survey App</Title>

			<Routes>
				<Route
					path='/login'
					element={<Login namePage='Login Page' onLoginFinish={handleLogin} />}
				/>
				<Route
					path='/register'
					element={
						<Register
							namePage='Register Page'
							onRegisterFinish={handleRegister}
						/>
					}
				/>
				<Route
					path='/forgotPassword'
					element={<ForgotPassword namePage='Forgot Password Page' />}
				/>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}
