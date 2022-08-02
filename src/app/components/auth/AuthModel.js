import { Fragment, useState } from "react";
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

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #f3f6ff;
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
	resetPassword = false,
}) => {
	const { setLoading } = useGlobal();
	const [error, setError] = useState();
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
		try {
			await action(form.email, form.password);
			if (!auth.currentUser) {
				writeError(
					"Le enviamos un correo para validar su cuenta!",
					"danger",
				);
				return;
			}
			if (auth.currentUser.emailVerified) {
				navigate(pathDashboard);
			} else {
				writeError(
					"Le enviamos un correo para validar su cuenta!",
					"danger",
				);
			}
		} catch (err) {
			writeError(err.message);
		}
	};

	return (
		<Container>
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
							/>
							{!resetPassword && (
								<InputLabel
									label="Contraseña"
									type="password"
									name="password"
									placeholder="***************"
									value={form.password}
									onChange={onChange}
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
