import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../../contexts/BlogContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../../functions/DateFormatter";
import defaultImg from "../../assets/default.jpeg";
import "../../styles/Fonts.scss";
import "../../styles/Blog.scss";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function BlogPage() {
	const { id } = useParams();
	const { blogs } = useContext(BlogContext);
	const [blog, setBlog] = useState(blogs.find((blog) => blog._id == id));

	useEffect(() => {
		setBlog(blogs.find((blog) => blog._id == id));
		console.log("blog", blog);
	}, [blog, blogs, id]);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-20 mt-10">
				{blog ? (
					<>
						<div className="content-info">
							<h1 className="text-7xl mb-5 font-bold">{blog.title}</h1>
							<div className="info-container flex gap-5">
								<div className="left-container w-[70px] h-[70px] rounded-full overflow-hidden">
									<img className="w-full h-full object-cover" src={defaultImg} alt="pfp" />
								</div>
								<div className="right-container flex flex-col justify-center">
									<p className="text-lg font-semibold">{blog.author.username}</p>
									<div className=" flex">
										<p>{blog.read_time} min read</p>
										<span className="mx-3 font-black">&#8226;</span>
										<p>{formatDate(blog.date_posted)}</p>
									</div>
								</div>
							</div>
							<ul className="tags-container flex flex-wrap gap-x-5 gap-y-4 mt-4 mb-5">
								{blog.tags.map((tag) => (
									<li key={uuidv4()} className="bg-gray-800 px-2 py-0.5 rounded text-white flex justify-center items-center text-center">
										{tag}
									</li>
								))}
							</ul>
							<div className="max-h-[600px] overflow-hidden mb-3">
								<img className="w-full h-full object-cover" src={defaultImg} alt="blog image" />
							</div>
							<p className="font-bold mb-10 text-gray-700">
								Image from{" "}
								<a className="text-[#d80a77]" href={blog.blog_img.src.link} target="_blank">
									{blog.blog_img.src.name}
								</a>
							</p>
						</div>
						<Markdown remarkPlugins={[remarkGfm]} className="content mb-10 text-[1.25rem]">
							{blog.content}
						</Markdown>
					</>
				) : (
					<p>Loading...</p>
				)}
			</main>
			<Footer />
		</div>
	);
}

export default BlogPage;
