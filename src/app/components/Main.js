import React from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/authContext";
import RoutesComponents from "../routes/Routes";
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
	return (
		<Container>
			<Header user={user} logout={logout}/>
			<RoutesComponents user={user}/>
		</Container>
	);
};

export default Main;
