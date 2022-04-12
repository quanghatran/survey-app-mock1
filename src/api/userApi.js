import { POST_REFRESH_TOKEN } from "../constants/auth";
import { CREATE_USER, GET_USERS, UPDATE_USER } from "../constants/user";
import axiosClient from "./axiosClient";

const userApi = {
	getUsers: (params) => {
		const url = GET_USERS;
		return axiosClient.get(url, { params });
	},

	createUser: async (payload) => {
		const url = CREATE_USER;
		return axiosClient.post(url, payload);
	},

	updateUser: async (id, payload) => {
		const url = `${UPDATE_USER}${id}`;
		return axiosClient.patch(url, payload);
	},

	refreshToken: async (payload) => {
		const url = POST_REFRESH_TOKEN;
		return axiosClient.post(url, payload);
	},
};

export default userApi;
