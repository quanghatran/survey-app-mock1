import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

export const login = createAsyncThunk(
	"user/logIn",
	async (params, thunkAPI) => {
		const response = await authApi.login(params);

		console.log(response);
		// const { access_token, token_type, expired_at } = response;
		// const accessToken = `${token_type} ${access_token}`;
		// localStorage.setItem("access_token", accessToken);
		// localStorage.setItem("expired_at", expired_at);
	}
);

const initialState = {
	entities: [],
	loading: "idle",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(login.fulfilled, (state, action) => {
			// Add user to the state array
			state.entities.push(action.payload);
		});
	},
});

const { reducer: userReducer, actions } = userSlice;
export const {} = actions;
export default userReducer;
