import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { API_FAVORITES } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { ButtonPrimaryWhite, Grilla } from "../../shared/components/";
import { SectionTitle } from "../../shared/templates";

const ButtonPrimaryWhiteTop = styled(ButtonPrimaryWhite)`
	transform: translate(7px, -45px);
`;

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
];

const FavoriteJobs = () => {
	const { userId } = useGlobal();
	const [favorites, setFavorites] = useState([]);
	const [rows, setRows] = useState([]);
	const [error, setError] = useState();
	const [selectedRows, setSelectedRows] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const options = {
					body: {
						userRef: userId,
					},
				};

				const res = await helpHttp().post(
					`${API_FAVORITES}/get-by-user`,
					options,
				);

				if (res.err) {
					setError(res);
					setFavorites([]);
					return;
				}
				if (res.data) {
					setError(null);
					setFavorites(res.data);
					return;
				}
			} catch (e) {
				console.error({ statusText: `${e.name}: ${e.message}` });
			}
		};

		getData();
	}, [userId]);

	useEffect(() => {
		const data = favorites.map((favorite) => ({
			id: favorite._id,
			enterprise: favorite.jobRef?.enterpriseRef?.details.name,
			job: favorite.jobRef?.details.name,
			jobUbication: `${favorite.jobRef?.details.city}, ${favorite.jobRef?.details.country}`,
			jobPosition: favorite.jobRef?.details.position,
		}));
		setRows(data);
	}, [favorites]);

	const handleClick = () => {
		console.log(selectedRows);
	};

	return (
		<SectionTitle
			title="Revisa tus empleos favoritos"
			error={error?.statusText}
		>
			<Grilla rows={rows} columns={columns} setSelectedRows={setSelectedRows}>
				<ButtonPrimaryWhiteTop onClick={handleClick}>
					Quitar de favoritos
				</ButtonPrimaryWhiteTop>
			</Grilla>
		</SectionTitle>
	);
};

export default FavoriteJobs;
