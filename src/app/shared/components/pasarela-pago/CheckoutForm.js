import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
	useElements,
	useStripe
} from "@stripe/react-stripe-js";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { ButtonPrimaryPurple } from "../buttons/Buttons";
import { CardDefault } from "../card/CardDefault";
import ControlGrid from "../form/ControlGrid";
import { FormDefault } from "../form/FormContainer";
import InputLabel from "../form/InputLabel";

import { useAuth } from "../../../contexts/authContext";
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
	const [loading, setLoading] = useState(false);
	const { getUserDb } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardNumberElement),
		});

		setLoading(false);

		if (!error) {
			const { id } = paymentMethod;
			const userDb = await getUserDb();

			const options = {
				body: {
					id,
					userDb,
				},
			};

			try {
				const { data } = await helpHttp().post(
					`${API_BACKEND}/checkouts`,
					options,
				);
				if (data) {
					elements.getElement(CardNumberElement).clear();
					elements.getElement(CardExpiryElement).clear();
					elements.getElement(CardCvcElement).clear();
					window.location.reload();
				}
			} catch (error) {
				console.log(error);
			}
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
								{loading ? (
									<div role="status">
										<span>Cargando...</span>
									</div>
								) : (
									"Adquirir Membresía"
								)}
							</ButtonPrimaryPurple>
						</ControlGrid>
					</Fragment>
				</FormDefault>
			</CardDefault>
		</Container>
	);
};

export default CheckoutForm;
