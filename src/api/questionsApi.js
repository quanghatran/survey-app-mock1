import {
	CREATE_QUESTION,
	DELETE_QUESTION,
	GET_QUESTIONS_ADMIN,
	GET_QUESTIONS_BY_ID_ADMIN,
	GET_QUESTIONS_USER,
	SUBMIT_ANSWERS_USER,
	UPDATE_QUESTION,
} from "../constants/questions";
import axiosClient from "./axiosClient";

const questionsApi = {
	userGetQuestions: () => {
		const url = GET_QUESTIONS_USER;
		return axiosClient.get(url);
	},

	userSubmitAnswers: (payload) => {
		const url = SUBMIT_ANSWERS_USER;
		return axiosClient.post(url, payload);
	},

	adminCreateQuestion: async (payload) => {
		const url = CREATE_QUESTION;
		return axiosClient.post(url, payload);
	},

	adminUpdateQuestion: async (payload, id) => {
		const url = `${UPDATE_QUESTION}${id}`;

		console.log(url);
		return axiosClient.patch(url, payload);
	},

	adminDeleteQuestion: async (payload, id) => {
		const url = `${DELETE_QUESTION}${id}`;
		return axiosClient.delete(url, payload);
	},

	adminGetQuestions: async (payload) => {
		const url = GET_QUESTIONS_ADMIN;
		return axiosClient.get(url, payload);
	},

	adminGetQuestionById: async (payload, id) => {
		const url = `${GET_QUESTIONS_BY_ID_ADMIN}${id}`;
		return axiosClient.get(url, payload);
	},
};

export default questionsApi;
