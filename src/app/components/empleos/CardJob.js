import { useEffect, useId, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import { useGlobal } from "../../contexts/globalContext";
import { CardDefaultStyle, LinkPrimaryPurple } from "../../shared/components";

const sizeStar = "20px";

const Container = styled(CardDefaultStyle)`
	max-height: 300px;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	justify-content: center;
	padding: 15px var(--padding-global-x);
	div {
		&:nth-child(1) {
			display: flex;
			flex-direction: column;
			gap: 5px;
			position: relative;
			h2 {
				padding-right: ${sizeStar};
			}
			svg {
				position: absolute;
				top: 0;
				right: 0;
				cursor: pointer;
				width: ${sizeStar};
				height: ${sizeStar};
			}
		}
	}
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

const CardJob = ({ job, handleFavorite }) => {
	const { getUserDb } = useGlobal();
	const [favorite, setFavorite] = useState(false);
	const { details, enterpiseDetails, _id } = job;

	useEffect(() => {
		const getUser = async () => {
			try {
				const data = await getUserDb();
				if (data) {
					if (data.jobFavorites.find((el) => el === _id)) {
						setFavorite(true);
					}
				}
			} catch (e) {
				console.error({ statusText: `${e.name}: ${e.message}` });
			}
		};
		return () => getUser();
	}, [_id, getUserDb]);

	const handleClickFavorite = () => {
		handleFavorite(_id);
		setFavorite(!favorite);
	};

	return (
		<Container id={useId()}>
			<div>
				<h2>{details.name}</h2>
				<span>
					{details.city}, {details.country}
				</span>
				<h4>{enterpiseDetails.name}</h4>
				{favorite ? (
					<AiFillStar color="orange" onClick={handleClickFavorite} />
				) : (
					<AiOutlineStar
						color="orange"
						onClick={handleClickFavorite}
					/>
				)}
			</div>
			<ContentContainer>{details.description}</ContentContainer>
			<LinkPrimaryPurple to={_id}>Conocer más...</LinkPrimaryPurple>
		</Container>
	);
};

export default CardJob;
