import { useContext, useState, useEffect, ChangeEvent } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext, Comment, Blog } from "../contexts/BlogContext";
import { Link } from "react-router-dom";
import formatDate from "../functions/DateFormatter";
import defaultImg from "../assets/default.jpeg";

interface CommentSectionProps {
	blog: Blog | undefined;
	blogId: string | undefined;
}

function CommentSection({ blog, blogId }: CommentSectionProps) {
	const { user, tokenActive } = useContext(AuthContext);
	const { fetchComments } = useContext(BlogContext);
	const [comments, setComments] = useState<Comment[]>([]);
	const [commentText, setCommentText] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Get the JWT token from localStorage
		const token = localStorage.getItem("jwt_token");
		if (!token) {
			throw new Error("JWT token not found");
		}

		console.log("Blog ID:", blogId);
		console.log("Comment Text:", commentText);

		// Post new comment to this blog
		const response = await fetch("https://wayfarers-frontier-api.fly.dev/comments", {
			mode: "cors",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				blog_post_id: blogId,
				comment: commentText,
			}),
		});

		if (response.ok && blogId) {
			// refetch comment base on blog id
			const updatedComments = await fetchComments(blogId);
			setComments(updatedComments);
			setCommentText(""); // Clear the comment textarea
		} else {
			console.error("Failed to create comment:", response.status);
		}
		response.json();
	};

	const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCommentText(e.target.value);
	};

	useEffect(() => {
		if (blog && blogId) {
			const fetchData = async () => {
				const commentList = await fetchComments(blogId); // Fetch comments for the current blog
				setComments(commentList);
			};
			fetchData();
		}
	}, [blog, fetchComments, blogId]);

	return (
		<>
			<div className="user-form-container flex justify-center mt-5">
				{tokenActive ? (
					<div className="user-form">
						<p>{user.username}</p>
						<form className="border w-[80vw]" onSubmit={handleSubmit} action="/">
							<label htmlFor="comment"></label>
							<div className="relative">
								<textarea onChange={handleCommentChange} value={commentText} placeholder="What are your thoughts?" className="w-full outline-none px-5 py-5" id="comment" name="comment" minLength={2} rows={2} />
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
					<Link to="/login" className="alert-container flex items-center gap-5 px-5 py-3 border-4 border-[#e84267] rounded-md hover:bg-[#e84267] hover:text-white transition duration-300 ease-in-out">
						<p className="text-xl hover">Join us, log in to comment.</p>
					</Link>
				)}
			</div>

			<div className="comment-section flex flex-col items-center border-t-8 border-gray-300 pt-5 mt-5 mb-10 text-gray-800">
				{comments.length == 0 ? (
					<div className="text-center">No comments yet, be the first to comment!</div>
				) : (
					comments.map((comment) => (
						<div key={comment._id} className="comment-container flex flex-col border-y-2 border-gray-200 w-[75vw] px-2 py-3">
							<div className="user-info mb-3 flex gap-4 items-center">
								<div className="img-container w-[60px] h-[60px] rounded-full overflow-hidden">
									<img className="w-full h-full object-fit" src={defaultImg} alt="comment pfp" />
								</div>
								<div className="texts-container">
									<p className="font-semibold">{comment.user.username}</p>
									<p className="text-gray-500">{formatDate(comment.date_posted)}</p>
								</div>
							</div>
							<div className="comment-container flex">
								<div className="connector ml-7 -mt-1 border-l-2 border-b-2 w-[13px] h-[20px] border-[#d80a77]"></div>
								<p className="ml-3">{comment.text}</p>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
}

export default CommentSection;
