import React, { useEffect, useState } from "react";
import { useGlobal } from "../../contexts/globalContext";
import { API_POSTULATES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { SectionTitle } from "../../shared/templates";

const PostulateJobs = () => {
	const { userId } = useGlobal();
	const [jobs, setJobs] = useState([]);
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

				console.log(res);

				if (res.err) {
					setError(res);
					setJobs([]);
					return;
				}
				if (res.data) {
					setError(null);
					setJobs(res.data);
					return;
				}
			} catch (e) {
				console.error({ statusText: `${e.name}: ${e.message}` });
			}
		};

		return () => getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<SectionTitle
			title="Da un seguimiento a los empleos a los que postulaste"
			error={error?.statusText}
		></SectionTitle>
	);
};

export default PostulateJobs;
