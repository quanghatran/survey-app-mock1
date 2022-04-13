import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionsApi from "../../api/questionsApi";
import userApi from "../../api/userApi";

export const getListQuestionByUser = createAsyncThunk(
	"user/getListQuestion",
	async (params) => {
		const response = await questionsApi.userGetQuestions(params);
		return response;
	}
);

export const userSubmitAnswers = createAsyncThunk(
	"user/userSubmitAnswers",
	async (params, thunkAPI) => {
		const response = await questionsApi.userSubmitAnswers(params);

		return response;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		current: {},
		loading: false,
		error: "",
	},
	reducers: {},
	extraReducers: {
		// handle get list question
		[getListQuestionByUser.pending]: (state) => {
			state.loading = true;
		},
		[getListQuestionByUser.fulfilled]: (state, action) => {
			state.error = "";
			state.loading = false;
			state.current = action.payload;
		},
		[getListQuestionByUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},

		// handle user submit answers
		[userSubmitAnswers.pending]: (state) => {
			state.loading = true;
		},
		[userSubmitAnswers.fulfilled]: (state, action) => {
			state.error = "";
			state.loading = false;
			state.current = action.payload;
		},
		[userSubmitAnswers.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	},
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
