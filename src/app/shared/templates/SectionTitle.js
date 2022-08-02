import styled from "styled-components";

const Container = styled.section`
	max-width: ${(props) => props.maxWidth};
	display: flex;
	flex-direction: column;
	gap: 30px;
	.section-title {
		font-size: 30px;
		font-weight: 600;
	}
	margin: ${(props) => props.margin};
`;
const SectionTitle = ({
	title,
	children,
	maxWidth = "none",
	margin = "initial",
}) => {
	return (
		<Container maxWidth={maxWidth} margin={margin}>
			<h3 className="section-title">{title}</h3>
			{children}
		</Container>
	);
};

export default SectionTitle;
