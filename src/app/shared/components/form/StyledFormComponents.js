import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

export const ContainerInputSelectLabelWithErrors = styled.div`
	display: grid;
	gap: 8px;
	* {
		background: transparent;
		font-weight: 400;
	}
`;

export const ContainerInputLabel = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid var(--color-grey-ligth);
	padding: 10px 16px;
	gap: 5px;
	border-radius: var(--border-radius-global);

	label {
		color: var(--color-grey);
	}

	input {
		color: var(--color-black);
		border: none;
		outline: none;
	}
`;

export const ContainerSelectLabel = styled.div`
	display: grid;
	grid-template-columns: 1fr 300px;
	grid-template-rows: auto;
	grid-auto-rows: 1fr;
	gap: 8px;

	span {
		color: var(--color-grey);
		display: flex;
		align-items: center;
	}

	@media ${device.laptop} {
		grid-template-columns: 1fr;
	}
`;

export const ContainerErrors = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	border-radius: var(--border-radius-global);

	.input-error {
		color: red;
		font-size: 0.8em;
	}
`;
