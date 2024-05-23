import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../Pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import BlogProvider, { BlogContext, Comment } from "../../contexts/BlogContext";
import RouteWrapper from "../../router/RouterWrapper";
import { describe, it, expect } from "vitest";

const mockBlogs = [
	{
		_id: "1",
		tags: ["Technology", "Programming"],
		read_time: 10,
		date_posted: "2024-05-13",
		title: "Confidential Required",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		blog_img: {
			img_url: "https://example.com/image1.jpg",
			src: {
				name: "Image 1",
				link: "https://example.com/image1.jpg",
			},
		},
		author: {
			_id: "author1",
			username: "JohnDoe",
			email: "johndoe@example.com",
			password: "hashedpassword",
			profile_img: "https://example.com/profile1.jpg",
			date_joined: "2023-01-01",
			admin_access: true,
		},
		comments: ["comment1"], // Comments array contains IDs
		published: true,
		likes: 20,
	},
	{
		_id: "2",
		tags: ["Science", "Space"],
		read_time: 15,
		date_posted: "2024-05-10",
		title: "Exploring the Cosmos",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
		blog_img: {
			img_url: "https://example.com/image2.jpg",
			src: {
				name: "Image 2",
				link: "https://example.com/image2.jpg",
			},
		},
		author: {
			_id: "author2",
			username: "JaneDoe",
			email: "janedoe@example.com",
			password: "hashedpassword",
			profile_img: "https://example.com/profile2.jpg",
			date_joined: "2023-02-01",
			admin_access: false,
		},
		comments: ["comment2"], // Comments array contains IDs
		published: true,
		likes: 15,
	},
];

// MOCKED VALUES
const MockedFetch = async (): Promise<Comment[]> => {
	// Your mocked data here
	const mockedComments: Comment[] = [
		{
			_id: "comment2",
			user: {
				_id: "user2",
				username: "Bob",
				email: "bob@example.com",
				password: "hashedpassword",
				profile_img: "https://example.com/profile4.jpg",
				date_joined: "2023-04-01",
				admin_access: false,
			},
			text: "Fascinating read!",
			likes: 5,
			date_posted: "2024-05-10",
			replies: [
				{
					_id: "reply1",
					user: {
						_id: "user3",
						username: "Charlie",
						email: "charlie@example.com",
						password: "hashedpassword",
						profile_img: "https://example.com/profile5.jpg",
						date_joined: "2023-05-01",
						admin_access: false,
					},
					text: "Agreed!",
					likes: 3,
					date_posted:"2024-05-11",
					replies: [],
					edited: false,
				},
			],
			edited: false,
		},
		{
			_id: "comment3", // New comment ID
			user: {
				_id: "user4", // New user ID
				username: "David",
				email: "david@example.com",
				password: "hashedpassword",
				profile_img: "https://example.com/profile6.jpg",
				date_joined: "2023-06-01",
				admin_access: false,
			},
			text: "Interesting perspective!",
			likes: 8,
			date_posted: "2024-05-12",
			replies: [],
			edited: false,
		},
	];

	return Promise.resolve(mockedComments);
};

const MockedBlogProvider = ({ children }: { children: React.ReactNode }) => <BlogContext.Provider value={{ blogs: mockBlogs, fetchComments: MockedFetch }}>{children}</BlogContext.Provider>;

describe("Home Page", () => {
	it("renders title banner", () => {
		render(
			<BrowserRouter>
				<BlogProvider>
					<RouteWrapper>
						<Home />
					</RouteWrapper>
				</BlogProvider>
			</BrowserRouter>
		);

		expect(screen.getByText("Tales from a wayfarer.")).toBeInTheDocument();
	});

	it("renders favorite blog section", () => {
		render(
			<BrowserRouter>
				<MockedBlogProvider>
					<RouteWrapper>
						<Home />
					</RouteWrapper>
				</MockedBlogProvider>
			</BrowserRouter>
		);

		// Because we have a "favorite section" & "latest section" our text may pop up more than once
		// so we use "queryByAll" instead of "toBeInTheDocument"
		const titleElements = screen.queryAllByText("Confidential Required");
		expect(titleElements.length).toBeGreaterThan(0);
	});
});
