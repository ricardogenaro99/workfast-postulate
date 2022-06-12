import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pathDashboard } from "../../routes/Path";
import { Alert, CardDefault, InputLabel } from "../../shared/components";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: #f3f6ff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	> div {
		width: 90%;
		max-width: 500px;
	}
`;

const CardStyle = styled(CardDefault)`
	> * {
		width: 100%;
		padding: 0 var(--padding-global-x);
	}

	> h2 {
		font-weight: 800;
		font-size: 24px;
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
}) => {
	const [error, setError] = useState();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await action(form.email, form.password);
			navigate(pathDashboard);
		} catch (err) {
			setError(err.message);
			setTimeout(() => {
				setError();
			}, 4000);
		}
	};
	return (
		<Container>
			{error && <Alert message={error} />}
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
								label="Constraseña"
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
