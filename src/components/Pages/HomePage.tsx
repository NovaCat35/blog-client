import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../../contexts/BlogContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Markdown from "react-markdown";
import formatDate from "../../functions/DateFormatter";
import { getFavoriteBlogs, getLatestBlogs } from "../../functions/FilteringPosts";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Loading from "../Loading";
import "../../styles/Home.scss";
import "../../styles/Fonts.scss";
import defaultImg from "../../assets/default.jpeg";
import arrowSvg from "../../assets/right-arrow.svg";
import starSvg from "../../assets/star.svg";
import starFallSvg from "../../assets/star-fall.svg";
import airplaneLine from "../../assets/airplane-line.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Home() {
	const { blogs } = useContext(BlogContext);
	const [favoriteBlogs, setFavoriteBlogs] = useState(blogs);
	const [latestBlogs, setLatestBlogs] = useState(blogs);

	useEffect(() => {
		if (blogs.length > 2) {
			// Sort blogs out for styling if more than 2 blogs
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
			<main className="flex-grow px-[30px] md:px-[7rem] mt-10">
				<div className="title-card-container">
					<h1 className="title mt-2 leading-tight md:leading-snug font-bold">Tales from a wayfarer.</h1>
					<div className="intro-container flex flex-col md:flex-row gap-8 md:gap-2 justify-center items-center">
						<p className="intro-text mt-2">
							Welcome to <b>Wayfarer's Frontier</b>. Be it the 42nd travel blog you're reading or fascinating tips about the mundane, you'll find it posted here. Come take a look!
						</p>
						<img className="w-full h-[100px] object-contain" src={airplaneLine} alt="airplane line" />
					</div>
				</div>
				<div className="popular-featured-blogs mt-12 md:mt-16">
					<div className="header flex gap-3.5 items-center mb-5">
						<img className="w-[60px] transform -rotate-12" src={starFallSvg} alt="star fall svg" />
						<h2 className="text-4xl text-[#223742] ">Favorite Blogs</h2>
					</div>
					{blogs.length > 0 ? (
						<div className="posts-cards-container">
							{favoriteBlogs.map((blog, index) => (
								<Link to={`/blogs/${blog._id}`} key={blog._id} className={`card  w-full flex flex-col items-center ${index == 2 ? "large" : ""}`}>
									{/* <img loading="lazy" className={`${index == 2 ? "large" : ""} w-full object-cover rounded`} src={blog.blog_img.img_url == "default" ? defaultImg : blog.blog_img.img_url} alt="blog image" /> */}
									<div className="overflow-hidden rounded">
										<LazyLoadImage effect="blur" wrapperProps={{ style: { transitionDelay: ".5s" } }} style={{ transition: "all 0.3s ease-in-out" }} className={`${index == 2 ? "large" : ""} w-full object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-125`} alt="blog image" src={blog.blog_img.img_url == "default" ? defaultImg : blog.blog_img.img_url} />
									</div>
									<div className={`${index == 2 ? "bg-[#c88761]" : "bg-[#718fba]"} z-10 px-4 py-0.5 rounded border-4 border-white text-white -mt-3`}>{blog.tags[0]}</div>
									<div className="text-container px-2 mt-2 text-center">
										<h1 className="text-xl font-bold mt-2">{blog.title}</h1>
										<p className="text-gray-500">{formatDate(blog.date_posted)}</p>
										<div className="descriptions text-gray-800">
											{/* In the description, we should disable all headers & any link (since we cant nest ahref) */}
											<Markdown disallowedElements={["a", "h3", "img"]} className="description text-ellipsis line-clamp-3 text-gray-700">
												{blog.content}
											</Markdown>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<Loading />
					)}
				</div>

				<div className="latest-posts-showcase mt-16">
					<div className="header flex gap-3.5 items-center mb-5">
						<img className="w-[40px] transform -rotate-12" src={starSvg} alt="star svg" />
						<h2 className="text-4xl text-[#223742] ">Latest Blog Posts</h2>
					</div>
					<div className="posts-cards-container flex flex-col items-start">
						{latestBlogs.map((blog) => (
							<div className="blog-container flex items-center justify-center md:justify-between w-full border-b border-gray-300 py-4" key={uuidv4()}>
								<Link to={`/blogs/${blog._id}`} className="flex flex-col md:flex-row items-center gap-4">
									<div className="img-container">
										{/* <img loading="lazy" className="max-h-[300px] object-cover rounded" src={blog.blog_img.img_url == "default" ? defaultImg : blog.blog_img.img_url} alt="blog image" /> */}
										<LazyLoadImage className="max-h-[300px] object-cover rounded" alt="blog image" src={blog.blog_img.img_url == "default" ? defaultImg : blog.blog_img.img_url} />
									</div>
									<div className="texts-container ml-4">
										<h1 className="text-xl font-bold">{blog.title}</h1>
										<p className="date-posted text-gray-500">{formatDate(blog.date_posted)}</p>
										<div className="descriptions text-gray-800 max-w-[75vw] mt-2">
											<Markdown disallowedElements={["a", "h3", "img"]} className="description text-ellipsis line-clamp-3 text-gray-700">
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
						<p className="text-2xl text-[#1ca1ba] font-bold underline-offset-4 hover:underline">More Posts</p>
						<img className="arrow-svg w-7" src={arrowSvg} alt="right arrow" />
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Home;
