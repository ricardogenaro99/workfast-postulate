import { useEffect, useState } from "react";
import { useGlobal } from "../../../contexts/globalContext";
import { Alert } from "../../components";
import CheckoutForm from "../../components/pasarela-pago/CheckoutForm";

export default function ProtectedRoutePremium({ children }) {
	const { getUserDb, setLoading } = useGlobal();
	const [isPremium, setIsPremium] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true);
				const data = await getUserDb();
				setIsPremium(data.premium.isPremium);
				setError(null);
			} catch (e) {
				setError({ statusText: `${e.name}: ${e.message}` });
			} finally {
				setLoading(false);
			}
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) return <Alert message={error.statusText} />;

	if (isPremium !== null) return isPremium ? <>{children}</> : <CheckoutForm />;
}
