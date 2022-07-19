import { Fragment, useState } from "react";
import {
	ButtonPrimaryPurple,
	ControlGrid,
	FormDefault
} from "../../shared/components";
import SelectLabel from "../../shared/components/form/SelectLabel";

const initialForm = {
	career: "",
	graduateSchool: "",
	desiredPosition: "",
	workModality: "",
	desiredSalary: "",
};

const options = {
	career: [
		{ labelValue: "Chocolate" },
		{ labelValue: "Strawberry" },
		{ labelValue: "Vanilla" },
	],
	graduateSchool: [
		{ labelValue: "Ciclo 1" },
		{ labelValue: "Ciclo 2" },
		{ labelValue: "Ciclo 3" },
		{ labelValue: "Ciclo 4" },
		{ labelValue: "Ciclo 5" },
		{ labelValue: "Ciclo 6" },
		{ labelValue: "Ciclo 7" },
		{ labelValue: "Ciclo 8" },
		{ labelValue: "Ciclo 9" },
		{ labelValue: "Ciclo 10" },
		{ labelValue: "Egresado" },
	],
	desiredPosition: [
		{ labelValue: "Chocolate" },
		{ labelValue: "Strawberry" },
		{ labelValue: "Vanilla" },
	],
	workModality: [
		{ labelValue: "Remoto" },
		{ labelValue: "Presencial" },
		{ labelValue: "Híbrido" },
	],
};

const PerfilForm = () => {
	const [form, setForm] = useState(initialForm);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
	};

	const handleSelectChange = (e) => {
		const { name, value } = e;
		setForm({ ...form, [name]: value });
	};

	return (
		<Fragment>
			<FormDefault onSubmit={handleSubmit}>
				<Fragment>
					<SelectLabel
						label="¿Cuál es tu carrera profesional?"
						options={options}
						onChange={handleSelectChange}
						name={"career"}
					/>
					<SelectLabel
						label="¿En qué ciclo te encuentras?"
						options={options}
						onChange={handleSelectChange}
						name={"graduateSchool"}
					/>
					<SelectLabel
						label="¿En qué cargo quisieras enfocarte?"
						options={options}
						onChange={handleSelectChange}
						name={"desiredPosition"}
					/>
					<SelectLabel
						label="¿En qué modalidad te gustaria laborar?"
						options={options}
						onChange={handleSelectChange}
						name={"workModality"}
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
