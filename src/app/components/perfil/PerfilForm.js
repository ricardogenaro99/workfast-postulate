import { Fragment } from "react";
import { useForm } from "../../hooks/useForm";
import {
	ButtonPrimaryPurple,
	ControlGrid,
	FormDefault
} from "../../shared/components";
import SelectLabel from "../../shared/components/form/SelectLabel";

const initialForm = {
	name: "",
	lastname: "",
	city: "",
	country: "",
	email: "",
};

const PerfilForm = () => {
	const { form, handleChange, setForm } = useForm(initialForm);

	const handleSubmit = (e) => {};

	return (
		<Fragment>
			<FormDefault onSubmit={handleSubmit}>
				<Fragment>
					<SelectLabel
						label="Nombres"
						name="name"
						placeholder="Ingrese sus nombres"
						value={form.name}
						onChange={handleChange}
					/>
					<SelectLabel
						label="Apellidos"
						name="lastname"
						placeholder="Ingrese sus apellidos"
						value={form.lastname}
						onChange={handleChange}
					/>
					<SelectLabel
						label="País"
						name="country"
						placeholder="Ingrese su País"
						value={form.country}
						onChange={handleChange}
					/>
					<SelectLabel
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
		</Fragment>
	);
};

export default PerfilForm;
