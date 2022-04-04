import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
// import "./login.scss";

export default function ForgotPassword(props) {
	const { Title } = Typography;
	const { namePage } = props;

	return (
		<div className='forgotPasswordWrapper'>
			<Title className='namePage' level={3}>
				{namePage}
			</Title>

			<span className='optionRegister'>
				{/* Or <a href=''>register now!</a> */}
				<NavLink to='/auth/login'>Back to login page?</NavLink>
			</span>
		</div>
	);
}
