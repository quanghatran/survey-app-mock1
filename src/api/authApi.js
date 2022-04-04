import axiosClient from "./axiosClient";

const authApi = {
	register: (payload) => {
		const url = "/v1/auth/register";
		return axiosClient.post(url, { payload });
	},

	login: (payload) => {
		const url = "/v1/auth/login";
		return axiosClient.post(url, { payload });
	},

	logout: async (payload) => {
		const url = "/v1/auth/logout";
		return axiosClient.post(url, payload);
	},

	// refresh token
};

export default authApi;
