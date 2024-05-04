import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Pages/HomePage";
import AllBlogPage from "../components/Pages/AllBlogPage";
import BlogPage from "../components/Pages/BlogPage";
import ProjectPage from "../components/Pages/ProjectPage";
import AboutPage from "../components/Pages/AboutPage";
import LoginPage from "../components/Pages/LoginPage";
import SignupPage from "../components/Pages/SignupPage";
import ErrorPage from "../components/Pages/ErrorPage";

const Router = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/blogs",
			element: <AllBlogPage />,
		},
		{
			path: "/blogs/:id",
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
		{
			path: "/signup",
			element: <SignupPage />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
