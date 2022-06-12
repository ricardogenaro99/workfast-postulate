import styled from "styled-components";
import { device } from "../../shared/utils/Breakpoints";

const Container = styled.section`
	display: flex;
	flex-direction: column;
	gap: 20px;
	> h3 {
		font-size: 30px;
		font-weight: 600;
	}
	> div {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-template-rows: 1fr;
		grid-auto-rows: 1fr;
		gap: 25px;

		> * {
			width: 100%;
			height: 235px;
		}
	}

	@media ${device.mobileL} {
		> div {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		}
	}
`;
const ListOfLists = ({ title, lists }) => {
	return (
		<Container>
			<h3>{title}</h3>
			<div>
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
			</div>
		</Container>
	);
};

export default ListOfLists;
