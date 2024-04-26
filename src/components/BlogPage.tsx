import { useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import defaultImg from "../assets/default.jpeg";
import formatDate from "../functions/DateFormatter";
import Navbar from "./Navbar";

function BlogPage() {
	const { blogs } = useContext(BlogContext);

	return (
		<>
			<Navbar />
			<div className="px-20 py-10">
				<h1 className="text-3xl font-bold mb-6">BlogPage</h1>
				<main>
					{blogs.map((blog) => (
						<div className="blog-container flex items-center justify-between border-b border-gray-300 py-4" key={uuidv4()}>
							<Link to={`/`} className="flex items-center">
								<div className="img-container">
									<img className="w-40 h-40 object-cover rounded" src={defaultImg} alt="" />
								</div>
								<div className="texts-container ml-4">
									<h1 className="text-xl font-bold">{blog.title}</h1>
									<p className="text-gray-500">{formatDate(blog.date_posted)}</p>
									<p className="text-gray-800">{blog.texts}</p>
									<ul className="flex gap-5 mt-2">
										{blog.tags.map((tag) => (
											<li key={uuidv4()} className="bg-gray-200 px-2 py-1 rounded text-gray-700">
												{tag}
											</li>
										))}
									</ul>
								</div>
							</Link>
						</div>
					))}
				</main>
			</div>
		</>
	);
}

export default BlogPage;
