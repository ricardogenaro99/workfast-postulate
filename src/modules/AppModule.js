import styled from "styled-components";
import Main from "../app/components/Main";
import { Aside } from "../app/shared/components";

const Container = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: grid;
	grid-template-columns: auto 1fr;
`;

// const AppModule = () => {
// 	const { user, logout } = useAuth();
// 	const [userDb, setUserDb] = useState(null);

// 	useEffect(() => {
// 		const userFetch = async () => {
// 			const { data } = await helpHttp().get(
// 				`${API_BACKEND}/users?email=${user.email}`,
// 			);
// 			if ((await data.length) === 1) {
// 				setUserDb(data[0]);
// 			}
// 		};
// 		return () => userFetch();
// 	}, [user]);

// 	return (
// 		<Container>
// 			<Aside userDb={userDb} />
// 			<Main logout={logout} userDb={userDb} setUserDb={setUserDb} />
// 		</Container>
// 	);
// };

const AppModule = () => {
	return (
		<Container>
			<Aside />
			<Main />
		</Container>
	);
};

export default AppModule;
