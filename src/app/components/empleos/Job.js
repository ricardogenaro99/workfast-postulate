import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { API_JOBS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import {
	Alert,
	ButtonBackToTop,
	ButtonPrimaryPurple
} from "../../shared/components";
import { SectionTitle } from "../../shared/templates";
import { size } from "../../shared/utils/Breakpoints";

const gap = "40px";

const Container = styled.article`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;
	gap: ${gap};

	> section {
		&.image-container {
			overflow: hidden;
			max-height: 400px;
			img {
				object-fit: cover;
				width: 100%;
			}
		}

		&.info-container {
			display: grid;
			grid-template-columns: 1fr 230px;
			gap: ${gap};
			align-items: start;
			.info-left {
			}

			.info-right {
				display: grid;
				grid-template-columns: 1fr;
				gap: calc(${gap} / 3);
			}
		}
	}
`;
const Job = () => {
	const [jobDb, setJobDb] = useState();
	const [error, setError] = useState(null);
	const { setLoading } = useGlobal();
	const params = useParams();

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			try {
				const res = await helpHttp().get(`${API_JOBS}/${params.id}`);
				if (res.err) {
					setError(res);
					setJobDb();
					return;
				}
				if (res.data) {
					setJobDb(res.data);
					setError();
					return;
				}
			} catch (e) {
				setError({ statusText: `${e.name}: ${e.message}` });
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	return (
		<>
			{error && <Alert message={error.statusText} />}
			{jobDb && (
				<SectionTitle
					title={jobDb.details.name}
					maxWidth={size.laptop}
					margin="0 auto"
				>
					<Container>
						<section className="image-container">
							<img
								src={
									jobDb.details.image ||
									"https://lamanzanamordida.net/app/uploads-lamanzanamordida.net/2022/06/apple-park-visitor-center.jpg"
								}
								alt="job"
							/>
						</section>
						<section className="info-container">
							<div className="info-left info-bottom">
								<p>{jobDb.details.description}</p>
							</div>
							<div className="info-right info-top">
								<span>
									<b>Pulicado el:</b>{" "}
									{dayjs(jobDb.createdAt).format(
										"MMMM D, YYYY",
									)}
								</span>
								<span>
									<b>Ubicación:</b> {jobDb.details.city},{" "}
									{jobDb.details.country}
								</span>
								<span>
									<b>Empresa:</b>{" "}
									{jobDb.enterpiseDetails.name}
								</span>
								<ButtonPrimaryPurple>
									Postular
								</ButtonPrimaryPurple>
							</div>
						</section>
					</Container>
					<ButtonBackToTop />
				</SectionTitle>
			)}
		</>
	);
};

export default Job;
