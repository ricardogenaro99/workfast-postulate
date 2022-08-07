import { Fragment, useEffect, useState } from "react";
import {
	ButtonPrimaryPurple,
	ControlGrid,
	FormDefault,
} from "../../shared/components";
import SelectLabel from "../../shared/components/form/SelectLabel";
import { formIsValid, validateForm } from "../../shared/utils/generalFunctions";

const initialForm = {
	career: "",
	graduateSchool: "",
	desiredPosition: "",
	workModality: "",
	desiredSalary: 1200,
};

const options = {
	career: [
		{ labelValue: "Chocolate" },
		{ labelValue: "Strawberry" },
		{ labelValue: "Vanilla" },
	],
	graduateSchool: [
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

const PerfilFormPreferences = () => {
	const [form, setForm] = useState(initialForm);
	const [formReview, setFormReview] = useState([]);
	const [clickSubmit, setClickSubmit] = useState(false);

	useEffect(() => {
		if (clickSubmit) {
			setFormReview(validateForm(form));
		}
	}, [form, clickSubmit]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setClickSubmit(true);
		const res = formIsValid(form);
		if (res) {
			console.log(form);
		} else {
			console.error(form);
		}
	};

	const handleSelectChange = (e) => {
		const { name, value } = e;
		setForm({ ...form, [name]: value });
	};

	return (
		<Fragment>
			<FormDefault onSubmit={handleSubmit}>
				<Fragment>
					<ControlGrid columns={2} textAlign="initial">
						<SelectLabel
							label="¿Cuál es tu carrera profesional?"
							options={options}
							onChange={handleSelectChange}
							name={"career"}
							formReview={formReview}
						/>
						<SelectLabel
							label="¿En qué ciclo te encuentras?"
							options={options}
							onChange={handleSelectChange}
							name={"graduateSchool"}
							formReview={formReview}
						/>
					</ControlGrid>
					<ControlGrid columns={2} textAlign="initial">
						<SelectLabel
							label="¿En qué cargo quisieras enfocarte?"
							options={options}
							onChange={handleSelectChange}
							name={"desiredPosition"}
							formReview={formReview}
						/>
						<SelectLabel
							label="¿En qué modalidad te gustaria laborar?"
							options={options}
							onChange={handleSelectChange}
							name={"workModality"}
							formReview={formReview}
						/>
					</ControlGrid>
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

export default PerfilFormPreferences;
