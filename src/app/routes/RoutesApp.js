import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { useGlobal } from "../contexts/globalContext";
import { Configuracion, Empleos, Dashboard, Perfil, Preparate } from "../pages";
import { ButtonBackToTop } from "../shared/components";
import PopPup from "../shared/components/pop-pup/PopPup";
import ProtectedRoutePremium from "../shared/utils/protected-routes/ProtectedRoutePremium";

const Container = styled.main`
	padding: 60px var(--padding-global-x);
	position: relative;
`;

const RoutesApp = () => {
	const { popPup } = useGlobal();
	return (
		<Container>
			{popPup && <PopPup message={popPup} />}
			<Routes>
				<Route path="/">
					<Route index element={<Dashboard />} />
					<Route path="perfil" element={<Perfil />} />
					<Route path="empleos/*" element={<Empleos />} />
					<Route path="preparate" element={<Preparate />} />
					<Route path="configuracion" element={<Configuracion />} />
				</Route>
				<Route path="*" element={<h1>Error 404</h1>} />
			</Routes>
			<ButtonBackToTop />
		</Container>
	);
};

export default RoutesApp;
