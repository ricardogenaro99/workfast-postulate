import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
	> div {
		width: 90%;
		max-width: 500px;
	}
`;

const AuthModel = ({
	children,
	title,
	form,
	onChange,
	action,
	resetPassword = false,
	loading = false,
	setLoading,
	user,
}) => {
	const [error, setError] = useState();
	const navigate = useNavigate();

	const writeError = (message) => {
		setLoading(false);
		setError(message);
		setTimeout(() => {
			setError();
		}, 4500);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await action(form.email, form.password);
			if (!user) {
				writeError("Le enviamos un correo para validar su cuenta!");
			} else {
				navigate(pathDashboard);
			}
		} catch (err) {
			writeError(err.message);
		}
	};
	return (
		<Container>
			{error && <Alert message={error} />}
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
		</Container>
	);
};

export default AuthModel;
