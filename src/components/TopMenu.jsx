import { Button, Typography } from "antd";
import React from "react";
import "./topMenu.scss";

export default function TopMenu(props) {
	const { Title } = Typography;
	const { userName, onClickLogout } = props;

	const handleClick = () => {
		onClickLogout();
	};

	return (
		<div className='topMenuWrapper'>
			<Title level={4}>
				Welcome Back{" "}
				<span className='userName'>{userName ? userName : ""}</span> !
			</Title>

			<Button onClick={handleClick} type='link' className='buttonLogout'>
				Logout
			</Button>
		</div>
	);
}
