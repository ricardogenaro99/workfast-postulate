import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

export const ControlGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(${(props) => props.columns || 2}, 1fr);
	gap: 15px;
	justify-content: center;
	align-items: center;
	text-align: ${(props) => props.textAlign || "center"};

	@media ${device.mobileM} {
		grid-template-columns: 1fr;
	}
`;
// export const ControlGrid = ({ children, columns = 2, textAlign = "center" }) => {
// 	return (
// 		<Container columns={columns} textAlign={textAlign}>
// 			{children}
// 		</Container>
// 	);
// };

// export default ControlGrid;
