import {
	QuestionCircleOutlined,
	SettingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./LeftMenu.scss";

export default function LefMenu() {
	return (
		<div className='menuWrapper'>
			<Menu
				className='listMenu'
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["account"]}
				mode='inline'>
				<Menu.Item key='1' icon={<SettingOutlined />}>
					<Link to='/admin/info'> Account</Link>
				</Menu.Item>

				<Menu.Item key='2' icon={<UserOutlined />}>
					<Link to='/admin/users'> Users Management</Link>
				</Menu.Item>

				<Menu.Item key='3' icon={<QuestionCircleOutlined />}>
					<Link to='/admin/questions'>Questions Management</Link>
				</Menu.Item>
			</Menu>
		</div>
	);
}
