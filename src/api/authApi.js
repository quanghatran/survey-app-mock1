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

	// refresh token
};

export default authApi;
