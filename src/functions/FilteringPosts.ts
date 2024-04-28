import {Blog} from '../contexts/BlogContext';

export function getFavoriteBlogs(blogs: Blog[]) {
	return blogs.sort((a, b) => b.likes - a.likes).slice(0, 3);
}

