import { Navigate } from "react-router-dom";
import { useGlobal } from "../../../contexts/globalContext";
import { pathAuth } from "../../../routes/Path";

export default function ProtectedRoute({ children }) {
	const { user, userRoles, logout } = useGlobal();

	// if (user !== undefined) {
	// 	console.log(userRoles.current);
	// 	if (!user) return <Navigate to={`${pathAuth}/login`} />;

	// 	if (userRoles.current.includes("candidate")) {
	// 		return <>{children}</>;
	// 	} else {
	// 		logout();
	// 	}
	// }

	if (user !== undefined) {
		if (!user) return <Navigate to={`${pathAuth}/login`} />;
		return <>{children}</>;
	}
}
