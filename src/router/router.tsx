import { createBrowserRouter, RouterProvider, ScrollRestoration } from "react-router-dom";
import Home from "../components/Pages/HomePage";
import AllBlogPage from "../components/Pages/AllBlogPage";
import BlogPage from "../components/Pages/BlogPage";
import ProjectPage from "../components/Pages/ProjectPage";
import AboutPage from "../components/Pages/AboutPage";
import LoginPage from "../components/Pages/LoginPage";
import SignupPage from "../components/Pages/SignupPage";
import ProfilePage from "../components/Pages/ProfilePage";
import WritePage from "../components/Pages/WritePage";
import ErrorPage from "../components/Pages/ErrorPage";
import GuidelinePage from "../components/Pages/GuidelinePage";
import RouteWrapper from "./RouterWrapper";
import UserIdPage from "../components/Pages/UserIdPage";

const Router = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<Home />
				</RouteWrapper>
			),
			errorElement: <ErrorPage />,
		},
		{
			path: "/blogs",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<AllBlogPage />
				</RouteWrapper>
			),
		},
		{
			path: "/blogs/:id",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<BlogPage />
				</RouteWrapper>
			),
			errorElement: <ErrorPage />,
		},
		{
			path: "/projects",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<ProjectPage />
				</RouteWrapper>
			),
		},
		{
			path: "/about",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<AboutPage />
				</RouteWrapper>
			),
		},
		{
			path: "/login",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<LoginPage />
				</RouteWrapper>
			),
		},
		{
			path: "/signup",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<SignupPage />
				</RouteWrapper>
			),
		},
		{
			path: "/profile",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<ProfilePage />
				</RouteWrapper>
			),
		},
		{
			path: "/users/:id",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<UserIdPage />
				</RouteWrapper>
			),
		},
		{
			path: "/editor",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<WritePage />
				</RouteWrapper>
			),
		},
		{
			path: "/guideline",
			element: (
				<RouteWrapper>
					<ScrollRestoration />
					<GuidelinePage />
				</RouteWrapper>
			),
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
