import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import CheckoutForm from "../../components/pasarela-pago/CheckoutForm";

export default function ProtectedRoutePremium({ children }) {
	const { getUserDb } = useAuth();
	const [isPremium, setIsPremium] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const data = await getUserDb();
			setIsPremium(data.premium.isPremium);
		};
		getData();
	}, [getUserDb]);

	if (isPremium !== null) {
		return isPremium ? <>{children}</> : <CheckoutForm />;
	}
}
