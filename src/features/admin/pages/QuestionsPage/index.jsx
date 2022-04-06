import React, { useEffect, useState } from "react";
import questionsApi from "../../../../api/questionsApi";
import ListQuestion from "./ListQuestion";

export default function QuestionsPage() {
	const [isDataChange, setIsDataChange] = useState(false);
	const [listQuestion, setListQuestion] = useState({});

	// get list question by admin
	useEffect(() => {
		const fetchListQuestion = async () => {
			try {
				const response = await questionsApi.adminGetQuestions();

				setListQuestion(response);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListQuestion();
	}, [isDataChange]);

	return (
		<div>
			<ListQuestion listQuestion={listQuestion} />
		</div>
	);
}
