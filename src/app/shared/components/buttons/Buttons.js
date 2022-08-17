import { Link } from "react-router-dom";
import styled from "styled-components";

const styleDefault = `
	padding: 10px 5%;
	transition-duration: 0.27s;
	font-weight: 500;
	border-radius: var(--border-radius-global);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	outline: 1px solid var(--color-purple);
	&:hover {
		box-shadow: var(--color-purple) 0px 0px 8px 2px;
	}

	&.disabled{
		opacity: .6;
		&:hover {
			box-shadow: none;
		}
	}
`;

const ButtonDefault = styled.button`
	${styleDefault}
`;

export const ButtonPrimaryPurple = styled(ButtonDefault)`
	background: var(--color-purple);
	color: var(--color-white);
`;

export const ButtonPrimaryWhite = styled(ButtonDefault)`
	background: var(--color-white);
	color: var(--color-purple);
`;

const LinkDefault = styled(Link)`
	${styleDefault}
`;

export const LinkPrimaryPurple = styled(LinkDefault)`
	background: var(--color-purple);
	color: var(--color-white);
`;

export const LinkPrimaryWhite = styled(LinkDefault)`
	background: var(--color-white);
	color: var(--color-purple);
`;
