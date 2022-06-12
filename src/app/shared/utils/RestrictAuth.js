import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { pathDashboard } from "../../routes/Path";

export default function RestrictAuth({ children }) {
	const { user } = useAuth();
	if (user) return <Navigate to={`${pathDashboard}`} />;
	return <>{children}</>;
}
