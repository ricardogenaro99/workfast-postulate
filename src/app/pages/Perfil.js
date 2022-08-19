import PerfilFormPersonal from "../components/perfil/PerfilFormPersonal";
import PerfilFormPreferences from "../components/perfil/PerfilFormPreferences";
import { SectionTitle } from "../shared/templates";

const Perfil = () => {
	return (
		<SectionTitle title="Perfil">
			<SectionTitle subtitle="Datos Personales">
				<PerfilFormPersonal />
			</SectionTitle>
			<SectionTitle subtitle="Preferencias">
				<PerfilFormPreferences />
			</SectionTitle>
		</SectionTitle>
	);
};

export default Perfil;
