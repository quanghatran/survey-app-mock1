import { Button, Form, Input, Modal } from "antd";
import React from "react";

export default function UpdateUser(props) {
	const { isVisible, onCancel, dataUser, handleUpdateUser } = props;

	const onFinish = (values) => {
		handleUpdateUser(values);
	};

	return (
		<Modal
			layout='vertical'
			title='Create User'
			visible={isVisible}
			onCancel={onCancel}
			footer={""}>
			{dataUser && (
				<Form
					name='basic'
					wrapperCol={{
						span: 24,
					}}
					autoComplete='off'
					onFinish={onFinish}>
					<Form.Item
						name='avatar'
						rules={[
							{
								required: true,
								message: "required!",
							},
						]}>
						<label htmlFor='answer1'>
							Avatar
							<Input placeholder={dataUser.avatar ? dataUser.avatar : ""} />
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
