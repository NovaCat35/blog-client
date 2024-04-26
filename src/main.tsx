import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router/router";
import BlogContext from "./contexts/BlogContext";
import "./styles/tailwind.css";
import "./styles/App.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BlogContext>
			<Router />
		</BlogContext>
	</React.StrictMode>
);
