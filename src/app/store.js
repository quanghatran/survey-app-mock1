import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "../features/admin/adminSlice";

const rootReducer = {
	auth: authReducer,
	admin: adminReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
