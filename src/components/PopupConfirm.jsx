import { Button, Modal } from "antd";
import React from "react";

export default function PopupConfirm(props) {
	const { isVisible, idQuestion, onCancel, handleOkDelete, messagePopup } =
		props;

	const handleOk = (idQuestion) => {
		handleOkDelete(idQuestion);
	};

	return (
		<Modal
			layout='vertical'
			title='Are you sure ?'
			onOk={(e) => handleOk(idQuestion)}
			visible={isVisible}
			onCancel={onCancel}>
			{messagePopup && <p>Are you sure to {messagePopup}</p>}
		</Modal>
	);
}
