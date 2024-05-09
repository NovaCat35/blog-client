import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../../contexts/BlogContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Markdown from "react-markdown";
import formatDate from "../../functions/DateFormatter";
import { getFavoriteBlogs, getLatestBlogs } from "../../functions/FilteringPosts";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../styles/Home.scss";
import "../../styles/Fonts.scss";
import defaultImg from "../../assets/default.jpeg";
import arrowSvg from "../../assets/right-arrow.svg";
import starSvg from "../../assets/star.svg";
import starFallSvg from "../../assets/star-fall.svg";

function Home() {
	const { blogs } = useContext(BlogContext);
	const [favoriteBlogs, setFavoriteBlogs] = useState(blogs);
	const [latestBlogs, setLatestBlogs] = useState(blogs);

	useEffect(() => {
		if (blogs.length > 0) {
			// we need to wait for the context to finish
			const favorites = getFavoriteBlogs(blogs);
			setFavoriteBlogs(favorites);
		}
	}, [blogs]);

	useEffect(() => {
		if (blogs.length > 0) {
			// we need to wait for the context to finish
			const latest = getLatestBlogs(blogs);
			setLatestBlogs(latest);
		}
	}, [blogs]);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-20 mt-10">
				<div className="title-card-container">
					<h1 className="title font-bold">Tales from a wayfarer.</h1>
					<p className="intro-text mt-2">
						Hey, I'm Robert and welcome to my platform, <b>Wayfarer's Frontier</b>! I'll be blogging about anything interesting and showcasing some side projects I've been working on. Hopefully I can make you think a little deeper and brighten your day.
					</p>
				</div>
				<div className="popular-featured-blogs mt-20">
					<div className="header flex gap-3.5 items-center mb-5">
						<img className="w-[60px] transform -rotate-12" src={starFallSvg} alt="star fall svg" />
						<h2 className="text-4xl text-[#223742] ">Favorite Blogs</h2>
					</div>
					<div className="posts-cards-container">
						{favoriteBlogs.map((blog, index) => (
							<Link to={`/blogs/${blog._id}`} key={blog._id} className={`card  w-full flex flex-col items-center ${index == 2 ? "large" : ""}`}>
								<img className={`${index == 2 ? "large" : ""} w-full object-cover rounded`} src={defaultImg} alt="blog image" />
								<div className={`${index == 2 ? "bg-[#c88761]" : "bg-[#718fba]"} px-4 py-0.5 rounded text-white -mt-3`}>{blog.tags[0]}</div>
								<div className="text-container px-2 mt-2 text-center">
									<h1 className="text-xl font-bold mt-2">{blog.title}</h1>
									<p className="text-gray-500">{formatDate(blog.date_posted)}</p>
									<div className="descriptions text-gray-800 max-w-[75vw]">
										{/* In the description, we should disable all headers & any link (since we cant nest ahref) */}
										<Markdown disallowedElements={["a", "h3"]} className="description text-ellipsis line-clamp-3 text-gray-700">
											{blog.content}
										</Markdown>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>

				<div className="latest-posts-showcase mt-20">
					<div className="header flex gap-3.5 items-center mb-5">
						<img className="w-[40px] transform -rotate-12" src={starSvg} alt="star svg" />
						<h2 className="text-4xl text-[#223742] ">Latest Blog Posts</h2>
					</div>
					<div className="posts-cards-container flex flex-col items-start">
						{latestBlogs.map((blog) => (
							<div className="blog-container flex items-center justify-between w-full border-b border-gray-300 py-4" key={uuidv4()}>
								<Link to={`/blogs/${blog._id}`} className="flex items-center gap-4">
									<div className="img-container">
										<img className="w-[300px] h-[300px] object-cover rounded" src={defaultImg} alt="blog image" />
									</div>
									<div className="texts-container ml-4">
										<h1 className="text-xl font-bold">{blog.title}</h1>
										<p className="date-posted text-gray-500">{formatDate(blog.date_posted)}</p>
										<div className="descriptions text-gray-800 max-w-[75vw] mt-2">
											<Markdown disallowedElements={["a", "h3"]} className="description text-ellipsis line-clamp-3 text-gray-700">
												{blog.content}
											</Markdown>
										</div>
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
					<Link className="flex text-center justify-end gap-3 mt-10 mb-5" to="/blogs">
						<p className="text-2xl text-[#1ca1ba] font-bold">More Posts</p>
						<img className="arrow-svg w-7" src={arrowSvg} alt="right arrow" />
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Home;
