import React from "react";
import { Radio, Space, Typography } from "antd";

export default function ListQuestion(props) {
	const { listQuestion } = props;

	const { results } = listQuestion;

	const { Title } = Typography;

	console.log(results);

	return (
		<div>
			{results.map((question, index) => (
				<div key={question.id}>
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
					<br />
				</div>
			))}
		</div>
	);
}
