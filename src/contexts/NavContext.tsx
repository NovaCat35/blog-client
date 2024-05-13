import { useState, createContext } from "react";

interface ContextType {
	activeLink: string;
	setActiveLink: React.Dispatch<React.SetStateAction<string>>;
}

export const NavbarContext = createContext<ContextType>({
	activeLink: "",
	setActiveLink: () => {},
});

/**
 * This context tracks the navbar tab links clicked. 
 * It sets one tab as active so we can manipulate styling on the navbar.tsx
 */
function NavbarProvider({ children }: { children: React.ReactNode }) {
	// State to track the active link
	const [activeLink, setActiveLink] = useState("");
	return <NavbarContext.Provider value={{ activeLink, setActiveLink }}>{children}</NavbarContext.Provider>;
}

export default NavbarProvider;
