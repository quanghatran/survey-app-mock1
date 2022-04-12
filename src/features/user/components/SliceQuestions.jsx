import { RightOutlined } from "@ant-design/icons";
import { Button, Radio, Space, Typography } from "antd";
import React, { useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./sliceQuestions.scss";

export default function SliceQuestions(props) {
	const { Title } = Typography;
	const { listQuestion } = props;

	const [isDisabled, setIsDisabled] = useState(true);
	const [arrayAnswers, setArrayAnswers] = useState([]);
	const [clickedId, setClickedId] = useState("");

	const onChange = (e, questionId) => {
		setIsDisabled(false);
		setClickedId(questionId);

		setArrayAnswers([
			...arrayAnswers,
			{
				id: questionId,
				correctanswer: e.target.value,
			},
		]);
	};

	const handleClearChoice = () => {
		setIsDisabled(true);
	};

	// function checkIdQuestion(arrayAnswers) {
	// 	if (arrayAnswers.length < 0) return;

	// 	arrayAnswers.map((answer) => {
	// 		console.log(answer.id);
	// 		return answer.id;
	// 	});
	// }

	function checkValueQuestion(questionId, arrayAnswers) {
		if (arrayAnswers.length < 0) return;

		// arrayAnswers.map((answer) => {
		// 	if (questionId === answer.id) {
		// 		return answer.correctanswer;
		// 	}
		// });

		for (let i = 0; i < arrayAnswers.length; i++) {
			if (questionId === arrayAnswers[i].id) {
				console.log(arrayAnswers[i].correctanswer);
				return arrayAnswers[i].correctanswer;
			}
		}
	}

	console.log(arrayAnswers);
	console.log(clickedId);

	return (
		<>
			<Swiper
				pagination={{
					type: "fraction",
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				className='sliceQuestionsWrapper'>
				{listQuestion.length > 0 &&
					listQuestion.map((question, index) => (
						<SwiperSlide key={question.id}>
							<div className='questionBox'>
								<Title level={4} type='success'>
									Question {index + 1}
								</Title>
								<p className='titleQuestion'>{question.question}</p>
								<div className='listAnswer'>
									<Radio.Group
										onChange={(e) => onChange(e, question.id)}
										value={
											question.id === clickedId
												? checkValueQuestion(question.id, arrayAnswers)
												: ""
										}>
										<Space className='listSelections' direction='vertical'>
											<div className='groupSelection'>
												<Radio value={question.answer1}>
													{question.answer1}
												</Radio>
												<Radio value={question.answer2}>
													{question.answer2}
												</Radio>
											</div>
											<div className='groupSelection'>
												<Radio value={question.answer3}>
													{question.answer3}
												</Radio>
												<Radio value={question.answer4}>
													{question.answer4}
												</Radio>
											</div>
										</Space>
									</Radio.Group>

									<div className='buttonUserQuestionsWrapper'>
										<Button
											onClick={(e) => handleClearChoice()}
											disabled={isDisabled}
											size='large'
											className='editButton'
											type='primary'
											danger
											ghost>
											Clear Choice
										</Button>
										{/* <Button size='large' className='nextButton' type='primary'>
									Next <RightOutlined />
								</Button> */}
									</div>
								</div>

								{/* modal popup confirm */}
							</div>
						</SwiperSlide>
					))}
			</Swiper>
		</>
	);
}
