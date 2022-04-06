import React from "react";
import { ToastContainer } from "react-toastify";

export default function Toaster() {
	return (
		<ToastContainer
			position='top-right'
			autoClose={1500}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
}
