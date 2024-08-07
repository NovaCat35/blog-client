import { useContext, useState, useEffect } from "react";
import { BlogContext, Blog } from "../../contexts/BlogContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../../functions/DateFormatter";
import defaultImg from "../../assets/default.jpeg";
import "../../styles/Fonts.scss";
import "../../styles/Blog.scss";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CommentSection from "../CommentParts/CommentSection";
import EditBtn from "../EditBtn";

function BlogPage() {
	const { id } = useParams();
	const { blogs } = useContext(BlogContext);
	const [blog, setBlog] = useState<Blog | undefined>(undefined);
	const { user } = useContext(AuthContext); // we have a verified user (e.g. token is active), show mangement page instead of login/signup

	useEffect(() => {
		const foundBlog = blogs.find((blog) => blog._id === id);
		if (foundBlog) {
			setBlog(foundBlog);
		}
	}, [blogs, id]);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow px-[30px] md:px-20 mt-10">
				{blog ? (
					<>
						<div className="content-info">
							<h1 className="title leading-tight text-5xl md:text-6xl lg:text-7xl mb-5 font-bold">{blog.title}</h1>
							<div className="info-container flex gap-5">
								<Link to={`/users/${blog.author._id}`} className="left-container w-[70px] h-[70px] rounded-full overflow-hidden">
									<img className="w-full h-full object-cover" src={blog.author.profile_img !== "default" ? blog.author.profile_img : defaultImg} alt="pfp" />
								</Link>
								<div className="right-container flex flex-col justify-center">
									<div className="flex gap-x-4">
										<Link to={`/users/${blog.author._id}`} className="text-lg font-semibold">
											{blog.author.username}
										</Link>
										{user && user.admin_access && <EditBtn blogId={blog._id} />}
									</div>
									<div className="flex">
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
								<img className="w-full h-full object-cover" src={blog.blog_img.img_url === "default" ? defaultImg : blog.blog_img.img_url} alt="blog image" />
							</div>
							<p className="text-xl font-bold mb-10 text-gray-700">
								Image from{" "}
								<a className="text-[#d80a77]" href={decodeURIComponent(blog.blog_img.src.link)} target="_blank" rel="noopener noreferrer">
									{blog.blog_img.src.name}
								</a>
							</p>
						</div>
						<Markdown remarkPlugins={[remarkGfm]} className="content mb-10 text-[1.25rem]">
							{blog.content}
						</Markdown>
					</>
				) : (
					<Loading />
				)}

				<CommentSection blog={blog} blogId={id} />
			</main>
			<Footer />
		</div>
	);
}

export default BlogPage;
