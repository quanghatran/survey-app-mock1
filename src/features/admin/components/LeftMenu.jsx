import {
	QuestionCircleOutlined,
	SettingOutlined,
	UserOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftMenu.scss";

export default function LefMenu() {
	const { SubMenu } = Menu;

	return (
		<div className='menuWrapper'>
			<Menu
				className='listMenu'
				defaultSelectedKeys={["3"]}
				defaultOpenKeys={["users", "questions"]}
				mode='inline'>
				<SubMenu key='account' icon={<SettingOutlined />} title='Account'>
					<Menu.Item key='1'>Information</Menu.Item>
					<Menu.Item key='2'>Edit</Menu.Item>
				</SubMenu>

				<SubMenu key='users' icon={<UserOutlined />} title='Users Management'>
					<Menu.Item key='3'>
						<Link to='/admin/users'> Show List User</Link>
					</Menu.Item>
					<Menu.Item key='4'>
						<Link to='/admin/users/create'> Create User</Link>
					</Menu.Item>
				</SubMenu>

				<SubMenu
					key='questions'
					icon={<QuestionCircleOutlined />}
					title='Questions Management'>
					<Menu.Item key='5'>
						<Link to='/admin/questions'>Show List Question</Link>
					</Menu.Item>
					<Menu.Item key='6'>Create Question</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
}
