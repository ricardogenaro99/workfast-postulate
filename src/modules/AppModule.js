import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import Main from "../app/components/Main";
import { Aside } from "../app/shared/components";
import { REACT_APP_STRIPE_API_KEY } from "../environment";

const stripePromise = loadStripe(REACT_APP_STRIPE_API_KEY);

const Container = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: grid;
	grid-template-columns: auto 1fr;
`;

const AppModule = () => {
	return (
		<Elements stripe={stripePromise}>
			<Container>
				<Aside />
				<Main />
			</Container>
		</Elements>
	);
};

export default AppModule;
