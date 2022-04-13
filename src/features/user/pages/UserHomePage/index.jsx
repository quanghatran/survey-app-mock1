import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionsApi from "../../../../api/questionsApi";
import ResultSurvey from "../../components/ResultSurvey";
import SliceQuestions from "../../components/SliceQuestions";
import { getListQuestionByUser, userSubmitAnswers } from "../../userSlice";
import "./userHomePage.scss";

export default function UserHomePage() {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.user.loading);

	const [isDataChange, setIsDataChange] = useState(false);
	const [listQuestion, setListQuestion] = useState([]);
	const [listSubmitResult, setListSubmitResult] = useState([]);

	// get list question by user
	useEffect(() => {
		const fetchListUser = async () => {
			const params = {
				page: 1,
				limit: 1000,
			};

			try {
				const listUser = await dispatch(getListQuestionByUser(params));

				unwrapResult(listUser);

				setListQuestion(listUser.payload.results);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListUser();
	}, [dispatch, isDataChange]);

	// handle submit answers
	const handleSubmitAnswers = async (arrayAnswers) => {
		if (!arrayAnswers) return;

		try {
			const registerResult = await dispatch(userSubmitAnswers(arrayAnswers));
			const result = unwrapResult(registerResult);

			setListSubmitResult(result);
			setIsDataChange(!isDataChange);
		} catch (error) {
			console.log("failed to fetch: ", error.message);
		}
	};

	return (
		<div className='userSurveyWrapper'>
			<SliceQuestions
				isLoading={isLoading}
				listQuestion={listQuestion}
				handleSubmitAnswers={handleSubmitAnswers}
			/>
			<ResultSurvey listSubmitResult={listSubmitResult} />
		</div>
	);
}
