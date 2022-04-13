import { Button, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./topMenu.scss";

export default function TopMenu(props) {
	const { Title } = Typography;
	const { userName, onClickLogout, topLinks } = props;

	const isLoading = useSelector((state) => state.auth.loading);

	const handleClick = () => {
		onClickLogout();
	};

	return (
		<div className='topMenuWrapper'>
			<Title level={4}>
				Welcome Back{" "}
				<span className='userName'>{userName ? userName : ""}</span> !
			</Title>

			{topLinks &&
				topLinks.map((link) => (
					<Button type='link' className='topMenuButton' key={link.id}>
						<Link to={link.href}>{link.title}</Link>
					</Button>
				))}

			<Button
				onClick={handleClick}
				type='link'
				className='topMenuButton'
				disabled={isLoading}>
				Logout
			</Button>
		</div>
	);
}
