import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionsApi from "../../api/questionsApi";
import userApi from "../../api/userApi";

export const getListQuestion = createAsyncThunk(
	"admin/getListQuestion",
	async () => {
		const response = await questionsApi.adminGetQuestions();

		return response;
	}
);

export const getListUser = createAsyncThunk("admin/getListUser", async () => {
	const response = await userApi.getUsers();

	return response;
});

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
		// handle get list user
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

		// handle get list user
		[getListUser.pending]: (state) => {
			state.loading = true;
		},
		[getListUser.fulfilled]: (state, action) => {
			state.error = "";
			state.loading = false;
			state.current = action.payload;
		},
		[getListUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	},
});

const { reducer, actions } = adminSlice;
export const { editQuestion } = actions;
export default reducer;
