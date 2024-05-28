import { useState } from "react";
// import messageSvg from "../../../assets/chat-bubble.svg";
import { Comment } from "../../../contexts/BlogContext";

interface CommentLikesProps {
	comment: Comment;
	refreshComments: () => void;
}

function CommentReplies({ comment, refreshComments }: CommentLikesProps) {
	const [replyText, setReplyText] = useState("");

	const handleSubmit = async () => {
		try {
			// Get the JWT token from localStorage
			const token = localStorage.getItem("jwt_token");
			if (!token) {
				throw new Error("JWT token not found");
			}
			const response = await fetch(`https://wayfarers-frontier-api.fly.dev/comments/${comment._id}/reply`, {
				mode: "cors",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					reply: replyText,
				}),
			});

			if (response.ok) {
				refreshComments();
				const data = await response.json();
				console.log(data.message);
			} else {
				const errorMessage = await response.text();
				console.error("Failed to upload reply:", response.status, errorMessage);
			}
		} catch (error) {
			console.error("An error occurred while replying:", error);
		}
	};

	// const handleReplyClick = () => {
	// 	setReplyFormActive((state) => !state);
	// };

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReplyText(e.target.value);
	};

	return (
		<form className="flex flex-col md:ml-10 mb-5" onSubmit={handleSubmit}>
			<textarea onChange={handleTextChange} value={replyText} placeholder="Something to share?" className="w-full outline-none mt-2 px-3 py-3 border" id="comment" name="comment" minLength={2} rows={2} />
			<button className="bg-[#89a02c] text-sm text-white px-5 py-[0.5px] transition ease-in-out hover:bg-[#788c27]" type="submit">
				Reply
			</button>
		</form>
	);
}

export default CommentReplies;
