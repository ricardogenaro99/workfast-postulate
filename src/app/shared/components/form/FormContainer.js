import { Fragment } from "react";
import styled from "styled-components";

const Container = styled.form`
	display: flex;
	flex-direction: column;
	gap: 31px;

	> section {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`;

export const FormDefault = ({ children, onSubmit }) => {
	const isArray = Array.isArray(children);
	return (
		<Container onSubmit={onSubmit}>
			{isArray ? (
				<Fragment>
					<section>{children[0]}</section>
					<section>{children[1]}</section>
				</Fragment>
			) : (
				<Fragment>{children}</Fragment>
			)}
		</Container>
	);
};
