import { useContext, useState, useEffect } from "react";
import { BlogContext, Comment } from "../../contexts/BlogContext";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../../functions/DateFormatter";
import defaultImg from "../../assets/default.jpeg";
import { Link } from "react-router-dom";
import "../../styles/Fonts.scss";
import "../../styles/Blog.scss";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function BlogPage() {
	const { id } = useParams();
	const { blogs, fetchComments } = useContext(BlogContext);
	const { user, tokenActive } = useContext(AuthContext);
	const [blog, setBlog] = useState(blogs.find((blog) => blog._id == id));
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		setBlog(blogs.find((blog) => blog._id == id));
	}, [blog, blogs, id]);

	useEffect(() => {
		if (blog && id) {
			const fetchData = async () => {
				const commentList = await fetchComments(id); // Fetch comments for the current blog
				setComments(commentList);
			};
			fetchData();
		}
	}, [blog, fetchComments, id]);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow  px-[30px] md:px-20 mt-10">
				{blog ? (
					<>
						<div className="content-info">
							<h1 className="title leading-tight text-5xl md:text-6xl lg:text-7xl mb-5 font-bold">{blog.title}</h1>
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
								<img className="w-full h-full object-cover" src={blog.blog_img.img_url == "default" ? defaultImg : blog.blog_img.img_url} alt="blog image" />
							</div>
							<p className="text-xl font-bold mb-10 text-gray-700">
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

				<h3 className="font-semibold">{blog?.comments.length} Comments</h3>
				<div className="user-form-container flex justify-center mt-5">
					{tokenActive ? (
						<div className="user-form">
							<p>{user.username}</p>
							<form className="border w-[80vw]" action="/">
								<label htmlFor="comment"></label>
								<div className="relative">
									<textarea className="w-full outline-none px-5 py-5" id="comment" name="comment" minLength={2} rows={2} />
									<div className="absolute bottom-0 right-3 flex justify-end gap-5 pb-2">
										<button className="font-semibold">Cancel</button>
										<button type="submit" className="bg-[#1ca1ba] font-semibold text-white px-5 py-1 rounded-md">
											Respond
										</button>
									</div>
								</div>
							</form>
						</div>
					) : (
						<Link to="/login" className="alert-container flex items-center gap-5 px-5 py-3 border-2 border-[#e84267] rounded-md hover:bg-[#e84267] hover:text-white transition duration-300 ease-in-out">
							<p className="text-xl hover">Join us, log in to comment.</p>
						</Link>
					)}
				</div>

				<div className="comment-section flex flex-col items-center border-t-2 border-gray-300 pt-5 mt-5 mb-10 text-gray-800">
					{comments.length == 0 ? (
						<div className="text-center">No comments yet, be the first to comment!</div>
					) : (
						comments.map((comment) => (
							<div key={comment._id} className="comment-container">
								{comment.text}
							</div>
						))
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default BlogPage;
