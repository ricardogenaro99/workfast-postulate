import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	useElements,
	useStripe
} from "@stripe/react-stripe-js";
import React, { Fragment } from "react";
import styled from "styled-components";
import { ButtonPrimaryPurple } from "../buttons/Buttons";
import { CardDefault } from "../card/CardDefault";
import { ControlGrid } from "../form/ControlGrid";
import { FormDefault } from "../form/FormContainer";
import InputLabel from "../form/InputLabel";

import { useGlobal } from "../../../contexts/globalContext";
import { API_BACKEND } from "../../../endpoints/apis";
import { helpHttp } from "../../../helpers/helpHttp";

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const { getUserDb, setLoading, setPopPup } = useGlobal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: "card",
				card: elements.getElement(CardNumberElement),
			});
			
			if (!error) {
				setLoading(true);
				const { id } = paymentMethod;
				const userDb = await getUserDb();

				const options = {
					body: {
						id,
						userDb,
					},
				};

				await helpHttp().post(`${API_BACKEND}/checkouts`, options);
				elements.getElement(CardNumberElement).clear();
				elements.getElement(CardExpiryElement).clear();
				elements.getElement(CardCvcElement).clear();
				window.location.reload();
			} else {
				throw new Error(error.message);
			}
		} catch (err) {
			setLoading(false);
			setPopPup(err.message);
		}
	};

	return (
		<Container>
			<CardDefault
				title="Conviertete en un usuario premium"
				description="Podrás acceder a cursos y postular a mejores empleos antes que el resto."
			>
				<FormDefault onSubmit={handleSubmit}>
					<Fragment>
						<InputLabel
							label="Numero de tarjeta"
							inputElement={<CardNumberElement />}
						/>
						<InputLabel
							label="Fecha de expiración"
							inputElement={<CardExpiryElement />}
						/>
						<InputLabel
							label="Código de seguridad (cvc)"
							inputElement={<CardCvcElement />}
						/>
					</Fragment>
					<Fragment>
						<ControlGrid>
							<ButtonPrimaryPurple
								disabled={!stripe}
								type="submit"
							>
								Adquirir Membresía
							</ButtonPrimaryPurple>
						</ControlGrid>
					</Fragment>
				</FormDefault>
			</CardDefault>
		</Container>
	);
};

export default CheckoutForm;
