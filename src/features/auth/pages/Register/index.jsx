import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
// import "./login.scss";

export default function Login(props) {
	const { Title } = Typography;
	const { namePage, onRegisterFinish } = props;

	const onFinish = (values) => {
		onRegisterFinish(values);
	};

	return (
		<div className='registerWrapper'>
			<Title className='namePage' level={3}>
				{namePage}
			</Title>

			<Form name='normal_register' className='login-form' onFinish={onFinish}>
				<Form.Item
					name='email'
					rules={[
						{
							required: true,
							message: "Please input your Email!",
						},
					]}>
					<Input
						prefix={<MailOutlined className='site-form-item-icon' />}
						type='email'
						placeholder='Email'
					/>
				</Form.Item>
				<Form.Item
					name='username'
					rules={[
						{
							required: true,
							message: "Please input your Username!",
						},
					]}>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Username'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}>
					<Input.Password
						prefix={<LockOutlined className='site-form-item-icon' />}
						placeholder='Password'
					/>
				</Form.Item>
				<Form.Item
					name='retypePassword'
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}>
					<Input.Password
						prefix={<LockOutlined className='site-form-item-icon' />}
						placeholder='Retype Password'
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'>
						Register
					</Button>
					<span className='optionRegister'>
						{/* Or <a href=''>register now!</a> */}
						<NavLink to='/auth/login'>Already have an account?</NavLink>
					</span>
				</Form.Item>
			</Form>
		</div>
	);
}
