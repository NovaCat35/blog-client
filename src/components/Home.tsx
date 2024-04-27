import { useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Markdown from 'react-markdown'
import formatDate from "../functions/DateFormatter";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Home.scss";
import defaultImg from "../assets/default.jpeg";


function Home() {
	const { blogs } = useContext(BlogContext);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-10 mt-10">
				<div className="title-card-container">
					<h1 className="title font-bold">Tales from a wayfarer.</h1>
					<p className="intro-texts mt-2">
						Hey, I'm Robert and welcome to my platform, <b>Wayfarer's Frontier</b>! I'll be blogging about anything interesting and showcasing some fun projects here. Hopefully I can make you think a little deeper and brighten your day.
					</p>
				</div>
				<div className="latest-posts-showcase mt-20">
					<h1 className="text-4xl mb-5">Favorite Blogs</h1>
					<div className="posts-cards-container flex justify-between">
						{blogs.map((blog) => (
							<div key={blog._id} className="card flex flex-col items-center">
								<h1 className="text-xl font-bold">{blog.title}</h1>
								<p className="text-gray-500">{formatDate(blog.date_posted)}</p>
								<img className="w-[250px] h-[250px] object-cover rounded" src={defaultImg} alt="blog image" />
							</div>
						))}
					</div>
				</div>
				<div className="latest-posts-showcase mt-20">
					<h1 className="text-4xl mb-5">Latest Blog Posts</h1>
					<div className="posts-cards-container flex flex-col">
						{blogs.map((blog) => (
							<div className="blog-container flex items-center justify-between border-b border-gray-300 py-4" key={uuidv4()}>
								<Link to={`/`} className="flex items-center">
									<div className="img-container">
										<img className="w-40 h-40 object-cover rounded" src={defaultImg} alt="" />
									</div>
									<div className="texts-container ml-4">
										<h1 className="text-xl font-bold">{blog.title}</h1>
										<p className="text-gray-500">{formatDate(blog.date_posted)}</p>
										<p className="text-gray-800"><Markdown>{blog.texts}</Markdown></p>
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
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Home;
