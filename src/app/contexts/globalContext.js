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
	if (!context) throw new Error("There is no auth provider");
	return context;
};

export function GlobalProvider({ children }) {
	const [user, setUser] = useState(undefined);
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
		const { data } = await helpHttp().get(`${API_USERS}?email=${email}`);
		return data;
	};

	const signup = async (email, password) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password);
		const tmp = auth.currentUser;
		await addUserDb(tmp);
		await signOut(auth);
	};

	const login = async (email, password) => {
		setLoading(true);
		await signInWithEmailAndPassword(auth, email, password);
		const tmp = auth.currentUser;
		const data = await getUserDbByEmail(tmp.email);
		setUserId(data[0]._id);
	};

	const logout = (timeOut = true) => {
		resetStates();
		setLoading(true);
		timeOut ? setTimeout(signOut, 500, auth) : signOut(auth);
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
