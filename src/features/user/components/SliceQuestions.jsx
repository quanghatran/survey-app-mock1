import { Button, Radio, Space, Spin, Typography } from "antd";
import React, { useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./sliceQuestions.scss";

export default function SliceQuestions(props) {
	const { Title } = Typography;
	const { listQuestion, handleSubmitAnswers, isLoading } = props;

	const [arrayAnswers, setArrayAnswers] = useState([]);

	const onChange = (e, questionId) => {
		const index = arrayAnswers.findIndex((item) => item.id === questionId);

		if (index < 0) {
			setArrayAnswers([
				...arrayAnswers,
				{
					id: questionId,
					correctanswer: e.target.value,
				},
			]);
		} else {
			const tempArr = [...arrayAnswers];

			tempArr.splice(index, 1, {
				id: questionId,
				correctanswer: e.target.value,
			});
			setArrayAnswers(tempArr);
		}
	};

	function checkValueQuestion(questionId) {
		const answer = arrayAnswers.find((answer) => answer.id === questionId);

		if (!answer) return;

		return answer.correctanswer;
	}

	const onSubmitAnswers = () => {
		handleSubmitAnswers(arrayAnswers);
	};

	return (
		<div className='sliceQuestionsWrapper'>
			<h1 className='titleSliceQuestion'>Your Mock Test</h1>
			{isLoading ? (
				<div className='sliceQuestionLoading'>
					<Spin tip='Loading...' />
				</div>
			) : (
				<Swiper
					pagination={{
						type: "fraction",
					}}
					navigation={true}
					modules={[Pagination, Navigation]}>
					{listQuestion.length > 0 &&
						listQuestion.map((question, index) => (
							<SwiperSlide key={question.id}>
								<div className='questionBox'>
									<Title level={4} type='success'>
										Question {question.id}
									</Title>
									<p className='titleQuestion'>{question.question}</p>
									<div className='listAnswer'>
										<Radio.Group
											onChange={(e) => onChange(e, question.id)}
											value={checkValueQuestion(question.id)}>
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
												onClick={(e) => onSubmitAnswers()}
												size='large'
												className='editButton'
												type='primary'
												loading={isLoading}>
												Submit
											</Button>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			)}
		</div>
	);
}
