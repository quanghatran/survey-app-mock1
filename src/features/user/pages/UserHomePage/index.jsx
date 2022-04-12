import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ResultSurvey from "../../components/ResultSurvey";
import SliceQuestions from "../../components/SliceQuestions";
import { getListQuestionByUser } from "../../userSlice";
import "./userHomePage.scss";

export default function UserHomePage() {
	const dispatch = useDispatch();

	const [isDataChange, setIsDataChange] = useState(false);
	const [listQuestion, setListQuestion] = useState([]);

	const [pagination, setPagination] = useState({
		page: 1,
		limit: null,
		totalPage: null,
		totalResults: null,
	});

	// const isLoading = useSelector((state) => state.admin.loading);

	// get list question by user
	useEffect(() => {
		const fetchListUser = async () => {
			const params = {
				page: 1,
			};

			try {
				const listUser = await dispatch(getListQuestionByUser(params));

				unwrapResult(listUser);

				setPagination({
					page: listUser.payload.page,
					limit: listUser.payload.limit,
					totalPage: listUser.payload.totalPages,
					totalResults: listUser.payload.totalResults,
				});

				setListQuestion(listUser.payload.results);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListUser();
	}, [dispatch, isDataChange]);

	return (
		<div className='userSurveyWrapper'>
			<SliceQuestions listQuestion={listQuestion} />
			<ResultSurvey />
		</div>
	);
}
