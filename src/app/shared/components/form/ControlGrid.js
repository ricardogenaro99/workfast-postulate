import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.columns}, 1fr);
	gap: 15px;
	justify-content: center;
	align-items: center;
	text-align: ${(props) => props.textAlign};

	@media ${device.mobileM} {
		grid-template-columns: 1fr;
	}
`;
const ControlGrid = ({ children, columns = 2, textAlign = "center" }) => {
	return (
		<Container columns={columns} textAlign={textAlign}>
			{children}
		</Container>
	);
};

export default ControlGrid;
