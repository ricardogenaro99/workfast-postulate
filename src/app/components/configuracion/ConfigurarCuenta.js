import { Fragment, useEffect, useState } from "react";
import { useGlobal } from "../../contexts/globalContext";
import { API_USERS } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../hooks/useForm";
import {
	Alert,
	ButtonPrimaryPurple,
	ControlGrid,
	FormDefault,
	InputLabel,
} from "../../shared/components";
import { formIsValid, validateForm } from "../../shared/utils/Functions";

const initialForm = {
	name: "",
	lastname: "",
	city: "",
	country: "",
	email: "",
};

const ConfigurarCuenta = () => {
	const { setLoading, getUserDb, userId , setPopPup} = useGlobal();
	const { form, handleChange, setForm } = useForm(initialForm);
	const [error, setError] = useState(null);
	const [clickSubmit, setClickSubmit] = useState(false);
	const [formReview, setFormReview] = useState([]);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			try {
				const data = await getUserDb();
				if (data) {
					setForm(data.details);
				}
				setError(null);
			} catch (e) {
				setError({ statusText: `${e.name}: ${e.message}` });
			}
		};
		getData();

		const idTime = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(idTime);
	}, []);

	useEffect(() => {
		if (clickSubmit) {
			setFormReview(validateForm(form));
		}
	}, [form, clickSubmit]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setClickSubmit(true);
		const res = formIsValid(form);
		if (res) {
			setLoading(true);
			const options = {
				body: {
					userId,
					details: form,
				},
			};
			await helpHttp().post(`${API_USERS}/save-details`, options);
			setLoading(false);
			setPopPup("Se guardo exitosamente!")
		} else {
			setPopPup("Debe completar todos los campos.")
		}
	};

	return (
		<Fragment>
			{error && <Alert message={error.statusText} />}
			{userId && !error && (
				<FormDefault onSubmit={handleSubmit}>
					<Fragment>
						<InputLabel
							label="Nombres"
							name="name"
							placeholder="Ingrese sus nombres"
							value={form.name}
							onChange={handleChange}
							formReview={formReview}
						/>
						<InputLabel
							label="Apellidos"
							name="lastname"
							placeholder="Ingrese sus apellidos"
							value={form.lastname}
							onChange={handleChange}
							formReview={formReview}
						/>
						<InputLabel
							label="País"
							name="country"
							placeholder="Ingrese su País"
							value={form.country}
							onChange={handleChange}
							formReview={formReview}
						/>
						<InputLabel
							label="Ciudad"
							name="city"
							placeholder="Ingrese su Ciudad"
							value={form.city}
							onChange={handleChange}
							formReview={formReview}
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
