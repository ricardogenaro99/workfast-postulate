import { AiOutlinePoweroff } from "react-icons/ai";
import styled from "styled-components";
import { device } from "../../utils/Breakpoints";

const Container = styled.header`
	position: relative;
	height: var(--height-header);

	> div {
		padding: 0 var(--padding-global-x);
		position: fixed;
		display: flex;
		width: calc(100% - var(--max-width-aside));
		justify-content: space-between;
		align-items: center;
		background: var(--color-white);
		box-shadow: rgb(0 0 0 / 15%) 0px 2px 8px 0px;
		z-index: 100;
		* {
			color: var(--color-black);
		}
		height: var(--height-header);
	}

	@media ${device.tabletS} {
		> div {
			width: calc(100% - var(--min-width-aside));
		}
	}
`;

const Header = ({ logout, userDb, setUserDb }) => {
	const handleLogout = async () => await logout();
	return (
		<Container>
			<div>
				<h1>WORKFAST</h1>
				<div>
					<AiOutlinePoweroff
						onClick={handleLogout}
						cursor="pointer"
						size={25}
					/>
				</div>
			</div>
		</Container>
	);
};

export default Header;
