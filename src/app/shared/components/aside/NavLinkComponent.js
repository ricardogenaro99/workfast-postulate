import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { device } from "../../utils/Breakpoints";
import { pathDashboard } from "../../../routes/Path";

const Container = styled(NavLink)`
	height: 100%;
	width: 100%;
	text-decoration: none;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 25px;
	padding: 15px 20px;
	border-radius: calc( var(--border-radius-global) * 1.5);
	
	&:hover {
		background: var(--color-purple-active);
	}
	&.active {
		background: var(--color-purple-active);
	}

	@media ${device.tabletS} {
		span{
			display: none;
		}
	}
`;

const NavLinkComponent = ({ path = "", name, icon, clickItemMenu }) => {
	return (
		<Container
			className={(navData) => (navData.isActive ? "active" : "")}
			to={`${pathDashboard}/${path}`}
		>
			{icon}
			<span>{name}</span>
		</Container>
	);
};

export default NavLinkComponent;
