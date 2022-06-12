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
};
const ResetPassword = () => {
	const navigate = useNavigate();
	const { resetPassword } = useAuth();
	const { form, handleChange } = useForm(initialForm);
	const handleLogin = () => navigate(`${pathAuth}/login`);

	return (
		<AuthModel
			title={"Resetear Contraseña"}
			form={form}
			onChange={handleChange}
			action={resetPassword}
			resetPassword={true}
		>
			<ControlButtons>
				<ButtonPrimaryWhite type="button" onClick={handleLogin}>
					Tengo Cuenta
				</ButtonPrimaryWhite>
				<ButtonPrimaryPurple type="submit">
					Continuar
				</ButtonPrimaryPurple>
			</ControlButtons>
		</AuthModel>
	);
};

export default ResetPassword;
