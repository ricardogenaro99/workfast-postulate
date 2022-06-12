import { useNavigate } from "react-router-dom";
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
const Register = () => {
	const navigate = useNavigate();
	const { signup, loading, setLoading, user } = useAuth();
	const { form, handleChange } = useForm(initialForm);

	const handleLogin = () => navigate(`${pathAuth}/login`);
	return (
		<AuthModel
			title={"Crear Cuenta"}
			form={form}
			onChange={handleChange}
			action={signup}
			loading={loading}
			setLoading={setLoading}
			user={user}
		>
			<ControlButtons>
				<ButtonPrimaryWhite type="button" onClick={handleLogin}>
					Tengo Cuenta
				</ButtonPrimaryWhite>
				<ButtonPrimaryPurple type="submit">
					Registrarme
				</ButtonPrimaryPurple>
			</ControlButtons>
		</AuthModel>
	);
};

export default Register;
