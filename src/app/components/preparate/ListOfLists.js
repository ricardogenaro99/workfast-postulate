import styled from "styled-components";
import { SectionTitle } from "../../shared/templates";
import { device } from "../../shared/utils/Breakpoints";

const Container = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-template-rows: 1fr;
	grid-auto-rows: 1fr;
	gap: 25px;

	> * {
		width: 100%;
		height: 235px;
	}

	@media ${device.mobileL} {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
`;
const ListOfLists = ({ title, lists }) => {
	return (
		<SectionTitle title={title}>
			<Container>
				{lists.map((list, i) => (
					<iframe
						key={i}
						src={list.src}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				))}
			</Container>
		</SectionTitle>
	);
};

export default ListOfLists;
