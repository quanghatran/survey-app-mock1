import axios from "axios";
import queryString from "query-string";
import { POST_REFRESH_TOKEN } from "../constants/auth";

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

const refreshToken = async (data) => {
	const result = await axios.post(
		process.env.REACT_APP_API_URL + POST_REFRESH_TOKEN,
		data
	);

	return result.data;
};

axiosClient.interceptors.request.use(async (req) => {
	const expires = Number(new Date(localStorage.getItem("access_expires")));
	const current = Number(new Date());

	if (expires && expires <= current) {
		const data = {
			refreshToken: localStorage.getItem("refresh_token"),
		};
		const result = await refreshToken(data);

		localStorage.setItem("access_token", result.access.token);
		localStorage.setItem("access_expires", result.access.expires);
		localStorage.setItem("refresh_token", result.refresh.token);

		req.headers = {
			...req.headers,
			Authorization: `Bearer ${result.access.token}`,
		};
		return req;
	}

	req.headers = {
		...req.headers,
		Authorization: `Bearer ${localStorage.getItem("access_token")}`,
	};
	return req;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	}

	// async function handleRefreshToken(error) {
	// 	const originalConfig = error.config;
	// 	console.log(originalConfig);
	// 	console.log(originalConfig._retry);

	// 	const access_token = localStorage.getItem("access_token");
	// 	const refresh_token = localStorage.getItem("refresh_token");

	// 	const data = {
	// 		refreshToken: refresh_token,
	// 	};

	// 	if (error.response.status === 401 && !originalConfig._retry) {
	// 		originalConfig._retry = true;
	// 		const response = await refreshToken(data);

	// 		localStorage.setItem("access_token", response.access.token);
	// 		localStorage.setItem("refresh_token", response.refresh.token);
	// 		return response;
	// 	}

	// 	return Promise.reject(error);
	// }
);

export default axiosClient;
