import { useContext } from "react";
import { BlogContext } from "../../contexts/BlogContext";
import { v4 as uuidv4 } from "uuid";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/default.jpeg";
import "../../styles/Fonts.scss";
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
				<h1 className="text-5xl text-[#223742] font-bold mb-6">All Blogs</h1>
				<main>
					{/* We go through the array of objects(year: Blogs[]) and separate all blog container into their year posted */}
					{Array.from(yearsMap).map(([year, yearBlogs]) => (
						<div key={year} className="year-container mb-10">
							{/* #bfdeef */}
							<h2 className="text-2xl font-bold bg-gradient-to-r from-[#1fa1ba] to-[#b2b53a] text-white px-5 py-2 mb-2 border-l-8 border-[#d80a77]">{year}</h2>
							{yearBlogs.map((blog) => (
								<div className="blog-container flex items-center justify-between border-b border-gray-300 py-4" key={uuidv4()}>
									<Link to={`/blogs/${blog._id}`} className="flex items-center gap-10">
										<div className="img-container">
											<img className="w-[18rem] h-[16rem] object-cover rounded" src={defaultImg} alt="" />
										</div>
										<div className="texts-container">
											<h1 className="text-xl text-[#223742] font-bold">{blog.title}</h1>
											<p className="text-gray-500">{formatDate(blog.date_posted)}</p>
											<div className="descriptions text-gray-800 max-w-[75vw] mt-2">
												<Markdown disallowedElements={["a", "h3"]} className="description text-ellipsis line-clamp-3 text-[#233742]">
													{blog.content}
												</Markdown>
											</div>{" "}
											<ul className="tags-container flex flex-wrap gap-x-5 gap-y-4 mt-4">
												{blog.tags.map((tag) => (
													<li key={uuidv4()} className="bg-gray-800 px-2 py-1 rounded text-white flex justify-center items-center text-center">
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
