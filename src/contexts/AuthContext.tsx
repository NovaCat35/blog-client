import React, { createContext, useState } from "react";

export type User = {
	_id: string;
	username: string;
	email: string;
	password: string;
	profile_img: string;
	date_joined: string;
	admin_access: boolean;
};

interface ContextType {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	tokenActive: boolean;
	checkTokenActive: () => void;
	setTokenActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<ContextType>({
	user: {
		_id: "",
		username: "",
		email: "",
		password: "",
		profile_img: "",
		date_joined: "",
		admin_access: false,
	},
	setUser: () => {},
	tokenActive: false,
	checkTokenActive: () => {},
	setTokenActive: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
	const initialUser = {
		_id: "",
		username: "",
		email: "",
		password: "",
		profile_img: "",
		date_joined: "",
		admin_access: false,
	};

	const [user, setUser] = useState<User>(initialUser);
	const [tokenActive, setTokenActive] = useState(false);

	// this function is called every time we navigate to a protected page or component that relies on the tokenActive state
	const checkTokenActive = () => {
		const jwtExpirationString = localStorage.getItem("jwt_expiration");
		const tokenExpiration = jwtExpirationString ? new Date(jwtExpirationString).getTime() : null;
		const today = new Date().getTime();

		// Does token exist? If it does, we do expiration check
		if (tokenExpiration && today >= tokenExpiration) {
			// Token has expired, perform cleanup and logout actions
			localStorage.clear();
			setTokenActive(false);
			setUser(initialUser);
		} 
	};

	return <AuthContext.Provider value={{ user, tokenActive, setUser, setTokenActive, checkTokenActive }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
