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
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	],
	graduateSchool:[

	]
};

const PerfilForm = () => {
	const [form, setForm] = useState(initialForm);

	const handleSubmit = (e) => {};

	const handleSelectChange = (e) => {
		console.log(e);
	};
	return (
		<Fragment>
			<FormDefault onSubmit={handleSubmit}>
				<Fragment>
					<SelectLabel
						label="¿Cuál es tu carrera profesional?"
						value={form.career}
						options={options.career}
						onChange={handleSelectChange}
					/>
					<SelectLabel
						label="¿En qué ciclo te encuentras?"
						value={form.graduateSchool}
						onChange={handleSelectChange}
					/>
					<SelectLabel
						label="¿En qué cargo quisieras enfocarte?"
						value={form.desiredPosition}
						onChange={handleSelectChange}
					/>
					<SelectLabel
						label="¿En qué modalidad te gustaria laborar?"
						value={form.workModality}
						onChange={handleSelectChange}
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
