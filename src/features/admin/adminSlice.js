import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionsApi from "../../api/questionsApi";

export const getListQuestion = createAsyncThunk(
	"admin/getListQuestion",
	async () => {
		const response = await questionsApi.adminGetQuestions();

		return response;
	}
);

const adminSlice = createSlice({
	name: "admin",
	initialState: {
		current: {},
		loading: false,
		error: "",
	},
	reducers: {
		editQuestion: (state, action) => {
			console.log("action.payload: ", action.payload);
		},
	},
	extraReducers: {
		[getListQuestion.pending]: (state) => {
			state.loading = true;
		},
		[getListQuestion.fulfilled]: (state, action) => {
			state.error = "";
			state.loading = false;
			state.current = action.payload;
		},
		[getListQuestion.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	},
});

const { reducer, actions } = adminSlice;
export const { editQuestion } = actions;
export default reducer;
