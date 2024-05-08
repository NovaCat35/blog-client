import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// This wrapper exist to call the checkTokenActive() on very route change.
const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
	const { checkTokenActive } = useContext(AuthContext);
	const location = useLocation();

	useEffect(() => {
      // Call checkTokenActive on route change
		checkTokenActive();
		console.log("YAHOOOO");
	}, [checkTokenActive, location]);

	return <>{children}</>;
};

export default RouteWrapper;
