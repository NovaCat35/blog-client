import { createBrowserRouter, RouterProvider, ScrollRestoration } from "react-router-dom";
import Home from "../components/Pages/HomePage";
import AllBlogPage from "../components/Pages/AllBlogPage";
import BlogPage from "../components/Pages/BlogPage";
import ProjectPage from "../components/Pages/ProjectPage";
import AboutPage from "../components/Pages/AboutPage";
import LoginPage from "../components/Pages/LoginPage";
import SignupPage from "../components/Pages/SignupPage";
import ProfilePage from "../components/Pages/ProfilePage";
import ErrorPage from "../components/Pages/ErrorPage";

const Router = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<>
					<ScrollRestoration />
					<Home />
				</>
			),
			errorElement: <ErrorPage />,
		},
		{
			path: "/blogs",
			element: (
				<>
					<ScrollRestoration />
					<AllBlogPage />
				</>
			),
		},
		{
			path: "/blogs/:id",
			element: (
				<>
					<ScrollRestoration />
					<BlogPage />
				</>
			),
		},
		{
			path: "/projects",
			element: (
				<>
					<ScrollRestoration />
					<ProjectPage />
				</>
			),
		},
		{
			path: "/about",
			element: (
				<>
					<ScrollRestoration />
					<AboutPage />
				</>
			),
		},
		{
			path: "/login",
			element: (
				<>
					<ScrollRestoration />
					<LoginPage />
				</>
			),
		},
		{
			path: "/signup",
			element: (
				<>
					<ScrollRestoration />
					<SignupPage />
				</>
			),
		},
		{
			path: "/profile",
			element: (
				<>
					<ScrollRestoration />
					<ProfilePage />
				</>
			),
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
