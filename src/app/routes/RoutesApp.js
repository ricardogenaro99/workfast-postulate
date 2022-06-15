import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Configuracion, Empleos, Home, Perfil, Preparate } from "../pages";

const Container = styled.main`
	padding: 60px var(--padding-global-x);
`;

const RoutesApp = ({ userDb, setUserDb }) => {
	return (
		<Container>
			<Routes>
				<Route path="/">
					<Route
						index
						element={<Home userDb={userDb} setUserDb={setUserDb} />}
					/>
					<Route
						path="perfil"
						element={
							<Perfil userDb={userDb} setUserDb={setUserDb} />
						}
					/>
					<Route
						path="empleos"
						element={
							<Empleos userDb={userDb} setUserDb={setUserDb} />
						}
					/>
					<Route path="preparate" element={<Preparate />} />
					<Route
						path="configuracion"
						element={
							<Configuracion
								userDb={userDb}
								setUserDb={setUserDb}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<h1>Error 404</h1>} />
			</Routes>
		</Container>
	);
};

export default RoutesApp;
