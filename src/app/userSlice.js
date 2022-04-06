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
			localStorage.setItem("user_name", response.user.username);
			localStorage.setItem("avatar", response.user.avatar);
		}

		return userInformation;
	}
);

export const register = createAsyncThunk(
	"user/register",
	async (params, thunkAPI) => {
		const response = await authApi.register(params);

		const token = response.tokens;
		const userInformation = response.user;

		if (token) {
			localStorage.setItem("access_token", token.access.token);
			localStorage.setItem("refresh_token", token.refresh.token);
			localStorage.setItem("role", response.user.role);
			localStorage.setItem("user_name", response.user.username);
			localStorage.setItem("avatar", response.user.avatar);
		}

		return userInformation;
	}
);

export const logout = createAsyncThunk(
	"user/logout",
	async (params, thunkAPI) => {
		await authApi.logout(params);
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
		// register process
		[register.pending]: (state) => {
			state.loading = true;
		},
		[register.fulfilled]: (state, action) => {
			state.current = action.payload;
			state.loading = false;
		},
		[register.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},

		// login process
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

		// logout
		[logout.fulfilled]: (state, action) => {
			state.loading = false;
			state.user = null;
		},
	},
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
