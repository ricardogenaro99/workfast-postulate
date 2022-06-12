import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
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
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const signup = async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
		const user = auth.currentUser;
		await addUserDb(user);
	};

	const login = async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
		const user = auth.currentUser;
		const { data } = await helpHttp().get(
			`${API_BACKEND}/users?email=${user.email}`,
		);

		if (data.length === 0) {
			addUserDb(user);
		}
	};

	const logout = () => signOut(auth);

	const loginWithGoogle = () => {
		const googleProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleProvider);
	};

	const resetPassword = (email) => sendPasswordResetEmail(auth, email);

	useEffect(() => {
		const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
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
				user,
				loading,
				resetPassword,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
