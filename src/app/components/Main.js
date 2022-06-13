import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/authContext";
import { API_BACKEND } from "../endpoints/apis";
import { helpHttp } from "../helpers/helpHttp";
import RoutesComponents from "../routes/RoutesApp";
import { Header } from "../shared/components";

const Container = styled.section`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: var(--height-header) 1fr;
`;

const Main = () => {
	const { user, logout } = useAuth();
	const [userDb, setUserDb] = useState(null);

	useEffect(() => {
		const userFetch = async () => {
			const { data } = await helpHttp().get(
				`${API_BACKEND}/users?email=${user.email}`,
			);
			if (data.length === 1) {
				setUserDb(data[0]);
			}
		};

		return () => userFetch();
	}, [user]);

	return (
		<Container>
			<Header logout={logout} userDb={userDb} setUserDb={setUserDb} />
			<RoutesComponents userDb={userDb} setUserDb={setUserDb} />
		</Container>
	);
};

export default Main;
