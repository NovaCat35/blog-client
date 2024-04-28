import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Pages/HomePage";
import BlogPage from "../components/Pages/BlogPage";
import ProjectPage from "../components/Pages/ProjectPage";
import AboutPage from "../components/Pages/AboutPage";
import LoginPage from "../components/Pages/LoginPage";

const Router = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/blogs",
			element: <BlogPage />,
		},
		{
			path: "/projects",
			element: <ProjectPage />,
		},
		{
			path: "/about",
			element: <AboutPage />,
		},
      {
			path: "/login",
			element: <LoginPage />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
