import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";
import "./resultSurvey.scss";

export default function ResultSurvey(props) {
	const { listSubmitResult } = props;

	const columns = [
		{
			title: "ID Question",
			dataIndex: "id",
			key: "id",
			render: (text) => <a>{text}</a>,
		},

		{
			title: "Correct Answer",
			dataIndex: "correctanswer",
			key: "correctanswer",
		},
		{
			title: "Result",
			key: "result",
			dataIndex: "result",
			render: (result) => (
				<>
					{result ? (
						<div>
							<CheckCircleOutlined
								style={{ color: "green", marginRight: "0.5rem" }}
							/>
							True
						</div>
					) : (
						<div>
							<CloseCircleOutlined
								style={{ color: "red", marginRight: "0.5rem" }}
							/>
							False
						</div>
					)}
				</>
			),
		},
	];

	return (
		<div className='resultSurveyWrapper'>
			<h1>Your Result</h1>
			<div className='listResultSurvey'>
				{listSubmitResult.length > 0 && (
					<Table
						key={listSubmitResult.id}
						columns={columns}
						dataSource={listSubmitResult}
						pagination={false}
					/>
				)}
				{listSubmitResult.length <= 0 && <h3>No data found...</h3>}
			</div>
		</div>
	);
}
