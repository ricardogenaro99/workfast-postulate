import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./app/components/auth/Login";
import Register from "./app/components/auth/Register";
import ResetPassword from "./app/components/auth/ResetPassword";
import { AuthProvider } from "./app/contexts/authContext";
import { pathAuth, pathDashboard } from "./app/routes/Path";
import ProtectedRoute from "./app/shared/utils/ProtectedRoute";
import RestrictAuth from "./app/shared/utils/RestrictAuth";
import { AppModule } from "./modules";

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route
					path={`${pathDashboard}/*`}
					element={
						<ProtectedRoute>
							<AppModule />
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
