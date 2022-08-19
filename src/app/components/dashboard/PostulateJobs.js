import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useGlobal } from "../../contexts/globalContext";
import { API_POSTULATES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { Grilla } from "../../shared/components";
import { SectionTitle } from "../../shared/templates";

const columns = [
	{ field: "enterprise", headerName: "Empresa", flex: 1, minWidth: 150 },
	{ field: "job", headerName: "Trabajo", flex: 2, minWidth: 250 },
	{
		field: "jobUbication",
		headerName: "Lugar",
		flex: 1,
		minWidth: 150,
	},
	{ field: "jobPosition", headerName: "Cargo", flex: 1.5, minWidth: 250 },
	{ field: "date", headerName: "Fecha", width: 170 },
	{ field: "status", headerName: "Estado", width: 170 },
];

const PostulateJobs = () => {
	const { userId } = useGlobal();
	const [postulates, setPostulates] = useState([]);
	const [rows, setRows] = useState([]);
	const [error, setError] = useState();

	useEffect(() => {
		const getData = async () => {
			try {
				const options = {
					body: {
						userRef: userId,
					},
				};

				const res = await helpHttp().post(
					`${API_POSTULATES}/get-by-user`,
					options,
				);

				if (res.err) {
					setError(res);
					setPostulates([]);
					return;
				}
				if (res.data) {
					setError(null);
					setPostulates(res.data);
					return;
				}
			} catch (e) {
				console.error({ statusText: `${e.name}: ${e.message}` });
			}
		};

		getData();
	}, [userId]);

	useEffect(() => {
		const data = postulates.map((postulate) => ({
			id: postulate._id,
			enterprise: postulate.jobRef?.enterpriseRef?.details.name,
			job: postulate.jobRef?.details.name,
			jobUbication: `${postulate.jobRef?.details.city}, ${postulate.jobRef?.details.country}`,
			jobPosition: postulate.jobRef?.details.position,
			date: dayjs(postulate.createdAt).format("MMMM D, YYYY"),
			status: generateStatus(postulate.accepted, postulate.refused),
		}));
		setRows(data);
	}, [postulates]);

	const generateStatus = (accepted, refused) => {
		if (!accepted && !refused) return "En proceso";
		if (accepted) return "Aceptado";
		if (refused) return "Rechazado";
	};

	return (
		<SectionTitle
			title="Da un seguimiento a los empleos a los que postulaste"
			error={error?.statusText}
		>
			<Grilla rows={rows} columns={columns} />
		</SectionTitle>
	);
};

export default PostulateJobs;
