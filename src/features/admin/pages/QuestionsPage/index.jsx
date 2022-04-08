import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Radio, Space, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionsApi from "../../../../api/questionsApi";
import PopupConfirm from "../../../../components/PopupConfirm";
import "./questionsPage.scss";
import { getListQuestion } from "../../adminSlice";
import AddEditQuestion from "./AddEditQuestion";

export default function QuestionsPage(props) {
	const dispatch = useDispatch();

	const { Title } = Typography;

	const [listQuestion, setListQuestion] = useState([]);
	const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
	const [clickedAddEditId, setClickedAddEditId] = useState("");
	const [clickedDeleteId, setClickedDeleteIdId] = useState("");
	const [dataQuestion, setDataQuestion] = useState({});
	const [isDataChange, setIsDataChange] = useState(false);

	const isLoading = useSelector((state) => state.admin.loading);

	const handleAddEditCancel = () => {
		setIsModalAddEditVisible(false);
	};

	const handleDeleteCancel = () => {
		setIsModalDeleteVisible(false);
	};

	const onClickEdit = (idQuestion) => {
		setIsModalAddEditVisible(true);
		setClickedAddEditId(idQuestion);
	};

	const onClickDelete = (idQuestion) => {
		setIsModalDeleteVisible(true);
		setClickedDeleteIdId(idQuestion);
	};

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
	}, [dispatch, isDataChange]);

	// get question by id
	useEffect(() => {
		const getQuestionById = async () => {
			try {
				const response = await questionsApi.adminGetQuestionById(
					clickedAddEditId
				);
				await setDataQuestion(response);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};
		getQuestionById();
	}, [clickedAddEditId, isDataChange]);

	// handle update question
	const handleUpdateQuestion = async (values) => {
		try {
			await questionsApi.adminUpdateQuestion(clickedAddEditId, values);
			setIsDataChange(!isDataChange);
			setIsModalAddEditVisible(false);
		} catch (error) {
			console.log("failed to fetch product list: ", error);
		}
	};

	// handle add question
	const handleAddQuestion = async (values) => {
		try {
			await questionsApi.adminCreateQuestion(values);
			setIsDataChange(!isDataChange);
			setIsModalAddEditVisible(false);
		} catch (error) {
			console.log("failed to fetch product list: ", error);
		}
	};

	// handle delete question
	const handleOkDelete = async (id) => {
		try {
			await questionsApi.adminDeleteQuestion(id);
			setIsDataChange(!isDataChange);
			setIsModalDeleteVisible(false);
		} catch (error) {
			console.log("failed to fetch product list: ", error);
		}
	};

	const handleOpenAddQuestion = () => {
		setIsModalAddEditVisible(true);
	};

	return (
		<div className='container'>
			<Button
				onClick={handleOpenAddQuestion}
				className='buttonAddQuestion'
				type='primary'>
				Add Question
			</Button>

			{isLoading ? (
				<div>
					<Spin tip='Loading...' />
				</div>
			) : (
				<div className='questionWrapper'>
					{listQuestion &&
						listQuestion.map((question, index) => (
							<div className='questionBox' key={question.id}>
								<Title level={4} type='success'>
									Question {index + 1}
								</Title>
								<p>{question.question}</p>
								<div className='listAnswer'>
									<Radio.Group
										disabled
										// onChange={this.onChange}
										value={question.correctanswer}>
										<Space direction='vertical'>
											<Radio value={question.answer1}>{question.answer1}</Radio>
											<Radio value={question.answer2}>{question.answer2}</Radio>
											<Radio value={question.answer3}>{question.answer3}</Radio>
											<Radio value={question.answer4}>{question.answer4}</Radio>
										</Space>
									</Radio.Group>
								</div>

								<div className='buttonQuestionsWrapper'>
									<Button
										onClick={(e) => {
											onClickEdit(question.id);
										}}
										className='editButton'
										type='primary'>
										Edit
									</Button>
									<Button
										onClick={(e) => {
											onClickDelete(question.id);
										}}
										className='deleteButton'
										type='primary'
										danger>
										Delete
									</Button>
								</div>

								{/* modal add edit */}
								{question.id === clickedAddEditId && (
									<AddEditQuestion
										isVisible={isModalAddEditVisible}
										onCancel={handleAddEditCancel}
										idQuestion={question.id}
										dataQuestion={dataQuestion}
										handleUpdateQuestion={handleUpdateQuestion}
									/>
								)}

								{/* modal popup confirm */}
								{question.id === clickedDeleteId && (
									<PopupConfirm
										isVisible={isModalDeleteVisible}
										idQuestion={question.id}
										onCancel={handleDeleteCancel}
										handleOkDelete={handleOkDelete}
										messagePopup='want to delete this question ?'
									/>
								)}
								<br />
							</div>
						))}
					<AddEditQuestion
						isVisible={isModalAddEditVisible}
						onCancel={handleAddEditCancel}
						handleAddQuestion={handleAddQuestion}
					/>
				</div>
			)}
			{!listQuestion && (
				<div>
					<Title level={4}>
						Dose not have any question yet! Create a new one ?
					</Title>
				</div>
			)}
		</div>
	);
}
