import { useState, useEffect, createContext } from "react";

export type User = {
	_id: string;
	username: string;
	email: string;
	password: string;
	profile_img: string;
	date_joined: string;
	admin_access: boolean;
};

export type Comment = {
	_id: string;
	user: User;
	text: string;
	likes: string[];
	date_posted: string; // Date turn to string with .json()
	replies: Comment[]; // Array of Object IDs of reply comments
	edited: boolean;
};

export type Blog = {
	_id: string;
	tags: string[];
	read_time: number;
	date_posted: string; // Date turn to string with .json()
	title: string;
	content: string;
	blog_img: {
		img_url: string;
		src: {
			name: string;
			link: string;
		};
	};
	author: User;
	comments: string[];
	published: boolean;
	likes: number;
};

// Specify the type for the context value explicitly
type BlogContextType = {
	blogs: Blog[];
	fetchComments: (id: string) => Promise<Comment[]>;
};

export const BlogContext = createContext<BlogContextType>({
	blogs: [],
	fetchComments: async () => {
		throw new Error("fetchComments function not implemented");
	},
});

function BlogProvider({ children }: { children: React.ReactNode }) {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await fetch("https://wayfarers-frontier-api.fly.dev/posts/", {
					mode: "cors",
				});
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const blogs = await response.json();
				setBlogs(blogs.posts);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchBlogs();
	}, []);

	const fetchComments = async (id: string) => {
		try {
			const response = await fetch(`https://wayfarers-frontier-api.fly.dev/posts/${id}/comments`, {
				mode: "cors",
			});
			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}
			const comments = await response.json();
			return comments.commentList;
		} catch (error) {
			console.error(error);
		}
	};

	return <BlogContext.Provider value={{ blogs, fetchComments }}>{children}</BlogContext.Provider>;
}

export default BlogProvider;
