import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Typography } from "antd";
import React from "react";

export default function InfoPage() {
	const { Meta } = Card;
	const { Title } = Typography;

	const userName = localStorage.getItem("user_name");
	const role = localStorage.getItem("role");
	const avatar = localStorage.getItem("avatar");

	return (
		<div>
			<Title level={2}>Hello {userName}!</Title>
			<Card
				style={{ width: 400 }}
				cover={
					<img
						alt='example'
						src='https://blog.richersounds.com/wp-content/uploads/2021/08/luca.jpg'
					/>
				}
				actions={[
					<SettingOutlined key='setting' />,
					<EditOutlined key='edit' />,
					<EllipsisOutlined key='ellipsis' />,
				]}>
				<Meta
					avatar={<Avatar size={64} src={avatar} alt='avatar_user' />}
					title={`UserName: ${userName}`}
					description={`Role: ${role}`}
				/>
			</Card>
		</div>
	);
}
