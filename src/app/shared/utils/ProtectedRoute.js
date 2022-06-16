import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { pathAuth } from "../../routes/Path";

export default function ProtectedRoute({ children }) {
	const { user } = useAuth();
	if (user !== undefined) {
		if (!user) return <Navigate to={`${pathAuth}/login`} />;
		return <>{children}</>;
	}
}
