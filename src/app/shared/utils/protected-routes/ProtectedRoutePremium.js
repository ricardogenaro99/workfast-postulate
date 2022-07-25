import { useEffect, useState } from "react";
import { useGlobal } from "../../../contexts/globalContext";
import CheckoutForm from "../../components/pasarela-pago/CheckoutForm";

export default function ProtectedRoutePremium({ children }) {
	const { getUserDb } = useGlobal();
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
