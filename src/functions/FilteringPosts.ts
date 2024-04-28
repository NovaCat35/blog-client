import { Blog } from "../contexts/BlogContext";

export function getFavoriteBlogs(blogs: Blog[]) {
	const blogSorted = blogs.sort((a, b) => b.likes - a.likes).slice(0, 5);
	const favoriteBlog = blogSorted[0];
	const centerBlog = blogSorted[2];

	// We're swapping the favorite blog from index 0 with the center (index 2) is so it's displayed as the center article on the home's favorite section
	blogSorted.splice(2, 1, favoriteBlog);
	blogSorted.splice(0, 1, centerBlog);

	return blogSorted;
}

export function getLatestBlogs(blogs: Blog[]) {
	return blogs.sort((a, b) => new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime()).slice(0, 4);
}
