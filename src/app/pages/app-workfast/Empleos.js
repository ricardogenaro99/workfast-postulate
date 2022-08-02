import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Job from "../../components/empleos/Job";
import JobList from "../../components/empleos/JobList";
import { ContainerGapDefault } from "../../shared/templates";
import { device } from "../../shared/utils/Breakpoints";

const ContainerCards = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-auto-rows: 1fr;
	gap: 25px;
	@media ${device.mobileL} {
		grid-template-columns: 1fr;
	}
`;

const Empleos = () => {
	return (
		<ContainerGapDefault>
			<Routes>
				<Route path="/">
					<Route index element={<JobList />} />
					<Route path=":id" element={<Job />} />
				</Route>
			</Routes>
		</ContainerGapDefault>
	);
};

export default Empleos;
