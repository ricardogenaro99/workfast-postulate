import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Empleos, Home, Perfil, Preparate } from "../pages";

const Container = styled.main`
	padding: 60px var(--padding-global-x);
`;

const RoutesComponents = () => {
	return (
		<Container>
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="perfil" element={<Perfil />} />
					<Route path="empleos" element={<Empleos />} />
					<Route path="preparate" element={<Preparate />} />
				</Route>
				<Route path="*" element={<h1>Error 404</h1>} />
			</Routes>
		</Container>
	);
};

export default RoutesComponents;