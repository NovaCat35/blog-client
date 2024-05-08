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
		const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
		const jwtExpirationString = localStorage.getItem("jwt_expiration");
		const tokenExpiration = jwtExpirationString ? new Date(jwtExpirationString).getTime() : null;
		const today = new Date().getTime();

		// Does token expiration exist (aka jwt exist already)?
		if (tokenExpiration) {
			if (today >= tokenExpiration) {
				// Token has expired, perform cleanup and logout actions
				localStorage.clear();
				if (tokenActive) {
					setTokenActive(false); // Update state only if it's currently active
					setUser(initialUser);
				}
			}
			// Update state only if it's not already active. We do this b/c some pages rely on checking tokenActive
			else if (!tokenActive) {
				setTokenActive(true);
				console.log(userInfo);
				setUser(userInfo);
			}
		}
	};

	return <AuthContext.Provider value={{ user, tokenActive, setUser, setTokenActive, checkTokenActive }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
