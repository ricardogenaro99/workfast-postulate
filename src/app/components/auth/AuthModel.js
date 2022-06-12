import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pathDashboard } from "../../routes/Path";
import {
	Alert,
	CardDefault,
	InputLabel,
	Loader,
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

const CardStyle = styled(CardDefault)`
	> * {
		width: 100%;
		padding: 0 calc(var(--padding-global-x) + 12px);
	}

	> h2 {
		font-weight: 800;
		font-size: 26px;
		display: flex;
		align-items: center;
		color: var(--color-black);
	}

	> form {
		display: flex;
		flex-direction: column;
		gap: 31px;

		> section {
			display: flex;
			flex-direction: column;
			gap: 20px;
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
			}
			navigate(pathDashboard);
		} catch (err) {
			writeError(err.message);
		}
	};
	return (
		<Container>
			{error && <Alert message={error} />}
			{loading && <Loader />}
			<CardStyle>
				<h2>{title}</h2>
				<form onSubmit={handleSubmit}>
					<section>
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
					</section>
					<Fragment>{children}</Fragment>
				</form>
			</CardStyle>
		</Container>
	);
};

export default AuthModel;
