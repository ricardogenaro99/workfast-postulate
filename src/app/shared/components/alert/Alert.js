import styled from "styled-components";

const Container = styled.div`
	height: auto;
	padding: 20px 30px;
	background: ${(props) => props.background};
	color: ${(props) => props.color};
	outline: 1px solid ${(props) => props.color};
	opacity: 0.75;
`;
const Alert = ({ type = "error", message }) => {
	const getColors = (type) => {
		const colors = { color: "", background: "" };
		switch (type) {
			case "succes":
				colors.color = "var(--color-green)";
				colors.background = "var(--color-teal)";
				break;
			case "error":
				colors.color = "var(--color-red-dark)";
				colors.background = "var(--color-red)";
				break;
			case "info":
				colors.color = "var(--color-blue)";
				colors.background = "var(--color-blue-ligth)";
				break;
			case "danger":
				colors.color = "var(--color-orange)";
				colors.background = "var(--color-yellow)";
				break;

			default:
				colors.color = "var(--color-grey-ligth)";
				colors.background = "var(--color-white)";
				break;
		}
		return colors;
	};

	const { color, background } = getColors(type);

	return (
		<Container background={background} color={color}>
			{message}
		</Container>
	);
};

export default Alert;
