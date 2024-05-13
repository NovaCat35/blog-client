import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { NavbarContext } from "../contexts/NavContext";

// This wrapper exist to call the checkTokenActive() on very route change.
const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
	const { checkTokenActive } = useContext(AuthContext);
	const { setActiveLink } = useContext(NavbarContext);
	const location = useLocation(); // gets current location

	useEffect(() => {
		// Calls checkTokenActive() on every route change. Essentially will check if token is active for protected links and navbar
		checkTokenActive();
	}, [checkTokenActive, location]);

	useEffect(() => {
		// Set the active NAVBAR link based on the current pathname
		setActiveLink(location.pathname);
	}, [location.pathname, setActiveLink]);

	return <>{children}</>;
};

export default RouteWrapper;
