import { unwrapResult } from "@reduxjs/toolkit";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionsApi from "../../../../api/questionsApi";
import { getListQuestion } from "../../adminSlice";
import ListQuestion from "./ListQuestion";

export default function QuestionsPage() {
	const dispatch = useDispatch();

	const [listQuestion, setListQuestion] = useState([]);

	const isLoading = useSelector((state) => state.admin.loading);

	// get list question by admin
	useEffect(() => {
		const fetchListQuestion = async () => {
			try {
				const listQuestion = await dispatch(getListQuestion());

				unwrapResult(listQuestion);

				setListQuestion(listQuestion.payload.results);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListQuestion();
	}, [dispatch]);

	return (
		<div>
			{!isLoading ? (
				<ListQuestion listQuestion={listQuestion} />
			) : (
				<Spin tip='Loading...' />
			)}
		</div>
	);
}
