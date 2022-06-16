import styled from "styled-components";
import { ButtonPrimaryPurple, CardDefaultStyle } from "../../shared/components";

const Container = styled(CardDefaultStyle)`
	max-height: 300px;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	justify-content: center;
	padding: 15px var(--padding-global-x);
`;

const ContentContainer = styled.div`
	overflow: hidden;
	-mask-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		from(rgba(0, 0, 0, 1)),
		to(rgba(0, 0, 0, 0))
	);
	-webkit-mask-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		from(rgba(0, 0, 0, 1)),
		to(rgba(0, 0, 0, 0))
	);
`;

const CardJob = ({ job }) => {
	const { name, contents, locations = [], company, id } = job;

	return (
		<Container id={id}>
			<div>
				<h2>{name}</h2>
				<div>
					{locations.map((location, i) => (
						<span key={i}>{location.name}</span>
					))}
				</div>
				<h3>{company.name}</h3>
			</div>
			<ContentContainer
				dangerouslySetInnerHTML={{ __html: contents }}
			></ContentContainer>

			<ButtonPrimaryPurple>Conocer más...</ButtonPrimaryPurple>
		</Container>
	);
};

export default CardJob;
