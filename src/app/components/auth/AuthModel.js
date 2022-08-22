import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../../config/firebase";
import { useGlobal } from "../../contexts/globalContext";
import { pathDashboard } from "../../routes/Path";
import {
	Alert,
	CardDefault,
	FormDefault,
	InputLabel
} from "../../shared/components";
import PopPup from "../../shared/components/pop-pup/PopPup";
import { MESSAGES } from "../../shared/utils/generalConst";
import { formIsValid, validateForm } from "../../shared/utils/generalFunctions";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #f3f6ff;
	background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%2380a3f0' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E");
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	position: relative;
	> section {
		width: 90%;
		max-width: 500px;
		position: relative;

		> * {
			width: 100%;

			&.alert-container {
				position: absolute;
				top: -25%;
			}
		}
	}
`;

const AuthModel = ({
	children,
	title,
	form,
	onChange,
	action,
	typeAction,
	resetPassword = false,
}) => {
	const { setLoading, popPup } = useGlobal();
	const [error, setError] = useState();
	const [clickSubmit, setClickSubmit] = useState(false);
	const [formReview, setFormReview] = useState([]);

	useEffect(() => {
		if (clickSubmit) {
			setFormReview(validateForm(form));
		}
	}, [clickSubmit, form]);

	const navigate = useNavigate();

	const writeError = (message, type) => {
		setLoading(false);
		setError({ message, type });
		setTimeout(() => {
			setError();
		}, 5000);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setClickSubmit(true);
		if (formIsValid(form)) {
			try {
				await action(form.email, form.password);
				if (!auth.currentUser) {
					switch (typeAction) {
						case "register":
							writeError(MESSAGES.emailUnverified, "danger");
							break;
						case "resetPassword":
							writeError(MESSAGES.resetPassword, "info");
							break;
						default:
							writeError(MESSAGES.notCurrentUser, "error");
							break;
					}
					return;
				}
				if (auth.currentUser.emailVerified) {
					navigate(pathDashboard);
				} else {
					writeError(MESSAGES.emailUnverified, "danger");
				}
			} catch (err) {
				writeError(err.message);
			}
		}
	};

	return (
		<Container>
			{popPup && <PopPup message={popPup} />}
			<section>
				{error && (
					<div className="alert-container">
						<Alert message={error.message} type={error.type} />
					</div>
				)}

				<CardDefault title={title}>
					<FormDefault onSubmit={handleSubmit}>
						<Fragment>
							<InputLabel
								label="Correo"
								type="email"
								name="email"
								placeholder="correo@fast.work"
								value={form.email}
								onChange={onChange}
								formReview={formReview}
							/>
							{!resetPassword && (
								<InputLabel
									label="Contraseña"
									type="password"
									name="password"
									placeholder="**************"
									value={form.password}
									onChange={onChange}
									formReview={formReview}
								/>
							)}
						</Fragment>
						<Fragment>{children}</Fragment>
					</FormDefault>
				</CardDefault>
			</section>
		</Container>
	);
};

export default AuthModel;
