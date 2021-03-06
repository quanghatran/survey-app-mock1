import { Button, Form, Input, Modal } from "antd";
import React from "react";

export default function AddEditQuestion(props) {
	const {
		isVisible,
		onCancel,
		dataQuestion,
		handleUpdateQuestion,
		handleAddQuestion,
	} = props;

	const onFinish = (values) => {
		if (handleAddQuestion) {
			handleAddQuestion(values);
		} else if (handleUpdateQuestion) {
			handleUpdateQuestion(values);
		}
	};

	return (
		<Modal
			layout='vertical'
			title='Add Edit Question'
			visible={isVisible}
			onCancel={onCancel}
			footer={""}>
			{dataQuestion ? (
				// field for edit question
				<Form
					name='basic'
					wrapperCol={{
						span: 24,
					}}
					autoComplete='off'
					onFinish={onFinish}>
					<Form.Item
						labelCol={12}
						name='question'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='question'>
							Question
							<Input.TextArea placeholder={dataQuestion.question} />
						</label>
					</Form.Item>

					<Form.Item
						name='answer1'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer1'>
							Answer 1
							<Input placeholder={dataQuestion.answer1} />
						</label>
					</Form.Item>

					<Form.Item
						name='answer2'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer2'>
							Answer 2
							<Input placeholder={dataQuestion.answer2} />
						</label>
					</Form.Item>

					<Form.Item
						name='answer3'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer3'>
							Answer 3
							<Input placeholder={dataQuestion.answer3} />
						</label>
					</Form.Item>

					<Form.Item
						name='answer4'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer4'>
							Answer 4
							<Input placeholder={dataQuestion.answer4} />
						</label>
					</Form.Item>

					<Form.Item
						name='correctanswer'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='correctanswer'>
							Correct Answer
							<Input placeholder={dataQuestion.correctanswer} />
						</label>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 0, span: 16 }}>
						<Button type='primary' htmlType='submit'>
							Save
						</Button>
					</Form.Item>
				</Form>
			) : (
				// field for add question
				<Form
					name='basic'
					wrapperCol={{
						span: 24,
					}}
					autoComplete='off'
					onFinish={onFinish}>
					<Form.Item
						labelCol={12}
						name='question'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='question'>
							Question
							<Input.TextArea placeholder='please enter your question' />
						</label>
					</Form.Item>

					<Form.Item
						name='answer1'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer1'>
							Answer 1
							<Input placeholder='please enter your answer 1' />
						</label>
					</Form.Item>

					<Form.Item
						name='answer2'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer2'>
							Answer 2
							<Input placeholder='please enter your answer 2' />
						</label>
					</Form.Item>

					<Form.Item
						name='answer3'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer3'>
							Answer 3
							<Input placeholder='please enter your answer 3' />
						</label>
					</Form.Item>

					<Form.Item
						name='answer4'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer4'>
							Answer 4
							<Input placeholder='please enter your answer 4' />
						</label>
					</Form.Item>

					<Form.Item
						name='correctanswer'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='correctanswer'>
							Correct Answer
							<Input placeholder='please enter your correct answer' />
						</label>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 0, span: 16 }}>
						<Button type='primary' htmlType='submit'>
							Save
						</Button>
					</Form.Item>
				</Form>
			)}
		</Modal>
	);
}
