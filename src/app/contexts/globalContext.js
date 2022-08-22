import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from "firebase/auth";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { API_USERS } from "../endpoints/apis";
import { helpHttp } from "../helpers/helpHttp";
import { pathAuth } from "../routes/Path";
import { Loader } from "../shared/components";
import { MESSAGES, USER_ROLE } from "../shared/utils/generalConst";

export const globalContext = createContext();

export const useGlobal = () => {
	const context = useContext(globalContext);
	if (!context) throw new Error("No hay proveedor de autenticación.");
	return context;
};

export function GlobalProvider({ children }) {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState(null);
	const [popPup, setPopPup] = useState();
	const userRoles = useRef([]);
	const navigate = useNavigate();
	const location = useLocation();

	const addUserDb = async (userParam) => {
		const options = {
			body: {
				details: {
					authId: userParam.uid,
					email: userParam.email,
				},
			},
		};
		const { data } = await helpHttp().post(`${API_USERS}/save-user`, options);
		return data;
	};

	const getUserDb = async () => {
		const { data } = await helpHttp().get(`${API_USERS}/${userId}`);
		return data;
	};

	const getUserDbByEmail = async (email) => {
		const options = {
			body: {
				email,
			},
		};
		const { data } = await helpHttp().post(
			`${API_USERS}/get-by-email`,
			options,
		);

		userRoles.current = data ? data.roleRef.values : [];

		return data;
	};

	const signup = async (email, password) => {
		setLoading(true);
		await getUserDbByEmail(email);
		await createUserWithEmailAndPassword(auth, email, password);
		await addUserDb(auth.currentUser);
		await signOut(auth);
	};

	const login = async (email, password) => {
		setLoading(true);
		const data = await getUserDbByEmail(email);
		await signInWithEmailAndPassword(auth, email, password);
		setUserId(data._id);
	};

	const logout = () => {
		resetStates();
		setLoading(true);
		setTimeout(signOut, 500, auth);
	};

	const resetStates = () => {
		setUser(null);
		setUserId(null);
		setLoading(false);
	};

	const loginWithGoogle = () => {
		const googleProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleProvider);
	};

	const resetPassword = (email) => sendPasswordResetEmail(auth, email);

	const sendVerification = () => sendEmailVerification(auth.currentUser);

	useEffect(() => {
		const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (!currentUser) {
				resetStates();
				return;
			}
			try {
				const data = await getUserDbByEmail(currentUser.email);

				if (!(currentUser.emailVerified && data)) {
					signOut(auth);
					sendVerification().then(() => resetStates());
					return;
				}

				if (!userRoles.current.includes(USER_ROLE)) {
					signOut(auth);
					setPopPup(MESSAGES.errorRole);
					return;
				}

				setUserId(data._id);
				setUser(currentUser);
			} catch (err) {
				const pathAuthRoute = location.pathname.split("/");
				pathAuthRoute.includes("register")
					? navigate(`${pathAuth}/register`)
					: navigate(`${pathAuth}/login`);
			} finally {
				setLoading(false);
			}
		});

		const init = () => {
			unsubuscribe();
		};

		return () => init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<globalContext.Provider
			value={{
				login,
				signup,
				logout,
				loginWithGoogle,
				resetPassword,
				user,
				userId,
				userRoles,
				getUserDb,
				loading,
				setLoading,
				popPup,
				setPopPup,
			}}
		>
			{loading && <Loader />}
			{children}
		</globalContext.Provider>
	);
}
