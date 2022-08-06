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
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { API_USERS } from "../endpoints/apis";
import { helpHttp } from "../helpers/helpHttp";
import { Loader } from "../shared/components";

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

	const addUserDb = async (userParam) => {
		const options = {
			body: {
				details: {
					authId: userParam.uid,
					email: userParam.email,
				},
			},
		};
		const { data } = await helpHttp().post(
			`${API_USERS}/save-user`,
			options,
		);
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
			`${API_USERS}/get-user-email`,
			options,
		);
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
		if (data.length === 1) {
			await signInWithEmailAndPassword(auth, email, password);
			setUserId(data[0]._id);
		}
	};

	const logout = () => {
		resetStates();
		setLoading(true);
		setTimeout(signOut, 500, auth);
	};

	const resetStates = () => {
		setUser(null);
		setUserId(null);
	};

	const loginWithGoogle = () => {
		const googleProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleProvider);
	};

	const resetPassword = (email) => sendPasswordResetEmail(auth, email);

	const sendVerification = () => sendEmailVerification(auth.currentUser);

	useEffect(() => {
		const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				const data = await getUserDbByEmail(currentUser.email);
				if (currentUser.emailVerified) {
					setUserId(data[0]._id);
					setUser(currentUser);
				} else {
					signOut(auth);
					sendVerification().then(() => resetStates());
				}
			} else {
				resetStates();
			}
			setTimeout(setLoading, 1000, false);
		});
		return () => unsubuscribe();
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
