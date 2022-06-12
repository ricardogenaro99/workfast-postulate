import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useForm } from "../../hooks/useForm";
import { pathAuth } from "../../routes/Path";
import {
	ButtonPrimaryPurple,
	ButtonPrimaryWhite,
	ControlButtons
} from "../../shared/components";
import AuthModel from "./AuthModel";

const initialForm = {
	email: "",
	password: "",
};

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const { form, handleChange } = useForm(initialForm);
	const handleRegister = () => navigate(`${pathAuth}/register`);

	return (
		<AuthModel
			title={"Iniciar Sesión"}
			form={form}
			onChange={handleChange}
			action={login}
		>
			<ControlButtons>
				<ButtonPrimaryWhite type="button" onClick={handleRegister}>
					Crear Cuenta
				</ButtonPrimaryWhite>
				<ButtonPrimaryPurple type="submit">
					Ingresar
				</ButtonPrimaryPurple>
			</ControlButtons>
			<ControlButtons columns={1}>
				<Link to={`${pathAuth}/reset-password`}>
					¿Olvidaste tu contraseña?
				</Link>
			</ControlButtons>
		</AuthModel>
	);
};

export default Login;
