import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const token = await localStorage.getItem("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// handle fetch refresh token to get new access token
		// async function (error) {
		// 	const originalRequest = error.config;
		// 	if (error.response.status === 401 && !originalRequest._retry) {
		// 		originalRequest._retry = true;
		// 		const access_token = await refreshAccessToken();
		// 		axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
		// 		return axiosClient(originalRequest);
		// 	}
		// 	return Promise.reject(error);
		// }

		// handle error here
		throw Error;
	}
);

export default axiosClient;
