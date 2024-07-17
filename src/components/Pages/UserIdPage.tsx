import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import formatDate from "../../functions/DateFormatter";
import { User, Blog, Comment } from "../../contexts/BlogContext";
import catBagImg from "../../assets/cat-bag.jpg";
import heartSvg from "../../assets/heart.svg";
import "../../styles/Comment.scss";

/**
 * This page is different from the ProfilePage since it shows any specific's user info.
 * This will hide some personal info from other users and showcase their comments (kinda like reddit).
 * You get to this page when you click on a user's name in the comment section or a blog's author name
 */
function UserIdPage() {
	const { id } = useParams();
	const [user, setUser] = useState<User | null>(null);
	const [posts, setPosts] = useState<Blog[]>([]);
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`https://wayfarers-frontier-api.fly.dev/users/${id}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setUser(data.user);
				setPosts(data.posts);
				setComments(data.comments);
			} catch (error) {
				console.error("Fetch user error:", error);
			}
		};
		fetchUser();
	}, [id]);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="px-10 py-5 flex-grow">
				{user ? (
					<div className="mb-4 flex flex-col justify-center items-center">
						<h1 className="text-4xl font-semibold mb-4">{user.username}</h1>
						<img className="max-w-xs mb-4 object-cover rounded-full h-40 w-40" src={user.profile_img !== "default" ? user.profile_img : catBagImg} alt="cat laying down" />
						<p>Joined: {formatDate(user.date_joined)}</p>
						<p>
							Role: <span className="text-[#d80a77]">{user.admin_access ? "Admin" : "Member"}</span>
						</p>
					</div>
				) : (
					<p>Loading...</p>
				)}
				<div>
					<div className="mb-20">
						{posts.length > 0 && <h2 className="text-2xl font-bold text-[#1ca1ba]">Blog Posts</h2>}
						{posts.map((post) => (
							<div key={post._id}>
								<Link to={`/blogs/${post._id}`} className="font-medium text-[#105580] underline">
									{post.title}
								</Link>
								<p>Read time: {post.read_time} mins</p>
								<p>Likes: {post.likes}</p>
								<p>Tags: {post.tags.join(", ")}</p>
								<p>Published: {formatDate(post.date_posted)}</p>
								<span className="flex mt-2 mb-4 w-full border border-[#1ca1ba]"></span>
							</div>
						))}
					</div>

					{comments.length > 0 && <h2 className="text-2xl font-bold text-[#1ca1ba]">Comments</h2>}
					{comments.map((comment) => (
						<div key={comment._id}>
							<Link to={`/blogs/${comment.blog_post._id}`} className="font-medium text-[#105580] underline">
								{comment.blog_post.title}
							</Link>
							<p className="mb-2">{comment.text}</p>
							<div className="bottom-container flex gap-4">
								<div className="flex gap-2">
									<img src={heartSvg} className="heart w-[30px] fill-cyan-500" alt="heart icon" />
									<p>{comment.likes.length}</p>
								</div>
								<span>•</span>
								<p>Date: {new Date(comment.date_posted).toLocaleDateString()}</p>
							</div>
							<span className="flex mt-2 mb-4 w-full border border-[#1ca1ba]"></span>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default UserIdPage;
