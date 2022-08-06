import styled from "styled-components";

const Container = styled.section`
	max-width: ${(props) => props.maxWidth};
	display: flex;
	flex-direction: column;
	gap: var(--gap-default-XL);
	.section-title {
		font-size: 30px;
		font-weight: 600;
	}
	.section-subtitle {
		font-size: 24px;
	}
	margin: ${(props) => props.margin};
`;
const SectionTitle = ({
	title,
	subtitle,
	children,
	maxWidth = "none",
	margin = "initial",
}) => {
	return (
		<Container maxWidth={maxWidth} margin={margin}>
			{title && <h3 className="section-title">{title}</h3>}
			{subtitle && <h4 className="section-subtitle">{subtitle}</h4>}
			{children}
		</Container>
	);
};

export default SectionTitle;
