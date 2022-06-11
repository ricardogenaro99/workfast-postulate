import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.columns}, 1fr);
	gap: 15px;
	justify-content: center;
	align-items: center;
	text-align: center;

	@media ${device.mobileM} {
		grid-template-columns: 1fr;
	}
`;
const ControlButtons = ({ children, columns = 2 }) => {
	return <Container columns={columns}>{children}</Container>;
};

export default ControlButtons;
