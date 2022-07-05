import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { API_BACKEND } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../hooks/useForm";
import {
	Alert,
	ButtonPrimaryPurple,
	ControlGrid,
	FormDefault,
	InputLabel
} from "../../shared/components";

const initialForm = {
	name: "",
	lastname: "",
	city: "",
	country: "",
	email: "",
};

const ConfigurarCuenta = () => {
	const { setLoading } = useAuth();
	const [userDb, setUserDb] = useState(null);
	const { form, handleChange, setForm } = useForm(initialForm);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			try {
				const _idUserDb = JSON.parse(localStorage.getItem("_idUserDb"));
				if (_idUserDb) {
					const { data } = await helpHttp().get(
						`${API_BACKEND}/users/${_idUserDb}`,
					);
					if (data) {
						setUserDb(data);
						setForm(data.details);
					}
				}
			} catch (e) {
				setError({ statusText: `${e.name}: ${e.message}` });
			}
		};
		getData();

		const idTime = setTimeout(() => {
			setLoading(false);
		}, 3000);

		return () => clearTimeout(idTime);
	}, [setForm, setLoading]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const options = {
			body: {
				details: {
					...userDb.details,
					name: form.name,
					lastname: form.lastname,
					city: form.city,
					country: form.country,
				},
			},
		};
		await helpHttp().put(`${API_BACKEND}/users/${userDb._id}`, options);
		setLoading(false);
	};

	return (
		<Fragment>
			{error && <Alert message={error.statusText} />}
			{userDb && (
				<FormDefault onSubmit={handleSubmit}>
					<Fragment>
						<InputLabel
							label="Nombres"
							name="name"
							placeholder="Ingrese sus nombres"
							value={form.name}
							onChange={handleChange}
						/>
						<InputLabel
							label="Apellidos"
							name="lastname"
							placeholder="Ingrese sus apellidos"
							value={form.lastname}
							onChange={handleChange}
						/>
						<InputLabel
							label="País"
							name="country"
							placeholder="Ingrese su País"
							value={form.country}
							onChange={handleChange}
						/>
						<InputLabel
							label="Ciudad"
							name="city"
							placeholder="Ingrese su Ciudad"
							value={form.city}
							onChange={handleChange}
						/>
					</Fragment>
					<ControlGrid columns={3}>
						<ButtonPrimaryPurple type="submit">
							Guardar
						</ButtonPrimaryPurple>
					</ControlGrid>
				</FormDefault>
			)}
		</Fragment>
	);
};

export default ConfigurarCuenta;
