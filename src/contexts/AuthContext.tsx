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

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const userContext = createContext<UserContextType>({
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
});

function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User>({
		_id: "",
		username: "",
		email: "",
		password: "",
		profile_img: "",
		date_joined: "",
		admin_access: false,
	});
	return <userContext.Provider value={{ user, setUser }}>{children}</userContext.Provider>;
}

export default AuthProvider;
