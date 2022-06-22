import { useEffect, useId, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import { API_BACKEND } from "../../endpoints/apis";
import { helpHttp } from "../../helpers/helpHttp";
import { ButtonPrimaryPurple, CardDefaultStyle } from "../../shared/components";

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
	const [favorite, setFavorite] = useState(false);
	const { details, enterpiseDetails, _id } = job;

	useEffect(() => {
		const getUser = async () => {
			const _idUserDb = await JSON.parse(
				localStorage.getItem("_idUserDb"),
			);
			if (_idUserDb) {
				const { data } = await helpHttp().get(
					`${API_BACKEND}/users/${_idUserDb}`,
				);

				if (data.jobFavorites.find((el) => el === _id)) {
					setFavorite(true);
				}
			}
		};
		getUser();
	}, [_id]);

	const handleClick = () => {
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
					<AiFillStar color="orange" onClick={() => handleClick()} />
				) : (
					<AiOutlineStar
						color="orange"
						onClick={() => handleClick()}
					/>
				)}
			</div>
			<ContentContainer>{details.description}</ContentContainer>
			<ButtonPrimaryPurple>Conocer más...</ButtonPrimaryPurple>
		</Container>
	);
};

export default CardJob;
