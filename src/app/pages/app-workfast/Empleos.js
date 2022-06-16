import { useEffect, useState } from "react";
import styled from "styled-components";
import CardJob from "../../components/empleos/CardJob";
import { useAuth } from "../../contexts/authContext";
import { API_JOBS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { Alert } from "../../shared/components";
import { ContainerGapDefault, SectionTitle } from "../../shared/templates";
import { device } from "../../shared/utils/Breakpoints";

const ContainerCards = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-auto-rows: 1fr;
	gap: 25px;
	@media ${device.mobileL} {
		grid-template-columns: 1fr;
	}
`;

const Empleos = () => {
	const [db, setDb] = useState([]);
	const [error, setError] = useState(null);
	const { setLoading } = useAuth();

	useEffect(() => {
		setLoading(true);
		const getData = () => {
			helpHttp(false)
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
		};

		return () => getData();
	}, [setLoading]);

	return (
		<ContainerGapDefault>
			<SectionTitle title={"Estos empleos se ajustan a tu perfil"}>
				<ContainerCards>
					{error && <Alert message={error.statusText} />}
					{db.map((job, i) => (
						<CardJob key={i} job={job} />
					))}
				</ContainerCards>
			</SectionTitle>
		</ContainerGapDefault>
	);
};

export default Empleos;
