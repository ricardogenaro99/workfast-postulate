import { useEffect, useState } from "react";
import styled from "styled-components";
import ListOfLists from "../../components/preparate/ListOfLists";
import { Loader } from "../../shared/components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 75px;
`;

const listOfLists = [
	{
		title: "Preparate para tu próxima entrevista",
		lists: [
			{
				src: "https://www.youtube.com/embed/videoseries?list=PLLPkqUAMHNwnowUPOo8clEtz_icAgM9aw",
			},
			{
				src: "https://www.youtube.com/embed/videoseries?list=PLE44opjBi_0nI2-jKykyTMjopkPpBBQwT",
			},
			{
				src: "https://www.youtube.com/embed/videoseries?list=PLwl8A8OYjiPh4vKcfebIIuTGEX8CviXyT",
			},
		],
	},
	{
		title: "Arma tu CV perfecto",
		lists: [
			{
				src: "https://www.youtube.com/embed/videoseries?list=PLvxlBA9PTQxjn2r_cHuxphEvw6pfH2tqq",
			},
			{
				src: "https://www.youtube.com/embed/videoseries?list=PL-pMjtey1HE--B-hH6pgpcNUhki6nM8B5",
			},
			{
				src: "https://www.youtube.com/embed/videoseries?list=PLkoPQy8tAwnCnMQNionII0GnlCwFwKeBf",
			},
		],
	},
];
const Preparate = () => {
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		setLoading(true);
		setInterval(setLoading, 1500, false);
	}, []);

	return (
		<Container>
			{loading && <Loader />}
			{listOfLists.map((lists, i) => (
				<ListOfLists key={i} title={lists.title} lists={lists.lists} />
			))}
		</Container>
	);
};

export default Preparate;
