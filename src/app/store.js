import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "../features/admin/adminSlice";
import userReducer from "../features/user/userSlice";

const rootReducer = {
	auth: authReducer,
	admin: adminReducer,
	user: userReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
