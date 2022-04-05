import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

export const login = createAsyncThunk(
	"user/login",
	async (params, thunkAPI) => {
		const response = await authApi.login(params);

		const token = response.tokens;
		const userInformation = response.user;

		if (token) {
			localStorage.setItem("access_token", token.access.token);
			localStorage.setItem("refresh_token", token.refresh.token);
			localStorage.setItem("role", response.user.role);
		}

		return userInformation;
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
		// [register.fulfilled]: (state, action) => {
		// 	state.isLoggedIn = false;
		// },
		// [register.rejected]: (state, action) => {
		// 	state.isLoggedIn = false;
		// },
		[login.pending]: (state) => {
			state.loading = true;
		},
		[login.fulfilled]: (state, action) => {
			state.current = action.payload;
			state.loading = false;
		},
		[login.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
		// [logout.fulfilled]: (state, action) => {
		// 	state.isLoggedIn = false;
		// 	state.user = null;
		// },
	},
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
