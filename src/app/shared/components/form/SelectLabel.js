import Select from "react-select";
import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

const Container = styled.div`
	display: grid;
	gap: 8px;
	> div {
		display: grid;
		grid-template-columns: 1fr 300px;
		grid-template-rows: auto;
		grid-auto-rows: 1fr;
		gap: 8px;

		span {
			color: var(--color-grey);
			display: flex;
			align-items: center;

			&.input-error {
				color: red;
				font-size: 0.8em;
			}
		}

		@media ${device.laptop} {
			grid-template-columns: 1fr;
		}
	}

	* {
		background: transparent;
		font-weight: 400;
	}
`;
const SelectLabel = ({ label, onChange, options, name, formReview = [] }) => {
	const renderError = () => {
		const res = formReview.find((e) => e.name === name);
		if (res) {
			return res.errors;
		}
		return [];
	};

	const addNameToOption = () => {
		return options[name].map((op) => {
			return op.labelValue
				? { label: op.labelValue, value: op.labelValue, name }
				: { ...op.labelValue, name };
		});
	};

	return (
		<Container>
			<div>
				<span>{label}</span>
				<Select options={addNameToOption()} onChange={onChange} />
			</div>
			<div>
				{renderError().map((error, i) => (
					<span key={i} className="input-error">
						{error}
					</span>
				))}
			</div>
		</Container>
	);
};

export default SelectLabel;
