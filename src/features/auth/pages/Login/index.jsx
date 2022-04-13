import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin, Typography } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import "./login.scss";

export default function Login(props) {
	const { Title } = Typography;
	const { namePage, onLoginFinish, isLoadingLogging } = props;

	const onFinish = (values) => {
		onLoginFinish(values);
	};

	return (
		<div className='loginWrapper'>
			<Title className='namePage' level={3}>
				{namePage}
			</Title>

			<Form
				name='normal_login'
				className='login-form'
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}>
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
				<Form.Item>
					<Form.Item name='remember' valuePropName='checked' noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<NavLink className='login-form-forgot' to='/auth/forgotPassword'>
						Forgot password
					</NavLink>
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
						loading={isLoadingLogging}>
						Log in
					</Button>
					<span className='optionRegister'>
						<NavLink to='/auth/register'>register now!</NavLink>
					</span>
				</Form.Item>
			</Form>
		</div>
	);
}
