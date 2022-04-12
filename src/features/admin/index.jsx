import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../../app/authSlice";
import InfoAccount from "../../components/InfoAccount";
import TopMenu from "../../components/TopMenu";
import "./admin.scss";
import LeftMenu from "./components/LeftMenu";
import QuestionsPage from "./pages/QuestionsPage";
import UsersPage from "./pages/UsersPage";

export default function Admin() {
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
			<TopMenu userName={userName} onClickLogout={handleLogout} />
			<div className='contentWrapper'>
				<div className='leftMenu'>
					<LeftMenu />
				</div>
				<div className='contentPage'>
					<Routes>
						<Route path='/info' element={<InfoAccount />} />
						<Route path='/users' element={<UsersPage />} />
						<Route path='/questions' element={<QuestionsPage />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}
