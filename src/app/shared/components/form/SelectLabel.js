import Select from "react-select";
import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 300px;
	grid-template-rows: auto;
	grid-auto-rows: 1fr;
	gap: 5px;
	* {
		background: transparent;
		font-weight: 400;
	}

	span {
		color: var(--color-grey);
		display: flex;
		align-items: center;
	}

	@media ${device.laptop} {
		grid-template-columns: 1fr;
	}
`;
const SelectLabel = ({ label, onChange, options, name }) => {
	const addNameToOption = () => {
		return options[name].map((op) => {
			return op.labelValue
				? { label: op.labelValue, value: op.labelValue, name }
				: { ...op.labelValue, name };
		});
	};

	return (
		<Container>
			<span>{label}</span>
			<Select options={addNameToOption()} onChange={onChange} />
		</Container>
	);
};

export default SelectLabel;
