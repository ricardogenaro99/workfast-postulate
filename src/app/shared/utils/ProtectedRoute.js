import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { pathAuth } from "../../routes/Path";
import { Loader } from "../components";

export default function ProtectedRoute({ children }) {
	const { user, loading } = useAuth();
	if (loading) return <Loader />;
	if (!user) return <Navigate to={`${pathAuth}/login`} />;
	return <>{children}</>;
}
