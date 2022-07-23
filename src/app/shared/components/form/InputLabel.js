import { useId } from "react";
import {
	ContainerErrors,
	ContainerInputLabel,
	ContainerInputSelectLabelWithErrors
} from "./StyledFormComponents";

const InputLabel = ({
	name,
	type = "text",
	placeholder,
	label,
	value,
	onChange,
	formReview = [],
	inputElement,
}) => {
	const inputId = useId();

	const renderError = () => {
		const res = formReview.find((e) => e.name === name);
		if (res) {
			return res.errors;
		}
		return [];
	};

	return (
		<ContainerInputSelectLabelWithErrors>
			<ContainerInputLabel>
				<label htmlFor={inputId}>{label}</label>
				{inputElement ? (
					inputElement
				) : (
					<input
						id={inputId}
						type={type}
						placeholder={placeholder}
						name={name}
						value={value}
						onChange={onChange}
					/>
				)}
			</ContainerInputLabel>
			<ContainerErrors>
				{renderError().map((error, i) => (
					<span key={i} className="input-error">
						{error}
					</span>
				))}
			</ContainerErrors>
		</ContainerInputSelectLabelWithErrors>
	);
};

export default InputLabel;
