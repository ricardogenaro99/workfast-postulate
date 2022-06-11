import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { pathDashboard } from "../../routes/Path";
import { Loader } from "../components";

export default function RestrictAuth({ children }) {
	const { user, loading } = useAuth();
	if (loading) return <Loader />;
	if (user) return <Navigate to={`${pathDashboard}`} />;
	return <>{children}</>;
}
