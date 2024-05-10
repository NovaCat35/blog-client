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

export type Blog = {
	_id: string;
	tags: string[];
	read_time: number;
	date_posted: string;
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
	comments: string;
	published: boolean;
	likes: number;
};

// Specify the type for the context value explicitly
type BlogContextType = {
	blogs: Blog[];
};

export const BlogContext = createContext<BlogContextType>({
	blogs: [],
});

function BlogProvider({ children }: { children: React.ReactNode }) {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await fetch("http://localhost:3000/posts/", {
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

	return <BlogContext.Provider value={{ blogs }}>{children}</BlogContext.Provider>;
}

export default BlogProvider;
