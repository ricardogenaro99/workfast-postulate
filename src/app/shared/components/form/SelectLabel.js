import Select from "react-select";
import styled from "styled-components";

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
`;
const SelectLabel = ({ label, onChange, options }) => {
	return (
		<Container>
			<span>{label}</span>
			<Select options={options} onChange={onChange} />
		</Container>
	);
};

export default SelectLabel;
