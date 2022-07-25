import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import { useGlobal } from "../../../contexts/globalContext";

const margin = "2%";

const Container = styled.div`
	position: absolute;
	top: ${margin};
	right: ${margin};
	background: var(--color-purple);
	outline: 1px solid var(--color-purple-active);
	padding: 20px 5%;
	border-radius: calc(var(--border-radius-global) * 1.5);
	opacity: 0.7;
	font-weight: 500;
	color: var(--color-white);

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
	const { setPopPup } = useGlobal();

	useEffect(() => {
		const idTime = setTimeout(() => {
			setPopPup();
		}, 5000);

		return () => clearTimeout(idTime);
	}, [setPopPup]);

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
