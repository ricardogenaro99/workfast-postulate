import styled from "styled-components";

const Container = styled.section`
	display: flex;
	flex-direction: column;
	gap: 30px;
	.section-title {
		font-size: 30px;
		font-weight: 600;
	}
`;
const SectionTitle = ({ title, children }) => {
	return (
		<Container>
			<h3 className="section-title">{title}</h3>
			{children}
		</Container>
	);
};

export default SectionTitle;
