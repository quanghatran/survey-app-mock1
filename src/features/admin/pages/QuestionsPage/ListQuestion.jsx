import { Button, Radio, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import questionsApi from "../../../../api/questionsApi";
import PopupConfirm from "../../../../components/PopupConfirm";
import AddEditQuestion from "../../components/AddEditQuestion";
import "./listQuestion.scss";

export default function ListQuestion(props) {
	const { listQuestion } = props;
	const { Title } = Typography;

	const [isModalAddEditVisible, setIsModalAddEditVisible] = useState(false);
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
	const [clickedAddEditId, setClickedAddEditId] = useState("");
	const [clickedDeleteId, setClickedDeleteIdId] = useState("");
	const [dataQuestion, setDataQuestion] = useState({});
	const [isDataChange, setIsDataChange] = useState(false);

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

	// handle add update question
	const handleAddUpdateQuestion = async (values) => {
		try {
			await questionsApi.adminUpdateQuestion(clickedAddEditId, values);
			setIsDataChange(!isDataChange);
			setIsModalAddEditVisible(false);
		} catch (error) {
			console.log("failed to fetch product list: ", error);
		}
	};

	// handle add update question
	const handleOkDelete = async (id) => {
		try {
			await questionsApi.adminDeleteQuestion(id);
			setIsDataChange(!isDataChange);
			setIsModalDeleteVisible(false);
		} catch (error) {
			console.log("failed to fetch product list: ", error);
		}
	};

	return (
		<div>
			{listQuestion &&
				listQuestion.map((question, index) => (
					<div className='container' key={question.id}>
						<div className='questionsWrapper'>
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

							<div className='buttonWrapper'>
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
									handleAddUpdateQuestion={handleAddUpdateQuestion}
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
						</div>
						<br />
					</div>
				))}

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
