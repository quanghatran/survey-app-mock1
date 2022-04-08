import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, List, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../../api/userApi";
import { getListUser } from "../../adminSlice";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import "./userPage.scss";

export default function UsersPage() {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.admin.loading);

	const [listUser, setListUser] = useState([]);
	const [isDataChange, setIsDataChange] = useState(false);
	const [isModalEditVisible, setIsModalEditVisible] = useState(false);
	const [isModalAddVisible, setIsModalAddVisible] = useState(false);
	const [clickEditUser, setClickEditUser] = useState("");

	const handleAddCancel = () => {
		setIsModalAddVisible(false);
	};

	const handleOpenAddUser = () => {
		setIsModalAddVisible(true);
	};

	const onClickEdit = (idUser) => {
		setIsModalEditVisible(true);
		setClickEditUser(idUser);
	};

	const handleEditCancel = () => {
		setIsModalEditVisible(false);
	};

	// get list user by admin
	useEffect(() => {
		const fetchListUser = async () => {
			try {
				const listUser = await dispatch(getListUser());

				unwrapResult(listUser);

				setListUser(listUser.payload.results);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListUser();
	}, [dispatch, isDataChange]);

	// handle update avatar user
	const handleUpdateUser = async (urlAvatar) => {
		try {
			await userApi.updateUser(clickEditUser, urlAvatar);
			setIsDataChange(!isDataChange);
			setIsModalEditVisible(false);
		} catch (error) {
			console.log("failed to fetch product list: ", error);
		}
	};

	// create new user
	const handleAddUser = async (dataUser) => {
		try {
			await userApi.createUser(dataUser);
			setIsDataChange(!isDataChange);
			setIsModalAddVisible(false);
		} catch (error) {
			console.log("failed to fetch product list: ", error);
		}
	};

	return (
		<div className='userContainer'>
			<Button
				onClick={handleOpenAddUser}
				className='buttonAddUser'
				type='primary'>
				Add User
			</Button>
			{isLoading && (
				<div>
					<Spin tip='Loading...' />
				</div>
			)}

			{listUser.length > 0 && (
				<List
					grid={{
						gutter: 12,
						xs: 1,
						sm: 2,
						lg: 3,
					}}
					dataSource={listUser}
					renderItem={(user) => (
						<List.Item className='boxUser'>
							<Card
								title={
									<div className='userCard'>
										<div className='userTitle'>
											<p>{user.username}</p>
											<p>{user.role}</p>
										</div>
										<img
											className='userAvatar'
											src={user.avatar}
											alt='user-avatar'
										/>
									</div>
								}>
								<div className='userDetail'>
									<p>
										<b>Score: </b> {user.score}
									</p>
									<p>
										<b>Email: </b>
										{user.email}
									</p>
									<p>
										<b>Validate Email: </b>{" "}
										{user.isEmailVerified === true ? (
											<span
												style={{
													marginLeft: "0.5rem",
													fontWeight: "bold",
													color: "green",
												}}>
												YES
											</span>
										) : (
											<span
												style={{
													marginLeft: "0.5rem",
													fontWeight: "bold",
													color: "red",
												}}>
												NO
											</span>
										)}
									</p>
								</div>

								<div className='buttonWrapper'>
									<Button className='deleteButton' danger disabled ghost>
										Delete
									</Button>

									<Button
										onClick={(e) => {
											onClickEdit(user.id);
										}}
										ghost
										type='primary'
										className='editButton'>
										Edit
									</Button>
								</div>

								{/* modal edit user*/}
								{user.id === clickEditUser && (
									<UpdateUser
										isVisible={isModalEditVisible}
										onCancel={handleEditCancel}
										dataUser={user}
										handleUpdateUser={handleUpdateUser}
									/>
								)}
							</Card>
						</List.Item>
					)}
				/>
			)}
			{/* modal add user*/}
			<AddUser
				isVisible={isModalAddVisible}
				onCancel={handleAddCancel}
				handleAddUser={handleAddUser}
			/>
		</div>
	);
}
