import { useEffect, useState } from "react";
import styled from "styled-components";
import CardJob from "../../components/empleos/CardJob";
import { API_JOBS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { Alert, Loader } from "../../shared/components";

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-auto-rows: 1fr;
	gap: 25px;
`;

const Empleos = () => {
	const [db, setDb] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		setLoading(true);
		helpHttp()
			.get(API_JOBS)
			.then((res) => {
				if (!res.err) {
					setDb(res.results);
					setError(null);
				} else {
					setDb([]);
					setError(res);
				}
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Container>
			{error && <Alert message={error.statusText} />}
			{loading && <Loader />}
			{db.map((job, i) => (
				<CardJob key={i} job={job} />
			))}
		</Container>
	);
};

export default Empleos;
