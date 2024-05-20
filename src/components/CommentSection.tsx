import { useContext, useState, useEffect, ChangeEvent } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext, Comment, Blog } from "../contexts/BlogContext";
import { Link } from "react-router-dom";

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

		// Post new comment to this blog
		const response = await fetch("https://wayfarers-frontier-api.fly.dev/comments", {
			mode: "cors",
			method: "POST",
			headers: {
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
								<textarea onChange={handleCommentChange} className="w-full outline-none px-5 py-5" id="comment" name="comment" minLength={2} rows={2} />
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
		</>
	);
}

export default CommentSection;
