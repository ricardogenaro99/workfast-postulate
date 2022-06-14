import {
	createUserWithEmailAndPassword,  GoogleAuthProvider,
	onAuthStateChanged,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { API_BACKEND } from "../endpoints/apis";
import { helpHttp } from "../helpers/helpHttp";

export const authContext = createContext();

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) throw new Error("There is no auth provider");
	return context;
};

const addUserDb = async (user) => {
	const options = {
		body: {
			details: {
				authId: user.uid,
				email: user.email,
			},
		},
		headers: {
			"content-type": "application/json",
		},
	};
	await helpHttp().post(`${API_BACKEND}/users`, options);
};

export function AuthProvider({ children }) {
	const [user, setUser] = useState(undefined);
	const [loading, setLoading] = useState(false);

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
		const { data } = await helpHttp().get(
			`${API_BACKEND}/users?email=${tmp.email}`,
		);
		if (data.length === 0) {
			addUserDb(tmp);
		}
	};

	const logout = () => {
		setLoading(true);
		setTimeout(signOut, 500, auth);
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
				if (currentUser.emailVerified) {
					setUser(currentUser);
				} else {
					signOut(auth);
					sendVerification().then(() => setUser(null));
				}
			} else {
				setUser(null);
			}
			setLoading(false);
		});
		return () => unsubuscribe();
	}, []);

	return (
		<authContext.Provider
			value={{
				signup,
				login,
				logout,
				loginWithGoogle,
				resetPassword,
				user,
				loading,
				setLoading,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
