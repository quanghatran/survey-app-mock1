import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../../app/authSlice";
import InfoAccount from "../../components/InfoAccount";
import TopMenu from "../../components/TopMenu";
import { MENU_USER } from "../../constants/menuUser";
import ResultPage from "./pages/ResultPage";
import UserHomePage from "./pages/UserHomePage";
import "./user.scss";

export default function User() {
	const userName = localStorage.getItem("user_name");
	const refreshToken = localStorage.getItem("refresh_token");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const payload = {
				refreshToken,
			};

			const logoutResult = await dispatch(logout(payload));
			unwrapResult(logoutResult);

			localStorage.clear();

			navigate("/auth/login");
		} catch (error) {
			console.log("failed to fetch: ", error.message);
		}
	};

	return (
		<div className='adminPageWrapper'>
			<TopMenu
				userName={userName}
				topLinks={MENU_USER}
				onClickLogout={handleLogout}
			/>

			<div className='userContentWrapper'>
				<Routes>
					<Route index element={<UserHomePage />} />
					<Route path='/result' element={<ResultPage />} />
					<Route path='/info' element={<InfoAccount />} />
				</Routes>
			</div>
		</div>
	);
}
