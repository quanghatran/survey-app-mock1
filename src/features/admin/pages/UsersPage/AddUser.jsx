import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

export default function AddUser(props) {
	const { isVisible, onCancel, handleAddUser } = props;
	const [role, setRole] = useState("user");

	const { Option } = Select;

	function handleChange(value) {
		setRole(value);
	}

	const onFinish = (values) => {
		handleAddUser({ ...values, role: role });
	};

	return (
		<Modal
			layout='vertical'
			title='Add User'
			visible={isVisible}
			onCancel={onCancel}
			footer={""}>
			<Form
				name='basic'
				wrapperCol={{
					span: 24,
				}}
				autoComplete='off'
				onFinish={onFinish}>
				<Form.Item
					name='username'
					rules={[
						{
							required: true,
							message: "required!",
						},
					]}>
					<label htmlFor='username'>
						User Name
						<Input placeholder='username' />
					</label>
				</Form.Item>

				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: "required!",
						},
					]}>
					<label htmlFor='password'>
						Password
						<Form.Item
							style={{ marginBottom: "0" }}
							name='password'
							rules={[
								{
									required: true,
									message: "Please input your Password!",
								},
							]}>
							<Input.Password placeholder='password' />
						</Form.Item>
					</label>
				</Form.Item>

				<Form.Item
					name='email'
					rules={[
						{
							required: true,
							message: "required!",
						},
					]}>
					<label htmlFor='email'>
						Email
						<Input type='email' placeholder='email' />
					</label>
				</Form.Item>

				<Form.Item name='role'>
					<label htmlFor='role'>
						Role
						<div>
							<Select defaultValue='user' onChange={handleChange}>
								<Option value='user'>User</Option>
								<Option value='admin'>Admin</Option>
							</Select>
						</div>
					</label>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 0, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Create
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
