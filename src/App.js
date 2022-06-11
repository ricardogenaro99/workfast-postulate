import { Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Login from "./app/components/auth/Login";
import Register from "./app/components/auth/Register";
import ResetPassword from "./app/components/auth/ResetPassword";
import Main from "./app/components/Main";
import { AuthProvider } from "./app/contexts/authContext";
import { pathAuth, pathDashboard } from "./app/routes/Path";
import { Aside } from "./app/shared/components";
import ProtectedRoute from "./app/shared/utils/ProtectedRoute";
import RestrictAuth from "./app/shared/utils/RestrictAuth";

const Container = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: grid;
	grid-template-columns: auto 1fr;
`;

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path={`${pathDashboard}/*`}
					element={
						<ProtectedRoute>
							<Container>
								<Aside />
								<Main />
							</Container>
						</ProtectedRoute>
					}
				/>
				<Route path={`${pathAuth}/*`}>
					<Route
						path="login"
						element={
							<RestrictAuth>
								<Login />
							</RestrictAuth>
						}
					/>
					<Route
						path="register"
						element={
							<RestrictAuth>
								<Register />
							</RestrictAuth>
						}
					/>
					<Route
						path="reset-password"
						element={
							<RestrictAuth>
								<ResetPassword />
							</RestrictAuth>
						}
					/>
				</Route>
				<Route
					path="*"
					element={<Navigate to={`${pathDashboard}`} replace />}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default App;
