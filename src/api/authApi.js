import { POST_LOGIN, POST_LOGOUT, POST_REGISTER } from "../constants/auth";
import axiosClient from "./axiosClient";

const authApi = {
	register: (payload) => {
		const url = POST_REGISTER;
		return axiosClient.post(url, payload);
	},

	login: (payload) => {
		const url = POST_LOGIN;
		return axiosClient.post(url, payload);
	},

	logout: async (payload) => {
		const url = POST_LOGOUT;
		return axiosClient.post(url, payload);
	},

	// refreshToken: async (payload) => {
	// 	const url = POST_REFRESH_TOKEN;
	// 	return axiosClient.post(url, payload);
	// },
};

export default authApi;
