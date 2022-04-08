import { CREATE_USER, GET_USERS, UPDATE_USER } from "../constants/user";
import axiosClient from "./axiosClient";

const userApi = {
	getUsers: () => {
		const url = GET_USERS;
		return axiosClient.get(url);
	},

	createUser: async (payload) => {
		const url = CREATE_USER;
		return axiosClient.post(url, payload);
	},

	updateUser: async (id, payload) => {
		const url = `${UPDATE_USER}${id}`;
		return axiosClient.patch(url, payload);
	},
};

export default userApi;
