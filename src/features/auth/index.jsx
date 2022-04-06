import { unwrapResult } from "@reduxjs/toolkit";
import { Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { login, register } from "../../app/userSlice";
import NotFound from "../../components/NotFound";
import "./auth.scss";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function Auth() {
	const { Title } = Typography;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector((state) => state.user.loading);

	const handleLogin = async (values) => {
		if (!values) return;

		try {
			const payload = {
				username: values.username,
				password: values.password,
			};

			const loginResult = await dispatch(login(payload));
			const result = unwrapResult(loginResult);

			console.log("result: ", result);

			// Usually, we have a getMe() endpoint to fully fetch all information needed for current logged in user
			//  const getMeResult = await dispatch(getMe());
			//  const loggedInUser = unwrapResult(resultAction); // MUST HAVE THIS LINE TO CATCH ERROR

			const role = result.role;

			if (role === "admin") {
				navigate("/admin/users");
			} else if (role === "user") {
				navigate("/");
			}
		} catch (error) {
			console.log("failed to fetch: ", error.message);
			// toast.error(error.message, {
			// 	position: "top-right",
			// 	autoClose: 1500,
			// 	hideProgressBar: false,
			// 	closeOnClick: true,
			// 	pauseOnHover: true,
			// 	draggable: true,
			// 	progress: undefined,
			// });
		}
	};

	const handleRegister = async (values) => {
		if (!values) return;

		try {
			const payload = {
				email: values.email,
				username: values.username,
				password: values.password,
			};

			const registerResult = await dispatch(register(payload));
			const result = unwrapResult(registerResult);

			console.log("result: ", result);

			const role = result.role;

			if (role === "admin") {
				navigate("/admin/users");
			} else if (role === "user") {
				navigate("/");
			}
		} catch (error) {
			console.log("failed to fetch: ", error.message);
		}
	};

	return (
		<div className='wrapperForm'>
			{/* <Toaster /> */}
			<Title>Welcome To Survey App</Title>

			<Routes>
				<Route
					path='/login'
					element={
						<Login
							namePage='Login Page'
							isLoadingLogging={isLoading}
							onLoginFinish={handleLogin}
						/>
					}
				/>
				<Route
					path='/register'
					element={
						<Register
							namePage='Register Page'
							isLoadingRegister={isLoading}
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
