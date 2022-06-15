import { CgUserlane } from "react-icons/cg";
import { FaCog, FaVideo } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { SiSpeedtest } from "react-icons/si";
import styled from "styled-components";
import { device } from "../../utils/Breakpoints";
import NavLinkComponent from "./NavLinkComponent";

const Container = styled.aside`
	background: var(--color-purple);
	width: var(--max-width-aside);
	position: relative;
	z-index: 1000;
	top: 0;
	display: flex;
	justify-content: center;
	> div {
		position: fixed;
		height: 100%;
		width: 100%;
		max-width: var(--max-width-aside);
		box-shadow: rgb(0 0 0 / 15%) 4px var(--height-header) 8px 0px;
		> section {
			display: grid;
			padding: 15px;
			gap: 8px;

			.logo {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 30px 0;
			}
		}
	}

	* {
		color: var(--color-white);
	}

	@media ${device.tabletS} {
		width: var(--min-width-aside);
		> div {
			max-width: calc(var(--min-width-aside) - 6px);
			> section {
				padding: 10px 0;
			}
		}
	}
`;

const sizeIconTech = 25;

const Aside = ({ userDb }) => {
	return (
		<Container>
			<div>
				<section>
					<div className="logo">
						<CgUserlane size={"90%"} />
					</div>
					<NavLinkComponent
						name="Dashboard"
						icon={<SiSpeedtest size={sizeIconTech} />}
					/>
					<NavLinkComponent
						path="perfil"
						name="Perfil"
						icon={<RiProfileFill size={sizeIconTech} />}
					/>
					<NavLinkComponent
						path="empleos"
						name="Empleos"
						icon={<MdWork size={sizeIconTech} />}
					/>
					<NavLinkComponent
						path="preparate"
						name="Preparate"
						icon={<FaVideo size={sizeIconTech} />}
					/>
					<NavLinkComponent
						path="configuracion"
						name="Configuracion"
						icon={<FaCog size={sizeIconTech} />}
					/>
				</section>
			</div>
		</Container>
	);
};

export default Aside;
