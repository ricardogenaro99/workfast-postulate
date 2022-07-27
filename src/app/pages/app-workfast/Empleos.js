import { useEffect, useState } from "react";
import styled from "styled-components";
import CardJob from "../../components/empleos/CardJob";
import { useGlobal } from "../../contexts/globalContext";
import { API_JOBS , API_USERS} from "../../endpoints/apis";
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
	const [jobsDb, setJobsDb] = useState([]);
	const [error, setError] = useState(null);
	const { setLoading, getUserDb, userId } = useGlobal();

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			try {
				const res = await helpHttp().get(`${API_JOBS}`);
				if (res.err) {
					setError(res);
					setJobsDb([]);
					return;
				}
				if (res.data) {
					setError(null);
					setJobsDb(res.data);
					return;
				}
			} catch (e) {
				setError({ statusText: `${e.name}: ${e.message}` });
			}
		};
		getData();

		const idTime = setTimeout(() => {
			setLoading(false);
		}, 3000);

		return () => clearTimeout(idTime);
	}, [setLoading]);

	const handleFavorite = async (_id) => {
		try {
			const data = await getUserDb();

			data.jobFavorites = data.jobFavorites || [];

			const pos = data.jobFavorites.indexOf(_id);

			if (pos === -1) {
				data.jobFavorites.push(_id);
			} else {
				data.jobFavorites.splice(pos, 1);
			}

			const options = {
				body: {
					userId,
					jobFavorites: data.jobFavorites,
				},
			};

			await helpHttp().post(
				`${API_USERS}/save-favorite-jobs`,
				options,
			);
		} catch (err) {
			setError(err);
		}
	};

	return (
		<ContainerGapDefault>
			<SectionTitle title={"Estos empleos se ajustan a tu perfil"}>
				<ContainerCards>
					{error && <Alert message={error.statusText} />}
					{jobsDb.map((job, i) => (
						<CardJob
							key={i}
							job={job}
							handleFavorite={handleFavorite}
						/>
					))}
				</ContainerCards>
			</SectionTitle>
		</ContainerGapDefault>
	);
};

export default Empleos;
