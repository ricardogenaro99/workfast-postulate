import styled from "styled-components";

const ButtonDefault = styled.button`
	padding: 10px 5%;
	font-weight: 500;
	border-radius: var(--border-radius-global);
`;

export const ButtonPrimaryPurple = styled(ButtonDefault)`
	background: var(--color-purple);
	color: var(--color-white);
	outline: 1px solid var(--color-purple);
	&:hover{
		box-shadow: var(--color-purple) 0px 0px 10px 2px;
	}
`;

export const ButtonPrimaryWhite = styled(ButtonDefault)`
	background: var(--color-white);
	outline: 1px solid var(--color-purple);
	color: var(--color-purple);
	&:hover{
		box-shadow: var(--color-purple) 0px 0px 8px 1px;
	}
`;
