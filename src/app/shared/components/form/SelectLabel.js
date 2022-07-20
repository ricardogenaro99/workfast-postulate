import { useEffect, useState } from "react";
import Select from "react-select";
import {
	ContainerErrors,
	ContainerInputSelectLabelWithErrors,
	ContainerSelectLabel
} from "./StyledFormComponents";

const SelectLabel = ({ label, onChange, options, name, formReview = [] }) => {
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const res = formReview.find((e) => e.name === "a");
		setErrors(res ? res.errors : []);
	}, [formReview]);

	const addNameToOption = () => {
		return options[name].map((op) => {
			return op.labelValue
				? { label: op.labelValue, value: op.labelValue, name }
				: { ...op.labelValue, name };
		});
	};

	return (
		<ContainerInputSelectLabelWithErrors>
			<ContainerSelectLabel>
				<span>{label}</span>
				<Select options={addNameToOption()} onChange={onChange} />
			</ContainerSelectLabel>
			{errors.length !== 0 && (
				<ContainerErrors>
					{errors.map((error, i) => (
						<span key={i} className="input-error">
							{error}
						</span>
					))}
				</ContainerErrors>
			)}
		</ContainerInputSelectLabelWithErrors>
	);
};

export default SelectLabel;
