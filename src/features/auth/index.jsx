import { unwrapResult } from "@reduxjs/toolkit";
import { Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login, register } from "../../app/authSlice";
import NotFound from "../../components/NotFound";
import "./auth.scss";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function Auth() {
	const { Title } = Typography;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector((state) => state.auth.loading);

	const handleLogin = async (values) => {
		if (!values) return;

		try {
			const payload = {
				username: values.username,
				password: values.password,
			};

			const loginResult = await dispatch(login(payload));
			const result = unwrapResult(loginResult);

			if (result.role === "admin") {
				navigate("/admin/info");
			} else if (result.role === "user") {
				navigate("/");
			}
		} catch (error) {
			toast.error("Incorrect Username or Password!", {
				position: "top-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
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

			if (result.role === "admin") {
				navigate("/admin/info");
			} else if (result.role === "user") {
				navigate("/");
			}
		} catch (error) {
			toast.error("Failed To Register, Please Try Again!", {
				position: "top-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<div className='wrapperForm'>
			<ToastContainer />
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
