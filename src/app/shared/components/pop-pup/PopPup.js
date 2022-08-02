import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useGlobal } from "../../../contexts/globalContext";

const margin = "2%";

const breatheAnimation = keyframes`
	0% { opacity: 0}
	25% { opacity: .9 }
	75% { opacity: .9 }
	100% { opacity: 0 }
`;

const Container = styled.div`
	position: absolute;
	top: ${margin};
	right: ${margin};
	background: var(--color-purple);
	outline: 1px solid var(--color-purple-active);
	padding: 20px 5%;
	border-radius: calc(var(--border-radius-global) * 1.5);
	opacity: 0;
	font-weight: 500;
	color: var(--color-white);
	animation-name: ${breatheAnimation};
	animation-duration: 4s;

	button {
		position: absolute;
		top: 3px;
		right: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
	}
`;

const PopPup = ({ message }) => {
	const location = useLocation();
	const { setPopPup } = useGlobal();
	const [path] = useState(location.pathname);

	useEffect(() => {
		const idTime = setTimeout(() => {
			setPopPup();
		}, 5000);

		return () => clearTimeout(idTime);
	}, [setPopPup]);

	useEffect(() => {
		if (path !== location.pathname) {
			setPopPup();
		}
	}, [location.pathname, path, setPopPup]);

	const handleClose = () => {
		setPopPup();
	};

	return (
		<Container>
			<button onClick={handleClose}>
				<IoClose color="var(--color-white)" />
			</button>
			{message}
		</Container>
	);
};

export default PopPup;
