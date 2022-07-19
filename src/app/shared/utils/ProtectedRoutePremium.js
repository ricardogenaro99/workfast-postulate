import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { pathDashboard } from "../../routes/Path";

export default function ProtectedRoutePremium({ children }) {
	const { getUserDb } = useAuth();
	const [isPremium, setIsPremium] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const data = await getUserDb();
			setIsPremium(data.isPremium);
		};
		getData();
	}, [getUserDb]);

	if (isPremium !== null) {
		return isPremium ? (
			<>{children}</>
		) : (
			<Navigate to={`${pathDashboard}`} />
		);
	}
}
