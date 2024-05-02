import { useContext } from "react";
import { BlogContext } from "../../contexts/BlogContext";
import { v4 as uuidv4 } from "uuid";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/default.jpeg";
import formatDate from "../../functions/DateFormatter";
import { groupByYear } from "../../functions/FilteringPosts";
import Navbar from "../Navbar";
import Footer from "../Footer";

function BlogPage() {
	const { blogs } = useContext(BlogContext);
	const yearsMap = groupByYear(blogs);

	return (
		<>
			<Navbar />
			<div className="px-20 py-10">
				<h1 className="text-5xl font-bold mb-6">All Blogs</h1>
				<main>
					{/* We go through the array of objects(year: Blogs[]) and separate all blog container into their year posted */}
					{Array.from(yearsMap).map(([year, yearBlogs]) => (
						<div key={year} className="year-container mb-10">
							<h2 className="text-2xl font-bold bg-gradient-to-r from-[#85b715] to-[#81b4c5] text-white px-5 py-2 mb-2 border-l-8 border-[#e04386]">{year}</h2>
							{yearBlogs.map((blog) => (
								<div className="blog-container flex items-center justify-between border-b border-gray-300 py-4" key={uuidv4()}>
									<Link to={`/`} className="flex items-center">
										<div className="img-container">
											<img className="w-40 h-40 object-cover rounded" src={defaultImg} alt="" />
										</div>
										<div className="texts-container ml-4">
											<h1 className="text-xl font-bold">{blog.title}</h1>
											<p className="text-gray-500">{formatDate(blog.date_posted)}</p>
											<div className="descriptions text-gray-800 max-w-[75vw]">
												<Markdown className="text-ellipsis line-clamp-3">{`${blog.texts}`}</Markdown>
											</div>{" "}
											<ul className="tags-container flex flex-wrap gap-x-5 gap-y-4 mt-4">
												{blog.tags.map((tag) => (
													<li key={uuidv4()} className="bg-gray-200 px-2 py-1 rounded text-gray-700 flex justify-center items-center text-center">
														{tag}
													</li>
												))}
											</ul>
										</div>
									</Link>
								</div>
							))}
						</div>
					))}
				</main>
			</div>
			<Footer />
		</>
	);
}

export default BlogPage;
